import { RemoveCartItem } from "../../hooks/useRemoveCartItem";
import { CartItem } from "../../types/Cart";

type CartItemListComponentProps = {
  items: CartItem[];
  onRemoveCartItem: RemoveCartItem;
};

const CartItemListComponent = ({
  items,
  onRemoveCartItem,
}: CartItemListComponentProps) => {
  return (
    <>
      <table className="shadow-lg bg-white border-collapse table-auto w-full text-sm">
        <thead>
          <tr>
            <th className="bg-gray-100 border text-left px-8 py-4">Product</th>
            <th className="bg-gray-100 border text-left px-8 py-4">Price</th>
            <th className="bg-gray-100 border text-left px-8 py-4">Quantity</th>
            <th className="bg-gray-100 border text-left px-8 py-4">Sum</th>
            <th className="bg-gray-100 border text-left px-8 py-4 w-5"></th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {items.map((item) => (
            <tr key={item.productId}>
              <td className="border px-8 py-4">
                <a href={`/products/${item.productId}`}>{item.name}</a>
              </td>
              <td className="border px-8 py-4">{item.price}€</td>
              <td className="border px-8 py-4">{item.quantity}</td>
              <td className="border px-8 py-4">
                {item.quantity * item.price}€
              </td>
              <td className="border px-8 py-4">
                <button
                  type="button"
                  onClick={() => onRemoveCartItem(item.productId)}
                  className="text-xs text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-sm px-2 py-2 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CartItemListComponent;
