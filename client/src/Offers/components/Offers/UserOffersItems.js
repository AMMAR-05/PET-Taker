import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Modal,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { AuthContext } from "../../../shared/Context/authContext";

function UserOffersItems(props) {
  // States
  const [open, setOpen] = useState(false);

  const auth = useContext(AuthContext);

  // Edit the creation Data and Time
  let createdAt = props.createdAt.split("T");
  const creationDate = createdAt[0].split("-").reverse().join("-");
  const craationTime = createdAt[1].slice(0, 8);
  const created_At = creationDate.concat(" ", craationTime);

  const userImage = localStorage.getItem("userImg");

  // Modal Open & Close
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Delete Handler
  const deleteHandler = async () => {
    try {
      await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/offers/${props.offerID}`,
        {
          method: "DELETE",
          headers: { Authorization: "Bearer " + auth.token },
        }
      );
      // to reload page after deleteing
      props.onDelete(props.offerID);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      sx={{
        marginY: "3rem",
        backgroundColor: "#f4f4f4",
        width: "100%",
      }}
    >
      <CardHeader
        // Title
        title={props.title}
        // Created At
        subheader={created_At}
        // User Image
        avatar={<Avatar src={userImage} alt="user Image"></Avatar>}
        action={
          <CardActions sx={{ pt: "1rem" }}>
            {/* Delete */}
            <Button
              onClick={handleOpen}
              variant="contained"
              sx={{
                fontSize: "12px",
                mr: "0.5rem",
                background: "linear-gradient(90deg, #30292F 90%, #DC4731 50%)",
                ":hover": {
                  background:
                    "linear-gradient(90deg, #DC4731  90%, #30292F  50%)",
                  color: "#ffff",
                },
              }}
            >
              Delete
            </Button>
          </CardActions>
        }
      />

      {/* Offer Image */}
      <Link to={`/offers/${props.offerID}`}>
        {/* Pet Image */}
        <CardMedia component="img" height="250" image={props.image} alt="Pet" />
      </Link>

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
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {props.offerType.toUpperCase()}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          From: {props.startDate.slice(0, 10).split("-").reverse().join("-")}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          To: {props.endDate.slice(0, 10).split("-").reverse().join("-")}
        </Typography>
      </CardActions>

      {/* Modal to confirm deleting offer */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography id="modal-modal-description" sx={{ mb: 2 }}>
            Are sure you want to delete this offer?
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
            sx={{
              fontSize: "12px",
              background: "linear-gradient(90deg, #30292F 90%, #3c52b2 50%)",
              marginTop: 2,
              ":hover": {
                background:
                  "linear-gradient(90deg, #3c52b2  90%, #30292F  50%)",
              },
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={deleteHandler}
            variant="contained"
            sx={{
              fontSize: "12px",
              background: "linear-gradient(90deg, #30292F 90%, #DC4731 50%)",
              marginTop: 2,
              ":hover": {
                background:
                  "linear-gradient(90deg, #DC4731  90%, #30292F  50%)",
              },
            }}
          >
            Delete
          </Button>
        </Box>
      </Modal>
    </Card>
  );
}

export default UserOffersItems;
