import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Button, Image, ListGroup, Form } from 'react-bootstrap'
import { Loader, Message, Ratings } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../actions'

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    const id = match.params.id
    dispatch(getProductDetails(id))
  }, [match, dispatch])

  const addToCard = () =>{
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const productDetails = useSelector((state) => state.productDetail)
  const { error, loading, product } = productDetails

  const renderQuantityForm = ({countInStock})=>{
    return (
      <Form.Control as='select' value={qty} onChange={(e)=>setQty(e.target.value)}>
       { [...Array(countInStock).keys()].map(x=>(
        <option key={x+1}>{x+1}</option>
        ))}
      </Form.Control>
    )
  }

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price : ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description : {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price :</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status :</Col>
                    <Col>
                      {product.countInStock ? 'In Stock' : 'Out of Stock'}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>{renderQuantityForm(product)}</Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    onClick={addToCard}
                    className='btn-block'
                    disabled={product.countInStock == 0}
                  >
                    ADD TO CART
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  )
}

export default ProductScreen
