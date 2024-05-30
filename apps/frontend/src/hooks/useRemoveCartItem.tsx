import { Cart } from "../types";
import { gql, useMutation } from "urql";

const REMOVE_CART_ITEM = gql`
  mutation RemoveCartItem($productId: ID!) {
    removeCartItem(productId: $productId) {
      items
      sum
    }
  }
`;

export interface RemoveCartItemVariables {
  productId: number;
}

export interface RemoveCartItemResponse {
  cart: Cart;
}

export type RemoveCartItem = ReturnType<typeof useRemoveCartItem>["removeCartItem"];

export const useRemoveCartItem = () => {
  const [_, mutationFunction] = useMutation<
    RemoveCartItemResponse,
    RemoveCartItemVariables
  >(REMOVE_CART_ITEM);

  const removeCartItem = async (
    productId: number
  ): Promise<Cart | undefined> => {
    try {
      const response = await mutationFunction({ productId });
      return response.data?.cart;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return { removeCartItem };
};