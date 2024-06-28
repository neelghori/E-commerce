import { useState, useEffect } from "react";

//common custom hook for debounce used in search
const useDebounce = (val: string, delay: number) => {
  const [debounceVal, setDebounceVal] = useState(val);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceVal(val);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [val]);

  return debounceVal;
};

export default useDebounce;
