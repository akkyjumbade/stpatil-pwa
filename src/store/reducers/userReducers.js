const initialState = null

export const SET_USER = 'SET_USER'
export const USER_LOGOUT_TYPE = 'USER_LOGOUT_TYPE'

export function userReducer(state = initialState, action) {
   let computedState = state
   switch (action.type) {
      case SET_USER:
         computedState = action.payload
         break;
      case USER_LOGOUT_TYPE:
         computedState = null
         break;
      default:
         computedState = computedState
         break;
   }
   return computedState
}
