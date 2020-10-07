import { combineReducers } from 'redux'
import { cartReducer } from './cartReducer'
import { productDetailsReducer, productReducer } from './productReducer'
import { userLoginReducer, userRegisterReducer } from './authReducer'
import { getProfileReducer, updateUserProfileReducer } from './userReducer'
import {createOrderReducer} from './orderReducer'

export default combineReducers({
  productList: productReducer,
  productDetail: productDetailsReducer,
  cart: cartReducer,
  auth: userLoginReducer,
  register: userRegisterReducer,
  userProfile: getProfileReducer,
  updatedProfile: updateUserProfileReducer,
  orderCreate: createOrderReducer,
})
