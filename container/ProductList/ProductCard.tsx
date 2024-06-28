"use client";
import React from "react";
import { CartContextProvider } from "@Ecommerce/Context/CartContext";
import { ProductDataProps } from "@Ecommerce/Types/Container/ProductList";
import Image from "next/image";
import { useContext } from "react";
import AddToCart from "@Ecommerce/components/UI/AddToCart";
// single product card show in list of products
const ProductCard: React.FC<ProductDataProps> = (props) => {
  //context hook to fetch the context data
  const { state, dispatch } = useContext(CartContextProvider);
  const product = props;
  //check product is available in cart or not
  const isInCart =
    state.cart &&
    state.cart.length > 0 &&
    state.cart.find((ele) => ele.id == product.id);
  return (
    <div key={product.id} className="group flex flex-col gap-4">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
        {/* image optimization */}
        <Image
          src={product.product_image}
          alt={product.product_image}
          width={400}
          height={400}
          className="object-cover"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700">{product.product_name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900 flex justify-between items-center">
        <span>${product.product_price}</span>
        <span className="text-xs text-gray-500">
          (
          {isInCart
            ? product.inventory - (isInCart.quantity ? isInCart.quantity : 0)
            : product.inventory}
          )
        </span>
      </p>
      {/* add to cart button for common use */}
      <AddToCart product={product} isInCart={isInCart as ProductDataProps} />
    </div>
  );
};

export default ProductCard;
