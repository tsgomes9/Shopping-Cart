import React, { ReactNode, useState } from 'react'
import { useContext, createContext } from 'react'
import { ShoppingCart } from '../components/ShoppingCart/ShoppingCart'
import { useLocalStorage } from '../hooks/useLocalStorage'

type CartProviderProps = {
  children: ReactNode
}

type CartContext = {
  openCart: () => void
  closeCart: () => void
  getItemQuant: (id: number) => number
  increaseCartQuant: (id: number) => void
  decreaseCartQuant: (id: number) => void
  removeCart: (id: number) => void
  cartQuant: number
  cartItems: CartItem[]
}

type CartItem = {
  id: number
  quant: number
}

const CartContext = createContext({} as CartContext)

export function useCartContext() {
  return useContext(CartContext)
}

export function CartProvider({ children }: CartProviderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    [],
  )

  const cartQuant = cartItems.reduce((quant, item) => item.quant + quant, 0)

  const openCart = () => {
    setIsOpen(true)
  }
  const closeCart = () => {
    setIsOpen(false)
  }

  function getItemQuant(id: number) {
    return cartItems.find((item) => item.id === id)?.quant || 0
  }

  function increaseCartQuant(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id) == null) {
        return [...currentItems, { id, quant: 1 }]
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quant: item.quant + 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function decreaseCartQuant(id: number) {
    setCartItems((currentItems) => {
      if (currentItems.find((item) => item.id === id)?.quant == 1) {
        return currentItems.filter((item) => item.id !== id)
      } else {
        return currentItems.map((item) => {
          if (item.id === id) {
            return { ...item, quant: item.quant - 1 }
          } else {
            return item
          }
        })
      }
    })
  }

  function removeCart(id: number) {
    setCartItems((currentItems) => {
      return currentItems.filter((item) => item.id !== id)
    })
  }

  return (
    <CartContext.Provider
      value={{
        getItemQuant,
        increaseCartQuant,
        decreaseCartQuant,
        removeCart,
        cartItems,
        cartQuant,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </CartContext.Provider>
  )
}
