import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, ToastAndroid, StatusBar } from 'react-native';
import { Input, Text, Button } from 'react-native-elements';
import { Container, Title, Loader } from '../components/UI';
import VerifyOTPForm from '../components/VerifyOTPForm';
import PhoneVerificationForm from '../components/PhoneVerificationForm';
import navigationService from '../navigationService';
import { http } from "../config";
import { session } from '../helpers';
import { Formik } from 'formik';
import * as Yup from 'yup';
import eventBus from '../eventBus';
import { buttons } from '../style';
import { connect } from 'react-redux';

const phoneSchema = Yup.object().shape({
   phone: Yup.string()
      .min(10, 'Too Short!')
      .max(10, 'Mobile number must be 10 digits')
      .required('Required'),
});
const otpSchema = Yup.object().shape({
   otp: Yup.string()
      .min(4, 'Too Short!')
      .max(6, 'Too long')
      .required('Required'),
});
const sendOTPAsync = (phone) => {
   return new Promise(async (resolve, reject) => {
      try {
         const { data } = await http.post('/wp-json/app/send_otp', {
            phone,
         })
         if (data && data.ok) {
            resolve(true)
         }
      } catch (error) {
         reject(error)
      }
   })
}
const verifyOTPAsync = (phone, otp) => {
   return new Promise(async (resolve, reject) => {
      try {
         const { data } = await http.post('/wp-json/app/send_otp', {
            phone, otp
         })
         if (data && data.ok) {
            resolve(true)
         }
      } catch (error) {
         reject(error)
      }
   })
}
let defaultValues = {
   phone: '',
   otp: '',

}
function PhoneVerification({ user }) {

   onPhoneSubmit = (values, { setSubmitting }) => {
      setSubmitting(true)
      try {
         const { user, phone } = values
         const formData = new FormData
         formData.append('phone', phone)
         formData.append('uid', user.id)
         const { data } = await http.post('/wp-json/app/add_phone', formData)
         setSubmitting(false)
         if (data && data.ok) {
            ToastAndroid.show(data.msg, ToastAndroid.LONG)
         } else {
            alert(JSON.stringify(data))
            // ToastAndroid.show(data.msg, ToastAndroid.LONG)
         }
      } catch (error) {
         // alert(JSON.stringify(error))
         setSubmitting(false)
      }
   }

   onSkip = () => {
      props.navigation.navigate('Home')
   }
   if(!otpSent) {
      return (
         <Formik initialValues={defaultValues}
         onSubmit={onPhoneSubmit}
            validationSchema={phoneSchema}
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
                  <Button buttonStyle={buttons.primary} onPress={props.handleSubmit} loading={props.isSubmitting} style={{ marginTop: 15, marginBottom: 5, }} title="Send OTP" />

               </KeyboardAvoidingView>
            )}
         </Formik>
      );
   }
   return (
      <Container style={{ paddingTop: 30, }}>
         {!otpSent ? (
            this.renderPhoneForm()
         ) : (
               <React.Fragment>
                  <VerifyOTPForm phone={this.state.phone} />
                  <Button title="Resend" type="clear" onPress={this.resendOTP} />
               </React.Fragment>
            )}
         <Button title="Skip" type="clear" onPress={this.onSkip} />
      </Container>
   );
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
const mapStateToProps = ({ user }) => ({
   user
})
export default connect(
   mapStateToProps
)(PhoneVerification)
