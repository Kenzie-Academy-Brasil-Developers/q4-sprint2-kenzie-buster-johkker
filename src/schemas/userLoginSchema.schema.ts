import * as yup from "yup";

const userLoginSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required("E-mail is a required field")
    .transform((value, originalValue) => originalValue.toLowerCase()),
  password: yup.string().required("Password is a required field"),
});

export default userLoginSchema;
