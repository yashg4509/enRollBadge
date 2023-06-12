import React from "react";
import { Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router";

const CustomNavbar = () => {
  const location = useLocation();
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
      window.alert("You have been logged out.");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/" style={{ paddingLeft: "10px" }}>
          EnrollBadger
        </Navbar.Brand>
        <div
          className="ms-auto"
          style={{
            paddingRight: "10px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <span style={{ marginRight: "10px" }}>
            <Link
              to="/about"
              style={{ color: "white", textDecoration: "none" }}
            >
              About
            </Link>
          </span>

          {user ? (
            <button
              className="btn btn-primary"
              onClick={handleLogout}
              style={{ marginLeft: "10px" }}
            >
              Log Out
            </button>
          ) : (
            <Link
              to="/login"
              className="btn btn-primary"
              style={{ marginLeft: "10px", textDecoration: "none" }}
            >
              Log In
            </Link>
          )}
        </div>
      </Navbar>
    </>
  );
};

export default CustomNavbar;
