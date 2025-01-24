import React, { useState } from "react";
import { Link } from "react-router";
import { FiEdit } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { IActionButtonsProps } from "../../../types/type";
import ConfirmDialog from "../ConfirmDialog";
import { AiOutlineEye } from "react-icons/ai";

const ActionButtons: React.FC<IActionButtonsProps> = (props) => {
  const { editPageLink, deleteFunction, value, deleteLoading, viewPageLink } =
    props;
  const [openConfirmDialog, setOpenConfirmDialog] = useState<boolean>(false);
  const handleDelete = () => {
    deleteFunction && deleteFunction(value);
    if (!deleteLoading) {
      setOpenConfirmDialog(false);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: "0.25rem",
        }}
      >
        {deleteFunction && (
          <MdOutlineDeleteOutline
            style={{
              height: "1.4rem",
              width: "1.4rem",
              color: "#D9534F",
              cursor: "pointer",
            }}
            onClick={() => setOpenConfirmDialog(true)}
          />
        )}
        {editPageLink && (
          <Link to={editPageLink}>
            <FiEdit
              style={{
                width: "1.2rem",
                height: "1.2rem",
                color: "#F0AD4E",
                cursor: "pointer",
              }}
            />
          </Link>
        )}
        {viewPageLink && (
          <Link to={viewPageLink}>
            <AiOutlineEye
              style={{
                width: "1.2rem",
                height: "1.2rem",
                color: "#F0AD4E",
                cursor: "pointer",
              }}
            />
          </Link>
        )}
      </div>
      <ConfirmDialog
        open={openConfirmDialog}
        setOpen={setOpenConfirmDialog}
        handleDelete={handleDelete}
        deleteLoading={deleteLoading}
      >
        Are you sure you want to delete this item?
      </ConfirmDialog>
    </>
  );
};

export default ActionButtons;
