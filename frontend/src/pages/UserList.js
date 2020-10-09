import React, { useEffect } from 'react'
import { Table, Button } from 'react-bootstrap'
import { Message, Loader } from '../components'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { usersList, deleteUser } from '../actions'

const UserList = ({history}) => {
  const dispatch = useDispatch()

  const userData = useSelector((state) => state.usersList)
  const { loading, error, users } = userData

  const userLogin = useSelector((state) => state.auth)
  const { userInfo} = userLogin

  const deletedUser = useSelector(state=>state.userDelete)
  const {error:errorWhileDelete,success,message} = deletedUser

  useEffect(() => {
    if(userInfo && userInfo.isAdmin)
    dispatch(usersList())
    else
    history.push('/login')
  }, [dispatch,history,success])

  const deleteUserHandler = (id)=>{
    dispatch(deleteUser(id))
  }
  
  return (
    <>
      <h1>Users</h1>
      {errorWhileDelete ? <Message variant='danger'>{errorWhileDelete}</Message> : ''}
      {success ? <Message variant='success'>{message.message}</Message> : ''}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped hover bordered responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button variant='danger' className='btn-sm' onClick={()=>deleteUserHandler(user._id)}>
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserList
