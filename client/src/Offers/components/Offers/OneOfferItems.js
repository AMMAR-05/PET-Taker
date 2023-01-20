import * as React from "react";
import { CardMedia, Typography } from "@mui/material";
import { Box } from "@mui/system";
// import MyLocationRoundedIcon from "@mui/icons-material/MyLocationRounded";
// import StayPrimaryPortraitRoundedIcon from "@mui/icons-material/StayPrimaryPortraitRounded";
function OneOfferItems({ offerItems }) {
  return (
    <Box
      sx={{
        width: { xs: "90%", md: "50%" },
        margin: { xs: "auto", md: "0" },
        paddingTop: { xs: "3rem" },
        paddingLeft: { md: "1rem" },
      }}
    >
      {/* Image */}
      <CardMedia
        component="img"
        sx={{
          backgroundColor: "#2196F3",
          p: 0.5,
          boxShadow: 4,
          height: "422.6px",
          borderRadius: "4px",
        }}
        image={offerItems.image}
        alt="Pet"
      />

      {/* Description & Title */}
      <Box sx={{ paddingY: "1rem" }}>
        <Typography
          sx={{
            boxShadow: 4,
            borderRadius: "4px",
            padding: "0.5rem",
            color: "#fff",
            backgroundColor: "#323334",
          }}
        >
          {offerItems.title}
        </Typography>
        <Typography
          sx={{
            marginY: "1rem",
            boxShadow: 4,
            borderRadius: "4px",
            padding: "0.5rem",
            color: "#fff",
            backgroundColor: "#323334",
          }}
        >
          {offerItems.description}
        </Typography>
      </Box>

      {/* Adresse */}

      <Box
        sx={{
          boxShadow: 4,
          borderRadius: "4px",
          padding: "0.5rem",
          paddingRight: "2rem",
          color: "#fff",
          backgroundColor: "#323334",
        }}
      >
        {/* <MyLocationRoundedIcon /> */}
        <Typography>Username: {offerItems.fullName}</Typography>
        <Typography>City: {offerItems.city}</Typography>
        <Typography>Street: {offerItems.street}</Typography>
        <Typography>Zipcode: {offerItems.zipcode}</Typography>

        {/* <StayPrimaryPortraitRoundedIcon /> */}
        <Typography>Mobil: {offerItems.phoneNumber}</Typography>

        {/* <Typography>Type: {offerItems.offerType}</Typography> */}
        {/* <Typography>Pet: {offerItems.species}</Typography> */}
        <Typography>
          {/* Start date: {offerItems.startDate.toLocaleString()} */}
        </Typography>
        <Typography>
          {/* End data:{" "} */}
          {/* {offerItems.endDate.slice(0, 10).split("-").reverse().join("-")}{" "} */}
        </Typography>
      </Box>
    </Box>
  );
}

export default OneOfferItems;
