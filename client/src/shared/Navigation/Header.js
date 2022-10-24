import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { AuthContext } from "../Context/authContext";
import { Container } from "@mui/system";

const linkStyle = {
  link: {
    color: "#232322",
    display: "block",
    fontSize: "15px",
    "&:hover": {
      backgroundColor: "#2196F3",
      color: "#f4f4f4",
    },
  },
};

function MainNavigation(props) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const auth = useContext(AuthContext);

  const userImage = localStorage.getItem("userImg");

  // Open Nav Menu
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  // Open User Menu
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  // Close Nav Menu
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  // Close User Menu
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: "#f4f4f4",
        color: "#232322",
        height: "4rem",
        paddingX: { xs: "1rem", md: "3rem", xl: "5rem" },
        paddingTop: { xs: "0.2rem", sm: "0", md: "0", lg: "0", xl: "0" },
      }}
    >
      <Container maxWidth="xl" disableGutters sx={{ margin: 0 }}>
        <Toolbar disableGutters>
          {/* Big Screen */}
          <AdbIcon
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
            }}
          />
          <Typography
            variant="h1"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontWeight: 300,
              fontSize: "32px",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PET TAKER
          </Typography>

          {/* Burger Menu Small Screen */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none", margin: 0 },
            }}
          >
            {/* Burger Menu Icon */}
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                "&:hover": {
                  backgroundColor: "#3c52b2",
                  color: "#f4f4f4",
                },
              }}
            >
              <MenuIcon />
            </IconButton>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },
              }}
            >
              <MenuItem
                onClick={handleCloseNavMenu}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Link to="/">
                  <Button onClick={handleCloseNavMenu} sx={linkStyle.link}>
                    All Offers
                  </Button>
                </Link>

                {!auth.isLoggedIn && (
                  <Link to="/signup">
                    <Button onClick={handleCloseNavMenu} sx={linkStyle.link}>
                      Signup
                    </Button>
                  </Link>
                )}

                {!auth.isLoggedIn && (
                  <Link to="/login">
                    <Button onClick={handleCloseNavMenu} sx={linkStyle.link}>
                      Login
                    </Button>
                  </Link>
                )}
              </MenuItem>
            </Menu>
          </Box>

          <AdbIcon sx={{ display: { xs: "flex", md: "none" } }} />
          <Typography
            variant="h1"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: { xs: "0", md: "5" },
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontSize: "24px",
              fontWeight: 300,
              letterSpacing: ".2rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PET TAKER
          </Typography>

          {/* Big Screen Links*/}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Link to="/">
              <Button onClick={handleCloseNavMenu} sx={linkStyle.link}>
                All Offers
              </Button>
            </Link>
            {!auth.isLoggedIn && (
              <Link to="/signup">
                <Button onClick={handleCloseNavMenu} sx={linkStyle.link}>
                  Signup
                </Button>
              </Link>
            )}

            {!auth.isLoggedIn && (
              <Link to="/login">
                <Button onClick={handleCloseNavMenu} sx={linkStyle.link}>
                  Login
                </Button>
              </Link>
            )}
          </Box>
          {/* ********************************************** */}
          {/* Setting */}
          {auth.isLoggedIn && (
            <Box sx={{ flexGrow: 0, display: "flex", alignItems: "center" }}>
              <Typography
                component={Link}
                to="/profile"
                gutterBottom
                sx={{
                  fontSize: "smaller",
                  mr: { xs: "0.5rem", md: "1rem", xl: "1.3rem" },
                  width: { xs: "0px", md: "5rem" },
                  display: { xs: "none", md: "block" },
                  paddingTop: "0.5rem",
                }}
              >
                {auth.userName.charAt(0).toUpperCase() + auth.userName.slice(1)}
              </Typography>

              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{
                    p: 0,
                  }}
                >
                  <Avatar alt="Ammar" src={userImage} />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{
                  mt: "49px",
                }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem
                  onClick={handleCloseUserMenu}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Link to="/profile">
                    <Button onClick={handleCloseNavMenu} sx={linkStyle.link}>
                      Profile
                    </Button>
                  </Link>
                  <Link to={`/offers/user/${auth.userId}`}>
                    <Button onClick={handleCloseNavMenu} sx={linkStyle.link}>
                      My Offers
                    </Button>
                  </Link>

                  <Link to="/newoffer">
                    <Button onClick={handleCloseNavMenu} sx={linkStyle.link}>
                      Add Offer
                    </Button>
                  </Link>
                  <Link to="/">
                    <Button
                      onClick={(handleCloseNavMenu, auth.logout)}
                      sx={linkStyle.link}
                    >
                      Logout
                    </Button>
                  </Link>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MainNavigation;
