import { CartContextProvider } from "@Ecommerce/Context/CartContext";
import { ProductDataProps } from "@Ecommerce/Types/Container/ProductList";
import { CartReducerAction } from "@Ecommerce/Types/Context";
import { getProductlist, updateProduct } from "@Ecommerce/lib/ProductList";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const useCart = (props: { setOpen: (val: boolean) => void }) => {
  const [cartData, setCartData] = useState<ProductDataProps[]>([]);
  const { state, dispatch } = useContext(CartContextProvider);
  const [loader, setLoader] = useState(false);
  const getApiData = async () => {
    const productData = await getProductlist();
    if (productData) {
      setCartData(productData);
    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  const checkoutFunc = async () => {
    setLoader(true);
    state.cart.forEach(async (element) => {
      const chnageinInventory = {
        ...element,
        inventory:
          element.inventory - (element.quantity ? element.quantity : 0),
      };
      const response = await updateProduct(chnageinInventory);
      if (response) {
        dispatch({ type: CartReducerAction.CLEARCART });
        dispatch({ type: CartReducerAction.UPDATEINVENTORY, payload: true });

        props?.setOpen(false);
        toast.success("Order Placed SuccessFully");
        setTimeout(() => {
          dispatch({ type: CartReducerAction.UPDATEINVENTORY, payload: false });
        }, 2000);
      } else {
        toast.error("Something Went Wrong");
      }
      setLoader(false);
    });
  };
  return {
    cartData,
    setCartData,
    checkoutFunc,
    loader,
  };
};

export default useCart;
