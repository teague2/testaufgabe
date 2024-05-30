import { GraphQLScalarType, Kind } from 'graphql'

export const CartItemsScalar = new GraphQLScalarType({
  name: 'CartItems',
  description: 'Custom scalar type for CartItems',
  parseValue(value: any) {
    return new Map(value) // Convert incoming array of objects to Map
  },
  serialize(value: any) {
    return Array.from(value.values()) // Convert outgoing Map to array
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.LIST) {
      return new Map(ast.values.map((item: any) => [item.key, item.value]))
    }
    return null
  },
})
