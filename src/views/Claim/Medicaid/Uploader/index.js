import { Grid } from "@material-ui/core";
import React, { useState } from "react";
import ReactModal from "react-modal";

import { makeStyles } from "@material-ui/core/styles";
import CustomTextField from "components/TextField/CustomTextField";
import CustomDatePicker from "components/Date/CustomDatePicker";
import Upload from "./Upload";
import Helper from "utils/helper";
import styles from "./style.module.css";
import moment from "moment";

import TOAST from "modules/toastManager";
import { ACTION_STATUSES } from "utils/constants";
import HeaderModal from "components/Modal/HeaderModal";
import { connect } from "react-redux";
import { eftCreateStateSelector } from "store/selectors/eftSelector";
import { profileListStateSelector } from "store/selectors/profileSelector";
import { attemptToCreateEft } from "store/actions/eftAction";
import { resetCreateEftState } from "store/actions/eftAction";

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

const ClaimUploader = (props) => {
  const classes = useStyles();

  const [billedOn, setBilledOn] = useState(new Date());

  const dateInputHandler = (value, name) => {
    switch (name) {
      case "billedOn":
        setBilledOn(value);
        return;

      default:
        return;
    }
  };
  const uploadHandler = (data) => {
    props.uploadHandler(data, billedOn);
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
      isOpen={props.isOpen}
      onRequestClose={props.closeFormModalHandler}
      ariaHideApp={false}
    >
      <div className={styles.form}>
        <HeaderModal
          title={"UPLOAD CLAIMS"}
          onClose={props.closeFormModalHandler}
        />
        <div className={styles.content}>
          <Grid
            container
            direction="row"
            spacing={2}
            style={{ paddingTop: 30 }}
          >
            <Grid item xs={12} md={4}>
              <CustomDatePicker
                name={"billedOn"}
                value={billedOn}
                onChange={dateInputHandler}
                label={"Billed On"}
              />
            </Grid>
            <Grid item xs={12}>
              <Upload uploadHandler={uploadHandler} />
            </Grid>
          </Grid>
        </div>
        <br />
      </div>
    </ReactModal>
  );
};

export default ClaimUploader;
