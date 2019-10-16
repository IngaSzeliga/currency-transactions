import React, { PureComponent } from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import "./NewTransaction.scss";

class NewTransaction extends PureComponent {
  state = {
    transactionName: "",
    amount: 0,
    rate: 0,
    calculatedAmount: 0
  };

  calculateAmount = (amount, rate) => amount * rate;

  handleTransactionName = event => {
    this.setState({ transactionName: event.target.value });
  };

  handleChangeRate = event => {
    const { amount } = this.state;
    const rate = event.target.value;
    const calculatedAmount = this.calculateAmount(amount, rate);
    this.setState({ rate, calculatedAmount });
  };

  handleChangeAmount = event => {
    const { rate } = this.state;
    const amount = event.target.value;
    const calculatedAmount = this.calculateAmount(amount, rate);
    this.setState({ amount, calculatedAmount });
  };

  render() {
    const { calculatedAmount } = this.state;
    return (
      <Paper className="new-transaction-container">
        <TextField
          label="Transaction Name"
          onChange={this.handleTransactionName}
          type="text"
          margin="normal"
        />
        <div className="new-transaction-currency-rate">
          1EUR =
          <TextField
            className="new-transaction-currency-rate-input"
            onChange={this.handleChangeRate}
            type="number"
            margin="normal"
          />
          PLN
        </div>
        <TextField
          label="Amount in Euro"
          onChange={this.handleChangeAmount}
          type="number"
          margin="normal"
        />
        <div>Amount in PLN: {calculatedAmount}</div>
        <div className="new-transaction-button-container">
          <Button
            className="new-transaction-button"
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        </div>
      </Paper>
    );
  }
}

NewTransaction.propTypes = {};

export default NewTransaction;
