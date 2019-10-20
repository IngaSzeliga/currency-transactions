import React from "React";
import { shallow } from "enzyme";
import TransactionsHistory from ".";

describe("TransactionsHistory component", () => {
  const component = shallow(
    <TransactionsHistory
      transactions={[
        {
          id: "2caf5711-2913-4e41-95db-088625acf1bf",
          title: "Name",
          amount: 13,
          convertedAmount: "54,99 zł"
        }
      ]}
      deleteTransaction={jest.fn()}
    />
  );

  it("has working component", () => {
    expect(component).toBeDefined();
  });

  it("expects component to never be changed", () => {
    expect(component).toMatchSnapshot();
  });

  it("expects component to never be changed with no transactions", () => {
    const component = shallow(
      <TransactionsHistory transactions={[]} deleteTransaction={jest.fn()} />
    );
    expect(component).toMatchSnapshot();
  });
});
