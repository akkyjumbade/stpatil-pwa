import { http } from "../config";
import { session } from "../helpers";

export const generateReferralAsync = async () => {
   return new Promise(async (resolve, reject) => {
      try {
         const user = await session.load({key: 'loginState'})
         const {data} = await http.put('wp-json/app/create_referral', {
            user
         })
         if(data.ok) {
            resolve(data.data)
         } else {
            reject({
               reason: data.reason,
               ...data.errors
            })
         }
      } catch (error) {
         reject({
            reason: error.message,
            ...error
         })
      }
   })
}
export const createURL = async () => {
   return await generateReferralAsync()
}
const postReferral = async function (url) {
   const {data} = await http.post('/wp-json/app/post_referells', {
      url
   })
   if(data.ok) {
      //
   } else {
      //
   }
}
export default postReferral
