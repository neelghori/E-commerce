import { ButtonHTMLAttributes, InputHTMLAttributes } from "react";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  classnames?: string;
  touched?: boolean;
  error?: string;
  labelClassName?: string;
}

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  classname?: string;
}
