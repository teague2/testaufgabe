import { Context } from '../context'
import { ProductId } from '../products/product.model'
import { Cart, CartItemInput } from './cart.model'

export const getCart = (_: any, __: any, { cartService }: Context): Cart | undefined => cartService.getCart()

export const addCartItem = (
  _: any,
  { productId, quantity }: CartItemInput,
  { cartService, productsService }: Context,
): Cart | undefined => {
  const { name, price } = productsService.getProduct(Number(productId))
  const item = { productId, name, price, quantity }
  return cartService.addItem(item)
}

export const decreaseCartItemQuantity = (_: any, args: CartItemInput, { cartService }: Context): Cart | undefined => {
  return cartService.decrementItemQuantity(args.productId, args.quantity)
}

export const removeCartItem = (
  _: any,
  { productId }: { productId: ProductId },
  { cartService }: Context,
): Cart | undefined => {
  return cartService.removeItem(productId)
}
