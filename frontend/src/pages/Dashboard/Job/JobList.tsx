import JobListComponent from "../../../components/Dashboard/Job/JobList";
import usePaginationHook from "../../../customhooks/usePaginationHook";

const JobList = () => {
  const { offset, setOffset, pageSize, setPageSize } = usePaginationHook();
  const categoryData: any = [
    { id: "1", title: "Frontend Developer" },
    { id: "2", title: "Backend Developer" },
  ];
  const handleDeleteJob = (value: any) => {
    console.log(value, "value");
  };
  return (
    <>
      <JobListComponent
        setPageSize={setPageSize}
        pageSize={pageSize}
        setOffset={setOffset}
        categoryData={categoryData}
        handleDeleteJob={handleDeleteJob}
      />
    </>
  );
};

export default JobList;
