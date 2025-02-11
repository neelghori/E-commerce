"use client";
import React, { useReducer } from "react";
import {
  CartCreateContextProps,
  CartReducerFunAction,
  InitialValueProps,
} from "@Ecommerce/Types/Context";
import ReducerFunction from "./CartReducer";
import { initialValue } from "@Ecommerce/data/constants";
//create cart context for global state management
export const CartContextProvider = React.createContext<CartCreateContextProps>({
  state: initialValue,
  dispatch: () => {},
});

// cart context to share the data across whole project
const CartContext: React.FC<{ children: React.ReactNode }> = (props) => {
  const [state, dispatch] = useReducer(
    (state: InitialValueProps, action: CartReducerFunAction) => {
      return ReducerFunction(state, action);
    },
    initialValue
  );
  return (
    <CartContextProvider.Provider value={{ state, dispatch }}>
      {props.children}
    </CartContextProvider.Provider>
  );
};

export default CartContext;
