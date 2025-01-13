import { Field } from "../../ui/field";
import { Input } from "@chakra-ui/react";
import { ICompanyValues, IReactFormProps } from "../../../types/type";
import { Image } from "@chakra-ui/react";
import { useState } from "react";
import { BiSolidImage } from "react-icons/bi";

const CategoryForm: React.FC<IReactFormProps<ICompanyValues>> = (props) => {
  const { errors, register, getValues } = props;
  const [previewImage, setPreviewImage] = useState("");
  const value: string | any = getValues?.("companyLogo");
  const handleUploadImage = (data: any) => {
    const file = data.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };
  return (
    <>
      <Field
        label="Company name"
        invalid={!!errors.title}
        errorText={errors.title?.message}
      >
        <Input
          {...register("title")}
          type="text"
          placeholder="Enter company name"
        />
      </Field>
      <Field
        label="Location"
        invalid={!!errors.location}
        errorText={errors.location?.message}
      >
        <Input
          {...register("location")}
          type="text"
          placeholder="Enter location"
        />
      </Field>
      <Field
        label="Company logo"
        invalid={!!errors.companyLogo}
        errorText={errors.companyLogo?.message as string | undefined}
      >
        <label htmlFor="companyLogoInput">
          {!previewImage && !value ? (
            <BiSolidImage size={150} />
          ) : previewImage ? (
            <Image src={previewImage} width={40} fit="cover" alt="default" />
          ) : (
            <Image src={value} width={40} fit="cover" alt="Naruto Uzumaki" />
          )}
        </label>
        <Input
          {...register("companyLogo")}
          type="file"
          style={{ position: "absolute", opacity: 0 }}
          id="companyLogoInput"
          onChange={handleUploadImage}
        />
      </Field>
    </>
  );
};

export default CategoryForm;
