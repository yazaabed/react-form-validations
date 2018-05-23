import React from "react";
import Input from "../Input/Input";

class Form extends React.Component {
  state = {};

  static defaultProps = {
    onSubmit: event => {}
  };

  constructor(props) {
    super(props);

    if (props.validator) {
      this.validator = props.validator;
    } else {
      throw new Error("The form component require a validator to run");
    }

    if (props.customeFormValidation) {
      this.validator.customeValidateRule = props.customeFormValidation;
    }
  }

  changeFormState = (id, type, value) => {
    this.setState({
      [id]: {
        [type]: value
      }
    });
  };

  traverseElements(parent, children) {
    let parentProps = parent.props || {};

    if (parentProps["error-id"] && parentProps["rule-code"]) {
      let id = parentProps["error-id"];

      let error = this.validator.validation[id].errors[
        parentProps["rule-code"]
      ];

      console.log(this.state);

      if (error && this.state[id] && this.state[id]["dirty"]) {
        return parent;
      } else {
        return null;
      }
    }

    if (typeof parent !== "object") return parent;
    if (!children) return parent;

    let childrenCount = React.Children.count(children);

    if (!childrenCount) {
      return parent;
    }

    const { changeFormState, state } = this;
    let overridedChildren = parent.props.overridedChildren || [];
    let { validation, data } = this.validator;

    React.Children.forEach(children, (child, key) => {
      let childProps = child.props || {};

      if (
        childProps.children &&
        (!childProps["error-id"] || !childProps["rule-code"])
      ) {
        this.traverseElements(
          React.cloneElement(child, {
            overridedChildren
          }),
          childProps.children
        );
      }

      if (child.type === Input) {
        let inputProps = childProps;
        let id = inputProps.id;

        if (!validation[id]) {
          validation[id] = { errors: {} };
        }

        overridedChildren.push(
          React.cloneElement(child, {
            validator: this.validator,
            changeFormState,
            key: "parent__child__" + key + "__" + id,
            formState: state,
            value: data[id]
          })
        );
      } else if (childProps["error-id"] && childProps["rule-code"]) {
        let id = childProps["error-id"];

        let error = this.validator.validation[id].errors[
          childProps["rule-code"]
        ];

        if (error && this.state[id] && this.state[id]["dirty"]) {
          overridedChildren.push(
            React.cloneElement(child, {
              key: "parent__child__" + key + "__" + childProps["rule-code"]
            })
          );
        }
      } else if (typeof child === "string") {
        overridedChildren.push(
          React.createElement(
            "span",
            {
              key: "parent__child__" + key
            },
            child
          )
        );
      } else {
        overridedChildren.push(
          React.cloneElement(child, {
            key: "parent__child__" + key
          })
        );
      }
    });

    return React.cloneElement(parent, {
      overridedChildren
    });
  }

  render() {
    const { children, onSubmit } = this.props;
    let htmlRender = [];

    React.Children.forEach(children, (child, key) => {
      if (child && typeof child === "object") {
        let element = this.traverseElements(child, child.props.children);

        if (element) {
          if (React.Children.count(element.props.overridedChildren)) {
            htmlRender.push(
              React.cloneElement(element, {
                key: element.type.toString() + "_" + key,
                children: element.props.overridedChildren
              })
            );
          } else {
            htmlRender.push(element);
          }
        }
      } else if (child) {
        htmlRender.push(
          React.createElement(
            "span",
            {
              key: child.type.toString() + "_" + key
            },
            child
          )
        );
      }
    });

    return (
      <form
        onSubmit={event => {
          onSubmit(event);
          event.preventDefault();
        }}
      >
        {htmlRender}
      </form>
    );
  }
}

export default Form;
