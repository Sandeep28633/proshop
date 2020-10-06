import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import { Container } from 'react-bootstrap'
import { Header, Footer } from './components'
import { Cart, Home,ProductScreen } from './pages'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
         <Route path="/" exact component={Home}/>
         <Route path="/product/:id" component={ProductScreen}/>
         <Route path="/cart/:id?" component={Cart}/>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
