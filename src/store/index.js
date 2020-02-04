import { createStore, combineReducers, applyMiddleware } from "redux";
import { authReducer } from './reducers'
import thunk from "redux-thunk";
import operatorsReducers from "./reducers/operatorsReducers";
import { getOperatorsAction } from "./actions/operatorsActions";
import { fetchAuthUserAction } from "./actions/userActions";
import { userReducer } from "./reducers/userReducers";
import { walletReducer } from "./reducers/walletReducer";
import { orderReducer } from "./reducers/orderReducers";
import resourcesReducer from "./resources/resources.reducer";
import { loadResources } from "./resources/resources.action";
import productsReducer from "./products/products.reducer";
import cartReducer from './cart'
import { loadCategoriesAction, loadProductsAction } from "./products/products.actions";

const store = createStore(combineReducers({
   auth: authReducer,
   user: userReducer,
   operators: operatorsReducers,
   wallet: walletReducer,
   orders: orderReducer,
   resources: resourcesReducer,
   products: productsReducer,
   cart: cartReducer,
}), applyMiddleware(thunk))

// store.dispatch(fetchAuthUserAction())
// store.dispatch(loadResources())
// store.dispatch(getOperatorsAction())
// store.dispatch(loadCategoriesAction())
// store.dispatch(loadProductsAction())

export default store
