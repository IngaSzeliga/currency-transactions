import React from "React";
import { shallow } from "enzyme";
import ErrorSnackbar from ".";

describe("ErrorSnackbar component", () => {
  const component = shallow(
    <ErrorSnackbar error="Some error!" handleCloseError={jest.fn()} />
  );
  it("has working component", () => {
    expect(component).toBeDefined();
  });
  it("expects component to never be changed", () => {
    expect(component).toMatchSnapshot();
  });
});
