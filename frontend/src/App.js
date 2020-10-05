import React from 'react'
import {BrowserRouter as Router,Route} from 'react-router-dom';
import { Container } from 'react-bootstrap'
import { Header, Footer } from './components'
import { Home,ProductScreen } from './pages'

const App = () => {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
         <Route path="/" exact component={Home}/>
         <Route path="/product/:id" component={ProductScreen}/>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
