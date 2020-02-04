import React, { useEffect } from 'react';
import { View, Linking, CheckBox, KeyboardAvoidingView, Picker, ToastAndroid, Alert, } from 'react-native';
import { Button, Input, Text, } from 'react-native-elements';
import { Formik } from 'formik';
import style, { buttons } from '../style';
import {baseURL, http} from '../config';
import * as Yup from 'yup';

import { session} from "../helpers";
import {ALink, Container, Loader, Title} from "./UI";
import { createOrder } from '../functions/orders';
import { connect } from 'react-redux'
import { filter } from 'lodash'
import { RESET_SELECTED_PLAN } from '../store/reducers/operatorsReducers';
import { fetchBillAsync } from '../services/ElectricityPaymentService';
import { withNavigation } from 'react-navigation';

const formSchema = Yup.object().shape({
   consumer_id: Yup.string().required('Required'),
   operator_id: Yup.string().required('Required'),
   // amount: Yup.string()
   //   .min(1, 'Invalid amount')
   //   .max(3, 'Too long!')
   //   .required('Required'),
});

let defaultValues = {
   phone: '',
   operator_id: '',
   consumer_id: '',
   optional_1: '',
   amount: '',
}

function ElectricityBillPaymentForm(props) {
   const onPaymentClicked = (values, bill) => {
      const formdata = {
         ...values,
         service: 'electricity',
         amount: bill.due_amount,
         provider_id: values.operator_id,
         customer_id: values.consumer_id,
      }
      createOrder(formdata).then(order => {
         props.navigation.navigate('MakePayment', { order, title: 'Electricity bill payment' })
      }).catch(error => {
         alert(error.message)
      })
   }
   const onSubmit = async (values, action) => {
      action.setSubmitting(true)
      const user = await session.load({key: 'loginState'})
      values = {
         ...values,
         action: 'ELECTRICITY',
         service: 'electricity',
         amount: values.amount,
         operator_id: values.operator_id,
         user_id: user.id,
         customer_id: values.phone,
         username: user.username,
         use_from_wallet: false,
      }
      fetchBillAsync(values).then(bill => {
         // we have bill here
         let promptContent = `Customer name: ${bill.customer_name}\n
         Bill date: ${bill.bill_date}\n
         Due date: ${bill.due_date}\n
         Due amount: ${bill.due_amount}\n`;

         Alert.alert('Bill details', promptContent, [
            {  text: 'Pay Now', onPress: () => onPaymentClicked(values, bill) },
         ])
         // alert(JSON.stringify(bill))
      }).catch(error => {
         alert(error.message)
      }).finally(() => {
         action.setSubmitting(false)
      })
   }
   useEffect(() => {
      if(props.selectedPlan) {
         defaultValues = {...defaultValues, amount: props.selectedPlan.Amount}
      }
   }, [props.selectedPlan])

   return (
      <Formik
         enableReinitialize
         initialValues={defaultValues} onSubmit={onSubmit} validationSchema={formSchema} >
         {({ handleChange, setFieldValue, handleSubmit, isSubmitting, errors, values, touched}) => {
            let amountValue = values.amount
            return (
               <KeyboardAvoidingView behavior="padding">
                  <Text>Operator</Text>
                  <Picker
                     selectedValue={values.operator_id}
                     onValueChange={val => {
                        defaultValues = {...defaultValues, operator_id: val};
                        setFieldValue('operator_id', val)
                     }}>
                     {props.operators && props.operators.map((item, itemKey) => {
                        return (
                           <Picker.Item
                              key={itemKey}
                              label={item.operator_name}
                              value={item.operator_id} />
                        )
                     })}
                  </Picker>
                  <Input
                     label="Consumer ID"
                     placeholder="Enter Consumer ID here"
                     autoCapitalize="none"
                     onChangeText={val => {
                        defaultValues = {...defaultValues, consumer_id: val};
                        setFieldValue('consumer_id', val);
                     }}
                     errorMessage={touched.consumer_id && errors.consumer_id ? errors.consumer_id: null}
                     value={values.consumer_id} />
                  <Input
                     label="Billing Unit"
                     placeholder="Enter billing unit here"
                     autoCapitalize="none"
                     onChangeText={val => {
                        defaultValues = {...defaultValues, optional_1: val};
                        setFieldValue('optional_1', val);
                     }}
                     errorMessage={touched.optional_1 && errors.optional_1 ? errors.optional_1: null}
                     value={values.optional_1} />
                  {props.selectedPlan ? (
                     <View>
                        <Text>{props.selectedPlan.Description}</Text>
                        {/* <Text>{JSON.stringify(props.selectedPlan)}</Text> */}
                     </View>
                  ): (null)}
                  {props.wallet && (
                     <View >
                        <Text h3>{JSON.stringify(wallet)}</Text>
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'base', }}>
                           <CheckBox value={values.use_from_wallet} onValueChange={val => setFieldValue('use_from_wallet', val)} />
                           <Text style={{marginLeft: 5}}>Use from wallet</Text>
                        </View>
                     </View>
                  )}
                  <Button buttonStyle={buttons.primary}
                        onPress={handleSubmit}
                        loading={isSubmitting}
                        style={{ marginTop: 15, marginBottom: 5, }} title="Procced to pay" />

               </KeyboardAvoidingView>
            )
         }}
      </Formik>
   );
}

const mapStateToProps = ({operators, user}) => ({
   operators: filter(operators.all, { service_type: 'ELC', status: "1" }),
   selectedPlan: operators.selected,
   user,
})
const mapActionsToProps = (dispatch) => ({
   resetSelectedPlan: () => dispatch({ type: RESET_SELECTED_PLAN }),
})

export default connect(
   mapStateToProps,
   mapActionsToProps
)(withNavigation(ElectricityBillPaymentForm))
