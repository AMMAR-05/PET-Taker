import React, { useContext } from "react";
import { Avatar, Card, CardHeader, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/Context/authContext";

const styling = {
  buttons: {
    padding: "0.5rem",
    borderRadius: "5px",
    marginBottom: "1rem",
    background: "linear-gradient(45deg, #3c52b2  10%, #2196F3 90%)",
    "&:hover": {
      background: "linear-gradient(45deg, #f44d   10%, #2196F3 90%)",
    },
    color: "#ffff",
  },
};

function UserProfileItems(props) {
  const auth = useContext(AuthContext);
  return (
    <Card
      // elevation={0}
      sx={{
        width: "80%",
        margin: "3rem auto",
        padding: "2rem",
        color: "whitesmoke",
        background: "linear-gradient(360deg, #3c52b2  5%, #36383a 90%)",
      }}
    >
      <CardHeader
        sx={{
          marginBottom: "1rem",
          borderRadius: "5px",
          background: "linear-gradient(45deg, #3c52b2  10%, #2196F3 90%)",
        }}
        // Title
        title={props.title}
        // subheader={created_At}

        // User Image
        avatar={<Avatar src={props.user.image} alt="user Image"></Avatar>}
      />
      <Box>
        <Typography variant="h6">{props.user.userName}</Typography>
        <Typography variant="h6">{props.user.email}</Typography>
        <Typography variant="h6">{`${
          props.user.offers && props.user.offers.length
        } offers online`}</Typography>
        <Typography variant="h6">reviews x3 ⭐</Typography>
        {/* <Typography variant="h6">Berlin</Typography> */}
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          marginTop: "1rem",
        }}
      >
        <Link to="/bookmarks">
          <Typography variant="h6" sx={styling.buttons}>
            Bookmarks
          </Typography>
        </Link>
        <Link to={`/offers/user/${auth.userId}`}>
          <Typography variant="h6" sx={styling.buttons}>
            Offers
          </Typography>
        </Link>
      </Box>
    </Card>
  );
}

export default UserProfileItems;
