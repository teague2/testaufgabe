import { gql, useQuery } from "urql";
import { Product } from "../types/Product";

const GET_PRODUCT = gql`
  query GetProduct($id: ID!) {
    product(id: $id) {
      id
      name
      description
      price
      image
    }
  }
`;

export interface GetProductProps {
  id: number;
}

export interface GetProductResponse {
  product: Product;
}

export function useGetProduct({ id }: GetProductProps) {
  const [result] = useQuery<GetProductResponse>({
    query: GET_PRODUCT,
    variables: { id },
  });

  return result;
}
