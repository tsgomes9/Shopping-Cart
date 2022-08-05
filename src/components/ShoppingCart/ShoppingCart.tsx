import React from 'react'
import { Offcanvas, Stack } from 'react-bootstrap'
import { useCartContext } from '../../context/cartContext'
import { CartItem } from '../CartItem/CartItem'
import items from '../../data/items.json'

type ShoppingCartProps = {
  isOpen: boolean
}

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
  const { closeCart, cartItems } = useCartContext()
  return (
    <Offcanvas show={isOpen} onHide={closeCart} placement="end">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title className="fw-light fs-4">
          Seu carrinho
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Stack gap={3}>
          {cartItems.map((item) => (
            <CartItem key={item.id} {...item} />
          ))}
          <div className="ms-auto fw-bolder fs-5">
            <span className="fs-6 fw-light">Valor total: </span>
            <span className="fs-5">
              R$
              {cartItems.reduce((total, CartItem) => {
                const Item = items.find((e) => e.id === CartItem.id)
                return total + (Item?.price || 0) * CartItem.quant
              }, 0)}
            </span>
          </div>
        </Stack>
      </Offcanvas.Body>
    </Offcanvas>
  )
}
