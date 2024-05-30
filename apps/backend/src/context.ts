import { CartService, cartService } from './cart'
import { ProductsService, productsService } from './products'
import products from './data/products.json'

export interface Context {
  productsService: ProductsService
  cartService: CartService
}

const cart = {
  items: new Map(),
  sum: 0,
}

export const context = () => ({
  cartService: cartService(cart),
  productsService: productsService(products),
})
