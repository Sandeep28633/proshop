import React, { useState } from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import { FormContainer, CheckoutSteps } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { SavePaymentMethod } from '../actions'

const Payment = ({ history }) => {
  const dispatch = useDispatch()
  const [paymentMethod, setPaymentMethod] = useState('PayPal')

  //if user has saved his address , then we can get this from local storage and use this
  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart

  if (!shippingAddress) {
    history.push('/shipping')
  }
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(SavePaymentMethod(paymentMethod))
    history.push('/placeorder')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>
          <Col>
            <Form.Check
              type='radio'
              label='paypal or credit card'
              id='paypal'
              name='paymentMethod'
              value='paypal'
              checked
              onChange={(e)=>setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
          <Col>
            <Form.Check
              type='radio'
              label='stripe'
              id='stripe'
              name='paymentMethod'
              value='stripe'
              onChange={(e)=>setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button type='submit' variant='primary' className='mr-auto'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Payment
