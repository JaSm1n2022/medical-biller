import React, { useState } from "react";
import { connect } from "react-redux";

import { withStyles, makeStyles } from "@material-ui/core/styles";

import { green, purple } from "@material-ui/core/colors";
import * as actions from "../../store/actions/index";
import { Button, Divider, Grid, Paper, Typography } from "@material-ui/core";

import TOAST from "../../modules/toastManager";
import { supabaseClient } from "config/SupabaseClient";
import CustomTextField from "components/TextField/CustomTextField";
const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 24,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#0063cc",
    borderColor: "#0063cc",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "none",
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf",
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
    },
  },
})(Button);

const ColorButton = withStyles((theme) => ({
  root: {
    fontSize: 16,
    width: 200,
    color: purple[500],
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: 1,
  },
}));

const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const { error } = await supabaseClient.auth.signInWithOtp({ email });

      if (error) throw error;
      TOAST.ok("Please check your email");
    } catch (error) {
      console.log("[error login]", error.toString());
      TOAST.error("Failed to sign in", error.toString());
    } finally {
      const user = supabaseClient.auth.user();
      setLoading(false);
      if (user) {
        console.log("user->>>", user);
      }
    }
  };
  const inputHandler = ({ target }) => {
    console.log("target", target.value);
    setEmail(target.value);
  };
  return (
    <React.Fragment>
      <Grid
        container
        style={{ paddingTop: 20, paddingLeft: 50, paddingRight: 50 }}
      >
        <Paper elevation={0} direction="column">
          <div align="center">
            <Grid container>
              <Grid item xs={12} md={12} sm={12}>
                <Typography variant="h4">
                  Sign in to Hospice Inventory System
                </Typography>
                <Typography variant="body">via Magic Link email</Typography>
              </Grid>
              <Grid
                item
                xs={12}
                md={12}
                sm={12}
                style={{
                  align: "center",
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 4,
                  paddingRight: 4,
                }}
              >
                <div align="center">
                  <Paper
                    elevation={1}
                    direction="row"
                    style={{
                      width: "500px",
                      marginTop: 12,
                      paddingTop: 12,
                      paddingBottom: 8,
                      paddingLeft: 4,
                      paddingRight: 4,
                    }}
                  >
                    <div style={{ paddingBottom: 10 }}>
                      <CustomTextField
                        name={"email"}
                        value={email}
                        placeholder={"Email"}
                        onChange={inputHandler}
                      />
                    </div>

                    <div style={{ display: "inline", gap: 10 }}>
                      <ColorButton
                        variant="contained"
                        color="primary"
                        style={{ color: "white" }}
                        onClick={() => handleLogin()}
                      >
                        SEND MAGIC LINK
                      </ColorButton>
                      {/*
                                <ColorButtonLink variant="outlined" color="secondary" className={classes.margin}>
                                    RESET PASSWORD
                                </ColorButtonLink>
                               */}
                    </div>
                  </Paper>
                </div>
              </Grid>
            </Grid>
          </div>
        </Paper>
      </Grid>
    </React.Fragment>
  );
};

export default Login;
