import React from 'react';
import { StatusBar, View, Share, TouchableWithoutFeedback, ToastAndroid, SafeAreaView, KeyboardAvoidingView } from 'react-native';
import { ButtonGroup, Icon, ListItem, Text, Button, Image, Input } from 'react-native-elements';
import { Container, Title, Loader, Heading } from '../components/UI';
import {baseURL, screenHeight, screenWidth, http} from "../config";
import { Formik } from 'formik';
import { buttons } from '../style';
import { session } from '../helpers';
import { withNavigation } from 'react-navigation';

// IMPORANT: Use docs https://razorpay.com/docs/payment-gateway/web-integration/hosted/

class UPIPaymentComponent extends React.Component {
   state = {
      paymentData: null,
      openPayment: false,
      isSubmitting: false,
   }
   async onSubmit(values, actions) {
      alert('submitting...')
      actions.setSubmitting(true)
      const order = values.order_id
      const user = await session.load({key: 'loginState'})
      try {
         // ask for payment from gateway
         let paymentData = {
            order_id: order,
         }
         this.props.navigation.navigate('Payment', {
            order,
            user,
            paymentData,
         })
         this.setState({paymentData, openPayment: true})
         // send payment response to server for further process
         // const {data} = await http.post('/wp-json/')
      } catch (error) {
         alert(JSON.stringify(error))
      }
      actions.setSubmitting(false)

   }
   render( ) {
      const {vpa, isSubmitting} = this.state
      return (
         <Formik {...this.props} {...this.state} initialValues={{...this.state}} onSubmit={this.onSubmit}>
            {props => (
               <React.Fragment>
                  <Heading>UPI</Heading>
                  <Text>{JSON.stringify(props)}</Text>
                  <KeyboardAvoidingView behavior="padding">
                     <Input
                        label="VPA Address"
                        placeholder="myaddress123@bank"
                        autoCapitalize="none"
                        onChangeText={props.handleChange('vpa')}
                        value={props.values.vpa} />
                     <Button loading={props.isSubmitting} buttonStyle={buttons.primary} onPress={props.handleSubmit} title={'Pay Now'} />
                  </KeyboardAvoidingView>
               </React.Fragment>
            )}
         </Formik>
      )
   }
}
export default withNavigation(UPIPaymentComponent)