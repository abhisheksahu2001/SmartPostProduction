/* eslint-disable */
import * as yup from "yup";

export const signupSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/(?=.*[!@#\$%\^&\*])(?=.{8,})/, "One Special Case Character")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase"
    ),
  checkPass: yup.string().oneOf([yup.ref("password")], "Passwords must match"),
});
