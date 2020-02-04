import React, { useEffect } from 'react';
import { View, Linking, CheckBox, KeyboardAvoidingView, Picker, ToastAndroid, } from 'react-native';
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
import { withNavigation } from 'react-navigation';

const formSchema = Yup.object().shape({
   consumer_id: Yup.string().required('Required'),
   provider_id: Yup.string().required('Required'),
   amount: Yup.string()
     .min(1, 'Invalid amount')
     .max(3, 'Too long!')
     .required('Required'),
});

let defaultValues = {
   phone: '',
   provider_id: '',
   consumer_id: '',
   amount: '',
}

function BroadbandComponent(props) {
   const handleFormSubmit = async (values, action) => {
      action.setSubmitting(true)
      const user = props.user
      values = {
         ...values,
         action: 'broadband',
         service: 'broadband',
         amount: values.amount,
         provider_id: values.provider_id,
         user_id: user.id,
         customer_id: values.consumer_id,
         username: user.username,
         use_from_wallet: false,
      }
      createOrder(values).then(order => {
         // process order
         action.setSubmitting(false)
         props.navigation.navigate('MakePayment', {
            order,
            user,
            amount: values.amount,
            service: 'broadband',
            submitLabel: 'Pay bill'
         })
         action.resetForm({})
      }).catch(er => {
         // debugger
         action.setSubmitting(false)
         alert(JSON.stringify({er}))
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
         initialValues={defaultValues} onSubmit={handleFormSubmit} validationSchema={formSchema} >
         {({ handleChange, setFieldValue, handleSubmit, isSubmitting, errors, values, touched}) => {
            let amountValue = values.amount
            return (
               <KeyboardAvoidingView behavior="padding">
                  <Text>Operator</Text>
                  <Picker
                     selectedValue={values.provider_id}
                     onValueChange={val => {
                        defaultValues = {...defaultValues, provider_id: val};
                        setFieldValue('provider_id', val)
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
                     leftIcon={<Text h4 style={{paddingRight: 5}}>Rs.</Text>}
                     label="Amount"
                     placeholder=""
                     onChangeText={handleChange('amount')}
                     keyboardType="number-pad"
                     errorMessage={errors.amount ? errors.amount: null}
                     value={amountValue} />
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

const mapStateToProps = ({ operators, user }) => ({
   operators: filter(operators.all, { service_type: 'Broadband', status: "1" }),
   selectedPlan: operators.selected,
   user,
})
const mapActionsToProps = (dispatch) => ({
   resetSelectedPlan: () => dispatch({ type: RESET_SELECTED_PLAN })
})

export default connect(
   mapStateToProps,
   mapActionsToProps
)(withNavigation(BroadbandComponent))
