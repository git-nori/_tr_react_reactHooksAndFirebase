import React from 'react'
import moment from 'moment'
import { Card } from 'react-bootstrap'

const Cards = ({ cardList }) => {
  const renderCards = () => {
    return cardList.map(data => {
      return (
        <Card key={data.uid} className="mb-3" border="info">
          <Card.Body>
            <Card.Text>{data.content}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small>{moment(data.timestamp.toDate()).format("YY-MM-DD hh:mm:ss")}</small>
          </Card.Footer>
        </Card>
      )
    })
  }

  return (
    <>
      {renderCards()}
    </>
  )
}

export default Cards