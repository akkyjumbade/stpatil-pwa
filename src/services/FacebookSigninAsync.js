import React, { useState } from "react";
import {Button} from "react-native-elements";
import { FACEBOOK_CLIENT_ID } from "../config/services";
import Axios from "axios";
import { http } from "../config";
import { buttons } from "../style";
import * as Facebook from 'expo-facebook';

const fieldsToFetch = "email,name,first_name,last_name"
const sendToServerUrl = '/wp-json/app/oauth_connect_facebook'
const permissions = [
   'public_profile',
]
export default function FacebookSigninAsync() {
   return new Promise(async (resolve, reject) => {
      try {
         Facebook.initializeAsync(FACEBOOK_CLIENT_ID, 'ST Patil Online Mall')
         const fbResponse = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_CLIENT_ID, {
            permissions,
         });
         const {
            type, token,
         } = fbResponse
         console.log({
            fbResponse
         })
         if(type === 'success') {
            let graphFetchUrl = `https://graph.facebook.com/me?access_token=${token}&fields=${fieldsToFetch}`
            console.log(graphFetchUrl)
            const fbUser = await Axios.get(graphFetchUrl)

            console.log({
               fblogin: data
            })
            if(!fbUser.data) {
               alert('Unable to connect with facebook')
               return
            }
            const authRequest = await http.post(sendToServerUrl, {
               auth_type: 'facebook',
               ...fbUser.data
            })
            if(authRequest.data && authRequest.data.ok) {
               resolve(authRequest.data)
            } else {
               reject(authRequest.data)
            }
         } else {
            console.log({
               type, token
            })
            reject({
               message: 'Unable to login with facebook. try with manual !',
            })
            return false
         }

      } catch(error) {
         console.log({ sendToServerUrl })
         console.log(error)
      }
   })
}
