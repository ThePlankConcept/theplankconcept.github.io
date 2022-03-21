import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import HomePage from "./pages/HomePage";

import GoogleAuthCallback from "./pages/GoogleAuthCallback";
import FacebookAuthCallback from "./pages/FacebookAuthCallback";
import AllProductPage from "./pages/AllProductPage";
import ProductPage from "./pages/ProductPage";
import LoginScreen from "./pages/LoginScreen";
import RegisterScreen from "./pages/RegisterScreen";
import UserAddresses from "./pages/UserAddresses";
import CreateAddress from "./pages/CreateAddress";
import ProductsListingPage from "./pages/ProductsListingPage";
import CartPage from "./pages/CartPage";
import Wishlists from "./pages/Wishlists";
import Wishlist from "./pages/Wishlist";
import CheckoutPage from "./pages/CheckoutPage";
import FAQ from "./pages/FAQ";
import ServicePage from "./pages/ServicePage";
import CompanyPage from "./pages/CompanyPage";
import PersonalDetails from "./pages/PersonalDetails";

const App = () => {
  return (
    <Router>
      <main>
        <Container fluid style={{ paddingLeft: 0, paddingRight: 0, marginBottom: "0px" }}>
          <Row>
            <Col>
              <Routes>
                <Route path="/" element={<HomePage />} exact />
                <Route path="/product/:slug" element={<ProductPage />} />
                <Route path="/cart" element={<CartPage />}>
                  <Route path=":slug" element={<CartPage />} />
                  <Route path="" element={<CartPage />} />
                </Route>
                <Route path="/products" element={<AllProductPage />} />
                <Route path="/wishlists" element={<Wishlists />} />
                <Route path="/wishlist/:slug" element={<Wishlist />} />
                <Route path="/auth/callback/google" element={<GoogleAuthCallback />}>
                  <Route path="?redirect" element={<GoogleAuthCallback />} />
                </Route>
                <Route path="/auth/callback/facebook" element={<FacebookAuthCallback />} />

                <Route path="/checkout" element={<CheckoutPage />}>
                  <Route path="/checkout/deliveryinfo" element={<CheckoutPage />} />
                  <Route path="/checkout/billinginfo" element={<CheckoutPage />} />
                  <Route path="/checkout/paymentinfo" element={<CheckoutPage />} />
                </Route>
                <Route path="/products/:keyword" element={<ProductsListingPage />}>
                  <Route path="?type?brand" element={<ProductsListingPage />} />
                  <Route path="" element={<ProductsListingPage />} />
                </Route>
                <Route path="/services" element={<ServicePage />} />
                <Route path="/ourstory" element={<CompanyPage />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/register" element={<RegisterScreen />} />
                <Route path="/Addresses" element={<UserAddresses />} />
                <Route path="/Create-Address" element={<CreateAddress />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/user/edit" element={<PersonalDetails />} />
                <Route path="/user/order-history" element={<PersonalDetails />} />
                <Route path="/user/payment-timeline" element={<PersonalDetails />} />
                <Route path="/user/edit-billing" element={<PersonalDetails />} />
              </Routes>
            </Col>
          </Row>
        </Container>
      </main>
    </Router>
  );
};

export default App;
