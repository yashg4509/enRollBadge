import { Container, Row, Col, Navbar } from "react-bootstrap";
import { Link, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import App from "./dashboard/App";

function App2() {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">
          EnrollBadger
        </Navbar.Brand>
      </Navbar>
      <Container>
        <Row>
          <Col>
            <UserAuthContextProvider>
              <Routes>
                <Route
                  path="/home"
                  element={
                    <ProtectedRoute>
                      <App />

                    </ProtectedRoute>
                  }
                />
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </UserAuthContextProvider>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App2;
