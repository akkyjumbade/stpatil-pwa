import { http } from "../config"
import { Alert } from "react-native"

export const saveBeneficiaryAsync = async (values) => {
   const formdata = {
      ...values,
   }
   return new Promise(async (resolve, reject) => {
      try {
         const {data} = await http.post('/wp-json/pay/save_beneficiary', formdata)
         if(data && data.ok) {
            Alert.prompt('Enter OTP sent on given number.', async (otp) => {
               let verified = await verifyBeneficiaryAsync({
                  ...data,
                  // beneficiary_id: data,
                  sender_id,
                  otp,
               })
               resolve({...data, ...verified })
            })
         } else {
            reject({...data})
         }

      } catch (error) {
         reject({...error})
      }
   })
}
export const verifyBeneficiaryAsync = async (values) => {
   const formdata = {
      ...values,
   }
   console.log({formdata})

   return new Promise(async (resolve, reject) => {
      try {
         const {data} = await http.post('/wp-json/pay/verify_beneficiary', formdata)
         if(data && data.ok) {
            resolve({...data})
         } else {
            reject({...data})
         }

      } catch (error) {
         reject({...error})
      }
   })
}

export const getBeneficiaries = async () => {
   return new Promise(async (resolve, reject) => {
      try {
         const {data} = await http.post('/wp-json/pay/get_beneficiaries')
         if(data && data.ok) {
            resolve({...data})
         } else {
            reject({...data})
         }
      } catch (error) {
         reject({...error})
      }
   })
}
export const findSenderProfile = async (phone) => {
   return new Promise(async (resolve, reject) => {
      try {
         const {data} = await http.post('/wp-json/pay/find_sender', {phone})
         if(data && data.ok) {
            resolve({...data})
         } else {
            reject({...data})
         }

      } catch (error) {
         reject({...error})
      }
   })
}
export const findBeneficiaryAsync = async (id) => {
   const formdata = {
      beneficiary_id: id,
   }
   return new Promise(async (resolve, reject) => {
      try {
         const {data} = await http.post('/wp-json/pay/find_beneficiary', formdata)
         if(data && data.ok) {
            resolve({...data})
         } else {
            reject({...data})
         }

      } catch (error) {
         reject({...error})
      }
   })
}

export default {
   saveBeneficiaryAsync,
   findBeneficiaryAsync,
   getBeneficiaries,
   verifyBeneficiaryAsync,
}
