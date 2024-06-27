"use client";
import { CartContextProvider } from "@Ecommerce/Context/CartContext";
import { ProductDataProps } from "@Ecommerce/Types/Container/ProductList";
import { CartReducerAction } from "@Ecommerce/Types/Context";
import Button from "@Ecommerce/components/UI/Button";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { useContext } from "react";

const ProductList: React.FC<{ productdata: ProductDataProps[] }> = (props) => {
  const { state, dispatch } = useContext(CartContextProvider);
  return (
    <div className="">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-[100rem] lg:px-8 flex flex-col gap-20">
        <h2 className="text-4xl lg:text-5xl font-bold">Products List</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {props.productdata &&
            props.productdata.length > 0 &&
            props.productdata.map((product) => {
              const isInCart =
                state.cart &&
                state.cart.length > 0 &&
                state.cart.find((ele) => ele.id == product.id);
              return (
                <div key={product.id} className="group flex flex-col gap-4">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <Image
                      src={product.product_image}
                      alt={product.product_image}
                      width={400}
                      height={400}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">
                    {product.product_name}
                  </h3>
                  <p className="mt-1 text-lg font-medium text-gray-900 flex justify-between items-center">
                    <span>${product.product_price}</span>
                    <span className="text-xs text-gray-500">
                      (
                      {isInCart
                        ? product.inventory -
                          (isInCart.quantity ? isInCart.quantity : 0)
                        : product.inventory}
                      )
                    </span>
                  </p>
                  {isInCart ? (
                    <Button classname="!bg-gray-200 !text-black !py-4 flex justify-between gap-4">
                      <span
                        className="text-lg"
                        onClick={() =>
                          dispatch({
                            type: CartReducerAction.UPDATEQUANTITY,
                            payload: {
                              ...product,
                              quantity_type: "MINUS",
                            },
                          })
                        }
                      >
                        <MinusIcon color="black" className="size-5" />
                      </span>
                      <span>{isInCart.quantity}</span>
                      <span
                        onClick={() =>
                          dispatch({
                            type: CartReducerAction.UPDATEQUANTITY,
                            payload: {
                              ...product,
                              quantity_type: "ADD",
                            },
                          })
                        }
                      >
                        <PlusIcon color="black" className="size-5" />
                      </span>
                    </Button>
                  ) : (
                    <Button
                      classname="!bg-gray-200 !text-black !py-4"
                      onClick={() =>
                        dispatch({
                          type: CartReducerAction.ADDTOCART,
                          payload: {
                            ...product,
                            quantity: 1,
                          },
                        })
                      }
                    >
                      Add to Cart
                    </Button>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
