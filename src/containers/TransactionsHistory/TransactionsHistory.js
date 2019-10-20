import React from "react";
import PropTypes from "prop-types";
import Transaction from "../../components/Transaction";
import "./TransactionsHistory.scss";

const TransactionsHistory = props => {
  const { transactions, deleteTransaction } = props;
  return (
    <div className="transactions-history-container">
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
