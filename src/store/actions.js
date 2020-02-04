import { session } from "../helpers"
import { SET_USER } from "./reducers/userReducers"
import { loginAsync } from './context'

export const setAuthUser = (values) => {
   return async (dispatch) => {
      try {
         dispatch({ type: 'AUTH_USER' })
         await session.save({key: 'loginState', data: values})
         dispatch({ type: SET_USER, payload: values, })
         dispatch({ type: 'SET_AUTH_USER', payload: values, })
      } catch (error) {
         dispatch({ type: 'SET_AUTH_USER', payload: null, })
      }
   }
}

export const fetchAuthUserAction = () => {
   return async (dispatch) => {
      dispatch({type: 'AUTH_USER'})
      try {
         const user = await session.load({key: 'loginState',})
         if(!user) { return }
         dispatch({ type: SET_USER, payload: user, })
      } catch (error) {
         dispatch({ type: SET_USER, payload: null, })
      }
   }
}
