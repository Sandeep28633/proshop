import React, { useState, useEffect } from 'react'
import { Row, Col } from 'react-bootstrap'
import { Product } from '../components'
import axios from 'axios'

const Home = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/products');
      setProducts(data);
    } 
    fetchProducts()
  }, [])

  const renderProducts = products.map((product) => {
    return (
      <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
        <Product product={product} />
      </Col>
    )
  })
  return (
    <>
      <h1>Latest Produtcs</h1>
      <Row>{renderProducts}</Row>
    </>
  )
}

export default Home
