import React from 'react';

import { StatusBar, View, Share, TouchableWithoutFeedback, ToastAndroid, SafeAreaView } from 'react-native';
import { ButtonGroup, Icon, ListItem, Text, Button, Image } from 'react-native-elements';
import { Container, Title, Loader, Heading } from '../components/UI';
import {baseURL, screenHeight, screenWidth} from "../config";

export default class CardPaymentComponent extends React.Component {
   render( ) {
      return (
         <React.Fragment>
            <Container>
               <Text>Card payment</Text>
            </Container>
         </React.Fragment>
      )
   }
}
