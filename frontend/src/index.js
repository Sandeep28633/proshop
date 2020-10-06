import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import './bootstrap.min.css'
import { Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import reducers from './reducers'
import thunk from 'redux-thunk'

const cartItemFromStorage = localStorage.getItem('cartItems') ?
JSON.parse(localStorage.getItem('cartItems')) : [];

const initialState = {
  cart: {cartItems: cartItemFromStorage}
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, initialState, composeEnhancers(applyMiddleware(thunk)))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
