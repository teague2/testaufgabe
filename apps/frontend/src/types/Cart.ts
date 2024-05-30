export interface Cart {
  items: CartItem[];
  sum: number;
}

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}
