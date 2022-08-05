import React from 'react'
import items from '../data/items.json'
import { Col, Row } from 'react-bootstrap'
import StoreItem from '../components/StoreItem/StoreItem'

export function Store() {
  return (
    <div>
      <h1 className="fw-light mb-4">Loja</h1>

      <Row xs={1} lg={3} md={2} className="g-3">
        {items.map((e) => (
          <Col key={e.id}>
            <StoreItem {...e} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
