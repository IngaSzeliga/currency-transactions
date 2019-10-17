import React from "react";
import Transaction from "../../components/Transaction";

const TransactionsHistory = props => {
  return (
    <div className="transactions-history-container">
      <Transaction
        title={"Exchange from EUR to PLN"}
        amount={10}
        convertedAmount={43}
      />
    </div>
  );
};

export default React.memo(TransactionsHistory);
