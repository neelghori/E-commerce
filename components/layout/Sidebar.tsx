"use client";
import React, { useContext } from "react";
import { useState } from "react";
import { Dialog, DialogBackdrop } from "@headlessui/react";
import { ShoppingBagIcon } from "@heroicons/react/20/solid";
import SidebarContainer from "@Ecommerce/container/Sidebar/Sidebar";
import { CartContextProvider } from "@Ecommerce/Context/CartContext";
import { toast } from "sonner";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const { state } = useContext(CartContextProvider);
  return (
    <React.Fragment>
      <div
        className="rounded-full flex relative"
        onClick={() => {
          if (state.cart && state.cart.length > 0) {
            setOpen(!open);
          } else {
            toast.info("No Product in Cart");
          }
        }}
      >
        {" "}
        <ShoppingBagIcon className="size-7 cursor-pointer" color="white" />
        <div className="top-[-8px] left-[21px] text-[10px] bg-black h-4 w-4 p-2 flex justify-center items-center absolute text-white rounded-full">
          {state.cart && state.cart.length > 0 ? state.cart.length : 0}
        </div>
      </div>
      <Dialog className="relative z-10" open={open} onClose={setOpen}>
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />
        <SidebarContainer setOpen={setOpen} />
      </Dialog>
    </React.Fragment>
  );
};

export default Sidebar;
