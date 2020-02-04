import React from 'react';
import { Linking, AsyncStorage, KeyboardAvoidingView, ToastAndroid, } from 'react-native';
import { Button, Input, Text} from 'react-native-elements';
import { Formik } from 'formik';
import style, { buttons } from '../style';
import {baseURL, http} from '../config';
import * as Yup from 'yup';
import {_storeData, _retrieveData, session} from "../helpers";
import {ALink} from "./UI";
import { setAuthUser } from '../store/actions';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import { loginAsync } from '../services/authService';


const formSchema = Yup.object().shape({
   username: Yup.string()
     .min(2, 'Too Short!')
     .max(100, 'Too Long!')
     .required('Required'),
   password: Yup.string()
     .min(6, 'Invalid password')
     .max(30, 'Too long!')
     .required('Required'),
});
const defaultValues = {
   username: '',
   password: ''
}
const passwordRecoveryPageURL = baseURL+'/my-account-2/lost-password/'

const SigninForm = React.memo(props => {

   const onFormSubmit = async (values, action) => {
      action.setSubmitting(true)
      try {
         const userData = await loginAsync(values.username, values.password)
         props.login(userData)
         action.setStatus({success: true})
         action.setSubmitting(false)
         ToastAndroid.show(`Welcome ${userData.name}`, ToastAndroid.LONG)
         props.navigation.navigate('App')
      } catch (error) {
         console.log(error)
         action.setErrors({error})
         action.setSubmitting(false)
         alert(error.msg || error.message)
      }
   }
   return (
      <Formik
         initialValues={defaultValues} onSubmit={onFormSubmit} validationSchema={formSchema}>
         {({ handleSubmit, isSubmitting, values, errors, handleChange }) => {
            return (
               <KeyboardAvoidingView behavior="padding">
                  <Input
                     label="Username"
                     placeholder="eg. json95"
                     autoCapitalize="none"
                     onChangeText={handleChange('username')}
                     errorMessage={errors.username ? errors.username: null}
                     value={values.username} />
                  <Input
                     label="Password"
                     placeholder="******"
                     onChangeText={handleChange('password')}
                     secureTextEntry={true}
                     errorMessage={errors.password ? errors.password: null}
                     value={values.password} />
                  <ALink style={{marginBottom: 15,}}
                           onPress={() => Linking.openURL(passwordRecoveryPageURL)}>
                     Forgot Password ?
                  </ALink>
                  <Button buttonStyle={buttons.primary}
                           onPress={handleSubmit}
                           loading={isSubmitting}
                           style={{ marginTop: 15, marginBottom: 5, }} title="Sign In" />
               </KeyboardAvoidingView>
            )
         }}
      </Formik>
   )
})
const mapStateToProps = ({ user }) => ({
   user
})

const mapActionsToProps = (dispatch) => ({
   login: (values) => dispatch(setAuthUser(values)),
})
export default connect(
   mapStateToProps,
   mapActionsToProps
)(withNavigation(SigninForm))
