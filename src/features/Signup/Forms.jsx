import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import { Form, Button, Alert } from 'react-bootstrap'

import { signup } from '../../helpers/auth'

const Forms = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState(null)

  const handleChage = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async () => {
    setError(null)
    try {
      await signup(formData.email, formData.password)
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
      <Button variant="outline-primary" onClick={handleSubmit}>Sign up</Button>
      <hr />

      <p>Already have an account? <Link to="/login">Login</Link></p>
    </Form>
  )
}

export default Forms