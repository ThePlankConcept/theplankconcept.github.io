import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import UserAddresses from "./pages/UserAddresses";
import CreateAddress from "./pages/CreateAddress";
import ProductsListingPage from "./pages/ProductsListingPage";
import CartPage from "./pages/CartPage";

const App = () => {
  return (
    <Router>
      <main>
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0 }}>
          <Row>
            <Col>
              <Header />
            </Col>
          </Row>
          <Row>
            <Col>
              <Routes>
                <Route path="/" element={<HomePage />} exact />
                <Route path="/product/:slug" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />}>
                  <Route path=":slug" element={<CartPage />} />
                  <Route path="" element={<CartPage />} />
                </Route>
                <Route path="/products" element={<ProductsListingPage />}>
                  <Route path=":keyword" element={<ProductsListingPage />} />
                  <Route path="" element={<ProductsListingPage />} />
                </Route>
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/Addresses" element={<UserAddresses />} />
                <Route path="/Create-Address" element={<CreateAddress />} />
              </Routes>
            </Col>
          </Row>
          <Row>
            <Col>{window.location.pathname !== "/login" && window.location.pathname !== "/register" && <Footer />}</Col>
          </Row>
        </Container>
      </main>
    </Router>
  );
};

export default App;
