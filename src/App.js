import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  withRouter,
  Redirect,
} from "react-router-dom";
import {
  ToastProvider,
  DefaultToastContainer,
} from "react-toast-notifications";
import Admin from "layouts/Admin.js";
import Login from "views/Login";
import RTL from "layouts/RTL.js";
import { supabaseClient } from "./config/SupabaseClient";
import "assets/css/material-dashboard-react.css?v=1.10.0";
import { useState } from "react";
import { profileListStateSelector } from "store/selectors/profileSelector";
import { attemptToFetchProfile } from "store/actions/profileAction";
import { connect } from "react-redux";
import { ACTION_STATUSES } from "utils/constants";
import { resetFetchProfileState } from "store/actions/profileAction";
export const CustomToastContainer = (props) => (
  <DefaultToastContainer {...props} style={{ zIndex: 9999 }} />
);
let userProfile = {};
function App(props) {
  const [session, setSession] = useState(null);
  const [signedIn, setSignedIn] = useState(true);
  const [requestor, setRequestor] = useState("");

  useEffect(() => {
    supabaseClient.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log("[application]", event, session);
      if (event === "SIGNED_OUT") {
        setSignedIn(false);
      } else {
        setSignedIn(true);
      }
    });
  }, []);

  useEffect(() => {
    //	props.onTryAutoSignup();
    supabaseClient.auth.onAuthStateChange((event, session) => {
      console.log("[application]", event, session);
      if (event === "SIGNED_OUT") {
        setSignedIn(false);
      } else {
        //  setRequestor(session.user.email);
        if (session) {
          props.fetchProfile({ email: session.user.email });
        }
        //    setSignedIn(true);
      }
    });
  }, [session]);
  if (
    props.profileState &&
    props.profileState.status === ACTION_STATUSES.SUCCEED
  ) {
    userProfile = props.profileState.data[0];
    //props.resetProfiles();
  }
  console.log("[signed/session]", signedIn, session);
  console.log("[Profile]", props.profileState, userProfile);
  return (
    <ToastProvider components={{ ToastContainer: CustomToastContainer }}>
      {userProfile && userProfile.companyId ? (
        <Switch>
          <Route path="/admin" component={Admin} />
          <Route path="/rtl" component={RTL} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      ) : !signedIn ? (
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      ) : signedIn && !session ? (
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      ) : null}
    </ToastProvider>
  );
}

const mapStateToProps = (store) => ({
  profileState: profileListStateSelector(store),
});

const mapDispatchToProps = (dispatch) => ({
  fetchProfile: (data) => dispatch(attemptToFetchProfile(data)),
  resetProfiles: () => dispatch(resetFetchProfileState()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
