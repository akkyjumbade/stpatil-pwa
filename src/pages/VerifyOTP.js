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
export default class VerifyOTP extends React.Component {
   static navigationOptions = {
      header: null
   }
   state = {
      otpSent: false,
      user: null,
      phone: '',
      isVerified: false,
      ready: false,
   }
   handler = null
   async componentDidMount() {
      const user = this.props.navigation.getParam('user')
      let isVerified =  false
      if(user.phoneVerified && user.phoneVerified == 'verified') {
         eventBus.removeListener('otp_sent')
         navigationService.navigate('App')
      }
      this.setState({ user, ready: true })
      this.handler = eventBus.addListener('otp_sent', () => {
         this.setState({ otpSent: true })
      })
      // await this.resendOTP()
   }
   componentWillUnmount() {
      this.handler = null
      eventBus.removeAllListeners('otp_sent')
   }
   resendOTP = async () => {
      const {user} = this.state
      let phone = this.state.phone;
      try {
         const { data } = await http.post('/wp-json/app/send_otp', {
            uid: user.uid,
            phone: phone,
         })
         if (data && data.ok) {
            ToastAndroid.show('OTP Sent to your mobile number.', ToastAndroid.LONG)
         }
      } catch (error) {
         let errMsg = `ERROR: ` + JSON.stringify(message)
         ToastAndroid.show(errMsg, ToastAndroid.LONG)
         throw error
      }
   }
   async onPhoneSubmit(values, { setSubmitting }) {
      setSubmitting(true)
      try {
         const { user, phone } = values
         const formData = new FormData
         formData.append('phone', phone)
         formData.append('uid', user.id)
         const { data } = await http.post('/wp-json/app/add_phone', formData)
         setSubmitting(false)
         if (data && data.ok) {
            eventBus.emit('otp_sent', true)
            values.setState({ otpSent: true }, () => {
               alert('send')
            })
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

   onSkip() {
      navigationService.navigate('Home')
   }
   renderPhoneForm = () => {
      return (
         <Formik initialValues={{
            ...this.state,
            setState: this.setState,
            ...this.props.phone
         }} onSubmit={this.onPhoneSubmit}
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
   render() {
      const { otpSent, ready } = this.state
      if (!ready) {
         return (
            <Loader />
         )
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
