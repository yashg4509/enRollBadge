import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import GoogleButton from "react-google-button";
import { useUserAuth } from "../context/UserAuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { logIn, googleSignIn } = useUserAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await logIn(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email / password , try again.");
    }
  };

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    try {
      await googleSignIn();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div
          className="p-4 box text-center"
          style={{
            backgroundColor: "#f9f9f9",
            borderRadius: "10px",
            maxWidth: "400px",
          }}
        >
          <h2 className="mb-3" style={{ color: "black" }}>
            Welcome Badger!
          </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                style={{ backgroundColor: "#ffffff", color: "#000000" }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                style={{ backgroundColor: "#ffffff", color: "#000000" }}
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="dark" type="Submit">
                Log In
              </Button>
            </div>
          </Form>
          <div
            className="text-center mt-3"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <GoogleButton
              className="g-btn"
              type="dark"
              onClick={handleGoogleSignIn}
            />
          </div>
          <div className="p-4 box mt-3 text-center">
            <p style={{ fontSize: "18px", color: "black" }}>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
