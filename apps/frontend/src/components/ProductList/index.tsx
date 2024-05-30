import { Product } from '../../types';
import ProductListItemComponent from '../ProductListItem';

type ProductListComponentProps = {
    products: Product[];
}

const ProductListComponent = ({products} : ProductListComponentProps) => {
  return (
    <>
      {products.map((product) => (
          <ProductListItemComponent product={product} key={product.id} />
      ))}
    </>
  );
};

export default ProductListComponent;