import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
// core components
import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardFooter from "components/Card/CardFooter.js";

import { AccountCircle, AirportShuttle, AttachMoney } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";

import { useEffect } from "react";
import Helper from "utils/helper";
import { profileListStateSelector } from "store/selectors/profileSelector";
import { connect } from "react-redux";

const useStyles = makeStyles(styles);
let isDisplayDone = true;
let patientCnt = 0;
let distributionTotal = 0.0;
let transactionTotal = 0.0;
function Dashboard(props) {
  const [profile, setProfile] = useState(
    props.profileState && props.profileState.data
      ? props.profileState.data[0]
      : undefined
  );
  useEffect(() => {
    const dates = Helper.formatDateRangeByCriteriaV2("thisMonth");
    const userProfile = props.profileState.data[0];
    console.log("[List Patinets]", userProfile);
    if (userProfile) {
      setProfile(userProfile);
    }
  }, []);
  const classes = useStyles();

  return (
    <div>
      {!isDisplayDone ? (
        <div>
          <CircularProgress />
          Loading...
        </div>
      ) : (
        <div>
          <GridContainer>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <AccountCircle />
                  </CardIcon>
                  <p className={classes.cardCategory}>Patients</p>
                  <h3 className={classes.cardTitle}>
                    {patientCnt} <small>Active</small>
                  </h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <DateRange />
                    As of today
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="success" stats icon>
                  <CardIcon color="success">
                    <Store />
                  </CardIcon>
                  <p className={classes.cardCategory}>Distribution</p>
                  <h3
                    className={classes.cardTitle}
                  >{`$${distributionTotal}`}</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <DateRange />
                    This month
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="danger" stats icon>
                  <CardIcon color="danger">
                    <AttachMoney />
                  </CardIcon>
                  <p className={classes.cardCategory}>Orders/Supplies</p>
                  <h3 className={classes.cardTitle}>{`${parseFloat(
                    transactionTotal || 0.0
                  ).toFixed(2)}`}</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <DateRange />
                    This month order supplies
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
              <Card>
                <CardHeader color="info" stats icon>
                  <CardIcon color="info">
                    <AirportShuttle />
                  </CardIcon>
                  <p className={classes.cardCategory}>DME/Transportation</p>
                  <h3 className={classes.cardTitle}>$0</h3>
                </CardHeader>
                <CardFooter stats>
                  <div className={classes.stats}>
                    <DateRange />
                    This month
                  </div>
                </CardFooter>
              </Card>
            </GridItem>
          </GridContainer>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (store) => ({
  profileState: profileListStateSelector(store),
});

export default connect(mapStateToProps, null)(Dashboard);
