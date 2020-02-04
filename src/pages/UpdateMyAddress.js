import React from 'react';
import {ScrollView, AsyncStorage, View, ActivityIndicator, Linking} from 'react-native';

import { Loader, Container, Heading, Title } from '../components/UI';
import { Avatar, ListItem, Button, Text, Card  } from 'react-native-elements';
import { baseURL } from '../config';
import { buttons } from '../style';
import navigationService from '../navigationService';
import AddressForm from "../components/AddressForm";
import { session } from '../helpers';

export default class UpdateMyAddress extends React.Component {
   static navigationOptions = {
      headerTitle: <Title>Update Address</Title>,
   }
   constructor(props) {
      super(props)
      this.state = {
         user: null,
         ready: false,
         addresses: null,
         address: null,
      }
   }
   async componentDidMount() {
      const user = await session.load({key: 'loginState'})
      const address = this.props.navigation.getParam('address')
      if(user) {
         this.setState({
            user,
            address,
            ready: true,
         })
      } else {
         navigationService.navigate('Auth')
      }
   }
   render() {
      const {ready, user, address} = this.state
      const {type} = this.props
      if(!ready) {
         return <Loader />
      }
      return (
         <ScrollView>
            <Container style={{paddingTop: 15, }}>
               <AddressForm values={{...address, }} type={type} user={user} />
            </Container>
         </ScrollView>
      );
   }
}
