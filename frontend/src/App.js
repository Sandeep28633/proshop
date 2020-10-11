import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { Header, Footer } from './components'
import {
  Cart,
  Home,
  ProductScreen,
  Login,
  Register,
  Profile,
  Shipping,
  Payment,
  PlaceOrder,
  Order,
  UserList,
  UserEdit,
  ProductList,
  ProductEdit,
  OrderList,
} from './pages'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/order/:id' component={Order} />
          <Route path='/placeorder' exact component={PlaceOrder} />
          <Route path='/register' exact component={Register} />
          <Route path='/login' exact component={Login} />
          <Route path='/payment' exact component={Payment} />
          <Route path='/shipping' exact component={Shipping} />
          <Route path='/profile' exact component={Profile} />
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={Cart} />
          <Route path='/admin/users' component={UserList} />
          <Route path='/admin/user/:id/edit' component={UserEdit} />
          <Route path='/admin/products' component={ProductList} />
          <Route path='/admin/product/:id/edit' component={ProductEdit} />
          <Route path='/admin/orders' component={OrderList} />
          <Route path='/' exact component={Home} />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
