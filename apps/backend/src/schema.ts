export const typeDefs = `#graphql
    scalar CartItems

    type Query {
       cart: Cart
       products: [Product]
       product(id: ID!): Product
    }

    type Mutation {
        addCartItem(productId: ID!, quantity: Int!): Cart
        decreaseCartItemQuantity(productId: ID!, quantity: Int!): Cart
        removeCartItem(productId: ID!): Cart
    }
    
    type CartItem {
        productId: Int
        name: String
        quantity: Int
        price: Int
    }

    type Cart {
        items: CartItems
        sum: Int
    }

    type Product {
        id: Int
        name: String
        description: String
        price: Int
        image: String
    }
`;