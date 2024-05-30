import { Cart, CartItem } from './cart.model'
import { pipe } from '../utils/pipe'

export interface CartService {
  getCart(): Cart
  addItem(cartItem: CartItem): Cart
  removeItem(productId: CartItem['productId']): Cart
  decrementItemQuantity(productId: CartItem['productId'], quantity: CartItem['quantity']): Cart
}

export const cartService = (cart: Cart): CartService => {
  const _saveCart = (update: Partial<Cart>) => Object.assign(cart, update)

  const _updateSum = (cart: Cart) => {
    const sum = [...cart.items.values()].reduce((sum, cartItem) => sum + cartItem.quantity * cartItem.price, 0)
    return { ...cart, sum }
  }

  const getCart = () => ({ ...cart })

  const addItem = (cartItem: CartItem) => {
    const updatedCart = pipe(cart, addCartItemOrIncreaseQuantity(cartItem), _updateSum)

    return _saveCart(updatedCart)
  }

  const removeItem = (productId: CartItem['productId']) => {
    const updatedCart = pipe(cart, removeCartItem(productId), _updateSum)
    return _saveCart(updatedCart)
  }

  const decrementItemQuantity = (productId: CartItem['productId'], quantity: CartItem['quantity']) => {
    const updatedCart = pipe(cart, decrementCartItemQuantity(productId, quantity), _updateSum)
    return _saveCart(updatedCart)
  }

  return {
    getCart,
    addItem,
    removeItem,
    decrementItemQuantity,
  }
}

const addCartItemOrIncreaseQuantity =
  (cartItem: CartItem) =>
  (cart: Cart): Cart => {
    const quantity = (cart.items.get(cartItem.productId)?.quantity || 0) + cartItem.quantity
    const items = new Map(cart.items).set(cartItem.productId, { ...cartItem, quantity })
    return { ...cart, items }
  }

const decrementCartItemQuantity =
  (productId: CartItem['productId'], quantity: CartItem['quantity']) =>
  (cart: Cart): Cart => {
    const item = cart.items.get(productId)
    if (!item) return { ...cart }
    return {
      ...cart,
      items: new Map(cart.items).set(productId, {
        ...item,
        quantity: item.quantity <= 1 ? 1 : item.quantity - quantity,
      }),
    }
  }
  
const removeCartItem =
  (productId: CartItem['productId']) =>
  (cart: Cart): Cart => {
    const items = new Map(cart.items)
    items.delete(productId)
    return { ...cart, items }
  }
