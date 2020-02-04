import React from 'react';
import {ScrollView, ActivityIndicator, View, Dimensions, ToastAndroid, ViewPagerAndroid} from 'react-native';
import {Text, Image, ListItem, Button} from 'react-native-elements';
import { Container, Heading, Title, Loader } from '../components/UI';
import { http, RAZORYPAY_KEY, baseURL, StoreAPI } from '../config';
import Spinner from 'react-native-loading-spinner-overlay'
import { session, price, openLink } from '../helpers';
import wallet from '../functions/wallet';
import WebView from 'react-native-webview';
import { AddressItem } from './MyAddress';
import { connect } from 'react-redux';
import { Grid } from 'react-native-easy-grid';
import { CartItem } from './Cart'
import { colors } from '../theme';
import _ from 'lodash'
// import RazorpayCheckout from 'react-native-razorpay';
import RazorpayCheckout from "react-native-razorpay-expokit";
// import Paypal from 'rn-expo-paypal-integration'
import RNPaypal from 'react-native-paypal-lib';

import { createOrder } from '../functions/orders';

const paymentRequestAsync = async ({ user, payment, cart }) => {
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
      items: cart.items
   }
   console.log({
      paymentData
   })
   try {
      await RNPaypal.paymentRequest({
         clientId: 'AcAKmvU4rjpHnkozdkQ2naCSbN-pP2s2W8qwA-fP2AaQ7LebgJB3RGYe-X7xTZkFiuugUip2JM_utTcz',
         environment: RNPaypal.ENVIRONMENT.NO_NETWORK,
         intent: RNPaypal.INTENT.SALE,
         price: 60,
         currency: 'USD',
         description: `Android testing`,
         acceptCreditCards: true
      })

      let orderItems = cart.items.map(i => {
         return {
            product_id: i.id,
            quantity: i.qty || 1
         }
      })
      const order = await StoreAPI.post('orders', {
         payment_method: 'bacs',
         payment_method_title: '',
         set_paid: false,
         billing: user.billing,
         shipping: user.billing,
         line_items: orderItems,
         // shipping_lines: [
         //    {
         //       method_id: "flat_rate",
         //       method_title: "Flat Rate",
         //       total: 10
         //    }
         // ]
      })
      console.log({ order })
      if(order && order.order_key) {
         openLink(baseURL+'/wp-json/app/store_order?order='+order.order_key)
      }
   } catch (error) {
      alert(JSON.stringify(error))
      console.log({ order_error: error })
   }
   // createOrder(paymentData).then(order => {
   //    openLink(baseURL+'/wp-json/app/store_order?order='+order)
   // }).catch(error => {
   //    alert(JSON.stringify(error))
   // })
   //
   // RazorpayCheckout.
   // RazorpayCheckout.open(paymentData).then(data => {
   //    console.log({data})
   //    Promise.resolve(data)
   // }).catch(error => {
   //    Promise.reject(error)
   //    console.log({error})
   // })
}
const Section = props => {
   return (
      <View style={{ paddingBottom: 10, marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#eee' }}>
         {props.title ? (
            <Text style={{ paddingHorizontal: 15, color: '#000', textTransform: 'uppercase', marginBottom: 5, }}>{props.title}</Text>
         ): null}
         {props.children}
      </View>
   )
}

const Checkout = React.memo(props => {
   const { user, wallet, cart } = props
   const [subtotal, setSubtotal] = React.useState(0)
   const [tax, setTax] = React.useState(0)
   const [total, setTotal] = React.useState(0)
   const [ready, setReady] = React.useState(false)
   const [paymentClicked, setPaymentClicked] = React.useState(false)


   const onPaymentClicked = () => {
      const values = {
         user,
         cart,
         payment: {

         }
      }
      // AcAKmvU4rjpHnkozdkQ2naCSbN-pP2s2W8qwA-fP2AaQ7LebgJB3RGYe-X7xTZkFiuugUip2JM_utTcz

      paymentRequestAsync(values).then(order => {
         // alert(JSON.stringify(order))
      }).catch(error => {
         // alert(JSON.stringify(error))
      })
      setPaymentClicked(true)
   }
   const onPaymentSuccess = data => {
      console.log({ data })
   }
   const onPaymentError = error => {
      console.log({ error })
   }


   React.useEffect(() => {
      setReady(true)
      setTotal(_.sumBy(cart.items, 'price'))
   }, [])
   if(!ready) {
      return <Loader />
   }
   return (
      <React.Fragment>
         <ScrollView>
            <Section title={'Products'}>
               {cart.items && cart.items.map((i, ik) => (
                  <CartItem product={i} key={ik} />
               ))}
            </Section>
            <Section title={'Delivery address'}>
               <View style={{ paddingHorizontal: 15, }}>
                  <AddressItem style={{ paddingHorizontal: 10, }} actions={false} address={user.billing} />
               </View>
            </Section>
            <View style={{ paddingHorizontal: 15, flexDirection: 'row', justifyContent: 'space-between' }}>
               <Text style={{ fontFamily: 'Karla-Bold', fontSize: 20, }}>Final amount</Text>
               <Text style={{ fontFamily: 'Karla-Bold', fontSize: 20, }}>{price(total)}</Text>
            </View>
            <View style={{ paddingHorizontal: 15, }}>
               <Button title={'Pay Now'} onPress={onPaymentClicked} />
            </View>
            {/* {paymentClicked ? (
               <Paypal amount={20} orderID={'stp'+12313} ProductionClientID={'AcAKmvU4rjpHnkozdkQ2naCSbN-pP2s2W8qwA-fP2AaQ7LebgJB3RGYe-X7xTZkFiuugUip2JM_utTcz'} success={onPaymentSuccess} error={onPaymentError} />
            ): null } */}
         </ScrollView>
      </React.Fragment>
   )
})
Checkout.navigationOptions = {
   headerTitle: <Title>Checkout</Title>,
}
const mapStateToProps = ({ user, wallet, cart }) => ({
   user, wallet, cart
})
export default connect(mapStateToProps)(Checkout)
