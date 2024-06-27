import { ButtonProps } from "@Ecommerce/Types/components/UI";
import React from "react";

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      {...props}
      className={`rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
        props?.classname ?? ""
      }`}
    >
      {props?.children}
    </button>
  );
};

export default Button;
