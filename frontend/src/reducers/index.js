import {combineReducers} from 'redux'
import { cartReducer } from './cartReducer'
import { productDetailsReducer, productReducer } from './productReducer'

export default combineReducers({
    productList:productReducer,
    productDetail:productDetailsReducer,
    cart:cartReducer
})