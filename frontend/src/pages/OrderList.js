import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getAdminOrder } from '../actions'
import { Message, Loader } from '../components'
import { Button,Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const OrderList = ({ history }) => {
  const dispatch = useDispatch()

  const auth = useSelector((state) => state.auth)
  const { userInfo } = auth

  const adminOrders = useSelector((state) => state.adminOrders)
  const { loading, error, orders } = adminOrders

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getAdminOrder())
    }
    else history.push('/login')
  }, [])

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped hover bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.User && order.User.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>
                  <i className='fas fa-rupee-sign'></i>
                  {order.totalPrice}
                </td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i style={{ color: 'red' }} className='fas fa-times'></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i style={{ color: 'red' }} className='fas fa-times'></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button className='btn-sm' variant='light'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default OrderList
