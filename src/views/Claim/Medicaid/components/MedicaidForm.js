import React, { useEffect, useState } from "react";

import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Tooltip,
  Typography,
} from "@material-ui/core";
import moment from "moment";
import styles from "./style.module.css";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core";
import ReactModal from "react-modal";
import CustomTextField from "components/TextField/CustomTextField";
import CustomDatePicker from "components/Date/CustomDatePicker";
import CustomSingleAutoComplete from "components/AutoComplete/CustomSingleAutoComplete";

import HeaderModal from "components/Modal/HeaderModal";

import ModalFooter from "components/Modal/ModalFooter/ModalFooter";
import { profileListStateSelector } from "store/selectors/profileSelector";
import { patientListStateSelector } from "store/selectors/patientSelector";
import { serviceListStateSelector } from "store/selectors/serviceSelector";
import { attemptToFetchPatient } from "store/actions/patientAction";
import { resetFetchPatientState } from "store/actions/patientAction";
import { attemptToFetchService } from "store/actions/serviceAction";
import { resetFetchServiceState } from "store/actions/serviceAction";
import { ACTION_STATUSES } from "utils/constants";
import { DEFAULT_ITEM } from "utils/constants";
import { connect } from "react-redux";
import CustomTimePicker from "components/Time/CustomTimePicker";

let uoms = [];
let patients = [];
let services = [];
let isProcessDone = true;
let isPatientListDone = true;
let isServiceListDone = true;
function getModalStyle() {
  const top = 25;
  const left = 25;
  const right = 25;
  return {
    top: `${top}%`,
    left: `${left}%`,
    right: `${right}%`,
    height: "80%",
    width: "95%",
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
    width: "98%",
    height: "95%",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #000",
    boxShadow: theme.shadows[0],
    padding: theme.spacing(2, 4, 3),
    elevation: 2,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),

    color: "black",
    backgroundColor: "white",
    border: "1px solid black",
  },
}));

