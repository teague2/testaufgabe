import { GraphQLError } from "graphql";
import { Product, ProductId } from "./product.model";
import { ERRORS } from "../errors";

export interface ProductsService {
  getProduct(id: ProductId): Product;
  getProducts(): Product[];
}

export const productsService = (products: Product[]): ProductsService => {
  const getProduct = (id: ProductId) => {
    const product = products.find(product => product.id === id)
    if (!product)
      throw new GraphQLError(`product with id '${id}' not found`, { extensions: { code: ERRORS.PRODUCT_NOT_FOUND } })
    return product
  }
  const getProducts = () => products.sort((a, b) => a.price - b.price)

  return {
    getProduct,
    getProducts,
  }
}
