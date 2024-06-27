import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { getProductlist } from "@Ecommerce/lib/ProductList";
import { ProductDataProps } from "@Ecommerce/Types/Container/ProductList";

const useSearch = (text: string) => {
  const [suggestion, setSuggestion] = useState<ProductDataProps[]>([]);
  const [searchResult, setSearchResult] = useState<ProductDataProps[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchLoader, setSearchLoader] = useState(false);

  const [searchPopup, setSearchPopup] = useState(false);
  const searchValue = useDebounce(text ?? "", 500);
  const getSuggestedProduct = async () => {
    setLoading(true);
    const productData = await getProductlist();
    if (productData) {
      const spliceProduct = productData.slice(0, 7);
      setSuggestion(spliceProduct);
    } else {
      setSuggestion([]);
    }
    setLoading(false);
  };
  const getProductdata = async (title: string) => {
    setSearchLoader(true);
    const productData = await getProductlist();
    if (title) {
      const filterSearchData =
        productData &&
        productData.length > 0 &&
        productData.filter((ele: ProductDataProps) =>
          ele.product_name.toLowerCase().includes(title.toLowerCase())
        );
      setSearchResult(filterSearchData);
    } else {
      setSearchResult([]);
    }
    setSearchLoader(false);
  };
  useEffect(() => {
    getSuggestedProduct();
  }, []);
  useEffect(() => {
    getProductdata(searchValue);
  }, [searchValue]);
  return {
    suggestion,
    searchResult,
    searchPopup,
    setSearchPopup,
    searchValue,
    loading,
    searchLoader,
  };
};

export default useSearch;
