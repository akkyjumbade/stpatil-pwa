
const initialState = {
   // app
}

export const RESOURCES_LOAD_ACTION = 'RESOURCES_LOAD_ACTION'

export default function (state = initialState, action) {
   let computedState = {
      ...state
   }
   switch (action.type) {
      case RESOURCES_LOAD_ACTION:
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
