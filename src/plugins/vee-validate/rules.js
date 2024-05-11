import { defineRule } from "vee-validate";

defineRule("required", (value) => {
  if (!value || !value.length) {
    return `This field is required`;
  }
  return true;
});

defineRule("minMax", (value, [min, max]) => {
  if (!value) {
    return true;
  }

  const length = value.length;

  if (length < min) {
    return `This field must be at least ${min} characters long`;
  }

  if (length > max) {
    return `This field must be no more than ${max} characters long`;
  }

  return true;
});

defineRule("lowercase", (value) => {
  if (!value) {
    return "This field is required";
  }

  if (value !== value.toLowerCase()) {
    return "This field must contain only lowercase characters";
  }

  return true;
});

defineRule("email", (value) => {
  if (!value || value.trim().length === 0) {
    return "Email is required";
  }

  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return "Email must be a valid email";
  }

  return true;
});

defineRule("confirmed", (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true;
  }
  return "Passwords do not match. Try again.";
});
