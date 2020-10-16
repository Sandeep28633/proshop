import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Button, Image, ListGroup, Form, FormGroup } from 'react-bootstrap'
import { Loader, Message, Ratings,Meta } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, createProductReview } from '../actions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../actions/types'

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState(0)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  
  const addToCard = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e)=>{
    e.preventDefault()
    dispatch(createProductReview(match.params.id,{
      rating, comment
    }))
  }

  const userLogin = useSelector((state) => state.auth)
  const { userInfo } = userLogin
  
  const productDetails = useSelector((state) => state.productDetail)
  const { error, loading, product } = productDetails
  
  const productReview = useSelector((state) => state.productReview)
  const { error: errorWhileReviewing, success } = productReview

  useEffect(() => {
    if(success){
      alert('review submitted')
      setRating(0)
      setComment('')
      dispatch({type:PRODUCT_CREATE_REVIEW_RESET})
    }
    const id = match.params.id
    dispatch(getProductDetails(id))
  }, [match, dispatch,success])

  const renderQuantityForm = ({ countInStock }) => {
    return (
      <Form.Control
        as='select'
        value={qty}
        onChange={(e) => setQty(e.target.value)}
      >
        {[...Array(countInStock).keys()].map((x) => (
          <option key={x + 1}>{x + 1}</option>
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
        <>
        <Meta title={product.name} />
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
              <ListGroup.Item>
                Price : <i className='fas fa-rupee-sign'></i>
                {product.price}
              </ListGroup.Item>
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
                      <i className='fas fa-rupee-sign'></i>
                      <strong>{product.price}</strong>
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
                    disabled={product.countInStock === 0}
                  >
                    ADD TO CART
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <h2>Reviews</h2>
            {product.reviews.length===0 && <Message>No reviews</Message>}
            <ListGroup variant='flush'>
                  {product.reviews.map(review=>(
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Ratings value={review.rating}/>
                      <p>{review.createdAt.substring(0,10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item>
                    <h2>Write a customer review</h2>
                    {errorWhileReviewing && <Message variant='danger'>{errorWhileReviewing}</Message>}
                    {userInfo ? <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as='select' value={rating} onChange={(e)=>setRating(e.target.value)}>
                          <option value=''>Select ...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as='textarea' row='3' value={comment} onChange={(e)=>setComment(e.target.value)}>                          
                        </Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>Submit</Button>
                    </Form>:<Message><Link to='/login'>Please signin</Link> to write a review</Message>}
                  </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
