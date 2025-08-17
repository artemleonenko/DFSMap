import { type ExpoConfig } from "@expo/config-types";
import { withAppDelegate, type ConfigPlugin } from "expo/config-plugins";

const { mergeContents } = require("@expo/config-plugins/build/utils/generateCode");

const config: ExpoConfig = {
  name: "Example",
  slug: "example-app",
  version: "1.0.0",
  scheme: "yourappname",
  extra: {
    mapKitApiKey: "a9986863-d2ed-4f64-9d38-c11e08f196be",
  },
  experiments: {
    turboModules: false,
    reactCompiler: false,
  },
  plugins: [
    [
      "expo-build-properties",
      {
        ios: {
          useFrameworks: "static",
          newArchEnabled: false,
        },
        android: {
          newArchEnabled: false,
        },
      },
    ],
  ],
};

const withYandexMaps: ConfigPlugin = (expoConfig) => {
  return withAppDelegate(expoConfig, async (config) => {
    const appDelegate = config.modResults;
    const contents: string = appDelegate.contents ?? "";

    const isSwift =
      appDelegate.language === "swift" ||
      (typeof contents === "string" &&
        contents.includes("import UIKit") &&
        contents.includes("class AppDelegate"));

    if (isSwift) {
      if (!contents.includes("import YandexMapsMobile")) {
        appDelegate.contents = mergeContents({
          tag: "yandex-maps-swift-import",
          src: appDelegate.contents,
          newSrc: "import YandexMapsMobile",
          anchor: contents.includes("import UIKit")
            ? "import UIKit"
            : "import Foundation",
          offset: 1,
          comment: "//",
        }).contents;
      }

      const swiftInit = [
        `    // Yandex MapKit initialization injected by expo config plugin`,
        `    YMKMapKit.setApiKey("${config.extra?.mapKitApiKey}")`,
        `    YMKMapKit.setLocale("ru_RU")`,
        `    _ = YMKMapKit.sharedInstance()`,
      ].join("\n");

      if (!appDelegate.contents.includes("YMKMapKit.setApiKey")) {
        const returnAnchor =
          "return super.application(application, didFinishLaunchingWithOptions: launchOptions)";
        if (appDelegate.contents.includes(returnAnchor)) {
          appDelegate.contents = mergeContents({
            tag: "yandex-maps-swift-init",
            src: appDelegate.contents,
            newSrc: `${swiftInit}\n`,
            anchor: returnAnchor,
            offset: -1, 
            comment: "//",
          }).contents;
        } else {
          const methodAnchor = "func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {";
          if (appDelegate.contents.includes(methodAnchor)) {
            appDelegate.contents = mergeContents({
              tag: "yandex-maps-swift-init-fallback",
              src: appDelegate.contents,
              newSrc: `\n${swiftInit}\n`,
              anchor: methodAnchor,
              offset: 1, 
              comment: "//",
            }).contents;
          } else {
            appDelegate.contents = `${swiftInit}\n\n${appDelegate.contents}`;
          }
        }
      }

      return config;
    }

    if (!appDelegate.contents.includes('#import <YandexMapsMobile/YMKMapKitFactory.h>')) {
      if (appDelegate.contents.includes('#import "AppDelegate.h"')) {
        appDelegate.contents = mergeContents({
          tag: "yandex-maps-objc-import",
          src: appDelegate.contents,
          newSrc: '#import <YandexMapsMobile/YMKMapKitFactory.h>',
          anchor: '#import "AppDelegate.h"',
          offset: 1,
          comment: "//",
        }).contents;
      } else {
        appDelegate.contents = `#import <YandexMapsMobile/YMKMapKitFactory.h>\n${appDelegate.contents}`;
      }
    }

    const mapKitMethodInvocations = [
      `[YMKMapKit setApiKey:@"${config.extra?.mapKitApiKey}"];`,
      `[YMKMapKit setLocale:@"ru_RU"];`,
      `[YMKMapKit mapKit];`,
    ]
      .map((line) => `\t${line}`)
      .join("\n");

    if (!appDelegate.contents.includes("[YMKMapKit setApiKey:")) {
      if (appDelegate.contents.includes("return YES;")) {
        appDelegate.contents = mergeContents({
          tag: "yandex-maps-objc-init",
          src: appDelegate.contents,
          newSrc: `\n${mapKitMethodInvocations}\n`,
          anchor: "return YES;",
          offset: -1, 
          comment: "//",
        }).contents;
      } else {
        const anchorString = "didFinishLaunchingWithOptions:launchOptions";
        if (appDelegate.contents.includes(anchorString)) {
          appDelegate.contents = mergeContents({
            tag: "yandex-maps-objc-init-fallback",
            src: appDelegate.contents,
            newSrc: `\n${mapKitMethodInvocations}\n`,
            anchor: anchorString,
            offset: 1,
            comment: "//",
          }).contents;
        } else {
          appDelegate.contents = `${mapKitMethodInvocations}\n\n${appDelegate.contents}`;
        }
      }
    }

    return config;
  });
};

export default withYandexMaps(config);
