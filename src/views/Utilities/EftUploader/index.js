import { Grid } from "@material-ui/core";
import React, { useState } from "react";

import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import { makeStyles } from "@material-ui/core/styles";
import CustomTextField from "components/TextField/CustomTextField";
import CustomDatePicker from "components/Date/CustomDatePicker";
import Upload from "./Upload";
import Helper from "utils/helper";
import { eftListStateSelector } from "store/selectors/eftSelector";
import { eftCreateStateSelector } from "store/selectors/eftSelector";
import { attemptToCreateEft } from "store/actions/eftAction";
import { resetCreateEftState } from "store/actions/eftAction";
import { connect } from "react-redux";
import moment from "moment";
import { profileListStateSelector } from "store/selectors/profileSelector";
import TOAST from "modules/toastManager";
import { ACTION_STATUSES } from "utils/constants";

let productList = [];

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
const EftUploader = (props) => {
  const classes = useStyles();
  const [paidOn, setPaidOn] = useState(new Date());
  const [paymentDt, setPaymentDt] = useState(new Date());
  const [eft, setEft] = useState("");
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
    const report = Helper.convertJsonIntoEft(data);
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
  }
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
              <h4 className={classes.cardTitleWhite}>EFT Uploader</h4>
            </Grid>
          </CardHeader>
          <CardBody>
            <Grid container direction="row" spacing={2}>
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
          </CardBody>
        </Card>
      </Grid>
    </React.Fragment>
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

export default connect(mapStateToProps, mapDispatchToProps)(EftUploader);
