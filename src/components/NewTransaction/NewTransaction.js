import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import uuidv4 from "uuid/v4";
import { Paper, TextField, Button } from "@material-ui/core";
import "./NewTransaction.scss";

class NewTransaction extends PureComponent {
  state = {
    transactionName: "",
    amount: "",
    rate: "",
    calculatedAmount: ""
  };

  calculateAmount = (amount, rate) => amount * rate;

  handleTransactionName = event => {
    this.setState({ transactionName: event.target.value });
  };

  handleChangeRate = event => {
    const { amount } = this.state;
    const rate = Number(event.target.value);
    const calculatedAmount = this.calculateAmount(amount, rate);
    this.setState({ rate, calculatedAmount });
  };

  handleChangeAmount = event => {
    const { rate } = this.state;
    const amount = Number(event.target.value);
    const calculatedAmount = this.calculateAmount(amount, rate);
    this.setState({ amount, calculatedAmount });
  };

  handleSubmit = () => {
    const { addTransaction } = this.props;
    const { transactionName, amount, calculatedAmount } = this.state;
    addTransaction({
      id: uuidv4(),
      title: transactionName,
      amount: amount,
      convertedAmount: calculatedAmount
    });
    this.setState({
      transactionName: "",
      amount: "",
      rate: "",
      calculatedAmount: ""
    });
  };

  render() {
    const { transactionName, amount, rate, calculatedAmount } = this.state;
    return (
      <Paper className="new-transaction-container">
        <TextField
          label="Transaction Name"
          onChange={this.handleTransactionName}
          type="text"
          margin="normal"
          value={transactionName}
        />
        <div className="new-transaction-currency-rate">
          1EUR =
          <TextField
            className="new-transaction-currency-rate-input"
            onChange={this.handleChangeRate}
            type="number"
            margin="normal"
            value={rate}
          />
          PLN
        </div>
        <TextField
          label="Amount in Euro"
          onChange={this.handleChangeAmount}
          type="number"
          margin="normal"
          value={amount}
        />
        <div>Amount in PLN: {calculatedAmount}</div>
        <div className="new-transaction-button-container">
          <Button
            className="new-transaction-button"
            variant="contained"
            color="primary"
            onClick={this.handleSubmit}
          >
            Submit
          </Button>
        </div>
      </Paper>
    );
  }
}

NewTransaction.propTypes = {
  addTransaction: PropTypes.func.isRequired
};

export default NewTransaction;
