/* eslint-disable no-case-declarations */
import { ProductDataProps } from "@Ecommerce/Types/Container/ProductList";
import {
  CartReducerAction,
  CartReducerFunAction,
  InitialValueProps,
} from "@Ecommerce/Types/Context";
import { toast } from "sonner";

//initialvalue for context api

//reducer function for handling all login,register,adding book,editbook,delete book,setting initialvalue
const ReducerFunction = (
  state: InitialValueProps,
  action: CartReducerFunAction
): InitialValueProps => {
  const { type, payload } = action;
  switch (type) {
    case CartReducerAction.ADDTOCART:
      const duplicateCart = [...state.cart];
      if (payload) {
        duplicateCart.push(payload as ProductDataProps);
      }
      toast.success("Product Add to Cart");
      return {
        ...state,
        cart: duplicateCart,
      };
    case CartReducerAction.DELETEPRODUCTFROMCART:
      const stateCart = [...state.cart];
      const filterCart =
        stateCart && stateCart.length > 0
          ? stateCart.filter(
              (ele) => ele.id !== (payload as ProductDataProps)?.id
            )
          : [];
      toast.success("Product Remove from Cart");

      return {
        ...state,
        cart: filterCart,
      };
    case CartReducerAction.UPDATEQUANTITY:
      const UpdateQuantity = [...state.cart];
      const updateData =
        UpdateQuantity && UpdateQuantity.length > 0
          ? UpdateQuantity.map((ele) => {
              if (ele.id == (payload as ProductDataProps)?.id) {
                if ((payload as ProductDataProps)?.quantity_type == "ADD") {
                  return {
                    ...ele,
                    quantity: ele?.quantity ? ele.quantity + 1 : 1,
                  };
                } else {
                  return {
                    ...ele,
                    quantity: ele?.quantity ? ele.quantity - 1 : 0,
                  };
                }
              } else {
                return ele;
              }
            })
          : [];
      return {
        ...state,
        cart: updateData,
      };
    case CartReducerAction.CLEARCART:
      return {
        ...state,
        cart: [],
      };

    case CartReducerAction.UPDATEINVENTORY:
      return {
        ...state,
        updateProduct: payload as boolean,
      };
    default:
      return state;
  }
};

export default ReducerFunction;
