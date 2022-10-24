import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OneOfferItems from "../../components/Offers/OneOfferItems";
import OffersByUser from "../OffersByUser/OffersByUser";

function OneOffer() {
  const [offerItems, setOfferItems] = useState([]);

  // get offer id
  const { offerID } = useParams();

  // get one offer by id
  useEffect(() => {
    const getOfferById = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/offers/${offerID}`
        );
        const { data } = await res.json();
        setOfferItems(data.offer);
      } catch (err) {
        console.log(err);
      }
    };
    getOfferById();
  }, [offerID]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      {offerItems.length === 0 ? (
        <Typography>Offer not found</Typography>
      ) : (
        <OneOfferItems offerItems={offerItems} />
      )}

      <OffersByUser creator={offerItems.creator} />
    </Box>
  );
}

export default OneOffer;
