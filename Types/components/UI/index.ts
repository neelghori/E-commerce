import { ProductDataProps } from "@Ecommerce/Types/Container/ProductList";
import {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  SVGAttributes,
} from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  classnames?: string;
  touched?: boolean;
  error?: string;
  labelClassName?: string;
  icon?: boolean;
  IconOnClick?: () => void;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  classname?: string;
}

export interface LoaderProps extends SVGAttributes<SVGElement> {
  classnames?: string;
}

export interface AddtoCartProps {
  product: ProductDataProps;
  isInCart: ProductDataProps;
}
