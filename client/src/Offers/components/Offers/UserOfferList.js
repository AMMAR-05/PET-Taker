import React from "react";
import { Backdrop, Grid, Typography } from "@mui/material";
import UserOffersItems from "./UserOffersItems";
import { Link } from "react-router-dom";
function UserOfferList(props) {
  // If there are no offers
  if (props.loadedOffers?.length === 0) {
    return (
      <>
        <Backdrop
          sx={{
            backgroundColor: "#000000be",
            color: "#fff",
            zIndex: "-1",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          open={true}
        >
          <Typography sx={{ fontSize: "1.5rem" }}>
            You have no offers yet, Please create one.
          </Typography>
          <Link to="/newoffer">
            <Typography
              sx={{
                mt: "3rem",
                fontSize: "1rem",
                padding: "1rem",
                backgroundColor: "#3c52b2",
                borderRadius: "8px",

                color: "#fff",

                "&:hover": {
                  backgroundColor: "rgb(7, 177, 77, 0.42)",
                },
              }}
            >
              Create Offer
            </Typography>
          </Link>
        </Backdrop>
      </>
    );
  }
  //  rendering offers
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      {props.loadedOffers?.map((loadedOffer) => (
        <Grid
          key={loadedOffer._id}
          container
          item
          xs={11}
          sm={10}
          md={10}
          lg={12}
          xl={12}
        >
          <UserOffersItems
            offerID={loadedOffer._id}
            offerType={loadedOffer.offerType}
            title={loadedOffer.title}
            species={loadedOffer.species}
            description={loadedOffer.description}
            userName={loadedOffer.userName}
            fullName={loadedOffer.fullName}
            image={loadedOffer.image}
            startDate={loadedOffer.startDate}
            endDate={loadedOffer.endDate}
            createdAt={loadedOffer.created_at}
            onDelete={props.onDelete}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default UserOfferList;
