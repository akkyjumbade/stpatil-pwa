
import { StoreAPI } from "../../config"
import { TYPE_SET_CATEGORIES, TYPE_SET_PRODUCTS } from "./products.reducer"

export function loadCategoriesAction() {
   return async (dispatch) => {
      try {
         const response = await StoreAPI.get('products/categories', {
            per_page: 100
         })
         if(response.code) {
            return false;
         }
         dispatch({ type: TYPE_SET_CATEGORIES, payload: response })
         console.log('loaded categories')
      } catch (error) {
         console.log({ error })
      }
   }
}
export function loadProductsAction(categoryId = null) {
   return async (dispatch) => {
      try {
         let params = { categories: [categoryId], per_page: 999 }
         const response = await StoreAPI.get('products', params,)
         dispatch({ type: TYPE_SET_PRODUCTS, payload: response })
         console.log('loaded products')
      } catch (error) {
         console.log({ error })
      }
   }
}
