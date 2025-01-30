import { Box, Text, VStack, Badge, HStack, Input } from "@chakra-ui/react";
import CheckBox from "../Forms/CheckBox";
import { ICategoryValues, ICompanyValues } from "../../../types/type";
import DataSpinner from "../Spinner";
import { useSearchParams } from "react-router";
import { useEffect, useState } from "react";
import useDebounceHook from "../../../customhooks/useDebounceHook";

interface IFilterSidebar {
  categoryData: ICategoryValues[];
  categoryLoading: boolean;
  companyData: ICompanyValues[];
}

const FilteSidebar = (props: IFilterSidebar) => {
  const { categoryData, categoryLoading, companyData } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const initalQuery = searchParams.get("search") || "";
  const [input, setInput] = useState(initalQuery);
  const debounceValue = useDebounceHook(input);

  useEffect(() => {
    const updatedParams = new URLSearchParams(searchParams);
    updatedParams.set("search", debounceValue);
    setSearchParams(updatedParams);
  }, [debounceValue, searchParams, setSearchParams]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const selectedCategories = searchParams.getAll("categories");
  const selectedLocation = searchParams.getAll("location");

  const handleCategoriesFilter = (category: string) => {
    let updatedCategories = [...selectedCategories];

    if (updatedCategories.includes(category)) {
      updatedCategories = updatedCategories.filter(
        (oldCategory) => oldCategory !== category
      );
    } else {
      updatedCategories.push(category);
    }

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("categories");
    console.log(newSearchParams);
    updatedCategories.forEach((cat) =>
      newSearchParams.append("categories", cat)
    );

    setSearchParams(newSearchParams);
  };

  const handleLocationFilter = (location: string) => {
    let updatedLocations = [...selectedLocation];
    if (updatedLocations.includes(location)) {
      updatedLocations = updatedLocations.filter(
        (oldLocation) => oldLocation !== location
      );
    } else {
      updatedLocations.push(location);
    }
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("location");
    updatedLocations.forEach((loc) => newSearchParams.append("location", loc));
    setSearchParams(newSearchParams);
  };
  return (
    <>
      <VStack
        align="start"
        gap={6}
        flexShrink={0}
        width={{ base: "100%", lg: "20%" }}
      >
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={2}>
            Search
          </Text>
          <Input
            onChange={onChangeInput}
            value={input}
            width={200}
            placeholder="Search"
            bg={"gray.100"}
            outline={"none"}
            border={"none"}
          />
        </Box>

        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Search by Categories
          </Text>
          {categoryLoading ? (
            <DataSpinner />
          ) : (
            <VStack align="start" gap={2}>
              {categoryData?.map((category: any, index: number) => (
                <CheckBox
                  label={category.title}
                  key={index}
                  handleFilter={handleCategoriesFilter}
                  selected={selectedCategories}
                />
              ))}
            </VStack>
          )}
        </Box>
        <Box>
          <Text fontSize="lg" fontWeight="bold" mb={4}>
            Search by Location
          </Text>

          <VStack align="start" gap={2}>
            {companyData?.map((category: any, index: number) => (
              <CheckBox
                label={category.location}
                key={index}
                handleFilter={handleLocationFilter}
                selected={selectedLocation}
              />
            ))}
          </VStack>
        </Box>
      </VStack>
    </>
  );
};

export default FilteSidebar;
