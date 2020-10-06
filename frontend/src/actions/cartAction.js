import { CART_REMOVE_ITEM, CART_ADD_ITEM } from './types'
import axios from 'axios'

export const addProductToCart = (pId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/products/${pId}`)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (pid) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: pid,
  })
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
