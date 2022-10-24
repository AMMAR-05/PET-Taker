import React from "react";
import { Grid, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import OfferItems from "./OfferItems";

function OfferList(props) {
  // loading state
  if (props.offers.length === 0) {
    return (
      <>
        <Backdrop
          sx={{
            backgroundColor: "#000000be",
            color: "#ff4",
            zIndex: "-1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          open={true}
        >
          <CircularProgress color="inherit" />
          <Typography sx={{ mt: "2rem", fontSize: "1.5rem" }}>
            Loading
          </Typography>
        </Backdrop>
      </>
    );
  }
  // rendering offers
  return (
    <Grid container>
      {props.offers.map((offer) => (
        <Grid
          key={offer._id}
          container
          item
          xs={12}
          sm={12}
          md={6}
          lg={4}
          xl={4}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingY: "3rem",
          }}
        >
          <OfferItems
            offerID={offer._id}
            offerType={offer.offerType}
            title={offer.title}
            species={offer.species}
            description={offer.description}
            userName={offer.userName}
            image={offer.image}
            startDate={offer.startDate}
            endDate={offer.endDate}
            userImage={offer.userImage}
            createdAt={offer.created_at}
            creator={offer.creator}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default OfferList;