function MedicaidForm(props) {
  console.log("[Distribution]", props);
  const classes = useStyles();
  const [generalForm, setGeneralForm] = useState({});
  const [detailForm, setDetailForm] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isPrintForm, setIsPrintFrom] = useState(false);
  const [modalStyle] = React.useState(getModalStyle);
  const [isPatientCollection, setIsPatientCollection] = useState(true);
  const [isServiceCollection, setIsServiceCollection] = useState(true);
  const { isOpen } = props;

  const general = [
    {
      id: "billedDt",
      component: "datepicker",
      placeholder: "Billed Date",
      label: "Billed Date",
      name: "billedDt",
      disabled: props.mode && props.mode === "view" ? true : false,
    },
    {
      id: "paidOnDt",
      component: "datepicker",
      placeholder: "Paid On",
      label: "Paid On",
      name: "paidOnDt",
      disabled: props.mode && props.mode === "view" ? true : false,
    },

    {
      id: "paidIssuedDt",
      component: "datepicker",
      placeholder: "Issued Payment",
      label: "Issued Payment",
      name: "paidIssuedDt",
      disabled: props.mode && props.mode === "view" ? true : false,
    },

    {
      id: "eftNumber",
      component: "textfield",
      placeholder: "EFT Number",
      label: "EFT Number",
      name: "eftNumber",
      value: "-",
      disabled: props.mode && props.mode === "view" ? true : false,
    },
  ];

  const details = [
    {
      id: "patient",
      component: "singlecomplete",
      placeholder: "Patient",
      label: "Patient",
      name: "patient",
    },
    {
      id: "dos",
      component: "datepicker",
      placeholder: "DOS",
      label: "DOS",
      name: "dos",
      disabled: props.mode && props.mode === "view" ? true : false,
    },
    {
      id: "startTm",
      component: "timepicker",
      placeholder: "Start time",
      label: "Start time",
      name: "startTm",
      disabled: props.mode && props.mode === "view" ? true : false,
    },
    {
      id: "endTm",
      component: "timepicker",
      placeholder: "End time",
      label: "End time",
      name: "endTm",
      disabled: props.mode && props.mode === "view" ? true : false,
    },
    {
      id: "service",
      component: "singlecomplete",
      placeholder: "Service",
      label: "Service",
      name: "service",
    },
    {
      id: "unit",
      component: "textfield",
      placeholder: "Unit",
      label: "Unit",
      name: "unit",
      type: "number",
    },
    {
      id: "billedAmt",
      component: "textfield",
      placeholder: "Billed Amount",
      label: "Billed Amount",
      name: "billedAmt",
      type: "number",
    },
    {
      id: "paidAmt",
      component: "textfield",
      placeholder: "Paid Amount",
      label: "Paid Amount",
      name: "paidAmt",
      type: "number",
    },
    {
      id: "comments",
      component: "textfield",
      placeholder: "Comments",
      label: "Comments",
      name: "comments",
    },
  ];
  useEffect(() => {
    console.log("[props distribution form]", props);
    const fm = {};
    fm.orderDt = new Date();
    fm.position = "-";
    fm.facility = "-";
    setGeneralForm(fm);
    if (
      props.profileState &&
      props.profileState.data &&
      props.profileState.data.length
    ) {
      const userProfile = props.profileState.data[0];
      isPatientListDone = false;
      isServiceListDone = false;
      props.listPatients({ companyId: userProfile.companyId });
      props.listServices({ companyId: userProfile.companyId });
    }
  }, []);
  useEffect(() => {
    if (
      !isPatientCollection &&
      props.patients?.status === ACTION_STATUSES.SUCCEED
    ) {
      const data = props.patients.data || [];
      patients = [];
      data.forEach((e) => {
        e.label = e.name;
        e.value = e.name;
        e.description = e.name;
        e.category = "patient";
        patients.push(e);
      });
      isPatientListDone = true;

      setIsPatientCollection(true);
    }
    if (
      !isServiceCollection &&
      props.services?.status === ACTION_STATUSES.SUCCEED
    ) {
      const data = props.services.data || [];
      services = [];
      data.forEach((e) => {
        e.name = e.code;
        e.label = e.name;
        e.value = e.name;
        e.description = e.name;
        e.category = "service";
        services.push(e);
      });
      isServiceListDone = true;

      props.resetListServices();
      setIsServiceCollection(true);
    }
  }, [isPatientCollection, isServiceCollection]);
  const validateFormHandler = () => {
    console.log("[Print Handler]", generalForm, detailForm);
    props.createClaimHandler(generalForm, detailForm, props.mode);
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
        console.log("[Cancel me]");
        props.onClose();
      },
    },
  ];
  const inputGeneralHandler = ({ target }) => {
    console.log("[Target General]", target, generalForm);
    const source = { ...generalForm };
    source[target.name] = target.value;
    setGeneralForm(source);
  };
  const inputDetailHandler = ({ target }, source) => {
    console.log("[Source]", source, target.name, target.value);
    source[target.name] = target.value;

    setIsRefresh(!isRefresh);
  };
  const autoCompleteGeneralInputHander = (item) => {
    const src = { ...generalForm };
    console.log("[src]", src, item);

    setGeneralForm(src);
  };

  const autoCompleteDetailInputHander = (item, source) => {
    console.log("[Auto Complete Detail]", item, source);
    if (item.category === "service") {
      console.log("[Item Category]", item, source);
      const from = moment(new Date(`${source.dos} ${source.startTm}`));
      const end = moment(new Date(`${source.dos} ${source.endTm}`));

      const diff = moment.duration(end.diff(from));
      const diffMin = parseFloat(diff.asMinutes(), 10);
      if (source.rate_per_min && source.rate_per_min > 0) {
        console.log("[DIFF MIN]", diff, diffMin, diffMin / source.rate_per_min);
      }
    }
    setIsRefresh(!isRefresh);
  };
  const onChangeGeneralInputHandler = (e) => {
    const src = { ...generalForm };
    if (!e.target.value) {
      src[e.target.name] = { name: "", label: "" };
      setGeneralForm(src);
    }
  };
  const onChangeDetailInputHandler = (e, source) => {
    if (!e.target.value) {
      source[e.target.name] = undefined;
      setIsRefresh(!isRefresh);
    }
  };
  const addItemHandler = () => {
    const records = [...detailForm];
    records.push({
      id: uuidv4(),
      dos: moment(new Date()).format("YYYY-MM-DD HH:mm"),
      startTm: "09:00",
      endTm: "10:00",
    });
    setDetailForm(records);
  };
  if (detailForm && detailForm.length === 0) {
    addItemHandler();
  }
  const deleteItemHandler = (indx) => {
    const fm = [...detailForm];
    fm.splice(indx, 1);

    setDetailForm(fm);
  };
  const dateInputHandler = (value, name) => {
    const src = { ...generalForm };
    src[name] = moment(new Date(value)).format("YYYY-MM-DD HH:mm");
    setIsRefresh(!isRefresh);
  };
  const dateInputDetailHandler = (value, name, source) => {
    console.log("[Details]", value, name, source);
    source[name] = moment(new Date(value)).format("YYYY-MM-DD HH:mm");
    setIsRefresh(!isRefresh);
  };

  const titleHandler = () => {
    if (props.mode === "view") {
      return "View Claims Record";
    } else if (props.mode === "edit") {
      return "Edit Claims Record";
    } else {
      return "Create Claims Record";
    }
  };

  const clearModalHandler = () => {
    props.closeFormModalHandler();
  };
  if (
    isServiceCollection &&
    props.services?.status === ACTION_STATUSES.SUCCEED
  ) {
    setIsServiceCollection(false);
  }
  if (
    isPatientCollection &&
    props.patients?.status === ACTION_STATUSES.SUCCEED
  ) {
    setIsPatientCollection(false);
  }
  if (
    isServiceCollection &&
    props.services?.status === ACTION_STATUSES.SUCCEED
  ) {
    setIsServiceCollection(false);
  }
  const timeInputHandler = ({ target }) => {
    console.log("[TARGET]", target.name, target.value);
    const src = { ...generalForm };
    src[target.name] = target.value;
    setGeneralForm(src);
  };
  console.log("[general form]", generalForm, detailForm);
  isProcessDone = isPatientListDone && isServiceListDone;
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
      onRequestClose={clearModalHandler}
      ariaHideApp={false}
    >
      <div className={styles.form}>
        <HeaderModal title={titleHandler()} onClose={clearModalHandler} />
        {isProcessDone ? (
          <div className={styles.content}>
            <Typography variant="h6">General Information</Typography>
            <Grid container spacing={1} direction="row">
              {general.map((item) => {
                return (
                  <Grid item xs={12} md={3} sm={12}>
                    {item.component === "textfield" ? (
                      <React.Fragment>
                        <CustomTextField
                          {...item}
                          value={generalForm[item.name]}
                          onChange={inputGeneralHandler}
                        />
                      </React.Fragment>
                    ) : item.component === "datepicker" ? (
                      <CustomDatePicker
                        {...item}
                        value={generalForm[item.name]}
                        onChange={dateInputHandler}
                      />
                    ) : item.component === "singlecomplete" ? (
                      <React.Fragment>
                        <CustomSingleAutoComplete
                          {...item}
                          value={generalForm[item.name]}
                          onSelectHandler={autoCompleteGeneralInputHander}
                          onChangeHandler={onChangeGeneralInputHandler}
                        />
                      </React.Fragment>
                    ) : item.component === "select" ? (
                      <React.Fragment>
                        <RegularSelect
                          {...item}
                          onChange={inputGeneralHandler}
                          value={generalForm[item.value]}
                        />
                      </React.Fragment>
                    ) : null}
                  </Grid>
                );
              })}
            </Grid>
            <br />
            <Typography variant="h6">Claims</Typography>
            {detailForm.map((item, index) => {
              return (
                <Grid
                  container
                  spacing={1}
                  direction="row"
                  style={{ paddingBottom: 12 }}
                  key={`contr-${index}`}
                >
                  <Grid item xs={12} md={1} sm={12}>
                    <div style={{ display: "inline-flex", gap: 10 }}>
                      <Avatar className={classes.small}>{index + 1}</Avatar>
                      <div style={{ paddingTop: 4 }}>
                        <Tooltip title={"Delete Item"}>
                          <DeleteIcon
                            style={{
                              color: "#F62100",
                              fontSize: "24px",
                              cursor: "pointer",
                            }}
                            onClick={() => deleteItemHandler(index)}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} md={3} sm={12}>
                    <CustomSingleAutoComplete
                      disabled={
                        (props.mode && props.mode === "view") ||
                        props.mode === "edit"
                          ? true
                          : false
                      }
                      {...item}
                      source={item}
                      options={patients || [DEFAULT_ITEM]}
                      {...details.find((d) => d.id === "patient")}
                      value={item["patient"]}
                      onSelectHandler={autoCompleteDetailInputHander}
                      onChangeHandler={onChangeDetailInputHandler}
                    />
                  </Grid>

                  <Grid item xs={12} md={2} sm={12}>
                    <CustomDatePicker
                      {...item}
                      source={item}
                      {...details.find((d) => d.id === "dos")}
                      value={item["dos"]}
                      onChange={dateInputDetailHandler}
                    />
                  </Grid>
                  <Grid item xs={12} md={2} sm={12}>
                    <CustomTimePicker
                      {...item}
                      source={item}
                      {...details.find((d) => d.id === "startTm")}
                      value={item["startTm"] || "09:00"}
                      onChange={inputDetailHandler}
                    />
                  </Grid>
                  <Grid item xs={12} md={2} sm={12}>
                    <CustomTimePicker
                      {...item}
                      source={item}
                      {...details.find((d) => d.id === "endTm")}
                      value={item["endTm"] || "10:00"}
                      onChange={inputDetailHandler}
                    />
                  </Grid>
                  <Grid item xs={2} md={2} sm={12}>
                    <CustomSingleAutoComplete
                      disabled={
                        (props.mode && props.mode === "view") ||
                        props.mode === "edit"
                          ? true
                          : false
                      }
                      source={item}
                      {...details.find((d) => d.id === "service")}
                      value={item["service"]}
                      options={services || [DEFAULT_ITEM]}
                      onSelectHandler={autoCompleteDetailInputHander}
                      onChangeHandler={onChangeDetailInputHandler}
                    />
                  </Grid>

                  <Grid item xs={12} md={2} sm={12}>
                    <CustomTextField
                      source={item}
                      {...details.find((d) => d.id === "unit")}
                      value={item["unit"] || 0}
                      onChange={inputDetailHandler}
                    />
                  </Grid>
                  <Grid item xs={12} md={2} sm={12}>
                    <CustomTextField
                      disabled={
                        props.mode && props.mode === "view" ? true : false
                      }
                      source={item}
                      {...details.find((d) => d.id === "billedAmt")}
                      value={item["billedAmt"] || 0}
                      onChange={inputDetailHandler}
                    />
                  </Grid>
                  <Grid item xs={12} md={2} sm={12}>
                    <CustomTextField
                      disabled={
                        props.mode && props.mode === "view" ? true : false
                      }
                      source={item}
                      {...details.find((d) => d.id === "paidAmt")}
                      value={item["paidAmt"] || 0}
                      onChange={inputDetailHandler}
                    />
                  </Grid>
                  <Grid item xs={12} md={6} sm={12}>
                    <CustomTextField
                      source={item}
                      {...details.find((d) => d.id === "comments")}
                      value={item["comments"] || ""}
                      onChange={inputDetailHandler}
                    />
                  </Grid>
                </Grid>
              );
            })}

            <div
              style={{
                paddingTop: 4,
                display: props.mode && props.mode === "edit" ? "none" : "",
              }}
            >
              <Button
                disabled={props.mode && props.mode === "view" ? true : false}
                variant="outlined"
                color="primary"
                style={{ fontSize: 14 }}
                onClick={() => addItemHandler()}
              >
                Add Item
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <CircularProgress></CircularProgress>Loading...
          </div>
        )}
        <br />
        {props.mode && props.mode === "view" ? null : (
          <ModalFooter actions={footerActions} />
        )}
      </div>
    </ReactModal>
  );
}
const mapStateToProps = (store) => ({
  profileState: profileListStateSelector(store),
  patients: patientListStateSelector(store),
  services: serviceListStateSelector(store),
});

const mapDispatchToProps = (dispatch) => ({
  listPatients: (data) => dispatch(attemptToFetchPatient(data)),
  resetListPatients: () => dispatch(resetFetchPatientState()),
  listServices: (data) => dispatch(attemptToFetchService(data)),
  resetListServices: () => dispatch(resetFetchServiceState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MedicaidForm);
