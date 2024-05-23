import React, { lazy, useState } from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import * as XLSX from "xlsx";
import { CloudUpload } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  button: {
    // Add any other styles you need here
    textTransform: "none", // This will prevent text transformation
    fontSize: "14px",
    padding: "3px",
  },
}));
const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: "none",
  },
});
const isUploading = false;

function readFileAsync(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);
      resolve(json);
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });
}

function Upload(props) {
  const { classes } = props;
  const [error, setError] = useState("");
  const styles = useStyles();

  const readUploadFile = async (e) => {
    try {
      // props.isUploadingHandler();
      console.log("E Read uploadFile]", e);
      console.log("[read]", e.target.files);
      e.preventDefault();
      const jsonData = [];
      let cnt = 0;
      const fileCnt = e.target.files.length;
      if (e.target.files) {
        for (let i = 0; i < e.target.files.length; i += 1) {
          cnt = i;
          // eslint-disable-next-line no-await-in-loop
          const contentBuffer = await readFileAsync(e.target.files[i]);
          console.log("[contentBuffer]", i, contentBuffer);
          contentBuffer.forEach((c) => jsonData.push(c));
        }
        console.log("[CNT]", cnt, fileCnt);
        if (cnt === fileCnt - 1) {
          console.log("[JSON UPLPAD]", jsonData);
          props.uploadHandler(jsonData);
        }
      }

      props.handleClose();
    } catch (ex) {
      if (props.isTestUpload) {
        setError("Found Error");
      }
    }
  };
  return (
    <>
      <div>
        <input
          style={{ display: "none" }}
          id="uploader"
          multiple
          type="file"
          onChange={readUploadFile}
        />
        <label htmlFor="uploader">
          <div
            style={{ height: "40px", marginTop: "12px", marginLeft: "10px" }}
          >
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<CloudUpload />}
            >
              Upload EFT
            </Button>
          </div>
        </label>
      </div>
      {/* Do not delete to test the upload excel on reading file */}
    </>
  );
}

Upload.propTypes = {
  classes: PropTypes.node.isRequired,
};

export default withStyles(styles)(Upload);
