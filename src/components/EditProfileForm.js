import React from 'react';
import { AsyncStorage, KeyboardAvoidingView, } from 'react-native';
import { Button, Input, Text} from 'react-native-elements';
import { Formik } from 'formik';
import style, { buttons } from '../style';
import { http } from '../config';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

const FormSchema = Yup.object().shape({
   name: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   username: Yup.string()
     .min(2, 'Too Short!')
     .max(50, 'Too Long!')
     .required('Required'),
   phone: Yup.string()
     .min(9, 'Too Short!')
     .max(10, 'Too Long!')
     .required('Required'),
   password: Yup.string()
     .min(6, 'Invalid password')
     .required('Required'),
});
const EditProfileForm = React.memo(withNavigation(props => {
   const onSubmit = async (values, action) => {
      action.setSubmitting(true)
      try {
         const { data } = await http.post('/wp-json/app/update_profile', values)
         if(data.ok) {
            props.navigation.navigate('MyAccount')
         } else {
            alert('Something went wrong :( Please try later.');
            action.setStatus({error: 'Unable to log in :('});
         }
         action.setSubmitting(false)
      } catch (error) {
         action.setErrors({error})
         action.setSubmitting(false)
      }
   }
   return (
      <React.Fragment>
         <Formik
            initialValues={props.user} onSubmit={onSubmit} validationSchema={FormSchema}>
            {({ handleChange, errors, values, isSubmitting, handleSubmit }) => {
               return (
                  <KeyboardAvoidingView behavior="padding">
                     <Input
                        label="Your Name"
                        onChangeText={handleChange('name')}
                        errorMessage={errors.name ? errors.name: null}
                        value={values.name} />
                     <Input
                        label="E-Mail"
                        onChangeText={handleChange('email')}
                        disabled={true}
                        errorMessage={errors.email ? errors.email: null}
                        value={values.email} />
                     <Input
                        label="Username"
                        onChangeText={handleChange('username')}
                        disabled={true}
                        errorMessage={errors.username ? errors.username: null}
                        value={values.username} />
                     <Input
                        label="Phone"
                        onChangeText={handleChange('phone')}
                        disabled={true}
                        errorMessage={errors.phone ? errors.phone: null}
                        value={values.phone} />
                     <Button style={buttons.primary}
                           onPress={handleSubmit}
                           loading={isSubmitting}
                           buttonStyle={buttons.primary}
                           style={{ marginTop: 15, marginBottom: 5, }} title="Update Profile" />
                  </KeyboardAvoidingView>
               )
            }}
         </Formik>
      </React.Fragment>
   )
}))
const mapStateToProps = ({ user, }) => ({
   user
})
export default connect(
   mapStateToProps
)(EditProfileForm)
