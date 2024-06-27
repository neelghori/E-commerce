import React from "react";
import CartContext from "./CartContext";

// common store for context api
const Store: React.FC<{ children: React.ReactNode }> = (props) => {
  return <CartContext>{props.children}</CartContext>;
};

export default Store;
