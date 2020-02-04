import { http } from '../config';
import { session } from '../helpers';
import { findSenderProfile } from '../services/MoneyTransfer';
import store from './index'
// login asycn
export const loginAsync = (username, password) => {
   return new Promise(async (resolve, reject) => {
      try {
         const { data: response } = await http.post('/wp-json/app/auth_login', {
            username, password
         })
         if(response && response.ok) {
            resolve(response.data)
         } else {
            reject(response)
         }
      } catch (error) {
         reject(error)
      }
   })
}
const fetchAuth = () => {
   return new Promise(async (resolve, reject) => {
      try {
         const user = await session.load({key: 'loginState'})
         resolve({...user,})
      } catch (error) {
         reject({...error})
      }
   })
}
