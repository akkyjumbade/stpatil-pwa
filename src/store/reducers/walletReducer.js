const initialState = {

}

export const GET_SET_WALLET = 'GET_SET_WALLET'

export function walletReducer(state = initialState, action) {
   let computedState = {
      ...state
   }
   switch (action.type) {
      case GET_SET_WALLET:
         computedState = {
            ...state,
            ...action.payload,
         }
         break;
      default:
         computedState = { ...computedState, }
         break;
   }
   return computedState
}
