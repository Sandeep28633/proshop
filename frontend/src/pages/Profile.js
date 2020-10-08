import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col,Table } from 'react-bootstrap'
import { Message, Loader } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile,updateUserProfile ,getMyOrders} from '../actions'
import {LinkContainer} from 'react-router-bootstrap'

const Profile = ({ history }) => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [name, setName] = useState('')
  const [message, setMessage] = useState(null)

  const userData = useSelector((state) => state.userProfile)
  const { error, loading, user } = userData

  const loginDetails = useSelector((state) => state.auth)
  const { userInfo } = loginDetails

  const updatedDetails = useSelector((state) => state.updatedProfile)
  const { success, error:errorWhileupdate } = updatedDetails

  const ordersData = useSelector(state=>state.myOrders)
  const {loading:loadingOrders, error:errorFetchingOrders, orders} = ordersData


  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if(user && orders)
        dispatch(getMyOrders())

      if (!user || !user.name) {
        dispatch(getUserProfile())
        
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmPassword){
        setMessage('Password do not match')
    }else{
        dispatch(updateUserProfile({id:user._id,name,email,password}))
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>Sign Up</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {errorWhileupdate && <Message variant='danger'>{errorWhileupdate}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}

        {loading && <Loader />}
        <Form onSubmit={submitHandler} autoComplete='off'>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='confirmpassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary' className='btn-block'>
            Update
          </Button>
        </Form>
      </Col>

      <Col md={9}>
          <h2>My Orders</h2>
          {loadingOrders ? <Loader /> : errorFetchingOrders ? <Message variant='danger'>{errorFetchingOrders}
          </Message>:(
            <Table striped responsive hover bordered className='table-sm'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order=>(
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0,10)}</td>
                      <td><i className="fas fa-rupee-sign"></i>{order.totalPrice}</td>
                      <td>{order.isPaid ? order.paidAt.substring(0,10): <i style={{color:'red'}} className='fas fa-times'></i>}</td>
                      <td>{order.isDelivered ? order.deliveredAt.substring(0,10):
                      <i style={{color:'red'}} className='fas fa-times'></i>}</td>
                      <td>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className='btn-sm' variant='light'>Details</Button>
                        </LinkContainer>
                      </td>

                    </tr>
                  ))}
                </tbody>
            </Table>
          )}
      </Col>
    </Row>
  )
}

export default Profile
