import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import WebView from 'react-native-webview';
import { Text } from 'react-native-elements';
import { baseURL, screenWidth, screenHeight } from '../config';
import { session } from '../helpers';
// import ScratchView from './ScratchCard';

export default class ScratchCard extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         scrollEnabled: false,
      }
   }
   async handleEvent(ev) {
      alert(JSON.stringify(ev))
   }
   render() {
      const user = session.load({key: 'loginState'})
      let url = 'https://stpatil.com/wp-json/app/scratch_reward?uid='+user.id
      return (
         <View>
            <WebView
               source={{uri: url, }}
               onMessage={(event) => this.handleEvent(event)}
               style={{width: screenWidth, height: (screenHeight / 2)}} />
            {/* <View>
               <View><Text>Coupon goes here</Text></View>
            </View> */}
         </View>
      );
   }
}
