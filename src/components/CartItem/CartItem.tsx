import React from 'react'
import { Button, Stack } from 'react-bootstrap'
import { useCartContext } from '../../context/cartContext'
import storeItems from '../../data/items.json'
import './CartItem.css'

type CartItemProps = {
  id: number
  quant: number
}

export function CartItem({ id, quant }: CartItemProps) {
  const { removeCart } = useCartContext()
  const item = storeItems.find((e) => e.id === id)

  if (item == null) return null

  return (
    <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
      <img src={item.imgURL} className="imgCartItem"></img>
      <div className="me-auto">
        <div className="fw-bolder">
          {item.name}{' '}
          {quant > 1 && (
            <span className="badge bg-secondary text-light fw-bolder">
              {quant}x
            </span>
          )}
        </div>
        <div className="text-muted">R$ {item.price}</div>
      </div>
      <div className="">R${item.price * quant}</div>

      <Button
        variant="outline-danger"
        className="btn-sm"
        onClick={() => {
          removeCart(item.id)
        }}
      >
        &times;
      </Button>
    </Stack>
  )
}
