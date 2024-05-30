import { CartItemsScalar } from "./cart/cart.scalar";
import { addCartItem, decreaseCartItemQuantity, getCart, removeCartItem } from "./cart";
import { getProduct, getProducts } from "./products";

export const resolvers = {
    CartItems: CartItemsScalar,

    Query: {
        cart: getCart,
        products: getProducts,
        product: getProduct,
    },

    Mutation: {
        addCartItem,
        decreaseCartItemQuantity,
        removeCartItem
    }
};