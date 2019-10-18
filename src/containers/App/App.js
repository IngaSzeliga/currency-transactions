import React, { PureComponent } from "react";
import NewTransaction from "../../components/NewTransaction";
import TransactionsHistory from "../../containers/TransactionsHistory";
import "./App.scss";

class App extends PureComponent {
  state = {
    transactions: []
  };

  addTransaction = transaction => {
    this.setState(previousState => {
      const { transactions } = previousState;
      return {
        transactions: [...transactions, transaction]
      };
    });
  };

  render() {
    const { transactions } = this.state;
    return (
      <div className="app-container">
        <NewTransaction addTransaction={this.addTransaction} />
        <TransactionsHistory transactions={transactions} />
      </div>
    );
  }
}

export default App;
