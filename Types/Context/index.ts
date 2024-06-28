import { Dispatch } from "react";
import { ProductDataProps } from "../Container/ProductList";

export interface InitialValueProps {
  cart: ProductDataProps[];
  updateProduct: boolean;
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
  UPDATEINVENTORY = "UPDATE_INVENTORY",
}

export type PayloadProps = ProductDataProps | boolean;

export interface CartCreateContextProps {
  state: { cart: ProductDataProps[]; updateProduct?: boolean };
  dispatch: Dispatch<CartReducerFunAction>;
}
