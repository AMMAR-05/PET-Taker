import { Box } from "@mui/material";
import React from "react";
import OffersByUserItem from "./OffersByUserItem";

function OffersByUserList(props) {
  return (
    <>
      {props.offersByUser.map((offerByuser) => {
        return (
          <Box
            key={offerByuser._id}
            sx={{
              marginBottom: "2rem",
            }}
          >
            <OffersByUserItem
              offerID={offerByuser._id}
              offerType={offerByuser.offerType}
              title={offerByuser.title}
              species={offerByuser.species}
              description={offerByuser.description}
              userName={offerByuser.userName}
              startDate={offerByuser.startDate}
              endDate={offerByuser.endDate}
              userImage={offerByuser.userImage}
              image={offerByuser.image}
              createdAt={offerByuser.created_at}
            />
          </Box>
        );
      })}
    </>
  );
}

export default OffersByUserList;
