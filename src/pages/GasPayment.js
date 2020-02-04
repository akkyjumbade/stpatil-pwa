import React from 'react';
import {ScrollView, ActivityIndicator, View, Dimensions, ToastAndroid} from 'react-native';
import {Text, Image} from 'react-native-elements';
import { Container, Heading, Title } from '../components/UI';
import { http } from '../config';
import GasPaymentComponent from '../components/GasPaymentComponent';
import Spinner from 'react-native-loading-spinner-overlay'

import { connect } from 'react-redux'
function GasPayment(props) {
   const [ready, setReady] = React.useState(false)

   React.useEffect(() => {
      setReady(true)
   })

   return (
      <ScrollView>
         <Spinner visible={!ready} />
         <Container style={{paddingTop: 20, margin: 0, }}>
            <GasPaymentComponent />
         </Container>
      </ScrollView>
   );
}

GasPayment.navigationOptions = {
   headerTitle: <Title>Gas Payment</Title>
}

export default GasPayment
