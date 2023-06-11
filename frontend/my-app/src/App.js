import { Container, Row, Col } from "react-bootstrap";
import CustomNavbar from "./components/MyNavbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import App from "./dashboard/App";
import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./components/About";
import Help from "./components/Help";

function App2() {
  return (
    <>
      <UserAuthContextProvider>
        <div>
          <CustomNavbar />
          <Container>
            <Row>
              <Col>
                <Routes>
                  <Route
                    path="/home"
                    element={
                      <ProtectedRoute>
                        <App />
                      </ProtectedRoute>
                    }
                  />
                  <Route path="/about" element={<About />} />
                  <Route path="/help" element={<Help />} />
                  <Route path="/" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                </Routes>
              </Col>
            </Row>
          </Container>
        </div>
      </UserAuthContextProvider>
    </>
  );
}

export default App2;
