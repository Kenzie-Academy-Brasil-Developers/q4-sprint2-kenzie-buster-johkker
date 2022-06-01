import * as yup from "yup";

const addDvdToCartSchema = yup.object().shape({
  quantity: yup.number().required("Quantity is a required field"),
});

export default addDvdToCartSchema;
