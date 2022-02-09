import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Footer from "./components/Footer";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import UserAddresses from "./pages/UserAddresses";
import CreateAddress from "./pages/CreateAddress";
import CartPage from "./pages/CartPage";

const App = () => {
  return (
    <Router>
      <Header />
      <main >
        <Container fluid="true">
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            {/* <Route path="/products" element={<AllProductsPage />} /> */}
            {/* <Route path="/service" element={<ServicePage />} /> */}
            <Route path="/search/:keyword" element={<HomePage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />}>
              <Route path=":slug" element={<CartPage />} />
              <Route path="" element={<CartPage />} />
            </Route>
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/Addresses" element={<UserAddresses />} />
            <Route path="/Create-Address" element={<CreateAddress />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
