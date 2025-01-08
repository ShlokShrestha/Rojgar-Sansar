import { useState } from "react";

const usePaginationHook = () => {
  const [offset, setOffset] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  return {
    pageSize,
    setPageSize,
    offset,
    setOffset,
  };
};

export default usePaginationHook;
