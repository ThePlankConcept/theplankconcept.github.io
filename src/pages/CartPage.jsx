import React from "react";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Image, Form, Card, ListGroup, Container } from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";
import RelatedProductsComponent from "../components/RelatedProductsComponent";
import Footer from "../components/Footer";
import "./cartpage.css";
const CartPage = () => {
  const { slug: productId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const qty = location.search ? location.search.split("=")[1] : 1;
  const dispatch = useDispatch();
  const [agree, setAgree] = useState(false);

  const checkboxHandler = () => {
    setAgree(!agree);
  };
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  console.log("cart", cartItems);
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkOutHandler = () => {
    console.log("Checkout");
    navigate("/login?redirect=shipping");
  };
  return (
    <>
      <Container fluid className="cartMainContainer">
        <Row className="h-100">
          <Col xs={6} sm={8} md={7} lg={8} xl={8} className="pe-5">
            <Row>
              <Col className="p-0 m-0">
                <h1 className="text-capitalize" style={{ fontWeight: 500, fontFamily: "Poppins" }}>
                  Your Cart
                </h1>
              </Col>
              <Col className="p-0 m-0 text-end noOfItemsNote">{cartItems.length === 0 ? <div></div> : <p className="noOfitems">Subtotal ({cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0)}) items</p>}</Col>
              <Row className="p-0 m-0 pb-3">
                <hr style={{ marginBottom: "0px", paddingBottom: "0px", width: "100%" }} />
              </Row>
            </Row>
            <Row className="d-flex justify-content-between">
              <Col>
                {cartItems.length === 0 ? (
                  <Message>
                    You cart is empty <Link to="/products">Go Back</Link>
                  </Message>
                ) : (
                  <ListGroup variant="flush">
                    {cartItems.map((item) => (
                      <ListGroup.Item key={item.product} className="cartItemsListGroup">
                        <Row className="d-flex align-items-center">
                          <Col xs={6} sm={8} md={7} lg={2} xl={2}>
                            <Image src={item.image} alt={item.name} fluid rounded width={"110px"} />
                          </Col>
                          <Col xs={6} sm={8} md={7} lg={6} xl={6}>
                            <Link to={`/product/${item.slug}`} className="text-decoration-none ps-0" style={{ fontFamily: "Poppins", fontSize: "1rem", letterSpacing: "0px", fontWeight: "400" }}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col xs={6} sm={8} md={7} lg={2} xl={2} className="d-flex justify-content-end">
                            <Button
                              type="button"
                              variant="light"
                              className="text-capitalize text-decoration-underline"
                              style={{ color: "grey" }}
                              onClick={() => {
                                removeFromCartHandler(item.product);
                              }}
                            >
                              Remove
                            </Button>
                          </Col>
                          <Col xs={6} sm={8} md={7} lg={2} xl={2} style={{ fontWeight: 600, fontFamily: "Poppins" }} className="d-flex justify-content-end">
                            ${item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Col>
            </Row>
          </Col>
          <Col xs={6} sm={4} md={5} lg={4} xl={4} className="cartPageCheckoutCol ps-3 pe-3">
            <Card className="pt-4 text-center" style={{ background: "transparent", border: "none" }}>
              <Card.Title
                className="text-capitalize pb-4 text-center"
                style={{
                  fontFamily: "Poppins",
                  fontSize: "1.8rem",
                  letterSpacing: "0px",
                }}
              >
                Order Summary
              </Card.Title>
              <ListGroup variant="flush" className="text-start">
                <ListGroup.Item className="d-flex flex-column py-3">
                  <Row className="py-2">
                    <Col
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "1rem",
                        letterSpacing: "0px",
                        fontWeight: "300",
                      }}
                    >
                      <p>Monthly Furniture Total:</p>
                    </Col>
                    <Col
                      className="text-end"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "1rem",
                        letterSpacing: "0px",
                        fontWeight: "600",
                      }}
                    >
                      ${cartItems.reduce((acc, item) => Number(acc) + Number(item.qty) * Number(item.price), 0).toFixed(2)}
                    </Col>
                  </Row>
                  <Row className="py-2">
                    <Col
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "1rem",
                        letterSpacing: "0px",
                        fontWeight: "300",
                      }}
                    >
                      <p>Delivery & Assembly:</p>
                    </Col>
                    <Col
                      className="text-end"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "1rem",
                        letterSpacing: "0px",
                        fontWeight: "600",
                      }}
                    >
                      Free
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "1rem",
                    letterSpacing: "0px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "4%",
                    paddingBottom: "4%",
                  }}
                >
                  <p className="p-0 m-0">Subtotal</p>${cartItems.reduce((acc, item) => Number(acc) + Number(item.qty) * Number(item.price), 0).toFixed(2)}
                </ListGroup.Item>
                <ListGroup.Item className="d-flex flex-column">
                  <Row className="py-3">
                    <Col>
                      <div>
                        <input type="checkbox" id="agree" onChange={checkboxHandler} />
                        <label htmlFor="agree" className="ps-3">
                          I agree to{" "}
                          <a href="#" style={{ color: "blue" }}>
                            terms and conditions
                          </a>
                        </label>
                      </div>
                    </Col>
                  </Row>
                  <Row className="pb-3">
                    <Button type="button" className="text-capitalize checkOutBtn rounded-pill mt-2" disabled={cartItems.length === 0 || !agree} onClick={checkOutHandler}>
                      Proceed To Checkout
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Container>
          {/* <Row className="py-5 mt-5">
            <RelatedProductsComponent />
          </Row> */}
        </Container>
      </Container>
      <Row>
        <Col>{window.location.pathname !== "/login" && window.location.pathname !== "/register" && <Footer />}</Col>
      </Row>
    </>
  );
};

