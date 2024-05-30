import { Cart } from "../types";
import { gql, useMutation } from "urql";

const ADD_CART_ITEM = gql`
  mutation AddCartItem($productId: ID!, $quantity: Int! = 1) {
    addCartItem(productId: $productId, quantity: $quantity) {
      items
      sum
    }
  }
`;

export interface AddCartItemVariables {
  productId: number;
  quantity: number;
}

export interface AddCartItemResponse {
  cart: Cart;
}

export type AddCartItem = ReturnType<typeof useAddCartItem>["addCartItem"];

export const useAddCartItem = () => {
  const [_, mutationFunction] = useMutation<
    AddCartItemResponse,
    AddCartItemVariables
  >(ADD_CART_ITEM);

  const addCartItem = async (
    productId: number,
    quantity: number = 1,
  ): Promise<Cart | undefined> => {
    try {
      const response = await mutationFunction({ productId, quantity });
      return response.data?.cart;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { addCartItem };
};
