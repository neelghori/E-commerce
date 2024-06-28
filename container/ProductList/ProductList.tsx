"use client";
import { ProductDataProps } from "@Ecommerce/Types/Container/ProductList";
import ProductCard from "./ProductCard";
import useProduct from "@Ecommerce/hooks/useProduct";

const ProductList: React.FC<{ productdata: ProductDataProps[] }> = (props) => {
  const { productArray } = useProduct(props?.productdata);
  return (
    <div className="mx-auto">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-[100rem] lg:px-8 flex flex-col gap-20">
        <h2 className="text-4xl lg:text-5xl tex-center flex justify-center w-full font-bold">
          Products List
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {productArray &&
            productArray.length > 0 &&
            productArray.map((product) => {
              return <ProductCard {...product} key={product.id} />;
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
