import React from "react";
import { render } from "@testing-library/react";
import Form from "./Form";

describe("Form component", () => {
  it("should render", () => {
    const { container } = render(
      <Form submitForm={() => console.log("submitted")} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
