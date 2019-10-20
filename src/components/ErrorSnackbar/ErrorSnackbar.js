import React from "react";
import ErrorIcon from "@material-ui/icons/Error";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import "./ErrorSnackbar.scss";

const ErrorSnackbar = props => {
  const { error, handleCloseError } = props;

  return (
    <Snackbar
      className="error-snackbar-container"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open
      autoHideDuration={6000}
      onClose={handleCloseError}
    >
      <SnackbarContent
        className="error-snackbar-content"
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className="error-message">
            <ErrorIcon />
            {error}
          </span>
        }
        action={[
          <IconButton
            className="error-icon"
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleCloseError}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
};

export default React.memo(ErrorSnackbar);
