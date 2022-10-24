import { createContext } from "react";

export const FormContext = createContext({
  createdOffer: [],
  submitForm: false,
  getFormData: () => {},
});
