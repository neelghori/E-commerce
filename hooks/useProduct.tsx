import { CartContextProvider } from "@Ecommerce/Context/CartContext";
import { ProductDataProps } from "@Ecommerce/Types/Container/ProductList";
import { CartCreateContextProps } from "@Ecommerce/Types/Context";
import { getProductlist } from "@Ecommerce/lib/ProductList";
import React, { useContext, useEffect, useState } from "react";

const useProduct = (product: ProductDataProps[]) => {
  const [productArray, setProductArray] = useState<ProductDataProps[]>([]);

  const { state } = useContext(CartContextProvider);
  useEffect(() => {
    setProductArray(product);
  }, [product]);
  const getProductListFunc = async (state: CartCreateContextProps["state"]) => {
    const response = await getProductlist();
    if (response) {
      setProductArray(response);
    }
  };
  useEffect(() => {
    if (state?.updateProduct) {
      getProductListFunc(state);
    }
  }, [state?.updateProduct]);
  return {
    productArray,
    setProductArray,
  };
};

export default useProduct;
