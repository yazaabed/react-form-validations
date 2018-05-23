import React from "react";

class Input extends React.Component {
  static defaultProps = {
    type: "text",
    onChange: event => {},
    onBlur: (valid, id, validation, rules) => {}
  };

  componentDidMount() {
    this.props.validator.changeFiledValue(this.props.id, "");
    this.props.validator.validateSingleField(
      this.props.id,
      "",
      this.props.validationRules
    );
  }

  render() {
    const {
      type,
      onChange,
      onBlur,
      id,
      validator,
      validationRules,
      changeFormState,
      value,
      formState
    } = this.props;

    return (
      <input
        type={type}
        id={id}
        onBlur={event => {
          if (!formState.dirty) {
            changeFormState(id, "dirty", true);
          }

          onBlur(event);
        }}
        onChange={event => {
          validator.changeFiledValue(id, event.target.value);
          validator.validateSingleField(
            id,
            event.target.value,
            validationRules
          );

          if (!event.target.value) {
            changeFormState(id, "dirty", false);
          } else {
            changeFormState(id, "dataChanged", false);
          }

          onChange(event);
        }}
      />
    );
  }
}

export default Input;
