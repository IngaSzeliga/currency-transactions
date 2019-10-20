import React from "React";
import { shallow } from "enzyme";
import Header from ".";

describe("Header component", () => {
  const component = shallow(<Header />);
  it("has working component", () => {
    expect(component).toBeDefined();
  });
  it("expects component to never be changed", () => {
    expect(component).toMatchSnapshot();
  });
});
