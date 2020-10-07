import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { FormContainer, CheckoutSteps } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import {SaveShippingAddres} from '../actions'

const Shipping = ({ history }) => {
  const dispatch = useDispatch()

  //if user has saved his address , then we can get this from local storage and use this
  const cart = useSelector(state=>state.cart)
  const {shippingAddress} = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(SaveShippingAddres({address, city, postalCode, country}))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps  step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='city'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Postal Code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='mr-auto'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Shipping
