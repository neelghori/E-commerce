import React, { useContext } from "react";
import Button from "./Button";
import { CartContextProvider } from "@Ecommerce/Context/CartContext";
import { CartReducerAction } from "@Ecommerce/Types/Context";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { toast } from "sonner";
import { AddtoCartProps } from "@Ecommerce/Types/components/UI";

const AddToCart: React.FC<AddtoCartProps> = (props) => {
  const { state, dispatch } = useContext(CartContextProvider);

  return props?.isInCart ? (
    <Button classname="!bg-gray-200 !text-black !py-4 flex justify-between gap-4 !w-full">
      <span
        className="text-lg"
        onClick={() => {
          if (
            props?.isInCart &&
            props?.isInCart?.quantity &&
            props?.isInCart?.quantity <= 1
          ) {
            dispatch({
              type: CartReducerAction.DELETEPRODUCTFROMCART,
              payload: props?.product,
            });
          } else {
            dispatch({
              type: CartReducerAction.UPDATEQUANTITY,
              payload: {
                ...props?.product,
                quantity_type: "MINUS",
              },
            });
          }
        }}
      >
        <MinusIcon color="black" className="size-5" />
      </span>
      <span className="text-sm">{props?.isInCart.quantity}</span>
      <span
        onClick={() => {
          const checkQuantityAndInventory =
            props?.product.inventory -
            (props?.isInCart.quantity ? props?.isInCart.quantity : 0);
          if (checkQuantityAndInventory <= 0) {
            toast.error("You Can't Add More Product, Due to Out Of Stock");
            return;
          }
          dispatch({
            type: CartReducerAction.UPDATEQUANTITY,
            payload: {
              ...props?.product,
              quantity_type: "ADD",
            },
          });
        }}
      >
        <PlusIcon color="black" className="size-5" />
      </span>
    </Button>
  ) : (
    <Button
      classname={`!bg-gray-200 !text-black !py-4 !w-full ${
        props?.product.inventory <= 0 ? "!text-red-600 !bg-red-200/50" : ""
      }`}
      disabled={props?.product.inventory <= 0}
      onClick={() => {
        if (props?.product.inventory <= 0) {
          return;
        }
        dispatch({
          type: CartReducerAction.ADDTOCART,
          payload: {
            ...props?.product,
            quantity: 1,
          },
        });
      }}
    >
      {props?.product.inventory <= 0 ? "Out of Stock" : "Add to Cart"}
    </Button>
  );
};

export default AddToCart;
