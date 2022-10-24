import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";
import OfferForm from "../../components/OfferForm/OfferForm";
import { FormContext } from "../../../shared/Context/formContext";
import "../../../App.css";
function NewOffer() {
  const [createdOffer, setCreatedOffer] = useState();
  const [submitForm, setSubmitForm] = useState();

  const getFormData = useCallback((offer, isValid) => {
    setCreatedOffer(offer);
    setSubmitForm(isValid);
  }, []);

  return (
    <FormContext.Provider
      value={{
        createdOffer: createdOffer,
        submitForm: submitForm,
        getFormData,
      }}
    >
      <Box
        sx={{
          paddingLeft: "4rem",
          background: "linear-gradient(105deg, #e6e4e4  70%, #30292F 40%)",
        }}
      >
        <OfferForm />
      </Box>
    </FormContext.Provider>
  );
}

export default NewOffer;
