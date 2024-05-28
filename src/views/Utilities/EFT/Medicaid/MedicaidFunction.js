import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

import MedicaidHandler from "./handler/MedicaidHandler";
import { connect } from "react-redux";
import ActionsFunction from "components/Actions/ActionsFunction";
import { ACTION_STATUSES } from "utils/constants";
import { Button, Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

import { ImportExport } from "@material-ui/icons";
import Helper from "utils/helper";
import * as FileSaver from "file-saver";

import MedicaidForm from "./components/MedicaidForm";
import { attemptToUpdateEft } from "store/actions/eftAction";
import TOAST from "modules/toastManager";
import { eftListStateSelector } from "store/selectors/eftSelector";
import { eftCreateStateSelector } from "store/selectors/eftSelector";
import { eftUpdateStateSelector } from "store/selectors/eftSelector";
import { eftDeleteStateSelector } from "store/selectors/eftSelector";
import { attemptToFetchEft } from "store/actions/eftAction";
import { resetFetchEftState } from "store/actions/eftAction";
import { attemptToCreateEft } from "store/actions/eftAction";
import { resetCreateEftState } from "store/actions/eftAction";
import { resetUpdateEftState } from "store/actions/eftAction";
import { attemptToDeleteEft } from "store/actions/eftAction";
import { resetDeleteEftState } from "store/actions/eftAction";
import FilterTable from "components/Table/FilterTable";
import { profileListStateSelector } from "store/selectors/profileSelector";
import ResultTable from "components/Table/ResultTable";
import EftUploader from "views/Utilities/EftUploader";
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

function MedicaidFunction(props) {
  const classes = useStyles();

  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState(MedicaidHandler.columns(true));
  const [isEftsCollection, setIsEftsCollection] = useState(true);
  const [isCreateEftCollection, setIsCreateEftCollection] = useState(true);
  const [isUpdateEftCollection, setIsUpdateEftCollection] = useState(true);
  const [isDeleteEftCollection, setIsDeleteEftCollection] = useState(true);
  const [isFormModal, setIsFormModal] = useState(false);
  const [item, setItem] = useState(undefined);
  const [mode, setMode] = useState("create");
  const [isAddGroupButtons, setIsAddGroupButtons] = useState(false);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

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
      !isEftsCollection &&
      props.efts &&
      props.efts.status === ACTION_STATUSES.SUCCEED
    ) {
      props.resetListEfts();
      setIsEftsCollection(true);
    }

    if (
      !isCreateEftCollection &&
      props.createEftState &&
      props.createEftState.status === ACTION_STATUSES.SUCCEED
    ) {
      props.resetCreateEft();

      setIsCreateEftCollection(true);
    }
    if (
      !isUpdateEftCollection &&
      props.updateEftState &&
      props.updateEftState.status === ACTION_STATUSES.SUCCEED
    ) {
      props.resetUpdateEft();

      setIsUpdateEftCollection(true);
    }
    if (
      !isDeleteEftCollection &&
      props.deleteEftState &&
      props.deleteEftState.status === ACTION_STATUSES.SUCCEED
    ) {
      console.log("[change me to true]");
      props.resetDeleteEft();
      setIsDeleteEftCollection(true);
    }
  }, [
    isDeleteEftCollection,
    isUpdateEftCollection,
    isCreateEftCollection,
    isEftsCollection,
  ]);
  useEffect(() => {
    console.log("list Efts", props.profileState);
    if (
      props.profileState &&
      props.profileState.data &&
      props.profileState.data.length
    ) {
      userProfile = props.profileState.data[0];
      const dates = Helper.formatDateRangeByCriteriaV2("thisMonth");
      setDateFrom(dates.from);
      setDateTo(dates.to);
      props.listEfts({
        companyId: userProfile.companyId,
        provider: "Medicaid",
        from: dates.from,
        to: dates.to,
      });
    }
  }, []);

  if (
    isEftsCollection &&
    props.efts &&
    props.efts.status === ACTION_STATUSES.SUCCEED
  ) {
    grandTotal = 0.0;
    let source = props.efts.data;
    if (source && source.length) {
      source = MedicaidHandler.mapData(source, productList);
    }

    const cols = MedicaidHandler.columns(true).map((col, index) => {
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
    source.forEach((c) => {
      grandTotal += parseFloat(c.paid_amt || 0.0);
    });
    console.log("[GRAND]", grandTotal);
    setDataSource(source);
    setIsEftsCollection(false);
  }
  const deleteRecordItemHandler = (id) => {
    console.log("[delete Eft id]", id);
    props.deleteEft(id);
  };
  console.log("[Is Create Eft Collection]", props.createEftState);
  if (
    isCreateEftCollection &&
    props.createEftState &&
    props.createEftState.status === ACTION_STATUSES.SUCCEED
  ) {
    setIsCreateEftCollection(false);
    TOAST.ok("Eft successfully created.");
    props.listEfts({
      companyId: userProfile.companyId,
      provider: "Medicaid",
      from: dateFrom,
      to: dateTo,
    });
  }
  if (
    isUpdateEftCollection &&
    props.updateEftState &&
    props.updateEftState.status === ACTION_STATUSES.SUCCEED
  ) {
    TOAST.ok("Eft successfully updated.");
    setIsUpdateEftCollection(false);
    props.listEfts({
      companyId: userProfile.companyId,
      provider: "Medicaid",
      from: dateFrom,
      to: dateTo,
    });
  }
  console.log("[isDeleteEft]", isDeleteEftCollection, props.deleteEftState);
  if (
    isDeleteEftCollection &&
    props.deleteEftState &&
    props.deleteEftState.status === ACTION_STATUSES.SUCCEED
  ) {
    TOAST.ok("Eft successfully deleted.");
    setIsDeleteEftCollection(false);

    props.listEfts({
      companyId: userProfile.companyId,
      provider: "Medicaid",
      from: dateFrom,
      to: dateTo,
    });
  }

  const filterRecordHandler = (keyword) => {
    console.log("[Keyword]", keyword);
    if (!keyword) {
      setDataSource([...originalSource]);
    } else {
      const temp = [...originalSource];
      console.log("[Tempt]", temp, keyword);
      let found = temp.filter(
        (data) =>
          data.client?.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 ||
          data.service_cd?.toLowerCase().indexOf(keyword.toLowerCase()) !==
            -1 ||
          data.status?.toLowerCase().indexOf(keyword.toLowerCase()) !== -1
      );
      console.log("[FOUND]", found);
      if (found?.length === 0) {
        TOAST.error("No record found");
      } else {
        grandTotal = 0.0;
        found.forEach((s) => {
          grandTotal += parseFloat(s.paid_amt || 0);
        });
        setDataSource(found);
      }
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
          item.isChecked = itemIsChecked ? true : false;
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
  const filterByDateHandler = (dates) => {
    setDateTo(dates.to);
    setDateFrom(dates.from);

    props.listEfts({
      companyId: userProfile.companyId,
      provider: "Medicaid",
      from: dates.from,
      to: dates.to,
    });
  };
  const exportToExcelHandler = () => {
    const excelData = dataSource.filter((r) => r.isChecked);
    const headers = columns;
    const excel = Helper.formatExcelReport(headers, excelData);
    console.log("headers", excel);
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    let fileName = `Eft_list_batch_${new Date().getTime()}`;

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
  const refreshHandler = () => {
    closeFormModalHandler();
    props.listEfts({
      companyId: userProfile.companyId,
      provider: "Medicaid",
      from: dateFrom,
      to: dateTo,
    });
  };
  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="success">
              <Grid container justifyContent="space-between">
                <h4 className={classes.cardTitleWhite}>EFT Transaction</h4>
                <h4 className={classes.cardTitleWhite}>{`${parseFloat(
                  grandTotal
                ).toFixed(2)}`}</h4>
              </Grid>
            </CardHeader>
            <CardBody>
              <Grid
                container
                justifyContent="space-between"
                style={{ paddingBottom: 4 }}
              >
                <div>
                  <FilterTable
                    filterRecordHandler={filterRecordHandler}
                    isNoDate={false}
                    filterByDateHandler={filterByDateHandler}
                    main={true}
                  />
                </div>
              </Grid>
              <div
                style={{
                  display: "inline-flex",
                  gap: 10,
                  paddingTop: 10,
                  paddingBottom: 10,
                }}
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
                  ADD EFT
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

              <ResultTable
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
        <EftUploader
          closeFormModalHandler={closeFormModalHandler}
          refreshHandler={refreshHandler}
          isOpen={isFormModal}
        />
      )}
    </>
  );
}
const mapStateToProps = (store) => ({
  efts: eftListStateSelector(store),
  createEftState: eftCreateStateSelector(store),
  updateEftState: eftUpdateStateSelector(store),
  deleteEftState: eftDeleteStateSelector(store),
  profileState: profileListStateSelector(store),
});

const mapDispatchToProps = (dispatch) => ({
  listEfts: (data) => dispatch(attemptToFetchEft(data)),
  resetListEfts: () => dispatch(resetFetchEftState()),
  createEft: (data) => dispatch(attemptToCreateEft(data)),
  resetCreateEft: () => dispatch(resetCreateEftState()),
  updateEft: (data) => dispatch(attemptToUpdateEft(data)),
  resetUpdateEft: () => dispatch(resetUpdateEftState()),
  deleteEft: (data) => dispatch(attemptToDeleteEft(data)),
  resetDeleteEft: () => dispatch(resetDeleteEftState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MedicaidFunction);
