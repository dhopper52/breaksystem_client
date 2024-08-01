import React from "react";
import { Form, InputGroup } from "react-bootstrap";

export const FormLabel = ({ children }) => {
  return (
    <Form.Label className="Form-labels light-black">{children}</Form.Label>
  );
};

export const InputGrouptext = ({ children }) => {
  return (
    <InputGroup.Text id="basic-addon1" className="rounded-0">
      {children}
    </InputGroup.Text>
  );
};
