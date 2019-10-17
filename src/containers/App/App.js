import React from "react";
import NewTransaction from "../../components/NewTransaction";
import TransactionsHistory from "../../containers/TransactionsHistory";
import "./App.scss";

function App() {
  return (
    <div className="app-container">
      <NewTransaction />
      <TransactionsHistory />
    </div>
  );
}

export default App;
