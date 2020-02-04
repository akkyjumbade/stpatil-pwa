import { session } from "../helpers"

export const cartAsync = () => {
   return new Promise(async (resolve, reject) => {
      try {
         const data = await session.load({
            key: 'cartContent',
         })
         resolve(data)
      } catch (error) {
         await session.save({
            key: 'cartContent',
            data: [],
         })
         const cartData = await session.load({key: 'cartContent',})
         resolve(cartData)
      }
   })
}

export const addToCart = async (product, qty = 1) => {
   return new Promise(async (resolve, reject) => {
      try {
         const cartdata = await cartAsync()
         let ifAlreadyInCart = cartdata.find(i => {
            return product.id == i.id
         })
         if(ifAlreadyInCart) {
            reject({
               message: 'Already in the cart'
            })
         } else {
            let data = [
               ...cartdata, {
                  ...product,
                  qty: qty
               }
            ]
            await session.save({
               key: 'cartContent',
               data
            })
            const cartContent = await session.load({
               key: 'cartContent',
            })
            resolve(cartContent)
         }
      } catch (error) {
         reject(error)
      }
   })
}
export const removeFromCart = async (product) => {
   const cartdata = await cartAsync()
   let removedItemData = cartdata.filter(i => {
      return product.id != i.id
   })
   await session.save({
      key: 'cartContent',
      data: removedItemData
   })
}
export const clearCart = async () => {
   await session.save({
      key: 'cartContent',
      data: []
   })
}
