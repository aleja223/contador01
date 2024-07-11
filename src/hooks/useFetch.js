import { useEffect } from "react";
import { useState } from "react";

export const useFetch = (url) => {
  const [state, seState] = useState({
    data: null,
    isLoading: true,
    errors: null,
  });
  const { data, isLoading, errors } = state;
  const getFetch = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      seState({
        data,
        isLoading: false,
        errors: null,
      });
    } catch (error) {
      seState({
        data: null,
        isLoading: false,
        errors: error,
      });
    }
  };
  useEffect(() => {
    if (!url) return;
    getFetch();
  }, [url]);

  return {
    data,
    isLoading,
    errors,
  };
};
