const initialState = {
   all: [],
   selected: [],
   categories: [],
   products: [],
}

export const TYPE_SET_CATEGORIES = 'TYPE_SET_CATEGORIES'
export const TYPE_SET_PRODUCTS = 'TYPE_SET_PRODUCTS'
export const TYPE_ADD_TO_SELECTION = 'TYPE_ADD_TO_SELECTION'

export default function productsReducer(state = initialState, action) {
   let computedState = state
   switch (action.type) {
      case TYPE_SET_CATEGORIES:
         computedState = {...computedState, categories: action.payload}
         break;
      case TYPE_SET_PRODUCTS:
         computedState = {...computedState, products: action.payload}
         break;
      case TYPE_ADD_TO_SELECTION:
         computedState = {...computedState, selected: null}
         break;
      default:
         computedState = computedState
         break;
   }

   return computedState
}
