import React from 'react'
import {View, StyleSheet} from 'react-native'
import {Text, Icon, colors,} from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';

const TabBarComponent = (props) => {
   const {
      renderIcon,
      getLabelText,
      activeTintColor,
      inactiveTintColor,
      onTabPress,
      onTabLongPress,
      getAccessibilityLabel,
      navigation
   } = props;
   const {routes, index} = navigation.state

   let activeTabColor = (i) => {
      let themeColor = colors.grey3
      if(i == index) {
         themeColor = colors.primary
      }
      return themeColor
   }
   return (
      <View style={style.tabBarComponent}>
         <TouchableOpacity onPress={() => navigation.navigate('Home')} style={style.tabBarItem}>
            <Icon color={activeTabColor(0)} style={style.icon} type="feather" name="home" />
            <Text style={[style.label, {color: activeTabColor(0)}]}>Home</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => navigation.navigate('Explore')} style={style.tabBarItem}>
            <Icon color={activeTabColor(1)} style={style.icon} type="feather" name="shopping-cart" />
            <Text style={[style.label, {color: activeTabColor(1)}]}>Shop</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => navigation.navigate('About')} style={style.tabBarItem}>
            <Icon color={activeTabColor(2)} style={style.icon} type="feather" name="money" />
            <Text style={[style.label, {color: activeTabColor(2)}]}>Wallet</Text>
         </TouchableOpacity>
         <TouchableOpacity onPress={() => navigation.navigate('MyAccount')} style={style.tabBarItem}>
            <Icon color={activeTabColor(3)} style={style.icon} type="feather" name="user" />
            <Text style={[style.label, {color: activeTabColor(3)}]}>My Account</Text>
         </TouchableOpacity>
      </View>
   )
}
export default TabBarComponent;
// const inactiveTintColor = colors.grey2
// const activeTintColor = colors.grey2

const style = StyleSheet.create({
   tabBarComponent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderTopWidth: 1,
      borderTopColor: colors.grey3,
   },
   tabBarItem: {
      padding: 6,
      textAlign: 'center',
   },
   label: {
      color: colors.grey3,
   },
   icon: {
      color: colors.grey3,
   },
})
