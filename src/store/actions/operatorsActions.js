import { http } from "../../config"
import { SET_OPERATORS_ACTION } from "../reducers/operatorsReducers"
import { session } from '../../helpers';

export function getOperatorsAction() {
   return async dispatch => {
      try {
         const operators = await session.load({ key: 'operators', })
         console.log({ operators })
         dispatch({ type: SET_OPERATORS_ACTION, payload: operators })
      } catch (error) {
         console.log({error})
         throw new Error(error.message)
         // dispatch({ type: SET_OPERATORS_ACTION, payload: [] })
      }
   }
}
