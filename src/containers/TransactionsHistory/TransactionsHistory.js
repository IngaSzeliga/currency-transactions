import React from "react";
import PropTypes from "prop-types";
import Transaction from "../../components/Transaction";
import { countryRegion, PLN_NAME } from "../../config";
import "./TransactionsHistory.scss";

const TransactionsHistory = props => {
  const { transactions, deleteTransaction } = props;
  let totalTransaction = 0;
  const biggestTransaction = {
    convertedAmount: 0,
    title: ""
  };
  for (var i = 0; i < transactions.length; i++) {
    totalTransaction = totalTransaction + transactions[i].convertedAmount;
    if (biggestTransaction.convertedAmount < transactions[i].convertedAmount) {
      biggestTransaction.convertedAmount = transactions[i].convertedAmount;
      biggestTransaction.title = transactions[i].title;
    }
  }
  return (
    <div className="transactions-history-container">
      <h2 className="transactions-history-container-title">
        Transaction History:
      </h2>
      {transactions.length === 0 ? (
        "No transaction yet"
      ) : (
        <div className="transactions-history-container-information">
          <div className="transactions-history-container-information-sum">
            Sum of transactions:&nbsp;
            {totalTransaction.toLocaleString(countryRegion, {
              style: "currency",
              currency: PLN_NAME
            })}
          </div>
          <div className="transactions-history-container-information-biggest">
            The biggest transaction is {biggestTransaction.title}
          </div>
        </div>
      )}
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
