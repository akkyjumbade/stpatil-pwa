import { http } from '../config';

export const fetchOperatorsAsync = async (type) => {
   return new Promise(async (resolve, reject) => {
      try {
         const {data} = await http.get('/wp-json/app/fetch-operators/'+type)
         if(data && data.ok) {
            resolve(data.data)
         } else {
            reject({...data})
         }
      } catch (error) {
         reject({...error})
      }
   })
}


export const operatorPlans = async (operatorId) => {
   return new Promise(async (resolve, reject) => {
      try {
         const {data} = await http.get('/wp-json/pay/operator-plans/'+operatorId)
         if(data.ok) {
            resolve(data.plans)
         } else {
            reject({...data})
         }
      } catch (error) {
         console.log('error plans', error)
         reject({...error})
      }
   })
}
