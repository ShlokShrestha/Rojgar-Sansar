import PrimaryButton from "../Button/PrimaryButton";
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog";
import { Box } from "@chakra-ui/react";

export default function ConfirmDialog(props: any) {
  const { open, setOpen, handleDelete, deleteLoading, children } = props;
  return (
    <DialogRoot
      role="alertdialog"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={"center"}
      motionPreset="slide-in-bottom"
    >
      <DialogContent>
        <DialogHeader mx={"auto"}>
          <DialogTitle>{children}</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box display={"flex"} justifyContent={"center"} gap={2}>
            <PrimaryButton
              text={"Yes"}
              type={"button"}
              onClick={handleDelete}
              loading={deleteLoading ? true : false}
              disable={deleteLoading}
            />
            <PrimaryButton
              buttonType={"danger"}
              text={"Cancel"}
              type={"button"}
              onClick={() => setOpen(false)}
            />
          </Box>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
}
