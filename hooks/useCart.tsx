import { CartContextProvider } from "@Ecommerce/Context/CartContext";
import { ProductDataProps } from "@Ecommerce/Types/Container/ProductList";
import { CartReducerAction } from "@Ecommerce/Types/Context";
import { getCartList } from "@Ecommerce/lib/Cartlist";
import { getProductlist, updateProduct } from "@Ecommerce/lib/ProductList";
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";

const useCart = (props: { setOpen: (val: boolean) => void }) => {
  const [cartData, setCartData] = useState<ProductDataProps[]>([]);
  const { state, dispatch } = useContext(CartContextProvider);
  const [loader, setLoader] = useState(false);
  const getApiData = async () => {
    const productData = await getProductlist();
    const getCartData = await getCartList();
    const filterProductList =
      productData &&
      productData.length > 0 &&
      getCartData &&
      getCartData.length > 0 &&
      getCartData.filter((product: any, index: number) => {
        const findProduct = productData.find(
          (element: any) => element.id == product.id
        );
        if (findProduct) {
          return { ...findProduct, quantity: product.quantity };
        }
      });
    setCartData(filterProductList);
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
        props?.setOpen(false);
        toast.success("Order Placed SuccessFully");
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
