import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { addProductToCart, removeFromCart } from '../actions'
import { Message } from '../components'
import { Link } from 'react-router-dom'

const Cart = ({ match, location, history }) => {
  const dispatch = useDispatch()
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split('=')[1]) : 1

  useEffect(() => {
    if (productId) dispatch(addProductToCart(productId, qty))
  }, [dispatch, productId, qty])

  const renderQuantityForm = ({countInStock,product,qty})=>{
    return (
      <Form.Control as='select' value={qty} onChange={(e)=>dispatch(addProductToCart(product,Number(e.target.value)))}>
       { [...Array(countInStock).keys()].map(x=>(
        <option key={x+1}>{x+1}</option>
        ))}
      </Form.Control>
    )
  }

  const checkOutHandler = ()=>{
      history.push('/login?redirect=shipping')
  }

  const cartItems = useSelector((state) => state.cart.cartItems)
  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty<Link to='/'> Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>
                      ${item.price}
                  </Col>
                  <Col md={3}>
                  {renderQuantityForm(item)}
                  </Col>
                  <Col md={2}>
                      <Button type="button" variant="light" onClick={()=>dispatch(removeFromCart(item.product))}>
                          <i className="fas fa-trash"></i>
                      </Button>
                  </Col> 
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
          {cartItems.length!==0?
          <Card>
              <ListGroup>
                  <ListGroup.Item>
                      <h2>Subtotal ({cartItems.reduce((acc,item)=> acc+item.qty,0)}) items</h2>
                      ${cartItems.reduce((acc,item)=>acc+item.qty*item.price,0).toFixed(2)}
                  </ListGroup.Item>
                  <ListGroup.Item>
                      <Button type="button" className="btn-block" disabled={cartItems.length===0}
                      onClick={checkOutHandler}>
                          Proceed To Checkout
                      </Button>
                  </ListGroup.Item>
              </ListGroup>

          </Card>
          :null}
      </Col>
    </Row>
  )
}

export default Cart
