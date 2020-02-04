const initialState = {
   items: [],
   subtotal: 0,
   tax: 0,
   total: 0,
}


export const TYPE_CART_ADD = 'TYPE_CART_ADD'
export const TYPE_CART_REMOVE = 'TYPE_CART_REMOVE'
export const TYPE_CART_CLEAR = 'TYPE_CART_CLEAR'
export const TYPE_CART_INCREMENT = 'TYPE_CART_INCREMENT'
export const TYPE_CART_DECREMENT = 'TYPE_CART_DECREMENT'

export default function cartReducer(state = initialState, action) {
   let computedState = state
   switch (action.type) {
      case TYPE_CART_ADD:
         computedState = {
            ...computedState,
            items: [...computedState.items, action.payload]
         }
         break;
      case TYPE_CART_INCREMENT:
         computedState = {
            ...computedState,
            items: [...computedState.items, action.payload]
         }
         break;
      case TYPE_CART_DECREMENT:
         computedState = {
            ...computedState,
            items: [...computedState.items, action.payload]
         }
         break;
      case TYPE_CART_REMOVE:
         computedState = {
            ...computedState,
            items: computedState.items.filter(i => i.id !== action.payload.id)
         }
         break;
      case TYPE_CART_CLEAR:
         computedState = {
            ...computedState,
            items: [],
            selected: null,
         }
         break;
      default:
         computedState = computedState
         break;
   }

   return computedState
}
