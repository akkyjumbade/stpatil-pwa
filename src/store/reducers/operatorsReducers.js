const initialState = {
   all: [],
   selected: null
}

export const SET_OPERATORS_ACTION = 'SET_OPERATORS_ACTION'
export const SELECTED_OPERATOR = 'SELECTED_OPERATOR'
export const RESET_SELECTED_PLAN = 'RESET_SELECTED_PLAN'

export default function operatorsReducers(state = initialState, action) {
   let computedState = state
   switch (action.type) {
      case SET_OPERATORS_ACTION:
         computedState = {...computedState, all: action.payload}
         break;
      case SELECTED_OPERATOR:
         computedState = {...computedState, selected: action.payload}
         break;
      case RESET_SELECTED_PLAN:
         computedState = {...computedState, selected: null}
         break;
      default:
         computedState = {...computedState}
         break;
   }

   return computedState
}
