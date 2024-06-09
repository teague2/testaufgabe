import { type Product, type ProductId } from './product.model'
import { Effect, Context, Layer } from 'effect'
import products from '../data/products.json'
import { GraphQLError } from 'graphql'
import { ProductNotFoundError, ProductsErrors } from './products.errors'

export interface OldProductsService {
  getProduct(id: ProductId): Product
  getProducts(): Product[]
}

export const oldProductsService = (products: Product[]): OldProductsService => {
  const getProduct = (id: ProductId) => {
    const product = products.find(product => product.id === id)
    if (!product)
      throw new GraphQLError(`product with id '${id}' not found`, {
        extensions: { code: ProductsErrors.ProductNotFound },
      })
    return product
  }
  const getProducts = () => products.sort((a, b) => a.price - b.price)

  return {
    getProduct,
    getProducts,
  }
}

export class ProductsDatabase extends Context.Tag('ProductsDatabase')<ProductsDatabase, Product[]>() {}
export const ProductsDatabaseLayer = Layer.succeed(ProductsDatabase, ProductsDatabase.of(products))

export class ProductsRepository extends Context.Tag('ProductsRepository')<
  ProductsRepository,
  {
    readonly getProduct: (id: ProductId) => Effect.Effect<Product, ProductNotFoundError>
    readonly getProducts: () => Effect.Effect<Product[]>
  }
>() {}
export const ProductsRepositoryLayer = Layer.effect(
  ProductsRepository,
  Effect.gen(function* () {
    const products = yield* ProductsDatabase
    return {
      getProduct: (id: ProductId) =>
        Effect.gen(function* () {
          const product = products.find(product => product.id === id)
          if (!product) {
            return yield* Effect.fail(new ProductNotFoundError({ id }))
          }
          return yield* Effect.succeed(product)
        }),

      getProducts: () => Effect.succeed(products.sort((a, b) => a.price - b.price)),
    }
  }),
)

export class ProductsService extends Context.Tag('ProductsService')<
  ProductsService,
  {
    readonly getProduct: (id: ProductId) => Effect.Effect<Product, ProductNotFoundError>
    readonly getProducts: () => Effect.Effect<Product[]>
  }
>() {}
export const ProductsServiceLayer = Layer.effect(
  ProductsService,
  Effect.gen(function* () {
    const products = yield* ProductsRepository
    return {
      getProduct: (id: ProductId) => products.getProduct(Number(id)),
      getProducts: () => products.getProducts(),
    }
  }),
)
