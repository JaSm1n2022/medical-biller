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
import { attemptToUpdateClaim } from "store/actions/claimAction";
import TOAST from "modules/toastManager";
import { claimListStateSelector } from "store/selectors/claimSelector";
import { claimCreateStateSelector } from "store/selectors/claimSelector";
import { claimUpdateStateSelector } from "store/selectors/claimSelector";
import { claimDeleteStateSelector } from "store/selectors/claimSelector";
import { attemptToFetchClaim } from "store/actions/claimAction";
import { resetFetchClaimState } from "store/actions/claimAction";
import { attemptToCreateClaim } from "store/actions/claimAction";
import { resetCreateClaimState } from "store/actions/claimAction";
import { resetUpdateClaimState } from "store/actions/claimAction";
import { attemptToDeleteClaim } from "store/actions/claimAction";
import { resetDeleteClaimState } from "store/actions/claimAction";
import FilterTable from "components/Table/FilterTable";
import { profileListStateSelector } from "store/selectors/profileSelector";
import ResultTable from "components/Table/ResultTable";
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
  const [isClaimsCollection, setIsClaimsCollection] = useState(true);
  const [isCreateClaimCollection, setIsCreateClaimCollection] = useState(true);
  const [isUpdateClaimCollection, setIsUpdateClaimCollection] = useState(true);
  const [isDeleteClaimCollection, setIsDeleteClaimCollection] = useState(true);
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
      !isClaimsCollection &&
      props.claims &&
      props.claims.status === ACTION_STATUSES.SUCCEED
    ) {
      props.resetListClaims();
      setIsClaimsCollection(true);
    }

    if (
      !isCreateClaimCollection &&
      props.createClaimState &&
      props.createClaimState.status === ACTION_STATUSES.SUCCEED
    ) {
      props.resetCreateClaim();

      setIsCreateClaimCollection(true);
    }
    if (
      !isUpdateClaimCollection &&
      props.updateClaimState &&
      props.updateClaimState.status === ACTION_STATUSES.SUCCEED
    ) {
      props.resetUpdateClaim();

      setIsUpdateClaimCollection(true);
    }
    if (
      !isDeleteClaimCollection &&
      props.deleteClaimState &&
      props.deleteClaimState.status === ACTION_STATUSES.SUCCEED
    ) {
      console.log("[change me to true]");
      props.resetDeleteClaim();
      setIsDeleteClaimCollection(true);
    }
  }, [
    isDeleteClaimCollection,
    isUpdateClaimCollection,
    isCreateClaimCollection,
    isClaimsCollection,
  ]);
  useEffect(() => {
    console.log("list Claims", props.profileState);
    if (
      props.profileState &&
      props.profileState.data &&
      props.profileState.data.length
    ) {
      userProfile = props.profileState.data[0];
      const dates = Helper.formatDateRangeByCriteriaV2("thisMonth");
      setDateFrom(dates.from);
      setDateTo(dates.to);
      props.listClaims({
        companyId: userProfile.companyId,
        provider: "Medicaid",
        from: dates.from,
        to: dates.to,
      });
    }
  }, []);

  if (
    isClaimsCollection &&
    props.claims &&
    props.claims.status === ACTION_STATUSES.SUCCEED
  ) {
    grandTotal = 0.0;
    let source = props.claims.data;
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

    setDataSource(source);
    setIsClaimsCollection(false);
  }
  const deleteRecordItemHandler = (id) => {
    console.log("[delete Claim id]", id);
    props.deleteClaim(id);
  };
  const createClaimHandler = (general, details, mode) => {
    console.log("[Create Claim Handler]", general, details, mode, userProfile);

    const finalPayload = [];
    for (const payload of details) {
      const params = {
        provider: "Medicaid",
        client_name: payload?.patient?.name,
        client_id: payload?.patient?.id,
        client_code: payload?.patient?.patientCd,
        date_of_service: payload?.dos.split(" ")[0],
        dos_start: payload?.startTm,
        dos_end: payload?.endTm,
        service_code: payload?.service?.code,
        service_desc: payload?.service?.description,
        service_id: payload?.service?.id,
        billed_amount: payload?.billedAmt,
        paid_amount: payload?.paidAmt || 0,
        billed_on: general.billedDt,
        eft: general.eftNumber,
        paid_on: general.paidOnDt,
        paid_issued: general.paidIssuedDt,
        unit: payload?.unit,
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
        //  props.createClaim(params);
      } else if (mode === "edit") {
        params.id = payload.id;
        // props.updateClaim(params);
      }
      finalPayload.push(params);
    }

    if (mode === "create") {
      console.log("[final payload]", finalPayload);
      props.createClaim(finalPayload);
    } else if (mode === "edit") {
      console.log("[Final Payload]", finalPayload);
      props.updateClaim(finalPayload);
    }

    closeFormModalHandler();
  };
  console.log("[Is Create Claim Collection]", props.createClaimState);
  if (
    isCreateClaimCollection &&
    props.createClaimState &&
    props.createClaimState.status === ACTION_STATUSES.SUCCEED
  ) {
    setIsCreateClaimCollection(false);
    TOAST.ok("Claim successfully created.");
    props.listClaims({
      companyId: userProfile.companyId,
      provider: "Medicaid",
      from: dateFrom,
      to: dateTo,
    });
  }
  if (
    isUpdateClaimCollection &&
    props.updateClaimState &&
    props.updateClaimState.status === ACTION_STATUSES.SUCCEED
  ) {
    TOAST.ok("Claim successfully updated.");
    setIsUpdateClaimCollection(false);
    props.listClaims({
      companyId: userProfile.companyId,
      provider: "Medicaid",
      from: dateFrom,
      to: dateTo,
    });
  }
  console.log(
    "[isDeleteClaim]",
    isDeleteClaimCollection,
    props.deleteClaimState
  );
  if (
    isDeleteClaimCollection &&
    props.deleteClaimState &&
    props.deleteClaimState.status === ACTION_STATUSES.SUCCEED
  ) {
    TOAST.ok("Claim successfully deleted.");
    setIsDeleteClaimCollection(false);

    props.listClaims({
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
  const filterByDateHandler = (dates) => {
    setDateTo(dates.to);
    setDateFrom(dates.from);

    props.listClaims({
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
    let fileName = `Claim_list_batch_${new Date().getTime()}`;

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
                <h4 className={classes.cardTitleWhite}>Claim Setup</h4>
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
                  ADD Claim
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
        <MedicaidForm
          filterRecordHandler={filterRecordHandler}
          dataSource={dataSource}
          createClaimHandler={createClaimHandler}
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
  claims: claimListStateSelector(store),
  createClaimState: claimCreateStateSelector(store),
  updateClaimState: claimUpdateStateSelector(store),
  deleteClaimState: claimDeleteStateSelector(store),
  profileState: profileListStateSelector(store),
});

const mapDispatchToProps = (dispatch) => ({
  listClaims: (data) => dispatch(attemptToFetchClaim(data)),
  resetListClaims: () => dispatch(resetFetchClaimState()),
  createClaim: (data) => dispatch(attemptToCreateClaim(data)),
  resetCreateClaim: () => dispatch(resetCreateClaimState()),
  updateClaim: (data) => dispatch(attemptToUpdateClaim(data)),
  resetUpdateClaim: () => dispatch(resetUpdateClaimState()),
  deleteClaim: (data) => dispatch(attemptToDeleteClaim(data)),
  resetDeleteClaim: () => dispatch(resetDeleteClaimState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MedicaidFunction);
