import JobViewApplicantComponent from "../../../components/Dashboard/Job/JobViewApplicant";
import { useGetHook, usePutHook } from "../../../customhooks/useApiHook";
import APIS from "../../../constants/EndPoint";
import { useParams, useSearchParams } from "react-router";
import usePaginationHook from "../../../customhooks/usePaginationHook";

type Props = {};

const JobViewApplicant = (props: Props) => {
  const { id } = useParams<{ id: string | any }>();
  const { offset, setOffset, pageSize, setPageSize } = usePaginationHook();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const { data: jobViewApplicantData, isLoading } = useGetHook({
    queryKey: ["joblistpage", offset, pageSize, searchQuery],
    url: `${APIS.VIEWJOBAPPLICANT}${id}`,
    params: {
      offset: offset,
      limit: pageSize,
      ...(searchParams && { search: searchQuery }),
    },
  });

  const { mutateAsync: updateApplicantStatus } = usePutHook({
    queryKey: ["joblistpage", `${jobViewApplicantData?.id}`],
    navigateURL: "",
  });
  const handleUpdateApplication = async (id: string, value: string) => {
    try {
      await updateApplicantStatus({
        url: `${APIS.UPDATEAPPLICANTSTATUS}`,
        formData: {
          id: id,
          status: value,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <JobViewApplicantComponent
      setPageSize={setPageSize}
      pageSize={pageSize}
      setOffset={setOffset}
      jobViewApplicantData={jobViewApplicantData}
      isLoading={isLoading}
      handleUpdateApplication={handleUpdateApplication}
    />
  );
};

export default JobViewApplicant;
