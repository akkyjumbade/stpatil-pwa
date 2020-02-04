import React from 'react';
import { KeyboardAvoidingView, StyleSheet, ToastAndroid } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import { Formik } from 'formik';
import style, { buttons } from '../style';
import { http, screenWidth, StoreAPI } from '../config';
import * as Yup from 'yup';
import { session } from '../helpers';
import navigationService from '../navigationService';
import { Loader } from './UI';

const FormSchema = Yup.object().shape({
   first_name: Yup.string()
      .min(4, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Required'),
   last_name: Yup.string()
      .min(4, 'Too Short!')
      .max(100, 'Too Long!')
      .required('Required'),
   email: Yup.string()
      .email('Email is required')
      .required('Required'),
   phone: Yup.string()
      .min(10, 'Invalid mobile number')
      .max(11, 'Invalid mobile number')
      .required('Required'),
   address_1: Yup.string()
      .required('Required'),
   city: Yup.string()
      .required('Required'),
   state: Yup.string()
      .required('Required'),
   postalcode: Yup.string()
      .min(4, 'Invalid mobile number')
      .max(6, 'Invalid mobile number')
      .required('Required'),
   // country: Yup.string()
   //    .required('Required'),
});

export default class AddressForm extends React.Component {
   state = {
      name: '',
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      company: '',
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      postalcode: '',
      country: 'INDIA',
      ready: false,
      addressType: 'billing',
      user: null,
   }
   async componentDidMount() {
      const addressFormData = this.props.values
      const addressType = this.props.type
      const user = this.props.user

      this.setState({ ...addressFormData, user, addressType, ready: true })
   }
   async onSubmit(values, actions) {
      const { setSubmitting } = actions
      let props = actions
      const user = props.user
      const addressType = props.type
      setSubmitting(true)
      try {
         let patch = {
            billing: {...values},
         }
         if(addressType == 'shipping') {
            patch = {
               shipping: {...values},
            }
         }
         StoreAPI.put('customers/'+user.id, {
            ...patch
         }).then(({data}) => {
            alert(JSON.stringify({data}))
            // updated address
         }).catch(error => {
            alert(JSON.stringify({error}))
         })

         const response = await http.post('/wp-json/app/update_address', values)
         const { data, } = response
         if (data && data.ok) {
            ToastAndroid.show(data.msg, ToastAndroid.LONG)
            navigationService.navigate('MyAddress')
         } else {
            alert(JSON.stringify(response))
         }
         setSubmitting(false)
      } catch ({ message }) {
         alert(message)
         setSubmitting(false)
      }
   }
   render() {
      const {ready} = this.state
      if(!ready) {
         return <Loader />
      }
      return (
         <Formik initialValues={{
            ...this.state,
            ...this.props.phone,
            country: 'INDIA',
         }} onSubmit={this.onSubmit}
            validationSchema={FormSchema}
            style={styles.form}
            enableReinitialize={true}
         >
            {props => (
               <KeyboardAvoidingView behavior="padding">
                  <Input
                     label={'First Name'}
                     onChangeText={props.handleChange('first_name')}
                     errorMessage={props.errors.first_name ? props.errors.first_name : null}
                     value={props.values.first_name} />
                  <Input
                     label={'Last Name'}
                     onChangeText={props.handleChange('last_name')}
                     errorMessage={props.errors.last_name ? props.errors.last_name : null}
                     value={props.values.last_name} />
                  <Input
                     label={'E-Mail Address'}
                     onChangeText={props.handleChange('email')}
                     keyboardType="email-address"
                     errorMessage={props.errors.email ? props.errors.email : null}
                     value={props.values.email} />
                  <Input
                     label={'Mobile Number'}
                     onChangeText={props.handleChange('phone')}
                     keyboardType="number-pad"
                     errorMessage={props.errors.phone ? props.errors.phone : null}
                     value={props.values.phone} />
                  <Input
                     label={'Company (Optional)'}
                     onChangeText={props.handleChange('company')}
                     errorMessage={props.errors.company ? props.errors.company : null}
                     value={props.values.company} />
                  <Input
                     label={'Address line 1'}
                     onChangeText={props.handleChange('address_1')}
                     errorMessage={props.errors.address_1 ? props.errors.address_1 : null}
                     value={props.values.address_1} />
                  <Input
                     label={'Address line 2'}
                     onChangeText={props.handleChange('address_2')}
                     errorMessage={props.errors.address_2 ? props.errors.address_2 : null}
                     value={props.values.address_2} />
                  <Input
                     label={'City'}
                     onChangeText={props.handleChange('city')}
                     errorMessage={props.errors.city ? props.errors.city : null}
                     value={props.values.city} />
                  <Input
                     label={'Postal Code'}
                     onChangeText={props.handleChange('postalcode')}
                     errorMessage={props.errors.postalcode ? props.errors.postalcode : null}
                     value={props.values.postalcode} />
                  <Input
                     label={'State'}
                     onChangeText={props.handleChange('state')}
                     errorMessage={props.errors.state ? props.errors.state : null}
                     value={props.values.state} />
                  <Input
                     label={'Country'}
                     disabled={true}
                     onChangeText={props.handleChange('country')}
                     errorMessage={props.errors.country ? props.errors.country : null}
                     value={props.values.country} />

                  <Button buttonStyle={buttons.primary} onPress={props.handleSubmit} loading={props.isSubmitting} style={{ marginTop: 15, marginBottom: 5, }} title="Update Address" />
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
