/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import MedicaidIcon from "@material-ui/icons/LocalHospital";
import GearIcon from "@material-ui/icons/SettingsOutlined";
import Gear from "@material-ui/icons/Settings";
import DashboardPage from "views/Dashboard/Dashboard.js";
import Medicaid from "views/Claim/Medicaid/MedicaidFunction";
import Utilities from "views/Utilities";

import Settings from "views/Settings";

const dashboardRoutes = [
  {
    path: "/settings",
    name: "Settings",
    rtlName: "قائمة الجدول",
    icon: Gear,
    component: Settings,
    layout: "/admin",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  {
    path: "/medicaid",
    name: "Medicaid Claims Submission",
    rtlName: "قائمة الجدول",
    icon: MedicaidIcon,
    component: Medicaid,
    layout: "/admin",
  },
  {
    path: "/utilities",
    name: "Utilities",
    rtlName: "قائمة الجدول",
    icon: GearIcon,
    component: Utilities,
    layout: "/admin",
  },
];

export default dashboardRoutes;
