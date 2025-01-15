import { useSearchParams } from "react-router";
import JobListComponent from "../../../components/Dashboard/Job/JobList";
import usePaginationHook from "../../../customhooks/usePaginationHook";
import { useDeleteHook, useGetHook } from "../../../customhooks/useApiHook";
import APIS from "../../../constants/EndPoint";

const JobList = () => {
  const { offset, setOffset, pageSize, setPageSize } = usePaginationHook();

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const { data: jobData, isLoading } = useGetHook({
    queryKey: ["job", offset, pageSize, searchQuery],
    url: `${APIS.JOBLIST}`,
    params: {
      skip: offset,
      take: pageSize,
      ...(searchParams && { search: searchQuery }),
    },
  });

  const { mutateAsync: deleteJobs } = useDeleteHook({
    queryKey: ["job"],
  });

  const handleDeleteJob = async (id: any) => {
    try {
      await deleteJobs({
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
        categoryData={jobData}
        handleDeleteJob={handleDeleteJob}
        isLoading={isLoading}
      />
    </>
  );
};

export default JobList;
