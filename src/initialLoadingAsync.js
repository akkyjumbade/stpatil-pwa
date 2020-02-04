import { session } from "./helpers"
export async function loadResourcesAsync() {
   let result = null
   try {
      let operators = await session.load({ key: 'operators', })
      // const response = await http.post('/wp-json/app/')
   } catch(err) {

   }
   return Promise.resolve(result)
}
