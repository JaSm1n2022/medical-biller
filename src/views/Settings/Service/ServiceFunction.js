import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import ServiceHandler from "./handler/ServiceHandler";
import { connect } from "react-redux";
import ActionsFunction from "components/Actions/ActionsFunction";
import { ACTION_STATUSES } from "utils/constants";
import { Button, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import HospiceTable from "components/Table/HospiceTable";
import { ImportExport } from "@material-ui/icons";
import Helper from "utils/helper";
import * as FileSaver from "file-saver";

import ServiceForm from "./components/ServiceForm";
import { attemptToUpdateService } from "store/actions/serviceAction";
import TOAST from "modules/toastManager";
import { serviceListStateSelector } from "store/selectors/serviceSelector";
import { serviceCreateStateSelector } from "store/selectors/serviceSelector";
import { serviceUpdateStateSelector } from "store/selectors/serviceSelector";
import { serviceDeleteStateSelector } from "store/selectors/serviceSelector";
import { attemptToFetchService } from "store/actions/serviceAction";
import { resetFetchServiceState } from "store/actions/serviceAction";
import { attemptToCreateService } from "store/actions/serviceAction";
import { resetCreateServiceState } from "store/actions/serviceAction";
import { resetUpdateServiceState } from "store/actions/serviceAction";
import { attemptToDeleteService } from "store/actions/serviceAction";
import { resetDeleteServiceState } from "store/actions/serviceAction";
import FilterTable from "components/Table/FilterTable";
import { profileListStateSelector } from "store/selectors/profileSelector";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);
let productList = [];
let grandTotal = 0.0;
let originalSource = undefined;
let locationList = [];
let userProfile = {};

