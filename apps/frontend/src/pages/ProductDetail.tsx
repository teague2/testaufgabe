import ProductDetailComponent from "../components/ProductDetail";
import { useParams } from "react-router-dom";
import { useGetProduct } from "../hooks/useGetProduct";
import { useAddCartItem } from "../hooks/useAddCartItem";

const ProductDetailPage = () => {
  const params = useParams<{ productId: string }>();

  const { data, fetching, error } = useGetProduct({
    id: Number(params.productId),
  });
  const { addCartItem } = useAddCartItem();

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <div>
      <ProductDetailComponent
        product={data!.product}
        onAddCartItem={addCartItem}
      />
    </div>
  );
};

export default ProductDetailPage;
