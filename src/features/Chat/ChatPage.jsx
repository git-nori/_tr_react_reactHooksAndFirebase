import React, { useState, useEffect } from 'react'

import { auth, db } from '../../services/firebase'

import Cards from './Cards'
import Forms from './Forms'

import { Container, Col, Row, Alert } from 'react-bootstrap'

const ChatPage = () => {
  const [user, setUser] = useState(auth.currentUser)
  const [chats, setChats] = useState([])
  const [readErr, setReadErr] = useState(null)
  const [writeErr, setWriteErr] = useState(null)

  // firestoreのchatsコレクションの参照を格納
  const chatsRef = db.collection("chats")

  // firestoreからデータを取得し、useStateにセット
  useEffect(() => {
    setReadErr(null)
    try {
      chatsRef.onSnapshot(snapshot => {
        const chats = [...snapshot.docs].sort((a, b) => {
          // timestampの昇順にソート
          return a.data().timestamp - b.data().timestamp
        })
          .map(doc => {
            if (doc.exists) {
              return doc.data()
            }
          }, [])
        setChats(chats)
      })
    } catch (err) {
      setReadErr(err)
    }
  }, [chatsRef])

  const handleSubmitMsgForm = async (data) => {
    setWriteErr(null)
    try {
      const uid = Math.random() + 1
      await chatsRef.add({
        content: data,
        uid: uid,
        timestamp: new Date()
      })
    } catch (err) {
      setWriteErr(err)
    }
  }

  const renderAlert = err => {
    return err ? <Alert variant="danger">{err}</Alert> : null
  }

  const render = () => {
    if (chats.length > 0) {
      return (
        <>
          {renderAlert(writeErr)}
          <Row className="mb-3 justify-content-center">
            <Col sm="6">
              <Cards cardList={chats} />
            </Col>
          </Row>
          <Row className="mb-3 justify-content-center">
            <Col sm="6">
              <Forms submitCb={handleSubmitMsgForm} />
            </Col>
          </Row>
          <Row className="mb-5 justify-content-center">
            <Col sm="6">
              Login : <strong>{user.email}</strong>
            </Col>
          </Row>
        </>
      )
    } else {
      return (
        renderAlert(readErr)
      )
    }
  }

  return (
    <Container className="mt-5">
      {render()}
    </Container>
  )
}

export default ChatPage