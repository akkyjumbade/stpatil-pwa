import React from 'react';
import {
   ActivityIndicator,
   AsyncStorage,
   StatusBar,
   Text,
} from 'react-native';
import { Container, } from '../components/UI'

export default class AskPermissions extends React.Component {
   constructor(props) {
      super(props)
      this.checkAuth()
   }
   async checkAuth() {
      const token = await AsyncStorage.getItem('userToken')
      if(!token) {
         return this.props.navigation.navigate('SignIn')
      }
      // validate token and loggedin
      console.log(token)
   }
   render() {
      return (
         <Container>
            <ActivityIndicator />
            <Text>Loading...</Text>
            <StatusBar barStyle="default" />
         </Container>
      );
   }
}
