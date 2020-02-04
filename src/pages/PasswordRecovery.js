import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Container } from '../components/UI';
import { Text, Button } from 'react-native-elements';
import PasswordResetForm from '../components/PasswordResetForm';

export default class PasswordRecovery extends React.Component {
   constructor(props) {
      super(props);
   }
   static navigationOptions = {
      headerTitle: 'Password Lost?',
      headerStyle: {
         shadowOpacity: 0,
         elevation: 0,
      },
   }
   state = {
      name: '',
      phoneNumber: '',
      password: '',
      snack: false,
   };
   render() {
      return (
         <Container>
            <KeyboardAvoidingView behavior='padding'>
               <PasswordResetForm />
               <Button onPress={() => this.props.navigation.navigate('SignIn')} title="Sign In" type="clear" />
            </KeyboardAvoidingView>
         </Container>
      );
   }
}
