import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Form, Button, Alert } from 'react-bootstrap'

import { signin, signinWithGoogle } from '../../helpers/auth'

const Forms = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState(null)

  const handleChage = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    setError(null)
    try {
      switch (e.target.id) {
        case "loginBtn":
          await signin(formData.email, formData.password)
          break;
        case "loginWithGoogleBtn":
          await signinWithGoogle()
          break;
        default:
          break;
      }
    } catch (err) {
      setError(err.message)
    }
  }

  const renderAlert = () => {
    if (error) {
      return <Alert variant="danger">{error}</Alert>
    }
  }

  return (
    <Form>
      {renderAlert()}
      <p>Fill in the form below to create an account.</p>
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          placeholder="Email"
          type="email"
          onChange={handleChage}
          value={formData.email}>
        </Form.Control>
      </Form.Group>
      <Form.Group controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control
          placeholder="Password"
          type="password"
          onChange={handleChage}
          value={formData.password}>
        </Form.Control>
      </Form.Group>
      <Button id="loginBtn" variant="outline-primary mr-3" onClick={handleSubmit}>Login</Button>
      <Button id="loginWithGoogleBtn" variant="outline-primary" onClick={handleSubmit}>Login with Google</Button>
      <hr />

      <p>Dont have an account? <Link to="/signup">Signup</Link></p>
    </Form>
  )
}

export default Forms