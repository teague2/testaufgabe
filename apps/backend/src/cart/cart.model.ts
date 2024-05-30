import { ProductId } from "../products/product.model";

export type CartItemId = ProductId;

export interface CartItem {
  productId: ProductId;
  name: string;
  price: number;
  quantity: number;
}

export interface CartItemInput {
  productId: ProductId;
  quantity: number;
}

export interface Cart {
  items: Map<ProductId, CartItem>;
  sum: number;
}
