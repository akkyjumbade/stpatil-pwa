import React from 'react';
import { Linking, AsyncStorage, KeyboardAvoidingView, StyleSheet, ToastAndroid, } from 'react-native';
import { Button, Input, Text} from 'react-native-elements';
import { Formik } from 'formik';
import style, { buttons } from '../style';
import {baseURL, http} from '../config';
import * as Yup from 'yup';
import { Grid, Col, } from "react-native-easy-grid";
import {AppContext} from "../AppContext";
import {_storeData, _retrieveData} from "../helpers";
import {ALink} from "./UI";
import { saveBeneficiaryAsync, verifyBeneficiaryAsync } from '../services/MoneyTransfer';
import context from '../store/context';

const formSchema = Yup.object().shape({
   phone: Yup.string().length(10).required(),
   amount: Yup.number().positive().min(10).lessThan(5001, `You can't send more than 5k at once`).required(),
   name: Yup.string().required(),
   surname: Yup.string().required(),
   account: Yup.string().required().min(9).max(18),
   ifsc: Yup.string().required(),
});

export default class MoneyTransferComponent extends React.Component {
   static contextType = AppContext
   constructor(props) {
      super(props);
      this.state = {
         phone: '9930207580',
         amount: '',
         name: 'Akshay',
         surname: 'Jumbade',
         account: '919930207580',
         ifsc: 'PYTM0123456',
      }
   }

   async onSubmit(values, action) {
      const user = context.user
      const formdata = {
         ...values,
         sender_id: user.id,
      }
      action.setSubmitting(true)
      try {
         const beneficiary = await saveBeneficiaryAsync(formdata)
         console.log({beneficiary})
         action.setStatus({success: true})
         action.setSubmitting(false)
         alert(JSON.stringify({beneficiary, verified, otp}))
      } catch (error) {
         action.setSubmitting(false)
         if(error.message) {
            ToastAndroid.show(error.message, ToastAndroid.LONG)
         }
         if(error.errors) {
            action.setErrors({...error.errors})
         } else {
            action.setErrors({error})
         }
         alert(JSON.stringify({error}))
      }
   }
   render() {
      return (
         <Formik
            {...this.props}
            initialValues={{
               ...this.state,
               ...this.props,
            }} onSubmit={this.onSubmit} validationSchema={formSchema}>
            {props => {
               console.log({
                  prop: props.values.senderId
               })
               return (
                  <KeyboardAvoidingView behavior="padding">
                     <Grid>
                        <Col style={{paddingRight: 6, }}>
                           <Input
                              label="Recipient name"
                              onChangeText={props.handleChange('name')}
                              errorMessage={props.errors.name ? props.errors.name: null}
                              value={props.values.name} />
                        </Col>
                        <Col>
                           <Input
                              label="surname"
                              onChangeText={props.handleChange('surname')}
                              errorMessage={props.errors.surname ? props.errors.surname: null}
                              value={props.values.surname} />
                        </Col>
                     </Grid>
                     <Input
                        style={{visibility: 'hidden', opacity: 0, height: 0, width: 0, }}
                        value={props.values.senderId} />
                     <Input
                        label="Mobile Number"
                        leftIcon={<Text style={{...styles.inputPrefix}}>+91</Text>}
                        placeholder="0000000000"
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        onChangeText={props.handleChange('phone')}
                        errorMessage={props.errors.phone ? props.errors.phone: null}
                        value={props.values.phone} />
                     <Input
                        label="Account no."
                        autoCapitalize="none"
                        keyboardType="number-pad"
                        onChangeText={props.handleChange('account')}
                        errorMessage={props.errors.account ? props.errors.account: null}
                        value={props.values.account} />
                     <Input
                        label="IFSC"
                        autoCapitalize="none"
                        onChangeText={props.handleChange('ifsc')}
                        errorMessage={props.errors.ifsc ? props.errors.ifsc: null}
                        value={props.values.ifsc} />
                     <Input
                        label="Amount"
                        placeholder=""
                        onChangeText={props.handleChange('amount')}
                        secureTextEntry={true}
                        keyboardType="number-pad"
                        errorMessage={props.errors.amount ? props.errors.amount: null}
                        value={props.values.amount} />

                     <Button buttonStyle={buttons.primary}
                             onPress={props.handleSubmit}
                             loading={props.isSubmitting}
                             style={{ marginTop: 15, marginBottom: 5, }} title="Proceed to Send Money" />
                  </KeyboardAvoidingView>
               )
            }}
         </Formik>
      );
   }
}
const styles = StyleSheet.create({
   inputPrefix: {
      fontFamily: 'Karla-Regular',
      fontSize: 18,
      marginBottom: 0,
      paddingRight: 6,
      marginTop: 0,
   }
})
