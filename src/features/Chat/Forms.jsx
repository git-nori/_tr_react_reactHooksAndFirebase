import React, { useState } from 'react'

import { Form, Button, Alert } from 'react-bootstrap'

const Forms = ({ submitCb }) => {
  const [content, setContent] = useState("")
  const [error, setError] = useState(null)

  const handleChage = (e) => {
    setContent(e.target.value)
  }

  const handleSubmit = () => {
    submitCb(content)
    setContent("")
  }

  return (
    <Form>
      <Form.Group>
        <Form.Control
          as="textarea"
          rows="2"
          placeholder="input message"
          onChange={handleChage}
          value={content}
        />
      </Form.Group>
      <Button variant="outline-success" onClick={handleSubmit}>Send</Button>
    </Form>
  )
}

export default Forms