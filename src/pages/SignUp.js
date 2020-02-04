import React from 'react';
import { ToastAndroid, View, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native';
import SignUpForm from '../components/SignUpForm';
import { Container, Title } from '../components/UI';
import { Button, Text, } from 'react-native-elements';
import { services, baseURL, http } from '../config'
import { session, _logout, _retrieveData } from "../helpers";
// import GoogleSignIn from '../services/GoogleSignIn';
import FacebookSigninAsync from '../services/FacebookSigninAsync';
import Axios from 'axios';
import { connect } from 'react-redux';
import GoogleSignIn from '../services/GoogleSignIn';

function SignUp(props) {
   const googleSigninAsync = async () => {
      try {
         const user = await GoogleSignIn()
         alert(JSON.stringify(user))
      } catch (error) {
         alert(JSON.stringify(error))
      }
   }
   const facebookSigninAsync = async () => {
      try {
         const user = await FacebookSigninAsync()
         alert(JSON.stringify(user))
      } catch (error) {
         alert(JSON.stringify(error))
      }
   }
   return (
      <ScrollView>
         <Container layout="boxed" style={{ paddingTop: 15, alignItems: 'center' }}>
            <Title style={{ textAlign: 'center', marginBottom: 15, }}>Create an account</Title>
            <KeyboardAvoidingView behavior="padding">
               <SignUpForm />
               <Button onPress={() => props.navigation.navigate('SignIn')} title="Already have account, Sign In" type="clear" />
               <View style={{ marginBottom: 15 }}>
                  <Button buttonStyle={styles.googleBtn} title="Join with Google" onPress={() => googleSigninAsync()} />
                  <Button buttonStyle={styles.fbBtn} title="Join with Facebook" onPress={() => facebookSigninAsync()} />
               </View>
            </KeyboardAvoidingView>
         </Container>
      </ScrollView>
   )
}

const styles = StyleSheet.create({
   logo: {
      width: 80,
      height: 80,
      alignSelf: 'center',
      marginTop: 10,
      marginBottom: 10,
   },
   googleBtn: {
      backgroundColor: '#CC3333',
   },
   fbBtn: {
      backgroundColor: '#3b5998',
   }
})
const mapStateToProps = ({ user }) => ({
   user
})
export default React.memo(
   connect(
      mapStateToProps
   )(SignUp)
)
