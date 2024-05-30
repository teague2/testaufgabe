import CartItemListComponent from "../components/CartItemList";
import { useGetCart } from "../hooks/useGetCart";
import { useRemoveCartItem } from "../hooks/useRemoveCartItem";
import { CartItem } from "../types/Cart";

const CartPage = () => {
  const { data, fetching, error } = useGetCart();
  const { removeCartItem } = useRemoveCartItem();

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  const cartItems: CartItem[] = data?.cart?.items || [];

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <nav id="cart" className="w-full z-30 top-0 px-6 py-1">
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
            <a
              className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
              href="/cart"
            >
              Cart
            </a>

            <div className="flex items-center" id="cart-nav-content"></div>
          </div>
        </nav>

        <CartItemListComponent
          items={cartItems}
          onRemoveCartItem={removeCartItem}
        />
      </div>
    </section>
  );
};

export default CartPage;