function ServiceFunction(props) {
  const classes = useStyles();

  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState(ServiceHandler.columns(true));
  const [isServicesCollection, setIsServicesCollection] = useState(true);
  const [isCreateServiceCollection, setIsCreateServiceCollection] = useState(
    true
  );
  const [isUpdateServiceCollection, setIsUpdateServiceCollection] = useState(
    true
  );
  const [isDeleteServiceCollection, setIsDeleteServiceCollection] = useState(
    true
  );
  const [isFormModal, setIsFormModal] = useState(false);
  const [item, setItem] = useState(undefined);
  const [mode, setMode] = useState("create");
  const [isAddGroupButtons, setIsAddGroupButtons] = useState(false);

  const createFormHandler = (data, mode) => {
    setItem(data);
    setMode(mode || "create");
    setIsFormModal(true);
  };
  const closeFormModalHandler = () => {
    setIsFormModal(false);
  };

  useEffect(() => {
    if (
      !isServicesCollection &&
      props.services &&
      props.services.status === ACTION_STATUSES.SUCCEED
    ) {
      props.resetListServices();
      setIsServicesCollection(true);
    }

    if (
      !isCreateServiceCollection &&
      props.createServiceState &&
      props.createServiceState.status === ACTION_STATUSES.SUCCEED
    ) {
      props.resetCreateService();

      setIsCreateServiceCollection(true);
    }
    if (
      !isUpdateServiceCollection &&
      props.updateServiceState &&
      props.updateServiceState.status === ACTION_STATUSES.SUCCEED
    ) {
      props.resetUpdateService();

      setIsUpdateServiceCollection(true);
    }
    if (
      !isDeleteServiceCollection &&
      props.deleteServiceState &&
      props.deleteServiceState.status === ACTION_STATUSES.SUCCEED
    ) {
      console.log("[change me to true]");
      props.resetDeleteService();
      setIsDeleteServiceCollection(true);
    }
  }, [
    isDeleteServiceCollection,
    isUpdateServiceCollection,
    isCreateServiceCollection,
    isServicesCollection,
  ]);
  useEffect(() => {
    console.log("list Services", props.profileState);
    if (
      props.profileState &&
      props.profileState.data &&
      props.profileState.data.length
    ) {
      userProfile = props.profileState.data[0];
      props.listServices({ companyId: userProfile.companyId });
    }
  }, []);

  if (
    isServicesCollection &&
    props.services &&
    props.services.status === ACTION_STATUSES.SUCCEED
  ) {
    grandTotal = 0.0;
    let source = props.services.data;
    if (source && source.length) {
      source = ServiceHandler.mapData(source, productList);
    }

    const cols = ServiceHandler.columns(true).map((col, index) => {
      if (col.name === "actions") {
        return {
          ...col,
          editable: () => false,
          render: (cellProps) => (
            <ActionsFunction
              deleteRecordItemHandler={deleteRecordItemHandler}
              createFormHandler={createFormHandler}
              data={{ ...cellProps.data }}
            />
          ),
        };
      } else {
        return {
          ...col,
          editable: () => false,
        };
      }
    });
    setColumns(cols);
    originalSource = [...source];

    setDataSource(source);
    setIsServicesCollection(false);
  }
  const deleteRecordItemHandler = (id) => {
    console.log("[delete Service id]", id);
    props.deleteService(id);
  };
  const createServiceHandler = (payload, mode) => {
    console.log("[Create Service Handler]", payload, mode, userProfile);

    const params = {
      code: payload.code,
      description: payload.description,
      unit: payload.unit,
      rate: payload.rate,
      rate_per_min: payload.unitPerMin,
      provider: payload?.provider,
      companyId: userProfile.companyId,
      updatedUser: {
        name: userProfile.name,
        userId: userProfile.id,
        date: new Date(),
      },
    };

    if (mode === "create") {
      params.createdUser = {
        name: userProfile.name,
        userId: userProfile.companyId,
        date: new Date(),
      };
      props.createService(params);
    } else if (mode === "edit") {
      params.id = payload.id;
      props.updateService(params);
    }
    closeFormModalHandler();
  };
  console.log("[Is Create Service Collection]", props.createServiceState);
  if (
    isCreateServiceCollection &&
    props.createServiceState &&
    props.createServiceState.status === ACTION_STATUSES.SUCCEED
  ) {
    setIsCreateServiceCollection(false);
    TOAST.ok("Service successfully created.");
    props.listServices({ companyId: userProfile.companyId });
  }
  if (
    isUpdateServiceCollection &&
    props.updateServiceState &&
    props.updateServiceState.status === ACTION_STATUSES.SUCCEED
  ) {
    TOAST.ok("Service successfully updated.");
    setIsUpdateServiceCollection(false);
    props.listServices({ companyId: userProfile.companyId });
  }
  console.log(
    "[isDeleteService]",
    isDeleteServiceCollection,
    props.deleteServiceState
  );
  if (
    isDeleteServiceCollection &&
    props.deleteServiceState &&
    props.deleteServiceState.status === ACTION_STATUSES.SUCCEED
  ) {
    TOAST.ok("Service successfully deleted.");
    setIsDeleteServiceCollection(false);

    props.listServices({ companyId: userProfile.companyId });
  }

  const filterRecordHandler = (keyword) => {
    console.log("[Keyword]", keyword);
    if (!keyword) {
      setDataSource([...originalSource]);
    } else {
      const temp = [...originalSource];
      console.log("[Tempt]", temp);
      let found = temp.filter(
        (data) =>
          data.code.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
          data.description.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
      );

      setDataSource(found);
    }
  };

  const onCheckboxSelectionHandler = (data, isAll, itemIsChecked) => {
    console.log("[data ALl]", data, isAll, itemIsChecked);
    let dtSource = [...dataSource];
    if (isAll) {
      dtSource.forEach((item) => {
        item.isChecked = isAll; // reset
      });
    } else if (!isAll && data && data.length > 0) {
      dtSource.forEach((item) => {
        if (item.id.toString() === data[0].toString()) {
          item.isChecked = itemIsChecked;
        }
      });
    } else if (!isAll && Array.isArray(data) && data.length === 0) {
      dtSource.forEach((item) => {
        item.isChecked = isAll; // reset
      });
    }
    setIsAddGroupButtons(dtSource.find((f) => f.isChecked));
    originalSource = [...dtSource];
    setDataSource(dtSource);
  };
  const exportToExcelHandler = () => {
    const excelData = dataSource.filter((r) => r.isChecked);
    const headers = columns;
    const excel = Helper.formatExcelReport(headers, excelData);
    console.log("headers", excel);
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    let fileName = `Service_list_batch_${new Date().getTime()}`;

    if (excelData && excelData.length) {
      import(/* webpackChunkName: 'json2xls' */ "json2xls")
        .then((json2xls) => {
          // let fileName = fname + '_' + new Date().getTime();
          const xls =
            typeof json2xls === "function"
              ? json2xls(excel)
              : json2xls.default(excel);
          const buffer = Buffer.from(xls, "binary");
          // let buffer = Buffer.from(excelBuffer);
          const data = new Blob([buffer], { type: fileType });
          FileSaver.saveAs(data, fileName + fileExtension);
        })
        .catch((err) => {
          // Handle failure
          console.log(err);
        });
    }
  };

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <Grid container justifyContent="space-between">
                <h4 className={classes.cardTitleWhite}>Service Setup</h4>
              </Grid>
            </CardHeader>
            <CardBody>
              <Grid
                container
                justifyContent="space-between"
                style={{ paddingBottom: 4 }}
              >
                <div
                  style={{ display: "inline-flex", gap: 10, paddingTop: 10 }}
                >
                  <Button
                    onClick={() => createFormHandler()}
                    variant="contained"
                    style={{
                      border: "solid 1px #2196f3",
                      color: "white",
                      background: "#2196f3",
                      fontFamily: "Roboto",
                      fontSize: "12px",
                      fontWeight: 500,

                      fontStretch: "normal",
                      fontStyle: "normal",
                      lineHeight: 1.71,
                      letterSpacing: "0.4px",
                      textAlign: "left",
                      cursor: "pointer",
                    }}
                    component="span"
                    startIcon={<AddIcon />}
                  >
                    ADD Service
                  </Button>
                  {isAddGroupButtons && (
                    <Button
                      onClick={() => exportToExcelHandler()}
                      variant="outlined"
                      style={{
                        fontFamily: "Roboto",
                        fontSize: "12px",
                        fontWeight: 500,

                        fontStretch: "normal",
                        fontStyle: "normal",
                        lineHeight: 1.71,
                        letterSpacing: "0.4px",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                      component="span"
                      startIcon={<ImportExport />}
                    >
                      {" "}
                      Export Excel{" "}
                    </Button>
                  )}
                </div>
                <div>
                  <FilterTable
                    filterRecordHandler={filterRecordHandler}
                    isNoDate={true}
                    main={false}
                  />
                </div>
              </Grid>
              <HospiceTable
                columns={columns}
                main={true}
                grandTotal={grandTotal}
                dataSource={dataSource}
                height={400}
                onCheckboxSelectionHandler={onCheckboxSelectionHandler}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

      {isFormModal && (
        <ServiceForm
          filterRecordHandler={filterRecordHandler}
          dataSource={dataSource}
          createServiceHandler={createServiceHandler}
          mode={mode}
          isOpen={isFormModal}
          isEdit={false}
          item={item}
          closeFormModalHandler={closeFormModalHandler}
        />
      )}
    </>
  );
}

const mapStateToProps = (store) => ({
  services: serviceListStateSelector(store),
  createServiceState: serviceCreateStateSelector(store),
  updateServiceState: serviceUpdateStateSelector(store),
  deleteServiceState: serviceDeleteStateSelector(store),
  profileState: profileListStateSelector(store),
});

const mapDispatchToProps = (dispatch) => ({
  listServices: (data) => dispatch(attemptToFetchService(data)),
  resetListServices: () => dispatch(resetFetchServiceState()),
  createService: (data) => dispatch(attemptToCreateService(data)),
  resetCreateService: () => dispatch(resetCreateServiceState()),
  updateService: (data) => dispatch(attemptToUpdateService(data)),
  resetUpdateService: () => dispatch(resetUpdateServiceState()),
  deleteService: (data) => dispatch(attemptToDeleteService(data)),
  resetDeleteService: () => dispatch(resetDeleteServiceState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ServiceFunction);
