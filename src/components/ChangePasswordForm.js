import React from 'react';
import { KeyboardAvoidingView, } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { Formik } from 'formik';
import style from '../style';
import { http } from '../config';
import * as Yup from 'yup';
import { session } from '../helpers';

const FormSchema = Yup.object().shape({
   old_password: Yup.string()
      .min(6, 'Too Short!')
      .max(12, 'Too Long!')
      .required('Required'),
   new_password: Yup.string()
      .min(6, 'Too Short!')
      .max(12, 'Too Long!')
      .required('Required'),
   confirm_password: Yup.string()
      .oneOf([Yup.ref('new_password'), null], 'Confirm password must be same as new password')
      .min(6, 'Too Short!')
      .max(12, 'Too Long!')
      .required('Required'),
});
export default class ChangePasswordForm extends React.Component {
   state = {
      old_password: '',
      uid: '',
      new_password: '',
      confirm_password: '',
      user: null,
      ready: false,
   }
   async componentDidMount() {
      const user = session.load({ key: 'loginState' })
      if (!user) {
         return
      }
   }
   async onSubmit(values, { setSubmitting }) {
      setSubmitting(true)
      try {
         values.uid = values.user.id
         const { data } = await http.post('/wp-json/app/reset_password', values)
         setSubmitting(false)
         if (data && data.ok) {
            alert(data.msg)
            // success change password
         } else {
            // not changed
            alert(data.msg)
            // return
         }
      } catch (error) {
         alert(error.message)
         setSubmitting(false)
      }
   }
   render() {
      return (
         <Formik initialValues={{
            ...this.state,
         }} onSubmit={this.onSubmit} validationSchema={FormSchema}>
            {props => (
               <KeyboardAvoidingView behavior="padding">
                  <Input
                     label="Current Password"
                     onChangeText={props.handleChange('old_password')}
                     secureTextEntry={true}
                     errorMessage={props.errors.old_password ? props.errors.old_password : null}
                     value={props.values.old_password} />
                  <Input
                     label="New Password"
                     onChangeText={props.handleChange('new_password')}
                     secureTextEntry={true}
                     errorMessage={props.errors.new_password ? props.errors.new_password : null}
                     value={props.values.new_password} />
                  <Input
                     label="Confirm Password"
                     onChangeText={props.handleChange('confirm_password')}
                     errorMessage={props.errors.confirm_password ? props.errors.confirm_password : null}
                     value={props.values.confirm_password} />
                  <Button onPress={props.handleSubmit}
                     loading={props.isSubmitting}
                     style={{ marginTop: 15, marginBottom: 5, }}
                     title="Change Password" />
               </KeyboardAvoidingView>
            )}
         </Formik>
      );
   }
}
