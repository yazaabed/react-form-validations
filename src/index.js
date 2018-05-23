import React, { Component } from "react";
import { render } from "react-dom";
import Form from "./components/Form/Form";
import Input from "./components/Input/Input";
import form from "./utils/forms.util/form";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

class App extends Component {
  form = new form();

  state = {
    validForm: true
  };

  customeFormValidation = (id, value, rule) => {
    switch (rule.code) {
      case "custome-1":
        return false;

      default:
        return true;
    }
  };

  render() {
    return (
      <div style={styles}>
        <Form
          onSubmit={event => {
            if (!this.form.validator.validate()) {
              // To render the form when not valid to show errors
            } else {
              console.log(this.form.validator.data);
            }
          }}
          validator={this.form.validator}
          customeFormValidation={this.customeFormValidation}
        >
          <label htmlFor="input-1">Label 1</label>

          <div>
            <Input validationRules={["required", "custome-1"]} id="input-1" />

            <br />

            <span className="error" error-id="input-1" rule-code="required">
              This field is required
            </span>

            <span className="error" error-id="input-1" rule-code="custome-1">
              Ana error 2
            </span>
          </div>

          <br />

          <label htmlFor="input-2">Label 2</label>

          <div>
            <Input validationRules={["required"]} id="input-2" />
          </div>

          <span className="error" error-id="input-2" rule-code="required">
            This field is required
          </span>

          <span className="error" error-id="input-2" rule-code="sadad">
            Ana error 2
          </span>

          <br />
          <button type="submit">Send</button>
        </Form>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
