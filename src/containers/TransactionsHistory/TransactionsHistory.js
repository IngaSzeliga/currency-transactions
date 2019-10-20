import React from "react";
import PropTypes from "prop-types";
import Transaction from "../../components/Transaction";
import { countryRegion, PLN_NAME } from "../../config";
import "./TransactionsHistory.scss";

const TransactionsHistory = props => {
  const { transactions, deleteTransaction } = props;
  let totalTransaction = 0;
  for (var i = 0; i < transactions.length; i++) {
    totalTransaction = totalTransaction + transactions[i].convertedAmount;
  }
  return (
    <div className="transactions-history-container">
      <h2 className="transactions-history-container-title">
        Transaction History:
      </h2>
      {transactions.length === 0
        ? "No transaction yet"
        : `Sum of transactions: ${totalTransaction.toLocaleString(
            countryRegion,
            {
              style: "currency",
              currency: PLN_NAME
            }
          )}`}
      {transactions.map(transaction => {
        const { id, title, amount, convertedAmount } = transaction;
        return (
          <Transaction
            key={id}
            id={id}
            title={title}
            amount={amount}
            convertedAmount={convertedAmount}
            deleteTransaction={deleteTransaction}
          />
        );
      })}
    </div>
  );
};

TransactionsHistory.propTypes = {
  transactions: PropTypes.array.isRequired,
  deleteTransaction: PropTypes.func.isRequired
};

export default React.memo(TransactionsHistory);
