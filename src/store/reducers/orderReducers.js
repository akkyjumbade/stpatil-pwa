const initialState = {
   all: [],
   draft: {},
}

export const SET_NEW_SERVICE_ORDER = 'SET_NEW_SERVICE_ORDER'
export const GET_SET_ORDERS = 'GET_SET_ORDERS'

export function orderReducer(state = initialState, action) {
   let computedState = {
      ...state
   }
   switch (action.type) {
      case SET_NEW_SERVICE_ORDER:
         computedState = {
            ...state,
            draft: action.payload,
         }
         break;
      case GET_SET_ORDERS:
         computedState = {
            ...state,
            all: action.payload,
         }
         break;
      default:
         computedState = { ...computedState, }
         break;
   }
   return computedState
}
