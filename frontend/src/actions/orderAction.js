import {
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL, MY_ORDERS_REQUEST, MY_ORDERS_SUCCESS, MY_ORDERS_FAIL
  } from './types'

  import axios from 'axios'
  
  export const createOrder = (order) => async (dispatch,getState) => {
    try {
      dispatch({
        type: ORDER_CREATE_REQUEST,
      })
      const {auth : {userInfo}} = getState()
      const config = {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      }
      const { data } = await axios.post('/orders/createOrder',order,config)
      dispatch({
        type: ORDER_CREATE_SUCCESS,
        payload: data,
      })
    } catch (error) {
      dispatch({
        type: ORDER_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }
  
  export const getOrderDetails = id => async (dispatch,getState) => {
    try {
      dispatch({ type: ORDER_DETAIL_REQUEST })
      const {auth : {userInfo}} = getState()
      const config = {
        headers: {
          Authorization: 'Bearer ' + userInfo.token,
        },
      }
      const { data } = await axios.get(`/orders/${id}`,config)
      dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ORDER_DETAIL_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const payOrder = (orderId,paymentResult) => async(dispatch,getState)=>{
    try {
      dispatch({ type: ORDER_PAY_REQUEST })
      const {auth : {userInfo}} = getState()
      const config = {
        headers: {
          'Content-Type':'application/json',
          Authorization: 'Bearer ' + userInfo.token,
        },
      }
      const { data } = await axios.put(`/orders/${orderId}/pay`,paymentResult,config)
      dispatch({ type: ORDER_PAY_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: ORDER_PAY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }

  export const getMyOrders = () => async(dispatch,getState)=>{
    try {
      dispatch({ type: MY_ORDERS_REQUEST })
      const {auth : {userInfo}} = getState()
      const config = {
        headers: {
          'Content-Type':'application/json',
          Authorization: 'Bearer ' + userInfo.token,
        },
      }
      const { data } = await axios.get(`/orders/myorders`,config)
      dispatch({ type: MY_ORDERS_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: MY_ORDERS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    }
  }