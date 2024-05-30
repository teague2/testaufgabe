import { Context } from "../context"
import { Product, ProductId } from "./product.model"

export const getProduct = (_: any, args: { id: ProductId }, { productsService }: Context): Product | undefined =>
  productsService.getProduct(Number(args.id))
export const getProducts = (_: any, __: any, { productsService }: Context): Product[] | undefined =>
  productsService.getProducts()
