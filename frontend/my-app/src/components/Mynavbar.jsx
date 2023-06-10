import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

const MyNavbar = (props) => {
  const { dark, getBackgroundColor } = props;

  return (
    <Navbar
      expand="lg"
      variant={dark ? "dark" : "light"}
      style={{
        padding: "10px",
        backgroundColor: getBackgroundColor(),
        width: "100%",
      }}
    >
      <Container fluid>
        <Navbar.Brand href="#home">{/* Navbar Brand Content */}</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
