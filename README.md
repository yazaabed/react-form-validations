# react-form-validations
Created with CodeSandbox

---

Hey, my name is Yazan,

I am searching for advice after I watch "React Advanced Pattern" Course. I got an idea to build a form with inputs without the need to handle all event for your form element.

for example this is `<Input validationRules={["required", "custome-1"]} id="input-1" />` with validation rules and this is the message shown 

```
<span className="error" error-id="input-1" rule-code="required">
    This field is required
</span>
```

You can create your custom validation like this:
```
customeFormValidation = (id, value, rule) => {
    switch (rule.code) {
      case "custome-1":
        return false;

      default:
        console.warn("Missing validation for: ", rule);
    }

    return false;
  };

<Form
     onSubmit={event => {
           if (!this.form.validator.validate()) {
           } else {
              console.log(this.form.validator.data);
            }
          }}
          validator={this.form.validator}
          customeFormValidation={this.customeFormValidation}
        >
</Form>
```

I am wondering if this idea good enough to continue work within React?
I am thinking to change this to work with `React.createContext.` more flexible than the solution I add.

*Note: The code is really bad! But I was learning how things work with React*
