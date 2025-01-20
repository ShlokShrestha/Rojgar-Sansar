import PrimaryButton from "../Button/PrimaryButton";
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogCloseTrigger,
  DialogTitle,
} from "../../ui/dialog";

export default function Modal(props: any) {
  const { open, setOpen, title, children } = props;
  return (
    <DialogRoot
      role="alertdialog"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
      placement={"center"}
      motionPreset="slide-in-bottom"
    >
      <DialogContent>
        <DialogHeader >
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody>{children}</DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
