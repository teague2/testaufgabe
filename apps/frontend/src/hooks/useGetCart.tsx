import { gql, useQuery } from "urql";
import { Cart } from "../types/Cart";
import { useEffect } from "react";

const GET_CART = gql`
  query GetCart {
    cart {
      sum
      items
    }
  }
`;

interface GetCartProps {
  polling: boolean;
  pollInterval?: number;
}

interface GetCartResponse {
  cart: Cart;
}

export function useGetCart({ polling, pollInterval }: GetCartProps = { polling: false, pollInterval: 5000 }) {
  const [result, reexecuteQuery] = useQuery<GetCartResponse>({
    query: GET_CART,
  });
 
  useEffect(() => {
    if (!polling || result.fetching) return;

    // Set up to refetch in one second, if the query is idle
    const timerId = setTimeout(() => {
      reexecuteQuery({ requestPolicy: "network-only" });
    }, pollInterval);

    return () => clearTimeout(timerId);
  }, [polling, pollInterval, result.fetching, reexecuteQuery]);
  
  const { data, fetching, error } = result;

  return {
    data,
    fetching,
    error,
  };
}