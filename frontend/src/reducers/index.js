import {combineReducers} from 'redux'
import { cartReducer } from './cartReducer'
import { productDetailsReducer, productReducer } from './productReducer'
import {authReducer} from './authReducer'

export default combineReducers({
    productList:productReducer,
    productDetail:productDetailsReducer,
    cart:cartReducer,
    auth:authReducer
})