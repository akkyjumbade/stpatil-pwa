import { http } from "../../config"
import { RESOURCES_LOAD_ACTION } from "./resources.reducer"

export function loadResources() {
   return async (dispatch) => {
      try {
         const { data: response } = await http.get('/wp-json/app/resources')
         if(response.ok) {
            dispatch({ type: RESOURCES_LOAD_ACTION, payload: response })
         }
      } catch (error) {
         console.log({ error })
      }
   }
}
