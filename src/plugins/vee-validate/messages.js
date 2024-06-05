import { configure } from "vee-validate";
import { localize } from "@vee-validate/i18n";

import en from "@vee-validate/i18n/dist/locale/en";
import ka from "@vee-validate/i18n/dist/locale/ka";

configure({
  generateMessage: localize({
    en: {
      ...en,
      messages: {
        required: "This field is required",
        email: "Email must be a valid email",
        minLength: "This field must be at least 0:{limit} characters",
        minMax: "This field must be between 0:{min} and 1:{max} characters",
        lowercase: "This field must contain only lowercase characters",
        confirmed: "Passwords do not match. Try again.",
        georgianLetters: "This field should only contain Georgian letters.",
        englishLetters: "This field should only contain English letters.",
      },
    },
    ka: {
      ...ka,
      messages: {
        required: "გთხოვთ, შეავსოთ მოცემული ველი",
        email: "მოცემული ველი არ აკმაყოფილებს მეილის ფორმატს",
        minLength: "მოცემული ველი უნდა შეიცავდეს მინიმუმ 0:{limit} სიმბოლოს",
        minMax:
          "მოცემული ველი უნდა შეიცავდეს მინიმუმ 0:{min} და მაქსიმუმ 1:{max} სიმბოლოს",

        lowercase: "მოცემული ველი უნდა შეიცავდეს დაბალი რეგისტრის სიმბოლოებს",
        confirmed: "პაროლები ერთმანეთს არ ემთხვევა. სცადე ხელახლა",
        georgianLetters: "მოცემული ველი უნდა შეიცავდეს მხოლოდ ქართულ ასოებს.",
        englishLetters: "მოცემული ველი უნდა შეიცავდეს მხოლოდ ინგლისურ ასოებს.",
      },
      names: {
        password: "პაროლი",
        username: "მომხმარებლის სახელი",
        email: "მეილი",
      },
    },
  }),
});
