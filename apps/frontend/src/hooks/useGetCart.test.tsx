import { beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useGetCart } from "./useGetCart";
import { Provider } from "urql";
import { never, makeSubject } from "wonka";
import { PropsWithChildren } from "react";


describe("useGetCart", () => {
  const mockProviderWrapper = ({ executeQuery }: { executeQuery: any }) => {
    const mockClient = {
      executeQuery,
      executeMutation: vi.fn(() => never),
      executeSubscription: vi.fn(() => never),
    };

    const wrapper = ({ children }: PropsWithChildren<any>) => (
      <Provider value={mockClient}>{children}</Provider>
    );

    return {
      mockClient,
      wrapper,
    };
  };

  beforeEach(() => {
    vi.useFakeTimers();
  });

  it("calls the GET_CART query when mounted", async () => {
    let fetching = false;

    const { wrapper } = mockProviderWrapper({
      executeQuery: vi.fn(() => never),
    });
    const { result } = renderHook(() => useGetCart({ polling: false }), {
      wrapper,
    });

    act(() => {
      fetching = result.current.fetching;
    });

    expect(fetching).toBe(true);
  });

  it("sets a timer to refetch data after 5 seconds if polling is enabled", async () => {
    const { source, next, complete } = makeSubject();
    const spyFn = vi.fn(() => source);
    const { wrapper } = mockProviderWrapper({
      executeQuery: spyFn,
    });
    const { result } = renderHook(
      () => useGetCart({ polling: true, pollInterval: 50 }),
      {
        wrapper,
      }
    );

    const mockCart = {
      cart: {
        items: [],
        sum: 0,
      },
    };

    await act(() => {
      // is query not complete => fetching
      expect(result.current.fetching).toBe(true);
      // complete query
      next({ data: mockCart });
      next(complete);
    });

    expect(result.current.fetching).toBe(false);

    // advance timer so polling is started
    await vi.advanceTimersByTime(51);
    await act(() => {});

    expect(spyFn.mock.calls.length).toBe(2);
    expect(result.current.fetching).toBe(false);
    expect(result.current.data).toEqual(mockCart);
  });
});
