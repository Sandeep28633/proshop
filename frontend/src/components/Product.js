import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Ratings from './Ratings'

const Product = ({ product }) => {
  return (
    <>
      <Card className='my-3 py-3 rounded'>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top'></Card.Img>
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as='div'>
            <Ratings value={product.rating}
             text={`${product.numReviews} reviews`} color='red'/>
          </Card.Text>

          <Card.Text as="h3">
            <i className="fas fa-rupee-sign"></i>{product.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default Product
