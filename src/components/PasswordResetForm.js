import React from 'react';
import { KeyboardAvoidingView, SafeAreaView } from 'react-native';
import { Button, Input, Text} from 'react-native-elements';
import { Formik } from 'formik';
import style from '../style';
import { http } from '../config';
import * as Yup from 'yup';

const FormSchema = Yup.object().shape({
   email: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
});
export default class PasswordResetForm extends React.Component {
   constructor(props) {
      super(props);
   }
   state = {
      email: '',
   }
   async onSubmit(values, actions) {
      actions.setSubmitting(true)
      try {
         const {data} = await http.post('/wp-json/app/send_password_reset', values)
         this.refs.toast.show('hello world!');
         if(data.ok) {
            alert('Password reset send ')
         }
         actions.setStatus({success: true})
         actions.setSubmitting(false)
      } catch (error) {
         actions.setErrors(error)
         actions.setSubmitting(false)
      }
   }
   render() {
      return (
         <Formik 
            {...this.props}
            initialValues={{
               ...this.state,
            }} onSubmit={this.onSubmit} validationSchema={FormSchema}>
            {props => (
               <KeyboardAvoidingView behavior="padding">
                  <Input
                     inputStyle={style.inputField}
                     placeholder="Enter your Email ID"
                     onChangeText={props.handleChange('email')}
                     keyboardType="email-address"
                     errorMessage={props.errors.email && props.errors.email}
                     value={props.values.email} />
                  <Button onPress={props.handleSubmit} 
                           loading={props.isSubmitting} 
                           style={{ marginTop: 15, marginBottom: 5, }} 
                           title="Send Recovery Mail" />
               </KeyboardAvoidingView>
            )}
            
         </Formik>
      );
   }
}
