import { Grid } from "@material-ui/core";
import CustomTabs from "components/CustomTabs/CustomTabs";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CodeIcon from "@material-ui/icons/CodeOutlined";
import VendorIcon from "@material-ui/icons/LocalShipping";

import PatientIcon from "@material-ui/icons/PeopleAlt";
import PatientFunction from "./Patient/PatientFunction";
import ServiceFunction from "./Service/ServiceFunction";

function Settings() {
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Configuration :"
            headerColor="primary"
            noGear={true}
            tabs={[
              {
                tabName: "EOB Code",
                tabIcon: CodeIcon,
              },
              {
                tabName: "Service Code",
                tabIcon: CodeIcon,
                tabContent: <ServiceFunction />,
              },
              {
                tabName: "Patients",
                tabIcon: PatientIcon,
                tabContent: <PatientFunction />,
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default Settings;
