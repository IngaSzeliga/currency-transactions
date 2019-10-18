import React from "react";
import PropTypes from "prop-types";
import Transaction from "../../components/Transaction";

const TransactionsHistory = props => {
  const { transactions } = props;
  return (
    <div className="transactions-history-container">
      {transactions.map(transaction => {
        const { id, title, amount, convertedAmount } = transaction;
        return (
          <Transaction
            key={id}
            title={title}
            amount={amount}
            convertedAmount={convertedAmount}
          />
        );
      })}
    </div>
  );
};

TransactionsHistory.propTypes = {
  transactions: PropTypes.array.isRequired
};

export default React.memo(TransactionsHistory);
