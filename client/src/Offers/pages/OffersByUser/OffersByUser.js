import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import OffersByUserList from "../../components/Offers/OffersByUserList";

function OffersByUser(props) {
  const [offersByUser, setOffersByUser] = useState([]);

  const creatorId = props.creator;

  // get Offers made by user
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/offers/useroffers/${creatorId}`
        );
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.message);
        }

        // this one extract the offers
        // storing the offers
        const userOffers = data.data.offers;
        setOffersByUser(userOffers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOffers();
  }, [creatorId]);

  console.log();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginRight: "5rem",
        paddingTop: "3rem",
      }}
    >
      <Typography variant="h7" marginBottom="0.4rem">
        MORE OFFERS
      </Typography>

      {offersByUser.length === 0 ? (
        <Typography>Offers not found</Typography>
      ) : (
        <OffersByUserList offersByUser={offersByUser} />
      )}
    </Box>
  );
}

export default OffersByUser;
