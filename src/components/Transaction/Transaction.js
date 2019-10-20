import React from "react";
import PropTypes from "prop-types";
import Fab from "@material-ui/core/Fab";
import CachedIcon from "@material-ui/icons/Cached";
import DeleteIcon from "@material-ui/icons/Delete";
import { countryRegion, EUR_NAME, PLN_NAME } from "../../config";
import "./Transaction.scss";

const Transaction = props => {
  const { id, title, amount, convertedAmount, deleteTransaction } = props;
  const amountFormatted = amount.toLocaleString(countryRegion, {
    style: "currency",
    currency: EUR_NAME
  });
  const convertedAmountFormatted = convertedAmount.toLocaleString(
    countryRegion,
    {
      style: "currency",
      currency: PLN_NAME
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
        onClick={() => deleteTransaction(id)}
      >
        <DeleteIcon />
      </Fab>
    </div>
  );
};

Transaction.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  convertedAmount: PropTypes.number.isRequired,
  deleteTransaction: PropTypes.func.isRequired
};

export default React.memo(Transaction);
