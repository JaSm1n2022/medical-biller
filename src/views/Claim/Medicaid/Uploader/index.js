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

const ClientUploader = (props) => {
  const classes = useStyles();

  const [paidOn, setPaidOn] = useState(new Date());
  const [paymentDt, setPaymentDt] = useState(new Date());
  const [eft, setEft] = useState("");
  console.log("Upload Please");
  const dateInputHandler = (value, name) => {
    switch (name) {
      case "paidOn":
        setPaidOn(value);
        return;
      case "paymentDt":
        setPaymentDt(value);
        return;
      default:
        return;
    }
  };
  const inputHandler = ({ target }) => {
    switch (target.name) {
      case "eft":
        setEft(target.value);
        return;
      default:
        return;
    }
  };
  const uploadHandler = (data) => {
    console.log("[DATA UPLOAD]", data);
    const report = Helper.convertJsonIntoClient(data);
    console.log("[Report]", report);
    const finalPayload = [];
    const userProfile = props.profileState?.data[0];
    for (const payload of report) {
      console.log("[Payload Report]", payload, userProfile);

      const params = {
        provider: "Medicaid",
        client: payload?.patient,
        service_cd: payload?.service,
        service_desc: payload?.serviceDesc,
        service_mod: payload?.modifier,
        dos: moment(new Date(`${payload?.dos} 17:00`)).format(
          "YYYY-MM-DD HH:mm"
        ),
        eos: moment(new Date(`${payload?.eos} 17:00`)).format(
          "YYYY-MM-DD HH:mm"
        ),
        billed_amt: parseFloat(payload.billedAmt || 0.0, 2),
        paid_amt: parseFloat(payload.paidAmt || 0.0, 2),
        status: payload.status,
        companyId: userProfile.companyId,
        eft_number: eft,
        paid_on: moment(new Date(paidOn)).format("YYYY-MM-DD 17:00"),
        paid_issued: moment(new Date(paymentDt)).format("YYYY-MM-DD 17:00"),
        updatedUser: {
          name: userProfile.name,
          userId: userProfile.id,
          date: new Date(),
        },
      };

      params.createdUser = {
        name: userProfile.name,
        userId: userProfile.companyId,
        date: new Date(),
      };

      finalPayload.push(params);
    }
    console.log("[Final Payload]", finalPayload);
    props.createEft(finalPayload);

    //  setIsUploadOpen(true);
  };
  console.log("[PROPS EFTS]", props.createEftState);
  if (props.createEftState?.status === ACTION_STATUSES.SUCCEED) {
    TOAST.ok("Successfully Uploaded.");
    props.resetEft();
    props.refreshHandler();
  }
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
        <HeaderModal title={"ADD EFT"} onClose={props.closeFormModalHandler} />
        <div className={styles.content}>
          <Grid
            container
            direction="row"
            spacing={2}
            style={{ paddingTop: 30 }}
          >
            <Grid item xs={12} md={4}>
              <CustomDatePicker
                name={"paidOn"}
                value={paidOn}
                onChange={dateInputHandler}
                label={"Paid On"}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomTextField
                name={"eft"}
                value={eft}
                placeholder={"EFT Number"}
                onChange={inputHandler}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <CustomDatePicker
                name={"paymentDt"}
                value={paymentDt}
                onChange={dateInputHandler}
                label={"Payment Date"}
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

const mapStateToProps = (store) => ({
  createEftState: eftCreateStateSelector(store),
  profileState: profileListStateSelector(store),
});

const mapDispatchToProps = (dispatch) => ({
  createEft: (data) => dispatch(attemptToCreateEft(data)),
  resetEft: () => dispatch(resetCreateEftState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ClientUploader);
