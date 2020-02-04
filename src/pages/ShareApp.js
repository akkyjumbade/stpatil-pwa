import React from 'react';
import { StatusBar, View, Share, TouchableWithoutFeedback, AsyncStorage } from 'react-native';
import { Text, Button, Image } from 'react-native-elements';
import { Container, Title } from '../components/UI';
import { baseURL, screenHeight, screenWidth } from "../config";
import navigationService from "../navigationService";
import Constants from "expo-constants";
import { AppContext } from "../AppContext";
import { session } from '../helpers';

export default class ShareApp extends React.Component {
   static contextType = AppContext
   static navigationOptions = {
      headerTitle: <Title>Refer & Earn</Title>,
   }
   state = {
      user: null,
      shareCode: null,
   }
   // generateCode(user) {
   //    return new Promise(async (resolve, reject) => {
   //       try {

   //       } catch (error) {

   //       }
   //    })
   // }
   async componentDidMount() {
      const user = await session.load({ key: 'loginState' })
      if (!user) {
         navigationService.navigate('Auth')
      } else {
         this.setState({ user })
      }
   }

   onShare = async () => {
      try {
         let urlToShare = baseURL
         let username = this.state.user.username
         let code = this.state.shareCode

         urlToShare = `${baseURL}/?wwref=${username}`

         const content = {
            title: 'ST Patil - Online Shopping, Recharge & Bill Payments',
            message: `Shop, Share, *Refer & Earn guaranteed rewards* on
            ${urlToShare}
            `,
         }
         const result = await Share.share(content);

         if (result.action === Share.sharedAction) {
            if (result.activityType) {
               // shared with activity type of result.activityType
            } else {
               // shared
            }
         } else if (result.action === Share.dismissedAction) {
            // dismissed
         }
      } catch (error) {
         alert(error.message);
      }
   }
   render() {
      return (
         <View style={{ alignItems: 'flex-start', padding: 0, margin: 0, backgroundColor: '#ec9fc3' }}>
            <TouchableWithoutFeedback style={{ padding: 0 }} onPress={() => this.onShare()}>
               <Image
                  style={{ width: screenWidth, height: (screenHeight - (Constants.statusBarHeight + 0)), }}
                  resizeMode="contain"
                  source={require('../../assets/images/share_and_earn.jpg')} />
            </TouchableWithoutFeedback>
         </View>
      );
   }
}
