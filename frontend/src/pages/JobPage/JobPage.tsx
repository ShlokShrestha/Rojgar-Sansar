import { useSearchParams } from "react-router";
import JobPageComponent from "../../components/JobPage/JobPage";
import usePaginationHook from "../../customhooks/usePaginationHook";
import { useGetHook } from "../../customhooks/useApiHook";
import APIS from "../../constants/EndPoint";

const JobPage = () => {
  const { offset, setOffset, pageSize } = usePaginationHook();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const categoryQuery = searchParams.getAll("categories") || "";
  const locationQuery = searchParams.getAll("location") || "";

  const { data: joblistData, isLoading } = useGetHook({
    queryKey: ["joblistpage", offset, pageSize, searchQuery, categoryQuery, locationQuery],
    url: `${APIS.JOBLISTS}`,
    params: {
      skip: offset,
      take: pageSize,
      ...(searchParams && { search: searchQuery }),
      category: categoryQuery,
      location: locationQuery,
    },
  });

  const { data: categoryData, isLoading: categoryLoading } = useGetHook({
    queryKey: ["category", offset, pageSize],
    url: `${APIS.CATEGORYLIST}`,
    params: {
      skip: offset,
      take: pageSize,
    },
  });

  const { data: companyData } = useGetHook({
    queryKey: ["company", offset, pageSize],
    url: `${APIS.COMPANYLIST}`,
    params: {
      skip: offset,
      take: pageSize,
    },
  });
  return (
    <>
      <JobPageComponent
        setOffset={setOffset}
        joblistData={joblistData}
        isLoading={isLoading}
        categoryData={categoryData?.data}
        companyData={companyData?.data}
        categoryLoading={categoryLoading}
        offset={offset}
      />
    </>
  );
};

export default JobPage;
