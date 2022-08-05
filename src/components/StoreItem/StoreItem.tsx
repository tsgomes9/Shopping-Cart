import React from 'react'
import { Card, Button } from 'react-bootstrap'
import { useCartContext } from '../../context/cartContext'

type StoreItemProps = {
  id: number
  name: string
  price: number
  imgURL: string
}

function StoreItem({ id, name, price, imgURL }: StoreItemProps) {
  const {
    getItemQuant,
    increaseCartQuant,
    decreaseCartQuant,
    removeCart,
  } = useCartContext()
  const quant = getItemQuant(id)

  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imgURL}
        height="200rem"
        style={{ objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-4 fw-light">{name}</span>
          <span className="fs-6 fw-bolder ms-2">R$ {price},00</span>
        </Card.Title>
        <div className="m-auto">
          {quant === 0 ? (
            <Button variant="warning" onClick={() => increaseCartQuant(id)}>
              + Adicionar item
            </Button>
          ) : (
            <div className="d-flex flex-column align-items-center gap-3">
              <div className="d-flex align-items-center justify-content-center gap-3">
                <Button
                  className="px-3"
                  variant="warning"
                  onClick={() => decreaseCartQuant(id)}
                >
                  -
                </Button>
                <div>
                  <span className="fs-5">{quant}</span>
                </div>
                <Button
                  className="px-3"
                  variant="warning"
                  onClick={() => increaseCartQuant(id)}
                >
                  +
                </Button>
              </div>
              <Button variant="outline-danger" onClick={() => removeCart(id)}>
                remover item
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  )
}

export default StoreItem
