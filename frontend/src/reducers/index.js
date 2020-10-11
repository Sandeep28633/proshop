import { combineReducers } from 'redux'
import { cartReducer } from './cartReducer'
import {
  productDetailsReducer,
  productReducer,
  productCreateReducer,
  productUpdateReducer,
  productDeleteReducer,
} from './productReducer'

import { userLoginReducer, userRegisterReducer } from './authReducer'

import {
  getProfileReducer,
  updateUserProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from './userReducer'

import {
  createOrderReducer,
  getOrderReducer,
  orderPayReducer,
  getMyOrdersReducer,
  getAdminOrdersReducer,
  markAsDeliveredReducer,
} from './orderReducer'

export default combineReducers({
  productList: productReducer,
  productDetail: productDetailsReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  cart: cartReducer,
  auth: userLoginReducer,
  register: userRegisterReducer,
  userProfile: getProfileReducer,
  updatedProfile: updateUserProfileReducer,
  orderCreate: createOrderReducer,
  orderDetails: getOrderReducer,
  orderPay: orderPayReducer,
  adminOrders: getAdminOrdersReducer,
  markDeliverd:markAsDeliveredReducer,
  myOrders: getMyOrdersReducer,
  usersList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
})
