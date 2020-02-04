import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { Container, Title } from '../components/UI';
import VerifyOTPForm from '../components/VerifyOTPForm';

export default class ServiceAction extends React.Component {
   static navigationOptions = ({navigation}) => {
      let title = navigation.get('title')
      return {
        headerTitle: <Title>{title}</Title>,
        headerStyle: {
           shadowOpacity: 0,
           elevation: 0,
        },
      }
   }
   render() {
       let action = this.props.navigation.getParam('action')
      return (
         <Container>
            <Text>{action}</Text>
         </Container>
      );
   }
}
