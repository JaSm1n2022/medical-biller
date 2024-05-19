import React, { useEffect, useState } from "react";
import CustomTextField from "components/TextField/CustomTextField";
import { QUANTITY_UOM } from "utils/constants";
import { SUPPLY_CATEGORY } from "utils/constants";
import CustomSingleAutoComplete from "components/AutoComplete/CustomSingleAutoComplete";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Modal,
  Typography,
} from "@material-ui/core";
import { DEFAULT_ITEM } from "utils/constants";
import { makeStyles } from "@material-ui/core";
import CustomDatePicker from "components/Date/CustomDatePicker";
import CustomSelect from "components/Select/CustomSelect";
import HeaderModal from "components/Modal/HeaderModal";

import { useTheme } from "@material-ui/core";
import moment from "moment";

import { PATIENT_STATUS } from "utils/constants";

let categoryList = [];
let uoms = [];
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
function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;
  const right = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    right: `${right}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  padding0: {
    padding: 0,
  },
  media: {
    height: 200,
  },
  paper: {
    position: "absolute",
    width: "50%",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[0],
    padding: theme.spacing(2, 4, 3),
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),

    color: "black",
    backgroundColor: "white",
    border: "1px solid black",
  },
}));
let generatedPatientId = "";
function PatientForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [generalForm, setGeneralForm] = useState({});

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [modalStyle] = React.useState(getModalStyle);
  const [components, setComponents] = useState([]);
  const [locations, setLocations] = useState([]);
  const [patientIdentity, setPatientIdentity] = useState("");
  const [patientIdentityError, setPatientIdentityError] = useState("");
  const { isOpen } = props;

  useEffect(() => {
    const fm = {};
    fm.created_at = new Date();
    const general = [
      {
        id: "ln",
        component: "textfield",
        placeholder: "Last Name",
        label: "Last Name*",
        name: "ln",
        //disabled: props.mode && props.mode === 'view' ? true : false,

        cols: 4,
      },

      {
        id: "fn",
        component: "textfield",
        placeholder: "fn",
        label: "First Name",
        name: "fn",
        //disabled: props.mode && props.mode === 'view' ? true : false,

        cols: 4,
      },
    ];
    setComponents(general);

    setGeneralForm(fm);
  }, []);
  useEffect(() => {
    if (props.item) {
      console.log("[items]", props.item);
      console.log("[LocationList]", props.locationList);
      const fm = { ...props.item };
      setIsSubmitDisabled(false);
      console.log("[FM VALUE]", fm);
      setPatientIdentity(fm.patientCd);
      setGeneralForm(fm);
    }
  }, [props.item]);

  const validateFormHandler = () => {
    const tempList = [...components];
    console.log("[tempList]", tempList);
    let isValid = true;

    if (!patientIdentity) {
      isValid = false;
      setPatientIdentityError("Patient Code is required. Use Suggested id.");
    } else {
      setPatientIdentityError("");
    }
    if (!isValid) {
      setComponents(tempList);
    } else {
      generalForm.patientCd = patientIdentity;
      props.createPatientHandler(generalForm, props.mode);
    }
  };
  const inputIdentityHandler = ({ target }) => {
    setPatientIdentity(target.value);
  };
  const inputGeneralHandler = ({ target }, src) => {
    console.log("[Target]", target, generalForm);
    const source = { ...generalForm };
    source[target.name] = target.value;
    console.log("[source]", source);
    const tempList = [...components];
    const currentItem = tempList.find((s) => s.name === target.name);
    currentItem.isError = false;
    currentItem.errorMsg = "";

    if (["name"].includes(target.name) && !target.value) {
      currentItem.isError = true;
      currentItem.errorMsg = `${currentItem.label} is required.`;

      setComponents(tempList);
    }
    setGeneralForm(source);
  };

  const autoCompleteGeneralInputHander = (item) => {
    const src = { ...generalForm };
    console.log("[src autocomplete]", src, item);
    if (item.category === "location") {
      src.location = item;
    } else if (item.category === "patientStatus") {
      src.status = item;
    }

    setGeneralForm(src);
  };

  const onChangeGeneralInputHandler = (e) => {
    const src = { ...generalForm };
    if (!e.target.value) {
      src[e.target.name] = { name: "", label: "" };
      setGeneralForm(src);
    }
  };

  const dateInputHandler = (value, name) => {
    const src = { ...generalForm };
    src[name] = moment(new Date(value)).format("YYYY-MM-DD HH:mm");
    const temp = [...components];
    const found = temp.find((t) => t.name === name);
    found.isError = false;
    found.errorMsg = "";
    setComponents(temp);
    setGeneralForm(src);
  };
  const titleHandler = () => {
    if (props.mode === "view") {
      return "View Patient";
    } else if (props.mode === "edit") {
      return "Edit Patient";
    } else {
      return "Create Patient";
    }
  };
  console.log("[general form]", generalForm);
  const clearModalHandler = () => {
    console.log("[Clear Me]");

    props.closeFormModalHandler();
  };
  const disabledComponentHandler = (src) => {
    console.log("[Disabled Me]", src);
    if (src && src.name == "ln") {
      return false;
    }
    if (
      src &&
      src.name &&
      src.name !== "ln" &&
      JSON.stringify(generalForm) !== "{}" &&
      !generalForm.ln
    ) {
      return true;
    }
    return false;
  };
  const isSubmitButtonDisabled = () => {
    return (
      JSON.stringify(generalForm) === "{}" || !generalForm.fn || !generalForm.ln
    );
  };
  const createPatientIdHandler = () => {
    console.log("[General Form]", generalForm);
    generatedPatientId = "";
    if (generalForm.fn && generalForm.ln) {
      if (generalForm.ln.length < 5) {
        generatedPatientId += generalForm.ln.toUpperCase();
      } else {
        generatedPatientId += generalForm.ln.substring(
          0,
          generalForm.ln.length - 2
        );
      }
      if (generalForm.fn.length < 3) {
        generatedPatientId += `-${generalForm.fn}`;
      } else {
        generatedPatientId += `-${generalForm.fn.substring(
          0,
          generalForm.fn.length - 2
        )}`;
      }
      generatedPatientId += `.${moment(new Date()).format("YYYYMMDDHHmm")}`;
    }
    generatedPatientId = generatedPatientId.toUpperCase();
    return generatedPatientId;
  };
  console.log("[General FormX]", generalForm, patientIdentity);
  return (
    <Modal
      open={isOpen}
      onClose={clearModalHandler}
      aria-labelledby="patient"
      aria-describedby="patientmodal"
    >
      <div style={modalStyle} className={classes.paper}>
        <Card>
          <HeaderModal title={titleHandler()} onClose={clearModalHandler} />

          <CardContent>
            <Grid container spacing={1} direction="row">
              {components.map((item) => {
                return (
                  <Grid
                    item
                    key={item.id}
                    xs={item.cols ? item.cols : 3}
                    style={{
                      paddingBottom: 2,
                      display: item.hide ? "none" : "",
                    }}
                  >
                    {item.component === "textfield" ? (
                      <React.Fragment>
                        <CustomTextField
                          {...item}
                          value={generalForm[item.name]}
                          onChange={inputGeneralHandler}
                          isError={item.isError}
                          errorMsg={item.errorMsg}
                          disabled={disabledComponentHandler(item)}
                        />
                        {item.isError && <br />}
                      </React.Fragment>
                    ) : item.component === "datepicker" ? (
                      <React.Fragment>
                        <CustomDatePicker
                          {...item}
                          noDefault={true}
                          value={generalForm[item.name]}
                          onChange={dateInputHandler}
                          isError={item.isError}
                          errorMsg={item.errorMsg}
                          disabled={disabledComponentHandler(item)}
                        />
                      </React.Fragment>
                    ) : item.component === "singlecomplete" ? (
                      <React.Fragment>
                        <CustomSingleAutoComplete
                          {...item}
                          value={generalForm[item.name]}
                          options={
                            item.name === "location" ? locations : item.options
                          }
                          isError={item.isError}
                          errorMsg={item.errorMsg}
                          onSelectHandler={autoCompleteGeneralInputHander}
                          onChangeHandler={onChangeGeneralInputHandler}
                          disabled={disabledComponentHandler(item)}
                        />
                      </React.Fragment>
                    ) : item.component === "select" ? (
                      <React.Fragment>
                        <CustomSelect
                          {...item}
                          onChange={inputGeneralHandler}
                          isError={item.isError}
                          errorMsg={item.errorMsg}
                          value={generalForm[item.name]}
                        />
                      </React.Fragment>
                    ) : null}
                  </Grid>
                );
              })}
            </Grid>
            <div style={{ paddingTop: 10 }}>
              <Grid direction="row" container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body">
                    Suggested Patient ID : {createPatientIdHandler()}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: 8 }}>
                  <CustomTextField
                    value={patientIdentity}
                    name={patientIdentity}
                    onChange={inputIdentityHandler}
                    placeholder={"Create Identity"}
                  />
                  <div>
                    <Typography variant="body" style={{ color: "red" }}>
                      {patientIdentityError}
                    </Typography>
                  </div>
                </Grid>
                <Grid item xs={12} style={{ paddingTop: 4 }}>
                  <Button
                    disabled={isSubmitButtonDisabled()}
                    variant="contained"
                    color={isSubmitButtonDisabled() ? "default" : "primary"}
                    onClick={() => validateFormHandler()}
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </div>
          </CardContent>
        </Card>
      </div>
    </Modal>
  );
}
export default PatientForm;
