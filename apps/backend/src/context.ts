import { CartService, cartService } from './cart'
import { Context, Layer, ManagedRuntime } from 'effect'
import {
  OldProductsService,
  ProductsDatabaseLayer,
  ProductsRepositoryLayer,
  ProductsService,
  ProductsServiceLayer,
  oldProductsService,
} from './products/products.service'
import products from './data/products.json'

export type Context = {
  productsService: OldProductsService
  cartService: CartService
  runtime: ManagedRuntime.ManagedRuntime<ProductsService, never>
}

const cart = {
  items: new Map(),
  sum: 0,
}

const contextLayer = ProductsServiceLayer.pipe(
  Layer.provide(ProductsRepositoryLayer.pipe(Layer.provide(ProductsDatabaseLayer))),
)
const runtime = ManagedRuntime.make(contextLayer)

export const context = () => {
  return {
    cartService: cartService(cart),
    productsService: oldProductsService(products),
    runtime,
  }
}
