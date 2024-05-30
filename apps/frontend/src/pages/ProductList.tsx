import ProductListComponent from "../components/ProductList";
import { useGetProducts } from "../hooks/useGetProducts";

const ProductListPage = () => {
  const { data, fetching, error } = useGetProducts();

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto flex items-center flex-wrap pt-4 pb-12">
        <nav id="store" className="w-full z-30 top-0 px-6 py-1">
          <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 px-2 py-3">
            <a
              className="uppercase tracking-wide no-underline hover:no-underline font-bold text-gray-800 text-xl "
              href="/"
            >
              Store
            </a>
          </div>
        </nav>

        <ProductListComponent products={data!.products} />
      </div>
    </section>
  );
};

export default ProductListPage;
