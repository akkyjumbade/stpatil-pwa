import React, { useState, useEffect } from 'react';
import { StatusBar, View, Share, TouchableWithoutFeedback,AsyncStorage, ToastAndroid, SafeAreaView } from 'react-native';
import { Icon, ListItem, Text, Button, Image, Divider } from 'react-native-elements';
import { Container, Title, Loader, Heading } from '../components/UI';
import {baseURL, screenHeight, screenWidth} from "../config";
import { session, aspectRatio } from '../helpers';
import { buttons } from '../style';
import WebView from 'react-native-webview';
import { colors } from '../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { Grid, Col } from 'react-native-easy-grid';

export default function Transaction(props) {
   const [ready, setReady] = useState(false)
   const [order, setOrder] = useState(null)
   // const [response, setResponse] = useState(null)
   useEffect(() => {
      const order = props.navigation.getParam('response', null)
      // const response = props.navigation.getParam('response', null)
      setOrder(order)
      setReady(true)
   })
   if(!ready) {
      return (
         <Loader />
      )
   }
   let imageURL = require('../../assets/undraw_order_confirmed_1m3v.png')

   if(order && order.status == 'success') {
      imageURL = require('../../assets/undraw_order_confirmed_1m3v.png')
   } else if(order.status == 'pending') {
      imageURL = require('../../assets/undraw_cancel_u1it.png')
   } else if(order.status == 'cancel' || order.status == 'failed') {
      imageURL = require('../../assets/undraw_cancel_u1it.png')
   }
   let title = ''
   switch (order.status) {
      case 'SERVER_ERROR':
         title = 'Server error, please try later.';
         imageURL = require('../../assets/undraw_cancel_u1it.png')
         break;
      default:
         imageURL = require('../../assets/undraw_time_management_30iu.png')
         title = 'Unable to make payments right now, please try later.'
         break;
   }
   const _transaction = order.data.data || order.data
   return (
      <ScrollView>
         <Container>
            <View style={{ alignSelf: 'center' }}>
               <Image source={imageURL} style={{...aspectRatio((screenWidth / 1.5), '1:1'), alignSelf: 'center', }} />
            </View>
            <Heading>{title}</Heading>
            <Heading>ORDER # {_transaction.txn_id}</Heading>
            <Text>Status: {_transaction.status}</Text>
            <Text>{_transaction.order_note}</Text>
            {/* <Text>Status: {JSON.stringify(order)}</Text> */}
            <Divider style={{ marginVertical: 15, }} />
            <Grid>
               <Col>
                  <Button title={'Contact'} onPress={() => props.navigation.navigate('About')} />
               </Col>
            </Grid>
         </Container>
      </ScrollView>
   )
}
Transaction.navigationOptions = {
   headerTitle: <Title>Transaction</Title>
}
