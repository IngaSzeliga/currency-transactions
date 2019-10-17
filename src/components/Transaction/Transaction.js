import React from "react";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import CachedIcon from "@material-ui/icons/Cached";
import DeleteIcon from "@material-ui/icons/Delete";
import { countryRegion } from "../../config";
import "./Transaction.scss";

const Transaction = props => {
  const { title, amount, convertedAmount } = props;
  const amountFormatted = amount.toLocaleString(countryRegion, {
    style: "currency",
    currency: "EUR"
  });
  const convertedAmountFormatted = convertedAmount.toLocaleString(
    countryRegion,
    {
      style: "currency",
      currency: "PLN"
    }
  );
  return (
    <div className="transaction-container">
      <div>
        <CachedIcon fontSize="large" />
      </div>
      <div className="transaction-container-title">{title}</div>
      <div className="transaction-container-amounts">
        <div className="transaction-container-amounts-amount">
          {amountFormatted}
        </div>
        <div className="transaction-container-amounts-converted-amount">
          {convertedAmountFormatted}
        </div>
      </div>
      <Fab
        color="secondary"
        aria-label="delete"
        size="small"
        className="transaction-container-delete-button"
      >
        <DeleteIcon />
      </Fab>
    </div>
  );
};

Transaction.propTypes = {
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  convertedAmount: PropTypes.number.isRequired
};

export default React.memo(Transaction);
