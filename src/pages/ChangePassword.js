import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { Container, Title, InlineList } from '../components/UI';
import style from '../style'
import { Text, Image, Button } from 'react-native-elements';
import ChangePasswordForm from '../components/ChangePasswordForm';

export default class ChangePassword extends React.Component {
   state = {
      name: '',
      phoneNumber: '',
      password: '',
      snack: false,
   }
   static navigationOptions = {
      headerTitle: <Title>Change your password</Title>,
      headerStyle: {
         shadowOpacity: 0,
         elevation: 0,
      },
   }
   render() {
      return (
         <Container>
            <KeyboardAvoidingView behavior="height">
               <ChangePasswordForm />
               <Button onPress={() => this.props.navigation.navigate('Home')} title="Cancel" type="clear" />
            </KeyboardAvoidingView>
         </Container>
      );
   }
}
