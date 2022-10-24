import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

function OfferItems(props) {
  // Edit the creation Data and Time
  let createdAt = props.createdAt.split("T");
  const creationDate = createdAt[0].split("-").reverse().join("-");
  const craationTime = createdAt[1].slice(0, 8);
  const created_At = creationDate.concat(" ", craationTime);

  return (
    <Card
      sx={{
        maxWidth: 345,
        backgroundColor: "#f4f4f4",
        "&:hover": {
          backgroundColor: "#2196F3",
        },
      }}
    >
      <CardHeader
        // User Image
        avatar={
          <Avatar
            sx={{ bgcolor: "#3c52b2" }}
            alt="userImage"
            src={props.userImage}
            aria-label="offer"
          ></Avatar>
        }
        // Title
        title={props.title}
        // Created At
        subheader={created_At}
        color="red"
      />
      <Link to={`/offers/${props.offerID}`}>
        {/* Pet Image */}
        <CardMedia
          component="img"
          height="194"
          image={`${props.image}`}
          alt="Pet"
        />

        {/* Description */}
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
        </CardContent>

        {/* More Info */}
        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            paddingBottom: "1rem",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            {props.offerType}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.species}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {props.startDate.slice(0, 10).split("-").reverse().join("-")}
          </Typography>

          <Typography variant="body2" color="text.secondary">
            {props.endDate.slice(0, 10).split("-").reverse().join("-")}
          </Typography>
        </CardActions>
      </Link>
    </Card>
  );
}

export default OfferItems;
