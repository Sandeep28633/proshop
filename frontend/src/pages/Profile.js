import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Message, Loader } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { getUserProfile,updateUserProfile } from '../actions'

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

  useEffect(() => {
    setMessage(null)
    if (!userInfo) {
      history.push('/login')
    } else {
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
          My Orders
      </Col>
    </Row>
  )
}

export default Profile
