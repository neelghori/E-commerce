import { CartContextProvider } from "@Ecommerce/Context/CartContext";
import { ProductDataProps } from "@Ecommerce/Types/Container/ProductList";
import { CartReducerAction } from "@Ecommerce/Types/Context";
import AddToCart from "@Ecommerce/components/UI/AddToCart";
import Button from "@Ecommerce/components/UI/Button";
import Input from "@Ecommerce/components/UI/Input";
import Loader from "@Ecommerce/components/UI/Loader";
import useSearch from "@Ecommerce/hooks/useSearch";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useContext, useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const Search = () => {
  const [text, setText] = useState<string>("");
  const { state, dispatch } = useContext(CartContextProvider);
  const {
    searchPopup,
    setSearchPopup,
    suggestion,
    searchResult,
    loading,
    searchLoader,
  } = useSearch(text);
  const addTocart = (product: ProductDataProps) => {
    const inCartExist =
      state.cart && state.cart.length > 0
        ? state.cart.find((products) => products.id == product.id)
        : null;
    const checkQuantityAndInventory =
      product.inventory - (inCartExist?.quantity ? inCartExist.quantity : 0);
    if (checkQuantityAndInventory <= 0) {
      toast.error("You Can't Add More Product, Due to Out Of Stock");
      return;
    }
    if (inCartExist) {
      dispatch({
        type: CartReducerAction.UPDATEQUANTITY,
        payload: {
          ...product,
          quantity_type: "ADD",
        },
      });
      toast.success("Product Add To Cart");
    } else {
      dispatch({
        type: CartReducerAction.ADDTOCART,
        payload: {
          ...product,
          quantity: 1,
        },
      });
    }
  };
  return (
    <div
      className={`flex flex-col gap-1 relative ${
        searchPopup ? "w-auto md:w-[600px] lg:w-[800px] xl:w-[900px]" : ""
      }`}
      onFocus={() => {
        setSearchPopup(true);
      }}
    >
      <Input
        type="text"
        id="search"
        placeholder="Search Product..."
        icon={searchPopup ? true : false}
        classnames="w-96 !outline-none !py-3 !pr-10"
        value={text}
        onChange={(e) => {
          setText(e.target?.value);
        }}
        IconOnClick={() => {
          setText("");
          setSearchPopup(false);
        }}
      />
      {searchPopup ? (
        <div
          className={`w-full  ${
            searchResult.length > 6
              ? "h-[600px] overflow-auto"
              : "h-[400px] overflow-auto md:h-auto"
          }  bg-white p-3 md:p-5 flex flex-col shadow-2xl rounded-lg absolute top-[60px] right-0 transition-all duration-300`}
        >
          {searchLoader ? (
            <div className="pb-5">
              <Loader />
            </div>
          ) : (
            searchResult &&
            searchResult.length > 0 && (
              <div className="flex flex-col gap-2 pb-5">
                <p className="text-lg md:text-xl font-semibold tracking-normal">
                  Search Result
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {searchResult &&
                    searchResult.length > 0 &&
                    searchResult.map((element: any) => {
                      const isInCart =
                        state.cart &&
                        state.cart.length > 0 &&
                        state.cart.find((ele) => ele.id == element.id);
                      return (
                        <div key={element.id}>
                          <div className="w-full h-[170px] relative overflow-hidden rounded-lg bg-gray-200">
                            <Image
                              src={element.product_image}
                              alt={element.product_image}
                              layout="fill"
                            />
                          </div>
                          <h3 className="mt-4 text-xs text-gray-700">
                            {element.product_name}
                          </h3>
                          <p className="mt-1 text-sm font-medium text-gray-900 flex flex-col justify-between gap-3">
                            <span>${element.product_price}</span>
                          </p>
                          <div className="mt-2">
                            <AddToCart
                              product={element}
                              isInCart={isInCart as ProductDataProps}
                            />
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )
          )}

          {loading ? (
            <Loader />
          ) : (
            suggestion &&
            suggestion.length > 0 && (
              <div className="flex flex-col gap-3">
                <p className="text-lg md:text-xl font-semibold tracking-normal">
                  Suggestion
                </p>
                <div className="flex flex-wrap gap-3">
                  {suggestion &&
                    suggestion.length > 0 &&
                    suggestion.map((element: any) => {
                      return (
                        <div
                          key={element.id}
                          className="px-2 py-2 bg-gray-300 rounded-lg"
                          onClick={() => addTocart(element)}
                        >
                          <h3 className="text-xs lg:text-sm text-black cursor-pointer">
                            {`${element.product_name} - $${element.product_price}`}
                          </h3>
                        </div>
                      );
                    })}
                </div>
              </div>
            )
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Search;
