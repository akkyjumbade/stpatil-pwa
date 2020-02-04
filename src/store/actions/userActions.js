import { session } from "../../helpers"
import { SET_USER } from "../reducers/userReducers"
import { fetchBalanace } from "../../functions/wallet"
import { GET_SET_WALLET } from "../reducers/walletReducer"
import myOrdersAsync from "../../functions/orders"
import { GET_SET_ORDERS } from "../reducers/orderReducers"

export function fetchAuthUserAction() {
   return async (dispatch) => {
      try {
         const user = await session.load({ key: 'loginState' })
         dispatch({ type: SET_USER, payload: user })
         // get my wallet balance
         const balance = await fetchBalanace()
         dispatch({ type: GET_SET_WALLET, payload: balance })
         // get my orders
         const myOrders = await myOrdersAsync()
         dispatch({ type: GET_SET_ORDERS, payload: myOrders })
      } catch (error) {
         // dispatch({ type: SET_USER, payload: user })
      }
   }
}


export function getBalanceAction() {
   return async (dispatch) => {
      try {
         const balance = await fetchBalanace()
         console.log()
         dispatch({ type: GET_SET_WALLET, payload: balance })
      } catch (error) {
         // dispatch({ type: SET_USER, payload: user })
      }
   }
}
