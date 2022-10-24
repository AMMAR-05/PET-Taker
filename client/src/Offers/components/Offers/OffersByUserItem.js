import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

function OffersByUserItem(props) {
  return (
    <Card
      sx={{
        maxWidth: 640,
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
        // subheader={created_At}
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

export default OffersByUserItem;
