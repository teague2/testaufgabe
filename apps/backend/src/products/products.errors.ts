import { Data } from 'effect'
import { ProductId } from './product.model'

export const ProductsErrors = {
  ProductNotFound: 'PRODUCT_NOT_FOUND',
} as const

export type ProductsError = ProductNotFoundError

export class ProductNotFoundError extends Data.TaggedError(ProductsErrors.ProductNotFound)<{
  id: ProductId
}> {}
