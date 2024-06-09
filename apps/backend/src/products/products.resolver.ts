import { Cause, Effect, Exit } from 'effect'
import { ProductsService } from './products.service'
import { ProductId } from './product.model'
import { Context } from '../context'
import { ProductsError } from './products.errors'
import { GraphQLError } from 'graphql'

export const getProduct = async (_, { id }: { id: ProductId }, { runtime }: Context) => {
  const productOrError = await Effect.gen(function* () {
    const productsService = yield* ProductsService
    return yield* productsService.getProduct(Number(id))
  }).pipe(runtime.runPromiseExit)

  return Exit.match(productOrError, {
    onFailure: cause => onFailure(cause),
    onSuccess: value => value,
  })
}

export const getProducts = async (_, __, { runtime }: Context) => {
  return runtime.runPromise(
    Effect.gen(function* () {
      const productsService = yield* ProductsService
      return yield* productsService.getProducts()
    }),
  )
}

const onFailure = (cause: Cause.Cause<ProductsError>) => {
  switch (cause._tag) {
    case 'Fail':
      switch (cause.error._tag) {
        case 'PRODUCT_NOT_FOUND':
          throw new GraphQLError(`product with id '${cause.error.id}' not found`, {
            extensions: { code: cause.error._tag },
          })
      }
  }
}
