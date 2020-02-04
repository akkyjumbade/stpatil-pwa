import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { fromLeft, fromRight } from 'react-navigation-transitions';
import { fontFace, colors } from '../theme';

export const stackNavigation = (navs, options) => {
   return createStackNavigator({
      ...navs,
   }, {
      transitionConfig: () => fromRight(),
      // headerMode: 'none',
      ...options,
      navigationOptions: {
         // headerVisible: false,
         headerStyle: {
            shadowOpacity: 0,
            elevation: 0,
         },
      },
      defaultNavigationOptions: {
         gestureEnabled: true,
         cardOverlayEnabled: true,
         headerStyle: {
            shadowOpacity: 0,
            elevation: 0,
         },
         headerTitleStyle: {
            fontFamily: fontFace
         },
         tabBarVisible: false,
      },
   })
}
export const bottomTabComponent = (nav, options) => {
   return createBottomTabNavigator(
      nav,
      {
         headerMode: 'none',
         navigationOptions: {
            headerVisible: false,
            tabBarOptions: {
               activeTintColor: colors.primary,
               labelStyle: {
                  fontFamily: fontFace,
                  fontSize: 13,
               }
            },
         },
         defaultNavigationOptions: {
            headerStyle: {
               shadowOpacity: 0,
               elevation: 0,
            },
            tabBarOptions: {
               activeTintColor: colors.primary,
               labelStyle: {
                  fontFamily: fontFace,
                  fontSize: 13,
               }
            },
         },
         ...options,
      },
   )
}
