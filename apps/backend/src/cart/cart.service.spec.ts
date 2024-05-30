import { describe, expect, it } from 'vitest'
import { cartService } from './cart.service'
import { type Cart, type CartItem } from './cart.model' // Assuming your product model resides in ./product.model.ts file

describe('Cart Service Tests', () => {
  it('should retrieve the cart', async () => {
    const mockCart: Cart = {
      items: new Map([
        [1, { productId: 1, name: 'Product 1', price: 1, quantity: 3 }],
        [2, { productId: 2, name: 'Product 2', price: 2, quantity: 5 }],
      ]),
      sum: 13,
    }
    const result = await cartService(mockCart).getCart()
    expect(result).toEqual(mockCart)
  })

  it('should add an item to the cart', async () => {
    const mockCart: Cart = {
      items: new Map([
        [1, { productId: 1, name: 'Product 1', price: 1, quantity: 3 }],
        [2, { productId: 2, name: 'Product 2', price: 2, quantity: 5 }],
      ]),
      sum: 13,
    }
    const mockItem: CartItem = {
      productId: 3,
      name: 'Product 3',
      price: 14,
      quantity: 1,
    }

    const result = await cartService(mockCart).addItem(mockItem)
    expect(result).toEqual({
      items: new Map([
        [1, { productId: 1, name: 'Product 1', price: 1, quantity: 3 }],
        [2, { productId: 2, name: 'Product 2', price: 2, quantity: 5 }],
        [3, { productId: 3, name: 'Product 3', price: 14, quantity: 1 }],
      ]),
      sum: 27,
    })
  })

  it('should add remove an item from the cart', async () => {
    const mockCart: Cart = {
      items: new Map([
        [1, { productId: 1, name: 'Product 1', price: 1, quantity: 3 }],
        [2, { productId: 2, name: 'Product 2', price: 2, quantity: 5 }],
      ]),
      sum: 13,
    }
    const result = await cartService(mockCart).removeItem(1)
    expect(result).toEqual({
      items: new Map([[2, { productId: 2, name: 'Product 2', price: 2, quantity: 5 }]]),
      sum: 10,
    })
  })
})
