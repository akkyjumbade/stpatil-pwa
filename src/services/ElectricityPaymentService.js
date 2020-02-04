import { http } from "../config"

export const fetchBillAsync = async function(values, type = 'electricity') {
   let typeOfService = '/'+type

   return new Promise(async (resolve, reject) => {
      try {
         // const apiToken = window.apiToken ? window.apiToken: ''
         const {data: response} = await http.post('/wp-json/pay/fetch-bill'+typeOfService, values)
         console.log({response})
         if(response && response.ok) {
            return resolve(response)
         } else {
            return reject(response)
         }
      } catch (error) {
         return reject(error)
      }
   })
}

export const onPayClicked = (values) => {

}