export default CartPage;

{
  /* <Container fluid>
  <Container className="mt-5" fluid>
    <Row className="pb-3">
      <Col xs={6} sm={6} md={5} lg={5} xl={5}>
        <h1 className="text-capitalize">Your Cart</h1>
      </Col>
      <Col xs={6} sm={6} md={7} lg={7} xl={7}>
        {cartItems.length === 0 ? <div></div> : <p>Subtotal ({cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0)}) items</p>}
      </Col>
      <hr style={{ marginBottom: "0px", paddingBottom: "0px", width: "65%" }} />
    </Row>
    <Row className="d-flex justify-content-between">
      <Col xs={12} sm={12} md={8} lg={7} xl={7}>
        {cartItems.length === 0 ? (
          <Message>
            You cart is empty <Link to="/">Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row className="d-flex align-items-center">
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded width={"100px"} />
                  </Col>
                  <Col md={6}>
                    <Link to={`/product/${item.slug}`} className="text-decoration-none ps-0">
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      className="text-capitalize text-decoration-underline"
                      style={{ color: "grey" }}
                      onClick={() => {
                        removeFromCartHandler(item.product);
                      }}
                    >
                      Remove
                    </Button>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col xs={12} sm={12} md={4} lg={3} xl={4} className="cartPageCheckoutCol">
        <Card className="pt-4 text-center" style={{ background: "transparent", border: "none" }}>
          <Card.Title
            className="text-capitalize pb-4 text-center"
            style={{
              fontFamily: "Poppins",
              fontSize: "1.8rem",
              letterSpacing: "0px",
            }}
          >
            Order Summary
          </Card.Title>
          <ListGroup variant="flush" className="text-start">
            <ListGroup.Item className="d-flex flex-column">
              <Row>
                <Col
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "1rem",
                    letterSpacing: "0px",
                    fontWeight: "300",
                  }}
                >
                  <p>Monthly Furniture Total:</p>
                </Col>
                <Col
                  className="text-end"
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "1rem",
                    letterSpacing: "0px",
                    fontWeight: "600",
                  }}
                >
                  ${cartItems.reduce((acc, item) => Number(acc) + Number(item.qty) * Number(item.price), 0).toFixed(2)}
                </Col>
              </Row>
              <Row>
                <Col
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "1rem",
                    letterSpacing: "0px",
                    fontWeight: "300",
                  }}
                >
                  <p>Delivery & Assembly:</p>
                </Col>
                <Col
                  className="text-end"
                  style={{
                    fontFamily: "Poppins",
                    fontSize: "1rem",
                    letterSpacing: "0px",
                    fontWeight: "600",
                  }}
                >
                  Free
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item
              style={{
                fontFamily: "Poppins",
                fontSize: "1rem",
                letterSpacing: "0px",
                fontWeight: "600",
              }}
            >
              <p>Subtotal</p>${cartItems.reduce((acc, item) => Number(acc) + Number(item.qty) * Number(item.price), 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item className="d-flex flex-column">
              <Row className="py-3">
                <Col>
                  <div>
                    <input type="checkbox" id="agree" onChange={checkboxHandler} />
                    <label htmlFor="agree" className="ps-3">
                      I agree to{" "}
                      <a href="#" style={{ color: "blue" }}>
                        terms and conditions
                      </a>
                    </label>
                  </div>
                </Col>
              </Row>
              <Row className="pb-3">
                <Button type="button" className="text-capitalize checkOutBtn rounded-pill mt-2" disabled={cartItems.length === 0 || !agree} onClick={checkOutHandler}>
                  Proceed To Checkout
                </Button>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
    {/* <Row className="py-5 mt-5">
    <RelatedProductsComponent />
            </Row> */
}
