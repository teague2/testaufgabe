import { gql, useQuery } from "urql";
import { Product } from "../types/Product";

const GET_PRODUCTS = gql`
  query GetProducts {
    products {
      id
      name
      description
      price
      image
    }
  }
`;

// just as an example => no functionality yet
export interface GetProductsProps {
  limit?: number;
  skip?: number;
}

export interface GetProducsResponse {
  products: Product[];
}

export function useGetProducts({ limit, skip }: GetProductsProps = {}) {
  const [result] = useQuery<GetProducsResponse>({
    query: GET_PRODUCTS,
    variables: { limit, skip },
  });

  return result;
}