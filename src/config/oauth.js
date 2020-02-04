import * as Facebook from "expo-facebook";
import {http} from "../config";
import * as GoogleSignIn from "expo-google-sign-in";

async function signInAsyncFB() {
   try {
      const {
         type,
         token,
         expires,
         permissions,
         declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync('694032301048739', {
         permissions: ['public_profile', 'email'],
      });
      console.log({ type, token })
      if (type === 'success') {
         // Get the user's name using Facebook's Graph API
         const fbCallback = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
         const user = await fbCallback.json()
         if(!user.hasOwnProperty('email')) {
            return alert('You must have email linked with your account')
         }
         // alert('Logged in!', `Hi ${user.name}!`);
         const response = http.post('/wp-json/app/signin_with_facebook', {
            auth_type: 'facebook',
            ...user
         })
         console.log({response, user})
      } else {
         // type === 'cancel'
      }
   } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
   }
}
async function googleSigninAsync() {
   try {
      await GoogleSignIn.askForPlayServicesAsync();
      const { type, user } = await GoogleSignIn.signInAsync();
      console.log({ type, user })
      if (type === 'success') {
         // ...
         const response = $http.post('/wp-json/app/signin_with_google', {
            auth_type: 'google',
            ...user
         })
         console.log(response)
         alert(JSON.stringify(user))
      }
   } catch ({ message }) {
      alert('login: Error:' + message);
   }
}
