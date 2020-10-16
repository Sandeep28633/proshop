import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import {
  Loader,
  Message,
  Product,
  Paginate,
  ProductCarousel,
  Meta
} from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions'
import { Link } from 'react-router-dom'


const Home = ({ match }) => {
  const keyword = match.params.keyword
  const pageNumber = match.params.pageNumber || 1

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts(keyword, pageNumber))
  }, [dispatch, keyword, pageNumber])

  const productList = useSelector((state) => state.productList)
  const { loading, error, products, page, pages } = productList

  const renderProducts = products
    ? products.map((product) => {
        return (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        )
      })
    : []

  return (
    <>
    <Meta/>
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Produtcs</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>{renderProducts}</Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  )
}

export default Home
