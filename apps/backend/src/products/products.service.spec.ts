import { describe, expect, it, vi } from 'vitest'
import { productsService } from './products.service'
import { type Product } from './product.model' // Assuming your product model resides in ./product.model.ts file

describe('Products Service Tests', () => {
  it('should retrieve all products', async () => {
    const mockProducts: Product[] = [
      { id: 1, name: 'Product 1', description: 'First product', image: 'https://fake.image.com/1', price: 1 },
      { id: 2, name: 'Product 2', description: 'Second product', image: 'https://fake.image.com/2', price: 2 },
    ]

    const result = await productsService(mockProducts).getProducts()
    expect(result).toEqual(mockProducts)
  })

  it('should retrieve a single product', async () => {
    const productId = 1
    const mockProduct: Product = {
      id: 1,
      name: 'Product 1',
      description: 'First product',
      image: 'https://fake.image.com/1',
      price: 1,
    }

    const result = await productsService([mockProduct]).getProduct(productId)
    expect(result).toEqual(mockProduct)
  })
})
