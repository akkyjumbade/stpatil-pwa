import Axios from "axios";
import WooCommerceAPI from 'react-native-woocommerce-api';

import {Dimensions} from 'react-native'

export const baseURL = 'https://stpatil.com';

export const http = Axios.create({
   baseURL: baseURL,
   // auth: {
   //    username: 'ck_81ed9b2f54d80a79dc760a7324ba519ff8f838a0',
   //    password: 'cs_d651b9d73a85b2988c725248b489065d2f015a38'
   // },
   headers: {
      'Accept': 'application/json',
      "Authorization": "Basic Y2tfODFlZDliMmY1NGQ4MGE3OWRjNzYwYTczMjRiYTUxOWZmOGY4MzhhMDpjc19kNjUxYjlkNzNhODViMjk4OGM3MjUyNDhiNDg5MDY1ZDJmMDE1YTM4",
      // 'Content-Type': 'application/json',
      'Content-Type': 'application/json,multipart/form-data',
      // 'X-Requested-With': 'app',
      // 'Access-Control-Allow-Credentials': 'true',
   },
})
export const services = {
   google: {
      consumer_key: '317933531273-mo2jnmm401gorfbllcb9d6857br5e93a.apps.googleusercontent.com',
      consumer_secret: '4nB-UrO1Rbw1cXV4QNNvvM23'
   },
   facebook: {
      client_id: '2911321698987491',
      client_secret: '242a27f3903b281a4282290c8003672cs'
   }
}
export const screenWidth = Dimensions.get('window').width
export const screenHeight = Dimensions.get('window').height



export const navigationOptions = {
   headerStyle: {
      shadowOpacity: 0,
        shadowOffset: {
         height: 0
      },
      shadowRadius: 0,
      borderBottomWidth: 0,
      elevation: 0,
      borderWidth: 0,
      boxShadow: 0,
      margin: 0,
      // elevation: 0,
      color: '#fff',
      tintColor: '#fff'
   },
}
// headerStyle: {
//    shadowOpacity: 0,
//    elevation: 0,
// },

const apiConfig = {
   url: baseURL,
   // ssl: false,
   consumerKey: 'ck_00457fd32e7855d3b5cda5856f8eb5d56886ab23',
   consumerSecret: 'cs_61499534a46b17ff4818c9ef5265d94b0f8f8f77',
   wpAPI: true,
   version: 'wc/v3',
   queryStringAuth: true
   // 73iiSR4zyJQ9iMKyimp0hffeB5BTJ7JD
}

export const StoreAPI = new WooCommerceAPI(apiConfig)

export const RAZORYPAY_KEY = 'rzp_live_nXRYq90cXI0BAG'
export const RAZORYPAY_SECRET = 'gEbE6XUXoctwfpPxkzeZVr3G'
