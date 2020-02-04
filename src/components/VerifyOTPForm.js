import React from 'react';
import { KeyboardAvoidingView, StyleSheet, ToastAndroid } from 'react-native';
import { Button, Input, Text} from 'react-native-elements';
import { Formik } from 'formik';
import style, { buttons } from '../style';
import { http, screenWidth } from '../config';
import * as Yup from 'yup';
import { session } from '../helpers';
import { withNavigation } from 'react-navigation';


const FormSchema = Yup.object().shape({
   otp: Yup.string()
     .min(4, 'Too Short!')
     .max(6, 'Too Long!')
     .required('Required'),
});

class VerifyOTPForm extends React.Component {
   state = {
      otp: '',
   }

   async onSubmit(values, {setSubmitting}) {
      setSubmitting(true)
      try {
         const user = session.load({key: 'loginState'})
         let formData = new FormData
         formData.append('otp', values.otp)
         formData.append('user_id', user.id)
         const response = await http.post('/wp-json/app/verify_otp', formData)
         const {data,} = response
         if(data && data.ok) {
            ToastAndroid.show(data.msg, ToastAndroid.LONG)
            this.props.navigation.navigate('Home')
         } else {
            ToastAndroid.show(data.msg, ToastAndroid.LONG)
            this.props.navigation.navigate('Home')
            // alert(data.msg)
         }
         setSubmitting(false)
      } catch ({message}) {
         ToastAndroid.show(message, ToastAndroid.LONG)
         this.props.navigation.navigate('Home')
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
                     label={'Enter OTP'}
                     placeholder="******"
                     onChangeText={props.handleChange('otp')}
                     keyboardType="number-pad"
                     errorMessage={props.errors.otp ? props.errors.otp: null}
                     value={props.values.otp} />
                  <Button buttonStyle={buttons.primary} onPress={props.handleSubmit} loading={props.isSubmitting} style={{ marginTop: 15, marginBottom: 5, }} title="Verify" />

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
   }
})
export default withNavigation(VerifyOTPForm)