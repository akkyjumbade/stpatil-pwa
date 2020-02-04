import React from 'react';
import { KeyboardAvoidingView, StyleSheet, ToastAndroid } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { Formik } from 'formik';
import style from '../style';
import { http } from '../config';
import * as Yup from 'yup';


const FormSchema = Yup.object().shape({
   phone: Yup.string()
      .min(10, 'Too Short!')
      .max(10, 'Mobile number must be 10 digits')
      .required('Required'),
});

export default class PhoneVerificationForm extends React.Component {
   state = {
      phone: '',
   }
   componentDidCatch() {
      this.setState({
         phone: this.props.phone,
      })
   }
   async onSubmit(values, { setSubmitting }) {
      setSubmitting(true)
      try {
         const { data } = await http.post('/add_phone', values)
         ToastAndroid.show(JSON.stringify(data), ToastAndroid.LONG)
         setSubmitting(false)
         if (data && data.ok) {
            ToastAndroid.show(data.msg, ToastAndroid.LONG)
         } else {
            ToastAndroid.show(data.msg, ToastAndroid.LONG)
         }
      } catch (error) {
         ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG)
         setSubmitting(false)
      }
   }
   render() {
      return (
         <Formik initialValues={{
            ...this.state,
            ...this.props.phone
         }} onSubmit={this.onSubmit}
            validationSchema={FormSchema}
            style={styles.form}
         >
            {props => (
               <KeyboardAvoidingView behavior="padding">
                  <Input
                     label={'Enter Mobile Number'}
                     leftIcon={{ type: 'font-awesome', name: 'phone' }}
                     placeholder="10 Digits mobile number"
                     onChangeText={props.handleChange('phone')}
                     keyboardType="number-pad"
                     inputStyle={styles.inputStyle}
                     errorMessage={props.errors.phone ? props.errors.phone : null}
                     value={props.values.phone} />
                  <Button onPress={props.handleSubmit} loading={props.isSubmitting} style={{ marginTop: 15, marginBottom: 5, }} title="Send OTP" />

               </KeyboardAvoidingView>
            )}
         </Formik>
      );
   }
}
const styles = StyleSheet.create({
   form: {
      justifyContent: 'center',
      flex: 1,
      marginTop: 15,
      marginBottom: 15,
   },
   inputStyle: {
      paddingLeft: 10,
   }
})
