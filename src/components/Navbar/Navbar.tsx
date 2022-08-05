import React from 'react'
import { Button, Container, Nav, Navbar as NavbarBt } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { useCartContext } from '../../context/cartContext'
import './Navbar.css'

export function Navbar() {
  const { openCart, cartQuant } = useCartContext()
  return (
    <NavbarBt className="bg-dark text-light shadow-sm mb-3">
      <Container>
        <Nav className="me-auto">
          {/* <Nav.Link to="/" className="text-light me-4" as={NavLink}>
            Página inicial
          </Nav.Link> */}

          <Nav.Link to="/store" className="text-light me-4" as={NavLink}>
            Loja
          </Nav.Link>

          {/* <Nav.Link to="/about" className="text-light me-4" as={NavLink}>
            Sobre nós
          </Nav.Link> */}
        </Nav>
        {cartQuant > 0 && (
          <Button className="button-cart" variant="warning" onClick={openCart}>
            <span className="material-symbols-outlined">shopping_cart</span>
            <div className="button-quant-cart">{cartQuant}</div>
          </Button>
        )}
      </Container>
    </NavbarBt>
  )
}
