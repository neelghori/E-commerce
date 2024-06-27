"use client";
import Store from "@Ecommerce/Context/Store";
import Header from "@Ecommerce/components/layout/Header";
import React from "react";
import { Toaster } from "sonner";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Store>
      <Toaster richColors position="top-left" />
      <div className="absolute top-0 left-0 w-full h-96 -z-50  bg-gradient-to-br from-pink-400 to-[#0055D1] filter blur-3xl opacity-50" />
      <Header />
      {children}
    </Store>
  );
};

export default Layout;
