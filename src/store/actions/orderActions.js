import { http } from "../../config"
import { createOrder } from "../../functions/orders"
import { SET_NEW_SERVICE_ORDER } from "../reducers/orderReducers"

export function createOrderAction(service, values, params = {}) {
   return async (dispatch) => {
      try {
         const order = createOrder({...values, service, ...params})
         dispatch({ type: SET_NEW_SERVICE_ORDER, payload: order })
         console.log({ order })
      } catch (error) {
         console.log({ error })
      }
   }
}
