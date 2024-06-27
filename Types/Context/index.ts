import { Dispatch } from "react";
import { ProductDataProps } from "../Container/ProductList";

export interface InitialValueProps {
  cart: ProductDataProps[];
}

export interface CartReducerFunAction {
  type: CartReducerAction;
  payload?: PayloadProps;
}

export enum CartReducerAction {
  ADDTOCART = "ADD_TO_CART",
  DELETEPRODUCTFROMCART = "DELETE_PRODUCT_FROM_CART",
  UPDATEQUANTITY = "UPDATE_QUANTITY",
  CLEARCART = "CLEAR_CART",
}

export type PayloadProps = ProductDataProps;

export interface CartCreateContextProps {
  state: { cart: ProductDataProps[] };
  dispatch: Dispatch<CartReducerFunAction>;
}
