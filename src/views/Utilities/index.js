import CustomTabs from "components/CustomTabs/CustomTabs";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import PlotIcon from "@material-ui/icons/ViewList";
import EftUploader from "./EftUploader";
import MedicaidFunction from "./EFT/Medicaid/MedicaidFunction";
import MissingLogs from "./EFT/Report/MissingLogs";
function Utilities() {
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomTabs
            title="Tools :"
            headerColor="primary"
            tabs={[
              {
                tabName: "EFT Medicaid",
                tabIcon: PlotIcon,
                tabContent: <MedicaidFunction />,
              },
              {
                tabName: "EFT Missing Logs",
                tabIcon: PlotIcon,
                tabContent: <MissingLogs />,
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default Utilities;
