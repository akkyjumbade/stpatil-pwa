import React from 'react';
import {ScrollView, ActivityIndicator, View, Dimensions, ToastAndroid} from 'react-native';
import {Text, Image, ListItem, Button} from 'react-native-elements';
import { Container, Heading, Title, Loader } from '../components/UI';
import { http, RAZORYPAY_KEY } from '../config';
import Spinner from 'react-native-loading-spinner-overlay'
import { session } from '../helpers';
import wallet from '../functions/wallet';
import WebView from 'react-native-webview';
import { AddressItem } from './MyAddress';
import { connect } from 'react-redux';

const paymentRequestAsync = ({ user, payment }) => {
   let paymentData = {
      ...payment,
      key_id: RAZORYPAY_KEY,
      name: user.name,
      description: 'Payments at STPatil',
      image: 'https://www.stpatil.com/wp-content/uploads/2019/07/logo-transparent@344x327-1.png',
      prefill: {
         name: user.name,
         email: user.email,
         contact: user.phone,
      },
      notes: {
         shipping_address: ''
      },
      callback_url: 'stpatil://payment.callback',
      cancel_url: 'stpatil://payment.callback',
   }
}
const Payment = React.memo(props => {
   const { user, wallet, } = props
   const [subtotal, setSubtotal] = React.useState(0)
   const [tax, setTax] = React.useState(0)
   const [total, setTotal] = React.useState(0)
   const [ready, setReady] = React.useState(false)
   if(!ready) {
      return <Loader />
   }
   React.useEffect(() => {
      setReady(true)
   }, [user])
   return (
      <React.Fragment>
         <View>
            <AddressItem address={user.billing} />
         </View>
         <View>
            <AddressItem address={user.billing} />
         </View>
      </React.Fragment>
   )
})
Payment.navigationOptions = {
   headerTitle: <Title>Payment</Title>,
}
const mapStateToProps = ({ user, wallet, }) => ({
   user, wallet,
})
export default connect(mapStateToProps)(Payment)
