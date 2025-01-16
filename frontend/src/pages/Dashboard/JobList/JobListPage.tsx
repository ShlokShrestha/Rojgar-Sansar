import JobListComponent from "../../../components/Dashboard/Job/JobListComp";
import usePaginationHook from "../../../customhooks/usePaginationHook";
import { useDeleteHook, useGetHook } from "../../../customhooks/useApiHook";
import APIS from "../../../constants/EndPoint";
import { useSearchParams } from "react-router";

const JobListPage = () => {
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

  const { mutateAsync: deleteCategory } = useDeleteHook({
    queryKey: ["joblistpage"],
  });

  const handleDeleteJob = async (id: string) => {
    try {
      await deleteCategory({
        url: `${APIS.DELETEJOBS}${id}`,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <JobListComponent
        setPageSize={setPageSize}
        pageSize={pageSize}
        setOffset={setOffset}
        joblistData={joblistData}
        isLoading={isLoading}
        handleDeleteJob={handleDeleteJob}
      />
    </>
  );
};

export default JobListPage;
