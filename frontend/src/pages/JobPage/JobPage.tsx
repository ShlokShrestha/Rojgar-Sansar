import { useSearchParams } from "react-router";
import JobPageComponent from "../../components/JobPage/JobPage";
import usePaginationHook from "../../customhooks/usePaginationHook";
import { useGetHook } from "../../customhooks/useApiHook";
import APIS from "../../constants/EndPoint";

const JobPage = () => {
  const { offset, setOffset, pageSize, setPageSize } = usePaginationHook();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.getAll("categories") || "";
  const { data: joblistData, isLoading } = useGetHook({
    queryKey: ["joblistpage", offset, pageSize, searchQuery, categoryQuery],
    url: `${APIS.JOBLISTS}`,
    params: {
      skip: offset,
      take: pageSize,
      ...(searchParams && { search: searchQuery }),
      category: categoryQuery,
    },
  });
  const { data: categoryData, isLoading: categoryLoading } = useGetHook({
    queryKey: ["category", offset, pageSize, searchQuery],
    url: `${APIS.CATEGORYLIST}`,
    params: {
      skip: offset,
      take: pageSize,
      search: searchQuery,
    },
  });
  return (
    <>
      <JobPageComponent
        setOffset={setOffset}
        joblistData={joblistData}
        isLoading={isLoading}
        categoryData={categoryData}
        categoryLoading={categoryLoading}
        offset={offset}
      />
    </>
  );
};

export default JobPage;
