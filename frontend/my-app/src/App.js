import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import CustomNavbar from "./components/MyNavbar";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { UserAuthContextProvider } from "./context/UserAuthContext";
import App from "./dashboard/App";

function App2() {
  return (
    <>
      <UserAuthContextProvider>
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
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </UserAuthContextProvider>
    </>
  );
}

export default App2;
