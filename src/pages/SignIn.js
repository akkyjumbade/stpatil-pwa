import React from 'react';
import { View, Linking, ScrollView, BackHandler, KeyboardAvoidingView, StyleSheet, ToastAndroid } from 'react-native';
import SignInForm from '../components/SignInForm';
import { ALink, Container, Heading, Title } from '../components/UI';
import style, {buttons} from '../style'
import { Image, SocialIcon, Button, Text } from 'react-native-elements';
import { services, baseURL, http } from '../config'
import { _logout, _retrieveData, session } from "../helpers";

import { connect } from 'react-redux';
import FacebookSigninAsync from '../services/FacebookSigninAsync';
import GoogleSignIn from '../services/GoogleSignIn';

const SignIn = React.memo(props => {
   const [loggedin, setLoggedin] = React.useState(props.user)
   const loginWithGoogle = async () => {
      try {
         const user = await GoogleSignIn()
         console.log({user})
      } catch (error) {
         console.log({error})
      }
   }
   const loginWithFacebook = async () => {
      try {
         const user = await FacebookSigninAsync()
         console.log({ user })
      } catch (error) {
         console.log({ error })
      }
   }
   const handleBackPress = () => {
      return loggedin ? true : false
   }
   React.useEffect(() => {
      if(!loggedin) {
         BackHandler.addEventListener('hardwareBackPress', handleBackPress)
         // handleBackPress()
      }
      return () => {
         BackHandler.removeEventListener('hardwareBackPress')
      }
   }, [loggedin])

   React.useEffect(() => {
      if(props.user) {
         setLoggedin(props.user)
      }
   }, [props.user])

   return (
      <ScrollView keyboardShouldPersistTaps='always' contentContainerStyle={{alignContent: 'center',}}>
         <Container style={{ paddingTop: 30, }}>
            <KeyboardAvoidingView behavior="padding">
               <Title style={{ textAlign: 'center' }}>Sign In to Continue</Title>
               <View style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}>
                  <Image source={require('../../assets/icon.png')} style={styles.logo} />
               </View>
               <SignInForm />
               <View>
                  <Text style={{textAlign: 'center', paddingVertical: 7,}}>New Customer</Text>
                  <Button onPress={() => props.navigation.navigate('SignUp')} title="Create an account" />
               </View>
               <View>
                  <Text style={{textAlign: 'center', paddingVertical: 7,}}>or join with</Text>
               </View>
               <View style={{ marginBottom: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'stretch' }}>
                  <Button buttonStyle={{...styles.googleBtn, marginRight: 6, }} title="Google" onPress={loginWithGoogle} />
                  <Button buttonStyle={styles.fbBtn} title="Facebook" onPress={loginWithFacebook} />
               </View>
            </KeyboardAvoidingView>
         </Container>
      </ScrollView>
   )
})
SignIn.navigationOptions = {
   header: null,
   headerStyle: {
      shadowOpacity: 0,
      elevation: 0,
   },
}
const mapStateToProps = ({ user }) => ({
   user
})
export default connect(
   mapStateToProps
)(SignIn)

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
