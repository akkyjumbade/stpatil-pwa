import React from 'react';
import { View, KeyboardAvoidingView, Linking, ToastAndroid } from 'react-native';
import { Button, Input, Text} from 'react-native-elements';
import { Formik, } from 'formik';
import style, { buttons } from '../style';
import { http, baseURL } from '../config';
import { ALink } from '../components/UI';
import * as Yup from 'yup';
import { _storeData, session } from '../helpers';
import { connect } from 'react-redux';
import { setAuthUser } from '../store/actions';

const validationSchema = Yup.object().shape({
   name: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   email: Yup.string()
     .email('Invalid email')
     .required('Required'),
   password: Yup.string()
     .min(6, 'Atleast make 6 chars long')
     .required('Required'),
});
function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min + 1) + min);
}
const SignUpForm = React.memo(props => {
   // let randomNum = getRandomInt(999999999, 9999999999)
   // const state = {
   //    name: 'Akshay Sample',
   //    email: `akshay.${randomNum}@gmail.com`,
   //    phone: `${randomNum}`,
   //    password: 'demo@123',
   // }
   const state = {
      name: '',
      email: ``,
      phone: ``,
      password: '',
   }

   const onSubmit = async (values, {setSubmitting, setErrors, setStatus}) => {
      setSubmitting(true)
      try {
         const response = await http.post('/wp-json/app/signup', values)
         
         const {data, ok} = response
         if(!data.ok) {
            ToastAndroid.show(JSON.stringify(data), ToastAndroid.LONG)
            return
         }
         const user = data.data
         let msg = `Welcome ${user.name}, your account is created successfully!`
         ToastAndroid.show(msg, ToastAndroid.LONG);
         props.register(user)
         setStatus({success: true, user})
         props.navigation.navigate('VerifyOTP', {
            phone: values.phone,
            user: {...userFromAuth}
         })         
      } catch ({response, message}) {
         setSubmitting(false)
         if(!response) {
            ToastAndroid.show('Unknown Error: '+message, ToastAndroid.LONG)
            setErrors({unknownError: 'Unknown Error'});
            return
         }
         const data = response.data
         let errors = {...data}
         if(data.error) {
            errors = {...data.error}
            for (const key in errors) {
               if (key === 'existing_user_login') {
                  errors = {
                     ...errors,
                     username: 'Username already taken',
                     email: 'E-Mail already used',
                  }
               } else {
               }
            }
         }
         if(errors.error) {
            setErrors(errors.error)
         }
         setSubmitting(false)
         ToastAndroid.show(JSON.stringify(response.data), ToastAndroid.LONG)
      } finally {
         setSubmitting(false)
      }
   }
   return (
      <Formik initialValues={{
         ...state,
      }} onSubmit={onSubmit} validationSchema={validationSchema}>
         {props => (
            <KeyboardAvoidingView behavior="padding" enabled>
               <Input
                  label="Your Name"
                  onChangeText={props.handleChange('name')}
                  errorMessage={props.errors.name ? props.errors.name: null}
                  value={props.values.name} />
               <Input
                  label="E-Mail Address"
                  placeholder="json@example.com"
                  keyboardType="email-address"
                  onChangeText={props.handleChange('email')}
                  errorMessage={props.errors.email ? props.errors.email: null}
                  value={props.values.email} />
               <Input
                  label="Password"
                  placeholder="Set your password"
                  onChangeText={props.handleChange('password')}
                  secureTextEntry={true}
                  errorMessage={props.errors.password ? props.errors.password: null}
                  value={props.values.password} />
               <View>
                  <Text style={{marginBottom: 6, }}>
                     By continuing, you agree to ST Patil' s <ALink onPress={() => Linking.openURL(baseURL+'/terms-and-conditions')}>Terms & Conditions</ALink> and <ALink onPress={() => Linking.openURL(baseURL+'/privacy-policy')}>Privacy Policy</ALink>
                  </Text>
               </View>
               <Button buttonStyle={buttons.primary} onPress={props.handleSubmit} loading={props.isSubmitting} style={{ marginTop: 15, marginBottom: 5, }} title="Sign Up" />
            </KeyboardAvoidingView>
         )}
      </Formik>
   );
})
const mapStateToProps = ({ user }) => ({
   user
})
const mapActionsToProps = dispatch => ({
   register: (values) => dispatch(setAuthUser(values))
})
export default connect(
   mapStateToProps,
   mapActionsToProps
)(SignUpForm)