import * as SplashScreen from "expo-splash-screen";
import * as React from "react";
import { Platform } from "react-native";
import { Navigation } from "./navigation";
import YaMap from "react-native-yamap";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

SplashScreen.preventAutoHideAsync();

// ✅ Android: инициализация через JS
if (Platform.OS === "android") {
  YaMap.setLocale("ru_RU");
  YaMap.init("a9986863-d2ed-4f64-9d38-c11e08f196be");
}

export function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <Navigation
          onReady={() => {
            SplashScreen.hideAsync();
          }}
        />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}
