import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../shared/Context/authContext";
import UserProfileItems from "../components/UserProfileItems";

function UserProfile() {
  const [user, setUser] = useState([]);
  //   const [error, setError] = useState();

  const auth = useContext(AuthContext);

  // Get All Users
  useEffect(() => {
    const getUsers = async () => {
      try {
        // get response from backend
        const response = await fetch(
          `${process.env.REACT_APP_BACKEND_URL}/users/${auth.userId}`
        );
        const data = await response.json();

        // if there is a 400 or 500 error code throw an error
        if (!response.ok) {
          throw new Error(data.message);
        }

        // if there is no errors
        // Extract retrived data
        const result = data.data.user;

        // Add offers
        setUser(result);
      } catch (err) {
        console.log(err);
        // setError(err.message);
      }
    };

    getUsers();
  }, [auth.userId]);
  return (
    <>
      <UserProfileItems user={user} />
    </>
  );
}

export default UserProfile;
