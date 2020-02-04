import { http } from "../config"
import { session } from "../helpers"

export const fetchBalanace = () => {
   return new Promise(async (resolve, reject) => {
      try {
         const user = await session.load({key: 'loginState'})
         const {data} = await http.post('/wp-json/app/wallet/fetch', {
            user_id: user.id
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

export default {
   fetch: fetchBalanace,
}
