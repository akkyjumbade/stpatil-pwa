import { session } from "../helpers"
import { http } from "../config"


export const createOrder = async (values) => {
   return new Promise(async (resolve, reject) => {
      try {
         let url = `/wp-json/pay/create-order/${values.service}`
         const {data} = await http.post(url, {
            ...values
         })
         if(data && data.ok) {
            resolve(data.data)
         }
         reject({
            ...data.errors,
            reason: data.reason
         })
      } catch (error) {
         reject({
            ...error,
            reason: error.message
         })
      }
   })
}


export default async function myOrdersAsync(type = 'prepaid') {
   return new Promise(async (resolve, reject) => {
      try {
         const user = await session.load({key: 'loginState'})
         const {data} = await http.get('/wp-json/pay/fetch-orders/'+user.id)
         if(data && data.ok) {
            resolve(data.data)
         } else {
            reject({...data})
         }
      } catch (error) {
         reject(error)
      }
   })
}
