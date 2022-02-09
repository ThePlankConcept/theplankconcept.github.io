import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import LoginPage from "./pages/LoginPage";
import RegisterScreen from "./pages/RegisterScreen";
import LoginScreen from "./pages/LoginScreen";
import UserAddresses from "./pages/UserAddresses";
import CreateAddress from "./pages/CreateAddress";
const App = () => {

  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container fluid="true">
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/Addresses" element={< UserAddresses/>} />
            <Route path="/Create-Address" element={< CreateAddress/>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );

};

export default App;
