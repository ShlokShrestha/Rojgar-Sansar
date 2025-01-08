import React from "react";
import { Button, Spinner } from "@chakra-ui/react";

interface IButtonProps {
  text: string | React.ReactNode;
  type?: "button" | "submit" | "reset";
  buttonType?: "primary" | "secondary" | "danger";
  buttonSize?: "large" | "small";
  [other: string]: unknown;
  disable?: boolean;
  loading?: boolean;
}

const PrimaryButton: React.FC<IButtonProps> = (props) => {
  const {
    disable = false,
    text,
    type = "submit",
    buttonType = "primary",
    loading = false,
    ...other
  } = props;

  return (
    <Button
      size="sm"
      colorPalette={buttonType === "primary" ? "purple" : "red"}
      type={type}
      {...other}
      disabled={disable}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
