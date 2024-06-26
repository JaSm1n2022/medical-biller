import React from "react";
import PropTypes from "prop-types";

import styles from "./ModalFooter.module.css";
import DefaultButton from "components/DefaultButton";

// A footer containing actions and optional pretext to be displayed at
// the bottom of a modal.

const ModalFooter = (props) => {
  const { actions, isSubmitDisabled, templateType } = props;
  const renderActions = () => {
    if (actions !== null && actions.length > 0) {
      return actions.map((action, i) => {
        return (
          <DefaultButton
            key={`btnFooter-${i}`}
            type={action.type}
            onClick={() => action.callback()}
            style={{
              fontSize: "12px",
              boxShadow: "none",
              marginLeft: "12px",
              color: action.type === "secondary" ? "black" : "white",
            }}
            disabled={
              action.event === "submit" && isSubmitDisabled ? true : false
            }
            variant="contained"
          >
            {templateType &&
            templateType === "edit" &&
            action.event === "submit"
              ? "Update"
              : action.title}
          </DefaultButton>
        );
      });
    }
  };

  return (
    <div className={styles.modalFooter}>
      <div></div>
      <div className={styles.actionContainer}>{renderActions()}</div>
    </div>
  );
};

ModalFooter.propTypes = {
  actions: PropTypes.array,
};

export default ModalFooter;
