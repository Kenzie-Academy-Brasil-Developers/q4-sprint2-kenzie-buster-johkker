import * as yup from "yup";

const createDvdSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is a required field")
    .transform((value, originalValue) => originalValue.toLowerCase()),
  duration: yup
    .string()
    .required("Duration is a required field")
    .transform((value, originalValue) => originalValue.toLowerCase())
    .matches(
      /(\d){1}(h){1}(\d){2}(m){1}/g,
      "Duration must follow 0h00m format."
    ),
  quantity: yup.number().required("Quantity is a required field"),
  price: yup.number().required("Price is a required field"),
});

export default createDvdSchema;
