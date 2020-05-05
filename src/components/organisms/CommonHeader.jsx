import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'

import { auth } from '../../services/firebase'

import { Alert, Navbar, Nav } from 'react-bootstrap'

const CommonHeader = ({ authenticated }) => {
  const location = useLocation()
  const history = useHistory()
  const [msg, setMsg] = useState(null)
  const [isErr, setIsErr] = useState(false)

  useEffect(() => {
    setMsg(null)
  }, [])

  const logout = async () => {
    setMsg(null)
    setIsErr(false)
    try {
      await auth.signOut()
      setMsg("logout is done")
      history.push("/")
    } catch (err) {
      setMsg(err)
      setIsErr(true)
    }
  }

  const renderNavLink = () => {
    if (authenticated) {
      return (
        <>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/chat">Chat</Nav.Link>
          <Nav.Link onClick={logout}>Signout</Nav.Link>
        </>
      )
    } else {
      return (
        <>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/signup">Signup</Nav.Link>
        </>
      )
    }
  }

  const renderAlert = () => {
    if (msg) {
      if (isErr) {
        return <Alert variant="info">{msg}</Alert>
      }
      return <Alert variant="danger">{msg}</Alert>
    }
  }

  return (
    <>
      <Navbar bg="dark" variant="dark" className="mb-3">
        <Navbar.Brand>Chatty</Navbar.Brand>
        <Nav className="ml-auto" activeKey={location.pathname}>
          {renderNavLink()}
        </Nav>
      </Navbar>
      {renderAlert()}
    </>
  )
}

export default CommonHeader