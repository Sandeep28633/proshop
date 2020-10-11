import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAIL_REQUEST,
  ORDER_DETAIL_SUCCESS,
  ORDER_DETAIL_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  MY_ORDERS_FAIL,
  MY_ORDERS_REQUEST,
  ORDER_DELIVER_RESET,
  MY_ORDERS_SUCCESS, MY_ORDERS_RESET, ORDER_LIST_REQUEST, ORDER_LIST_FAIL, ORDER_LIST_SUCCESS, ORDER_DELIVER_REQUEST, ORDER_DELIVER_SUCCESS, ORDER_DELIVER_FAIL
} from '../actions/types'

export const createOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true }
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const getOrderReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case ORDER_DETAIL_REQUEST:
      return { ...state, loading: true }
    case ORDER_DETAIL_SUCCESS:
      return { loading: false, order: action.payload }
    case ORDER_DETAIL_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return { loading: true }
    case ORDER_PAY_SUCCESS:
      return { loading: false, success: true }
    case ORDER_PAY_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_PAY_RESET:
      return {}
    default:
      return state
  }
}


export const getMyOrdersReducer = (state = { orders : [] },action)=>{
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return { loading: true }
    case MY_ORDERS_SUCCESS:
      return { loading: false, orders : action.payload }
    case MY_ORDERS_FAIL:
      return { loading: false, error: action.payload }
    case MY_ORDERS_RESET:
      return {orders:[]}
    default:
      return state
  }
}

export const getAdminOrdersReducer = (state = { orders : [] },action)=>{
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true }
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders : action.payload }
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const markAsDeliveredReducer = (state = { },action)=>{
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return { loading: true }
    case ORDER_DELIVER_SUCCESS:
      return { loading: false, success : true }
    case ORDER_DELIVER_FAIL:
      return { loading: false, error: action.payload }
    case ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}