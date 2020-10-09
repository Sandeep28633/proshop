import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
} from './types'
import axios from 'axios'

export const getProducts = () => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_LIST_REQUEST })
      const { data } = await axios.get('/products')
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: PRODUCT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


export const getProductDetails = id => async (dispatch) => {
    try {
      dispatch({ type: PRODUCT_DETAIL_REQUEST })
      const { data } = await axios.get(`/products/${id}`)
      dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }


  export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_DELETE_REQUEST,
      })
  
      const {
        auth: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`/products/${id}`, config)
  
      dispatch({
        type: PRODUCT_DELETE_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message

      dispatch({
        type: PRODUCT_DELETE_FAIL,
        payload: message,
      })
    }
  }
  
  export const createProduct = () => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_CREATE_REQUEST,
      })
  
      const {
        auth: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.post(`/products`, {}, config)
  
      dispatch({
        type: PRODUCT_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message

      dispatch({
        type: PRODUCT_CREATE_FAIL,
        payload: message,
      })
    }
  }
  
  export const updateProduct = (product) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCT_UPDATE_REQUEST,
      })
  
      const {
        auth: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(
        `/products/${product._id}`,
        product,
        config
      )
  
      dispatch({
        type: PRODUCT_UPDATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message

      dispatch({
        type: PRODUCT_UPDATE_FAIL,
        payload: message,
      })
    }
  }
  