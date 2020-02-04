import React, { useState } from 'react';
import { CLIENT_ID } from '../config/google';
import { services, baseURL, http } from '../config'
import { session, _logout, } from "../helpers";
import { GoogleSignIn } from 'expo-google-sign-in';

export default function () {
   return new Promise(async (resolve, reject) => {
      try {
         await GoogleSignIn.askForPlayServicesAsync();
         const { type, user } = await GoogleSignIn.signInAsync();
         if(type != 'success') {
            return alert('Unable to signin with Google right now. Please use manual!')
         }
         const {data} = await http.post('/wp-json/app/signup_with_google', {
            auth_type: 'google',
            ...user
         })
         if(data && data.ok) {
            resolve(data.data)
         } else {
            reject(data)
         }
      } catch (error) {
         alert(JSON.stringify(error))
         reject(error)
      }
   })
}
