import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Poppers from "@material-ui/core/Popper";

// @material-ui/icons
// core components

import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle";
import { Settings } from "@material-ui/icons";

const useStyles = makeStyles(styles);

export default function GearSetting() {
  const classes = useStyles();
  const [openMenu, setOpenMenu] = React.useState(null);

  const handleClickMenu = (event) => {
    console.log(
      "[Handle Click Menu]",
      event.target,
      event.currentTarget,
      openMenu
    );
    if (openMenu && openMenu.contains(event.target)) {
      setOpenMenu(null);
    } else {
      setOpenMenu(event.currentTarget);
    }
  };
  const handleCloseMenu = () => {
    setOpenMenu(null);
  };

  return (
    <div>
      <Settings
        color={window.innerWidth > 959 ? "transparent" : "white"}
        justIcon={window.innerWidth > 959}
        simple={!(window.innerWidth > 959)}
        aria-owns={openMenu ? "menu-list-grow" : null}
        aria-haspopup="true"
        style={{ fontSize: "16pt" }}
        onClick={handleClickMenu}
      />

      <Poppers
        open={Boolean(openMenu)}
        anchorEl={openMenu}
        transition
        disablePortal
        className={
          classNames({ [classes.popperClose]: !openMenu }) +
          " " +
          classes.popperNav
        }
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            id="menu-list-grow"
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleCloseMenu}>
                <MenuList role="menu">
                  <MenuItem
                    onClick={handleCloseMenu}
                    className={classes.dropdownItem}
                  >
                    Full Manage View
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Poppers>
    </div>
  );
}
