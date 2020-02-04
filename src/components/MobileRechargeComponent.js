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
import { withNavigation } from 'react-navigation';

const formSchema = Yup.object().shape({
   phone: Yup.string().length(10, '10 Digits mobile number').required('Required'),
   provider_id: Yup.string().required('Required'),
   // amount: Yup.string().min(1, 'Invalid amount').max(3, 'Too long!').required('Required'),
});

let defaultValues = {
   phone: '',
   provider_id: '',
   amount: '',
}

const MobileRechargeComponent = React.memo(props => {
   const onSubmit = async (values, action) => {
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
         //alert(JSON.stringify(order))
         // process order
         action.setSubmitting(false)
         props.navigation.navigate('MakePayment', {
            order,
            user,
            amount: values.amount,
            service: 'mobile',
            submitLabel: 'Recharge'
         })
         action.resetForm({})
      }).catch(er => {
         // debugger
         action.setSubmitting(false)
         alert(JSON.stringify({er}))
      })
   }

   if(props.selectedPlan) {
      defaultValues = {...defaultValues, amount: props.selectedPlan.Amount}
   }

   return (
      <Formik
         enableReinitialize={true}
         initialValues={defaultValues} onSubmit={onSubmit} validationSchema={formSchema} >
         {({ handleChange, setFieldValue, handleSubmit, isSubmitting, errors, values, touched, }) => {

            let amountValue = props.selectedPlan ? props.selectedPlan.amount : values.amount

            if(props.selectedPlan) {
               // amountValue = props.selectedPlan.amount
               // setFieldValue('amount', props.selectedPlan.Amount)
            }

            return (
               <KeyboardAvoidingView behavior="padding">
                  <Input
                     leftIcon={<Text h4 style={{paddingRight: 5}}>+91</Text>}
                     label="Mobile Number"
                     placeholder="0000000000"
                     autoCapitalize="none"
                     keyboardType="number-pad"
                     onChangeText={val => {
                        defaultValues = {...defaultValues, phone: val};
                        setFieldValue('phone', val);
                     }}
                     errorMessage={touched.phone && errors.phone ? errors.phone: null}
                     value={values.phone} />
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
                  {props.selectedPlan ? (
                     <Input
                     leftIcon={<Text h4 style={{paddingRight: 5}}>Rs.</Text>}
                     rightIcon={<Button disabled={!values.provider_id} small={true} size="small" type="clear" title='Browse plans' onPress={() => props.navigation.navigate('PlanDetails', { operator: values.provider_id, state: 'mh'})} />}
                     label="Amount"
                     placeholder=""
                     onChangeText={handleChange('amount')}
                     keyboardType="number-pad"
                     errorMessage={errors.amount ? errors.amount: null}
                     value={props.selectedPlan.Amount} />
                  ): (
                     <Input
                     leftIcon={<Text h4 style={{paddingRight: 5}}>Rs.</Text>}
                     rightIcon={<Button disabled={!values.provider_id} small={true} size="small" type="clear" title='Browse plans' onPress={() => props.navigation.navigate('PlanDetails', { operator: values.provider_id, state: 'mh'})} />}
                     label="Amount"
                     placeholder=""
                     onChangeText={handleChange('amount')}
                     keyboardType="number-pad"
                     errorMessage={errors.amount ? errors.amount: null}
                     value={amountValue} />
                  )}

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
                        style={{ marginTop: 15, marginBottom: 5, }} title="Recharge" />

               </KeyboardAvoidingView>
            )
         }}
      </Formik>
   );
})

const mapStateToProps = ({operators}) => ({
   operators: [
      { operator_name: 'Choose operator', operator_id: '' },
      ...filter(operators.all, { service_type: 'Prepaid', status: "1" })
   ],
   selectedPlan: operators.selected
})

export default connect(
   mapStateToProps
)(withNavigation(MobileRechargeComponent))
