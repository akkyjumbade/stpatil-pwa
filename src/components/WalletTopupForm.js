import React from 'react';
import { View, Linking, CheckBox, KeyboardAvoidingView, Picker, ToastAndroid, } from 'react-native';
import { Button, Input, Text, } from 'react-native-elements';
import { Formik } from 'formik';
import style, { buttons } from '../style';
import {baseURL, http} from '../config';
import * as Yup from 'yup';
import navigationService from '../navigationService';

import { session} from "../helpers";
import {ALink, Container, Loader, Title} from "./UI";
import { createOrder } from '../functions/orders';

const formSchema = Yup.object().shape({
   amount: Yup.string()
     .min(1, 'Invalid amount')
     .max(3, 'Too long!')
     .required('Required'),
});

export default class MobileRechargeComponent extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         phone: '',
         amount: '',
         provider_id: '',
         operators: props.operators,
      }
   }
   async onSubmit(values, action) {
      action.setSubmitting(true)
      const user = await session.load({key: 'loginState'})
      values = {
         ...values,
         action: 'MOBILE_RECHARGE',
         service: 'mobile',
         amount: values.amount,
         provider_id: values.provider_id,
         user_id: user.id,
         customer_id: values.phone,
         username: user.username,
         use_from_wallet: false,
      }
      createOrder(values).then(order => {
         // process order
         action.setSubmitting(false)
         navigationService.navigate('MakePayment', {
            order,
            user,
            amount: values.amount,
            service: 'mobile',
            submitLabel: 'Recharge'
         })
      }).catch(er => {
         // debugger
         action.setSubmitting(false)
         alert(JSON.stringify({er}))
      })
   }
   openPlansModal() {
      // alert('Not implemented !')
   }
   render() {
      return (
         <Formik
            {...this.props}
            initialValues={{
               ...this.state,
               ...this.props,
               openPlansModal: this.openPlansModal,
            }} onSubmit={this.onSubmit} validationSchema={formSchema}>
            {props => {
               return (
                  <KeyboardAvoidingView behavior="padding">
                     <Input
                        leftIcon={<Text h4 style={{paddingRight: 5}}>+91</Text>}
                        label="Mobile Number"
                        placeholder="0000000000"
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        onChangeText={props.handleChange('phone')}
                        errorMessage={props.touched.phone && props.errors.phone ? props.errors.phone: null}
                        value={props.values.phone} />
                     <Input
                        leftIcon={<Text h4 style={{paddingRight: 5}}>Rs.</Text>}
                        rightIcon={<Button small={true} size="small" type="clear" title='Browse plans' onPress={props.values.openPlansModal} />}
                        label="Amount"
                        placeholder=""
                        onChangeText={props.handleChange('amount')}
                        keyboardType="number-pad"
                        errorMessage={props.touched.amount && props.errors.amount ? props.errors.amount: null}
                        value={props.values.amount} />

                     <Button buttonStyle={buttons.primary}
                             onPress={props.handleSubmit}
                             loading={props.isSubmitting}
                             style={{ marginTop: 15, marginBottom: 5, }} title="Add Money" />

                  </KeyboardAvoidingView>
               )
            }}
         </Formik>
      );
   }
}
