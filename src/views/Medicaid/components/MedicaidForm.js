import React, { useEffect, useState } from "react";

import styles from "./medicaid.module.css";
import ReactModal from "react-modal";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from "@material-ui/core";

import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@material-ui/icons/Delete";
import CustomSingleAutoComplete from "components/AutoComplete/CustomSingleAutoComplete";
import { SUPPLY_PAYMENT_METHOD } from "utils/constants";
import { SUPPLY_STATUS } from "utils/constants";
import { SUPPLY_VENDOR } from "utils/constants";
import { QUANTITY_UOM } from "utils/constants";
import { SUPPLY_CATEGORY } from "utils/constants";
import CustomSelect from "components/Select/CustomSelect";
import CustomDatePicker from "components/Date/CustomDatePicker";
import CustomTextField from "components/TextField/CustomTextField";
import ModalFooter from "components/Modal/ModalFooter/ModalFooter";
import ModalHeader from "components/Modal/ModalHeader/ModalHeader";
import HeaderModal from "components/Modal/HeaderModal";
let categoryList = [];
let uoms = [];
let vendors = [];
let statuses = [];
let totalAmount = parseFloat(0.0);
let paymentMethods = [];
SUPPLY_PAYMENT_METHOD.forEach((item, index) => {
  paymentMethods.push({
    id: index,
    name: item,
    value: item,
    label: item,
    category: "payments",
  });
});
SUPPLY_STATUS.forEach((item, index) => {
  statuses.push({
    id: index,
    name: item,
    value: item,
    label: item,
    category: "supplyStatus",
  });
});
SUPPLY_VENDOR.forEach((item, index) => {
  vendors.push({
    id: index,
    name: item,
    value: item,
    label: item,
    category: "vendor",
  });
});
QUANTITY_UOM.forEach((item, index) => {
  uoms.push({
    id: index,
    name: item,
    value: item,
    label: item,
    category: "uom",
  });
});
SUPPLY_CATEGORY.forEach((item, index) => {
  categoryList.push({
    id: index,
    name: item,
    value: item,
    label: item,
    category: "category",
  });
});
function MedicaidForm(props) {
  const [generalForm, setGeneralForm] = useState({});
  const [detailForm, setDetailForm] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [isRefresh, setIsRefresh] = useState(false);
  const { isOpen, onClose, isEdit } = props;

  useEffect(() => {}, []);
  const validateFormHandler = () => {
    //  props.createMedicaidHandler(generalForm, detailForm, props.mode);
  };
  const footerActions = [
    {
      title: props.distribution ? "Apply" : "Save",
      type: "primary",
      event: "submit",
      callback: () => {
        validateFormHandler();
      },
    },
    {
      title: "Cancel",
      type: "default",
      event: "cancel",
      callback: () => {
        props.onClose();
      },
    },
  ];

  const titleHandler = () => {
    if (props.mode === "view") {
      return "View Medicaid";
    } else if (props.mode === "edit") {
      return "Edit Medicaid";
    } else {
      return "Create Medicaid";
    }
  };
  return (
    <ReactModal
      style={{
        overlay: {
          zIndex: 999,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.65)",
        },
        content: {
          position: "absolute",
          top: "0",
          bottom: "0",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          right: "0",
          left: "0",
          overflow: "none",
          WebkitOverflowScrolling: "touch",
          border: "none",
          padding: "0px",
          background: "none",
        },
      }}
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
    >
      <div
        className={
          props.mode === "edit" ? styles.invoiceEditForm : styles.invoiceForm
        }
      >
        <HeaderModal title={titleHandler()} onClose={onClose} />
        <div className={styles.content}>TEST</div>
        <br />
        {props.mode && props.mode === "view" ? null : (
          <ModalFooter actions={footerActions} />
        )}
      </div>
    </ReactModal>
  );
}

export default MedicaidForm;
