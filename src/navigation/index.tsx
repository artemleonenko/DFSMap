import {
  createStaticNavigation,
  StaticParamList,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from './screens/Home';
import { Map } from './screens/Map';

const RootStack = createNativeStackNavigator({
  screens: {
    HomeTabs: {
      screen: Home,
      options: {
        title: 'DFS',
        headerShown: true,
        contentStyle: {backgroundColor: '#ffffffff'},
        orientation: 'portrait'
      },
    },
    MapScreen: {
      screen: Map,
       options: () => ({
        presentation: 'card',
        animation: 'slide_from_bottom',
        animationDuration: 200,
        headerShown: false,
        orientation: 'portrait',
        contentStyle: {backgroundColor: 'rgba(255, 255, 255, 1)'}
      }),
    },
  },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}