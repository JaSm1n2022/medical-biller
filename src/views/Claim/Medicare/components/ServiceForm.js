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

import { makeStyles } from "@material-ui/core";
import CustomDatePicker from "components/Date/CustomDatePicker";
import CustomSelect from "components/Select/CustomSelect";
import HeaderModal from "components/Modal/HeaderModal";

import { useTheme } from "@material-ui/core";
import moment from "moment";

import { SERVICE_CATEGORY } from "utils/constants";

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

function ServiceForm(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [generalForm, setGeneralForm] = useState({});

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [modalStyle] = React.useState(getModalStyle);
  const [components, setComponents] = useState([]);

  const { isOpen } = props;

  useEffect(() => {
    const fm = {};
    fm.created_at = new Date();
    const general = [
      {
        id: "provider",
        component: "singlecomplete",
        placeholder: "provider",
        label: "Provider",
        name: "service",
        options: SERVICE_CATEGORY,

        //disabled: props.mode && props.mode === 'view' ? true : false,

        cols: 3,
      },
      {
        id: "code",
        component: "textfield",
        placeholder: "Code",
        label: "Code",
        name: "code",
        //disabled: props.mode && props.mode === 'view' ? true : false,

        cols: 3,
      },

      {
        id: "description",
        component: "textfield",
        placeholder: "Description",
        label: "Description",
        name: "description",
        //disabled: props.mode && props.mode === 'view' ? true : false,

        cols: 6,
      },
      {
        id: "unit",
        component: "textfield",
        placeholder: "Unit",
        label: "Unit",
        name: "unit",
        type: "number",
        //disabled: props.mode && props.mode === 'view' ? true : false,

        cols: 3,
      },
      {
        id: "rate",
        component: "textfield",
        placeholder: "Rate",
        label: "Rate",
        name: "rate",
        type: "number",
        //disabled: props.mode && props.mode === 'view' ? true : false,

        cols: 3,
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
      fm.service = SERVICE_CATEGORY.find((s) => s.name === fm.provider);
      setGeneralForm(fm);
    }
  }, [props.item]);

  const validateFormHandler = () => {
    const tempList = [...components];
    console.log("[generalForm]", generalForm);

    props.createServiceHandler(generalForm, props.mode);
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

    if (["code"].includes(target.name) && !target.value) {
      currentItem.isError = true;
      currentItem.errorMsg = `${currentItem.label} is required.`;

      setComponents(tempList);
    }
    setGeneralForm(source);
  };

  const autoCompleteGeneralInputHander = (item) => {
    const src = { ...generalForm };
    console.log("[src autocomplete]", src, item);
    if (item.category === "service") {
      src.provider = item?.name;
      src.service = item;
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
      return "View Service";
    } else if (props.mode === "edit") {
      return "Edit Service";
    } else {
      return "Create Service";
    }
  };
  console.log("[general form]", generalForm);
  const clearModalHandler = () => {
    console.log("[Clear Me]");

    props.closeFormModalHandler();
  };
  const disabledComponentHandler = (src) => {
    console.log("[Disabled Me]", src);
    if (src && src.name == "service") {
      return false;
    }
    if (
      src &&
      src.name &&
      src.name !== "service" &&
      JSON.stringify(generalForm) !== "{}" &&
      !generalForm.provider
    ) {
      return true;
    }
    return false;
  };
  const isSubmitButtonDisabled = () => {
    return (
      JSON.stringify(generalForm) === "{}" ||
      !generalForm.code ||
      !generalForm.provider
    );
  };

  console.log("[General FormX]", generalForm);
  return (
    <Modal
      open={isOpen}
      onClose={clearModalHandler}
      aria-labelledby="service"
      aria-describedby="servicemodal"
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
export default ServiceForm;
