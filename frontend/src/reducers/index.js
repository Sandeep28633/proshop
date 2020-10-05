import {combineReducers} from 'redux'
import { productDetailsReducer, productReducer } from './productReducer'

export default combineReducers({
    productList:productReducer,
    productDetail:productDetailsReducer
})