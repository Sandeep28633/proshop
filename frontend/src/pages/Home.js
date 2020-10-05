import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Loader, Message, Product } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../actions'

const Home = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  const renderProducts = products ? products.map((product) => {
    return (
      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
        <Product product={product} />
      </Col>
    )
  }):[]

  return (
    <>
      <h1>Latest Produtcs</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>{renderProducts}</Row>
      )}
    </>
  )
}

export default Home
