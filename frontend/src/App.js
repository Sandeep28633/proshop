import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import { Container } from 'react-bootstrap'
import { Header, Footer } from './components'
import { Cart, Home,ProductScreen,Login } from './pages'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
        <Route path="/login" component={Login}/>
         <Route path="/product/:id" component={ProductScreen}/>
         <Route path="/cart/:id?" component={Cart}/>
         <Route path="/" exact component={Home}/>

        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
