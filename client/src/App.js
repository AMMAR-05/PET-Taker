import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "./shared/Context/authContext";
import UserProfile from "./Users/pages/UserProfile";
// import UpdateOffer from "./Offers/pages/UpdateOffer/UpdateOffer";

import "./App.css";

const Offers = lazy(() => import("./Offers/pages/Offers/Offers"));
const NewOffer = lazy(() => import("./Offers/pages/NewOffer/NewOffer"));
const Header = lazy(() => import("./shared/Navigation/Header"));
const Signup = lazy(() => import("./Auth/Signup/Signup"));
const Login = lazy(() => import("./Auth/Login/Login"));
const OneOffer = lazy(() => import("./Offers/pages/OneOffer/OneOffer"));
const UserOffers = lazy(() => import("./Offers/pages/UserOffers/UserOffers"));
const UnhandledRoutes = lazy(() =>
  import("./shared/UIs/Errors/UnhandledRoutes")
);

function App() {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);
  const [userName, setUserName] = useState("");
  const [userImage, setUserImage] = useState(null);

  // signup
  const signup = useCallback((userImage) => {
    setUserImage(userImage);
    localStorage.setItem("userImg", userImage);
  }, []);

  // login
  const login = useCallback((uid, token, userName) => {
    setToken(token);
    setUserId(uid);
    setUserName(userName);
    localStorage.setItem(
      "userData",
      JSON.stringify({ userId: uid, token: token, userName: userName })
    );
  }, []);

  // logout
  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData && storedData.token) {
      login(storedData.userId, storedData.token, storedData.userName);
    }
  }, [login]);

  // Protected Routes
  let routes;
  if (token) {
    routes = (
      <>
        {/* All Offers */}
        <Route path="/" element={<Offers />} />

        {/* Create Offers */}
        <Route path="/newoffer" element={<NewOffer />} />

        {/* Offer by ID */}
        <Route path="/offers/:offerID" element={<OneOffer />} />

        {/* Offer by user id */}
        <Route path="/offers/user/:userID" element={<UserOffers />} />

        {/* Profile Page */}
        <Route path="/profile" element={<UserProfile />} />

        {/* Sign Up */}
        <Route path="/signup" element={<Signup />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<UnhandledRoutes />} />
      </>
    );
  } else {
    routes = (
      <>
        {/* All Offers */}
        <Route path="/" element={<Offers />} />

        {/* Offer by ID */}
        <Route path="/offers/:offerID" element={<OneOffer />} />

        {/* Offer by user id */}
        {/* <Route path="/offers/user/:userID" element={<UserOffers />} /> */}

        {/* <Route path="/newoffer" element={<NewOffer />} /> */}

        {/* Sign Up */}
        <Route path="/signup" element={<Signup />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

        <Route path="*" element={<UnhandledRoutes />} />
      </>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        userName: userName,
        userImage: userImage,
        signup,
        login,
        logout,
      }}
    >
      <div className="App">
        <Header />
        <main className="main">
          <Suspense>
            <Routes>{routes}</Routes>
          </Suspense>
        </main>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
