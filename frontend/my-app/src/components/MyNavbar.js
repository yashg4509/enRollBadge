import React from "react";
import { Navbar } from "react-bootstrap";
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
          <div className="ms-auto" style={{ paddingRight: "10px", display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "10px" }}>
              <Link to="/about" style={{ color: "white", textDecoration: "none"}}>About</Link>
            </span>
            <span style={{ marginRight: "10px" }}>
              <Link to="/help" style={{ color: "white", textDecoration: "none"}}>Help</Link>
            </span>
            <button className="btn btn-primary" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        )}
      </Navbar>
    </>
  );
};

export default CustomNavbar;
