import React from "react";
import { Navbar, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router";

const CustomNavbar = () => {
  const location = useLocation();
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };
  const isHomePage = location.pathname === "/home";
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/home" style={{ paddingLeft: "10px" }}>
          EnrollBadger
        </Navbar.Brand>
        {isHomePage && (
          <div className="ms-auto" style={{ paddingRight: "10px" }}>
            <Button variant="primary" onClick={handleLogout}>
              Log out
            </Button>
          </div>
        )}
      </Navbar>
    </>
  );
};

export default CustomNavbar;

//bg="dark" variant="dark"
