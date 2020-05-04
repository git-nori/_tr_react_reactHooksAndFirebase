import React from 'react'
import { Link } from 'react-router-dom'

import Forms from './Forms'

import { Container } from 'react-bootstrap'

const LoginPage = () => {
  return (
    <Container>
      <h1>Login to <Link to="/">Chatty</Link></h1>
      <Forms />
    </Container>
  )
}

export default LoginPage