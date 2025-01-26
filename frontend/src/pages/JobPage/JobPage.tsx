import { useSearchParams } from "react-router";
import JobPageComponent from "../../components/JobPage/JobPage";
import usePaginationHook from "../../customhooks/usePaginationHook";
import { useGetHook } from "../../customhooks/useApiHook";
import APIS from "../../constants/EndPoint";

const JobPage = () => {
  const { offset, setOffset, pageSize, setPageSize } = usePaginationHook();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const { data: joblistData, isLoading } = useGetHook({
    queryKey: ["joblistpage", offset, pageSize, searchQuery],
    url: `${APIS.JOBLISTS}`,
    params: {
      skip: offset,
      take: pageSize,
      ...(searchParams && { search: searchQuery }),
    },
  });
  return (
    <>
      <JobPageComponent
        setPageSize={setPageSize}
        pageSize={pageSize}
        setOffset={setOffset}
        joblistData={joblistData}
        isLoading={isLoading}
      />
    </>
  );
};

export default JobPage;
