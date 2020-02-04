import { TYPE_CART_ADD, TYPE_CART_REMOVE } from "."
import store from ".."

export const addToCartAction = product => async dispatch => {
   try {
      const { cart } = store.getState()
      const isInCart = cart.items.find(i => {
         return product.id === i.id
      })
      if(isInCart) {
         alert('Already in cart')
         return
      }
      dispatch({ type: TYPE_CART_ADD, payload: product })
      Promise.resolve({ message: product.name + ' added to cart!' })
   } catch (error) {
      Promise.reject(error)
   }
}

export const removeFromCartAction = product => async dispatch => {
   try {
      if(!confirm('Are you sure to remove product from cart?')) {
         return false;
      }
      dispatch({ type: TYPE_CART_REMOVE, payload: product })
      Promise.resolve({ message: product.name + ' Removed from cart!' })
   } catch (error) {
      Promise.reject(error)
   }
}
