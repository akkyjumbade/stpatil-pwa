import React from 'react';
import { StyleSheet, Text, Button, View, KeyboardAvoidingView } from 'react-native';
import { Container, Title } from '../components/UI';
import EditProfileForm from '../components/EditProfileForm'
import { Avatar, List, ListItem  } from 'react-native-elements';
import {AppContext} from "../AppContext";

export default class EditProfile extends React.Component {
   static contextType = AppContext;
   constructor(props) {
      super(props);
   }
   static navigationOptions = {
      headerTitle: <Title>Update Profile</Title>,
      // headerTransparent: true,
      headerStyle: {
         shadowOpacity: 0,
         elevation: 0,
      },
   }
   state = {
      view: null
   }
   editProfile() {

   }
   render() {
      let user = this.context.auth_user
      return (
         <Container style={{paddingTop: 0, justifyContent: 'flex-start' }}>
            <EditProfileForm user={user} />
         </Container>
      );
   }
}
