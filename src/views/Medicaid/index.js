import {
  Button,
  CircularProgress,
  Grid,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";

import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import AddIcon from "@material-ui/icons/Add";

import { useState } from "react";

import MedicaidForm from "./components/MedicaidForm";

import MedicaidHandler from "./handler/MedicaidHandler";
import { SUPPLY_STATUS } from "utils/constants";
import HospiceTable from "components/Table/HospiceTable";

import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import { makeStyles } from "@material-ui/core/styles";
import { ImportExport } from "@material-ui/icons";
import FilterTable from "components/Table/FilterTable";

let productList = [];
let grandTotal = 0.0;
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
const MedicaidFunction = (props) => {
  const classes = useStyles();
  const [dataSource, setDataSource] = useState([]);
  const [columns, setColumns] = useState(MedicaidHandler.columns());
  const [isFormModal, setIsFormModal] = useState(false);
  const [item, setItem] = useState(undefined);
  const [mode, setMode] = useState("create");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [anchorEl, setAnchorEl] = useState(undefined);
  const [isAddGroupButtons, setIsAddGroupButtons] = useState(false);
  const filterRecordHandler = () => {};
  const filterByDateHandler = () => {};
  const createFormHandler = () => {
    setIsFormModal(true);
  };
  const exportToExcelHandler = () => {};
  const changeStatusHandler = () => {};
  const closeChangeStatusMenuHandler = () => {};
  const onCheckboxSelectionHandler = () => {};
  const createMedicaidHandler = () => {};
  const closeFormModalHandler = () => {};
  return (
    <React.Fragment>
      <Grid
        container
        style={{
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <Card>
          <CardHeader color="primary">
            <Grid justifyContent="space-between" container>
              <h4 className={classes.cardTitleWhite}>Medicaid Management</h4>
              <h4 className={classes.cardTitleWhite}>{`$${parseFloat(
                grandTotal
              ).toFixed(2)}`}</h4>
            </Grid>
          </CardHeader>
          <CardBody>
            <Grid container>
              <Grid
                container
                justifyContent="space-between"
                style={{ paddingTop: 10 }}
              >
                <div>
                  <Typography variant="h6"></Typography>
                </div>
                <div>
                  <FilterTable
                    filterRecordHandler={filterRecordHandler}
                    filterByDateHandler={filterByDateHandler}
                  />
                </div>
              </Grid>

              <Grid
                container
                justifyContent="space-between"
                style={{ paddingBottom: 12, paddingTop: 12 }}
              >
                <div style={{ display: "inline-flex", gap: 10 }}>
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
                    Add Claims
                  </Button>

                  {isAddGroupButtons && (
                    <div style={{ display: "inline-flex", gap: 10 }}>
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
                      <Button
                        onClick={changeStatusHandler}
                        variant="outlined"
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        component="span"
                        endIcon={<ArrowDownwardIcon />}
                      >
                        Change Status
                      </Button>
                      <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={closeChangeStatusMenuHandler}
                      >
                        {SUPPLY_STATUS.map((map) => {
                          return (
                            <MenuItem onClick={() => updateStatusHandler(map)}>
                              {map}
                            </MenuItem>
                          );
                        })}
                      </Menu>
                    </div>
                  )}
                </div>
              </Grid>
              <Grid item xs={12}>
                <HospiceTable
                  main={true}
                  height={400}
                  onCheckboxSelectionHandler={onCheckboxSelectionHandler}
                  columns={columns}
                  dataSource={dataSource}
                />
              </Grid>
            </Grid>

            {isFormModal && (
              <MedicaidForm
                createMedicaidHandler={createMedicaidHandler}
                mode={mode}
                isOpen={isFormModal}
                isEdit={false}
                item={item}
                onClose={closeFormModalHandler}
              />
            )}
          </CardBody>
        </Card>
      </Grid>
    </React.Fragment>
  );
};

export default MedicaidFunction;
