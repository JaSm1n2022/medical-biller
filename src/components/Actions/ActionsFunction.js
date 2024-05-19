import { Button } from "@material-ui/core";

import React, { useState } from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import YesNoModal from "components/Modal/YesNoModal";
import { Delete, Edit, Print } from "@material-ui/icons";

export default function DialogFunction(props) {
  const [isRowForDelete, setIsRowForDelete] = useState(false);
  const openEditModalHandler = () => {
    props.createFormHandler(props.data, "edit");
  };
  const printRecordHandler = () => {
    props.printHandler(props.data);
  };
  const deleteRecordHandler = () => {
    setIsRowForDelete(true);
  };
  const noDeleteHandler = () => {
    setIsRowForDelete(false);
  };
  const deleteRowHandler = () => {
    setIsRowForDelete(false);
    console.log("[Delete Id]", props.data.id);
    props.deleteRecordItemHandler(props.data.id, props.data);
  };

  return (
    <React.Fragment>
      {props.data ? (
        <div style={{ display: "inline-flex", gap: 10 }}>
          <Edit
            style={{ color: "#2196f3", cursor: "pointer" }}
            onClick={() => openEditModalHandler()}
          />
          <Delete
            style={{ color: "red", cursor: "pointer" }}
            onClick={() => deleteRecordHandler()}
          />
          {props.isPrintFunction && (
            <Print
              style={{ color: "black", cursor: "pointer" }}
              onClick={() => printRecordHandler()}
            />
          )}
        </div>
      ) : null}
      {isRowForDelete && (
        <YesNoModal
          description={"Do you wish to delete this record"}
          isOpen={isRowForDelete}
          noHandler={noDeleteHandler}
          yesHandler={deleteRowHandler}
        />
      )}
    </React.Fragment>
  );
}
