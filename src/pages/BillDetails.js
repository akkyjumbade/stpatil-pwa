import React, { useState, useEffect } from 'react';
import {ScrollView, ActivityIndicator, View, Dimensions, ToastAndroid} from 'react-native';
import {Text, Image, ListItem} from 'react-native-elements';
import { Container, Heading, Title, Loader } from '../components/UI';
import { http } from '../config';
import { session } from '../helpers';

export default function BillDetails(props) {
   const [ready, setReady] = useState(false)
   const [bill, setBill] = useState(null)

   useEffect(() => {
      const billData = props.navigation.getParam('bill', null)
      setBill(billData)
      setReady(true)
   })
   if(!ready) {
      return <Loader />
   }
   return (
      <ScrollView>
         <Container style={{paddingTop: 20, margin: 0, }}>
            {bill}
         </Container>
      </ScrollView>
   )
}

BillDetails.navigationOptions = {
   headerTitle: <Title>Bill details</Title>
}
