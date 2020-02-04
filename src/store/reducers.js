import { authState } from "./state";

export const authReducer = (state = authState, params) => {
   let computedState = {
      ...state
   }
   switch (params.type) {
      case 'SET_AUTH_USER':
         computedState = {
            ...state,
            user: params.payload
         }
         break;
      default:
         computedState = {...state}
         break;
   }
   return computedState
}
