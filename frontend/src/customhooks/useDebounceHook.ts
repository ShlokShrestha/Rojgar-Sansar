import { useState, useEffect } from "react";

// Debounce hook
const useDebounceHook = (value: string) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 400);

    return () => {
      clearTimeout(handler);
    };
  }, [value, 400]);

  return debouncedValue;
};

export default useDebounceHook;
