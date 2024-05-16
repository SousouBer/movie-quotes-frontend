import { defineRule } from "vee-validate";
// import { localize, setLocale } from "@vee-validate/i18n";

defineRule("required", (value) => {
  if (!value || !value.length) {
    return false;
  }
  return true;
});

defineRule("minMax", (value, [min, max]) => {
  if (!value) {
    return true;
  }

  const length = value.length;

  if (length < min || length > max) {
    return false;
  }

  return true;
});

defineRule("lowercase", (value) => {
  if (value !== value.toLowerCase()) {
    return false;
  }

  return true;
});

defineRule("email", (value) => {
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!regex.test(value)) {
    return false;
  }

  return true;
});

defineRule("confirmed", (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true;
  }
  return false;
});

defineRule("minLength", (value, [limit]) => {
  if (!value || !value.length) {
    return true;
  }
  if (value.length < limit) {
    return false;
  }
  return true;
});
