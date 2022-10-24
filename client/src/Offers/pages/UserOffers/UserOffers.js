import { Box } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../shared/Context/authContext";
import UserOfferList from "../../components/Offers/UserOfferList";

function UserOffers() {
  const [loadedOffers, setLoadedOffers] = useState([]);
  const [error, setError] = useState();

  // get user Id
  const auth = useContext(AuthContext);

  // get Offers made by user
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/offers/user/${auth.userId}`,
          {
            headers: {
              Authorization: "Bearer " + auth.token,
              // "Content-Type": "application/json",
            },
          }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message);
        }

        // this one extract the offers
        // storing the offers
        const userOffers = data.data.offers.offers;
        // auth.login(data.token);
        setLoadedOffers(userOffers);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchOffers();
  }, [auth.userId, auth.token]);

  // onDelete offer
  const onDeleteOffer = (deletedOfferId) => {
    setLoadedOffers((prevOffer) =>
      prevOffer.filter((offer) => offer._id !== deletedOfferId)
    );
  };

  return (
    <Box
      sx={{
        margin: "0  auto",
        maxWidth: 900,
      }}
    >
      {/* if user is not logged in */}
      {error && <Box>{error}</Box>}
      <UserOfferList loadedOffers={loadedOffers} onDelete={onDeleteOffer} />
    </Box>
  );
}

export default UserOffers;
