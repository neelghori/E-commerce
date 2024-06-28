"use client";
import { CartContextProvider } from "@Ecommerce/Context/CartContext";
import { SidebarContainerProps } from "@Ecommerce/Types/Container/Sidebar/index";
import { CartReducerAction } from "@Ecommerce/Types/Context";
import Button from "@Ecommerce/components/UI/Button";
import Loader from "@Ecommerce/components/UI/Loader";
import useCart from "@Ecommerce/hooks/useCart";
import { DialogPanel, DialogTitle } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import React, { useContext } from "react";
// sidebar checkout component to checkout or place order
const SidebarContainer: React.FC<SidebarContainerProps> = (props) => {
  const { cartData, loader, checkoutFunc } = useCart(props);
  const { state, dispatch } = useContext(CartContextProvider);
  //total checkout amount of cart
  const totalCheckoutAmount =
    state.cart &&
    state.cart.length > 0 &&
    state.cart.reduce(
      (acc, curr) =>
        acc +
        parseInt(curr?.product_price) * (curr?.quantity ? curr?.quantity : 1),
      0
    );
  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden bg-black/65">
        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <DialogPanel
            transition
            className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
          >
            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
              <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                <div className="flex items-start justify-between">
                  <DialogTitle className="text-lg font-medium text-gray-900">
                    Shopping cart
                  </DialogTitle>
                  <div className="ml-3 flex h-7 items-center">
                    <button
                      type="button"
                      className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      onClick={() => props?.setOpen(false)}
                    >
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {state?.cart &&
                        state?.cart?.length > 0 &&
                        state?.cart.map((product) => (
                          <li key={product.id} className="flex py-6">
                            <div className="overflow-hidden rounded-md border border-gray-200">
                              <Image
                                src={product.product_image}
                                alt={product.product_image}
                                width={100}
                                height={100}
                              />
                            </div>

                            <div className="ml-4 flex flex-1 flex-col gap-4">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>{product.product_name}</h3>
                                  <p className="ml-4">
                                    ${product.product_price}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-gray-500">
                                  Qty {product.quantity}
                                </p>

                                <div className="flex">
                                  <Button
                                    type="button"
                                    onClick={() => {
                                      dispatch({
                                        type: CartReducerAction.DELETEPRODUCTFROMCART,
                                        payload: product,
                                      });
                                    }}
                                    classname="!bg-transparent !p-0 !text-red-500 !font-normal !border-none !outline-none"
                                  >
                                    Remove
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base text-gray-900 font-semibold">
                  <p>Subtotal</p>
                  <p>
                    {totalCheckoutAmount ? `$${totalCheckoutAmount}` : `$0.00`}
                  </p>
                </div>
                <div className="mt-6">
                  <Button
                    classname="!px-6 !py-3 w-full !bg-gradient-to-br !from-pink-400 !to-[#0055D1]"
                    onClick={checkoutFunc}
                  >
                    {loader ? (
                      <div className="flex gap-2 justify-center">
                        <Loader />
                        <p>Loading...</p>
                      </div>
                    ) : (
                      <p> Checkout</p>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </div>
  );
};

export default SidebarContainer;
