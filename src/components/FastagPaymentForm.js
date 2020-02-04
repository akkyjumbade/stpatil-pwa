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

const FastagPaymentForm = React.memo(props => {

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

      action.setSubmitting(false)
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
                  <Input
                     label="Vehicle Registeration ID"
                     placeholder=""
                     autoCapitalize="none"
                     onChangeText={val => {
                        defaultValues = {...defaultValues, consumer_id: val};
                        setFieldValue('consumer_id', val);
                     }}
                     errorMessage={touched.consumer_id && errors.consumer_id ? errors.consumer_id: null}
                     value={values.consumer_id} />
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
})

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
)(withNavigation(FastagPaymentForm))
