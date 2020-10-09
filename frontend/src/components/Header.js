import React from 'react'
import { Navbar, Nav, Container,NavDropdown} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useSelector ,useDispatch} from 'react-redux'
import {logout} from '../actions'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.auth)
  const { userInfo,error } = userLogin

  const logoutHandler =()=>{
    dispatch(logout(userInfo.token))
  }

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                  <NavDropdown.Item >Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='Admin' id='adminmeny'>
                  <LinkContainer to='/admin/users'>
                  <NavDropdown.Item >Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/products'>
                  <NavDropdown.Item >Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/orders'>
                  <NavDropdown.Item >orders</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              ) }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header
