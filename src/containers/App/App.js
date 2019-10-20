import React, { PureComponent } from "react";
import Header from "../../components/Header";
import NewTransaction from "../../components/NewTransaction";
import TransactionsHistory from "../../containers/TransactionsHistory";
import "./App.scss";

class App extends PureComponent {
  state = {
    transactions: []
  };

  addTransaction = transaction => {
    this.setState(state => {
      const { transactions } = state;
      return {
        transactions: [...transactions, transaction]
      };
    });
  };

  deleteTransaction = id => {
    this.setState(state => {
      const { transactions } = state;
      const transactionsAfterDeleting = transactions.filter(
        transaction => transaction.id !== id
      );
      return {
        transactions: transactionsAfterDeleting
      };
    });
  };

  render() {
    const { transactions } = this.state;
    return (
      <div className="app-container">
        <Header />
        <NewTransaction addTransaction={this.addTransaction} />
        <TransactionsHistory
          transactions={transactions}
          deleteTransaction={this.deleteTransaction}
        />
      </div>
    );
  }
}

export default App;
