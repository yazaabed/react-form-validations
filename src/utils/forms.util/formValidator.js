class FormValidator {
  validation = {};
  data = {};

  customeValidateRule(id, value, rule) {
    console.error(
      `You are using custom rules for validation without define it in your input id: ${id} value: ${value} rule: ${JSON.stringify(
        rule
      )}`
    );
  }

  changeFiledValue(fieldName, value) {
    this.data[fieldName] = value;
  }

  validate() {
    let isValid = true;

    for (let i in this.validation) {
      let validations = this.validation[i].errors;

      for (let j in validations) {
        let validation = validations[j];

        if (!validation.valid) {
          isValid = false;
          break;
        }
      }

      if (!isValid) {
        break;
      }
    }

    return isValid;
  }

  validateSingleField(id, value, rules) {
    let isValid = true;

    for (let i in rules) {
      let rule = rules[i];

      let validateInput = this.validateRules(id, value, {
        code: rule
      });

      if (!validateInput) {
        isValid = validateInput;
        break;
      }
    }

    return isValid;
  }

  /**
   * Define a set of rules default for the whole project
   *
   * @param {*} rule
   */
  validateRules(id, value, rule) {
    let isValid;
    const { validation, customeValidateRule } = this;

    validation[id] = { errors: {} };

    switch (rule.code) {
      case "required":
        isValid = typeof value !== "undefined" && value.trim() !== "";

        if (!isValid) {
          validation[id].errors[rule.code] = {
            code: rule.code,
            valid: false,
            value
          };

          return false;
        }

        break;

      default:
        isValid = customeValidateRule(id, value, rule);

        if (!isValid) {
          validation[id].errors[rule.code] = {
            code: rule.code,
            valid: false,
            value
          };

          return false;
        }
    }

    return true;
  }
}

export default FormValidator;
