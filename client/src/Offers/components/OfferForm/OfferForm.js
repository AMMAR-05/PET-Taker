////////// Imports //////////
import { Backdrop, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
////////// Context //////////
import { AuthContext } from "../../../shared/Context/authContext";
import { FormContext } from "../../../shared/Context/formContext";
////////// Components //////////
import OfferformItems from "./OfferformItems";

function OfferForm() {
  ////////// States //////////
  const [succeed, setSucceed] = useState(false);
  const [error, setError] = useState();

  ////////// use Form Context //////////
  const formContext = useContext(FormContext);

  ////////// use Auth Context //////////
  const auth = useContext(AuthContext);

  ////////// use Navigate //////////

  const navigate = useNavigate();

  ////////// Send Form data to database //////////
  useEffect(() => {
    //
    // get the offer object
    const createdOffer = formContext.createdOffer;

    // get user id
    const creator = auth.userId;

    console.log(creator, "creator");
    // add user id to the offer
    const offer = { ...createdOffer, creator };

    const formData = new FormData();

    formData.append("offerType", offer.offerType);
    formData.append("title", offer.title);
    formData.append("species", offer.species);
    formData.append("description", offer.description);
    formData.append("fullName", offer.fullName);
    formData.append("phoneNumber", offer.phoneNumber);
    formData.append("zipcode", offer.zipcode);
    formData.append("city", offer.city);
    formData.append("street", offer.street);
    formData.append("price", offer.price);
    formData.append("startDate", offer.startDate);
    formData.append("endDate", offer.endDate);
    formData.append("creator", offer.creator);
    formData.append("image", offer.image);
    formData.append("userImage", offer.userImage);

    if (formContext.submitForm) {
      // Send The Offer
      const sendToDatabase = async (e) => {
        try {
          const response = await fetch(
            process.env.REACT_APP_BACKEND_URL + "/offers",
            {
              method: "POST",
              headers: {
                Authorization: "Bearer " + auth.token,
              },
              body: formData,
            }
          );

          // Get data
          const data = await response.json();
          console.log(data);
          if (!response.ok) {
            throw new Error(data.message);
          }
        } catch (err) {
          setError(err.message);
        }
      };

      // Fire send data func
      sendToDatabase();

      // turn on success alert
      setSucceed(true);

      // turn off success alert and redirect to home page
      setTimeout(() => {
        setSucceed(false);
        return navigate("/");
      }, 1000);
    }
  }, [
    auth.token,
    auth.userId,
    formContext.createdOffer,
    formContext.submitForm,
    navigate,
  ]);

  return (
    <>
      {/* If error occured */}
      <Typography>{error}</Typography>

      {/* Form */}
      <OfferformItems />

      {/* If succeed */}
      {succeed && (
        <Backdrop
          sx={{
            backgroundColor: "#000000be",
            color: "rgb(7, 177, 77, 0.42)",
            zIndex: "1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          open={true}
        >
          <Typography sx={{ mt: "2rem", fontSize: "1.5rem" }}>Done</Typography>
        </Backdrop>
      )}
    </>
  );
}

export default OfferForm;
