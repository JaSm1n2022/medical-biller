import CustomTabs from "components/CustomTabs/CustomTabs";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import PlotIcon from "@material-ui/icons/ViewList";
import EftUploader from "./EftUploader";

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
                tabName: "EFT Uploader",
                tabIcon: PlotIcon,
                tabContent: <EftUploader />,
              },
            ]}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
}

export default Utilities;
