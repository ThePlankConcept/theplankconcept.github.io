import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Button, Image, Form, Card, ListGroup, Container } from "react-bootstrap";
import Message from "../components/Message";
import Header from "../components/Header";
import {
  removeFromCart,
  addToCart2,
  removeFromCart2,
  pushCartAction,
} from "../actions/cartActions";
import RelatedProductsComponent from "../components/RelatedProductsComponent";
import Footer from "../components/Footer";
import "./cartpage.css";
const CartPage = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart2);
  const { subscribed, purchase } = cart;
  const dispatch = useDispatch();
  const [agree, setAgree] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [leasePeriod, setLeasePeriod] = useState(
    subscribed.length > 0 && subscribed[subscribed.length - 1].period
  );
  const checkboxHandler = () => {
    setAgree(!agree);
  };

  useEffect(() => {
    // console.log("lp", leasePeriod);
    // console.log("sp", subscribed);
  }, [leasePeriod]);

  const removeFromCartHandler = (id, subscription) => {
    dispatch(removeFromCart2(id, subscription));
  };
  const addDecimals = (num) => {
    return Math.ceil(num).toLocaleString("en");
  };

  const calCulateTotal = () => {
    let total1;
    let total2;
    if (subscribed.length > 0) {
      total1 = Number(
        subscribed.reduce(
          (acc, item) =>
            Number(acc) +
            Number(item.qty) *
              Number(
                leasePeriod === "12" ? item.twelve_month_price / 12 : item.six_month_price / 6
              ),
          0
        )
      ).toFixed(2);
    } else {
      total1 = 0;
    }
    if (purchase.length > 0) {
      total2 = Number(
        purchase
          .reduce((acc, item) => Number(acc) + Number(item.qty) * Number(item.price), 0)
          .toFixed(2)
      );
    } else {
      total2 = 0;
    }

    return addDecimals(total1 + total2);
  };

  const changeQuantityHandler = (id, qty, subscription, period) => {
    // console.log(id, qty, subscription);
    dispatch(addToCart2({ id, qty, subscription, period }));
  };
  const checkOutHandler = async () => {
    if (userInfo) {
      await dispatch(pushCartAction(leasePeriod));
      navigate("/checkout");
    } else {
      navigate(`/login?redirect=/checkout`);
    }
  };

  return (
    <>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Container fluid className="cartMainContainer" style={{ minHeight: "70vh" }}>
        <Row className="h-100">
          <Col xs={12} sm={12} md={7} lg={8} xl={8} className="pe-5">
            <Row>
              <Col className="p-0 m-0">
                <h1 className="text-capitalize" style={{ fontWeight: 500, fontFamily: "Poppins" }}>
                  Your Cart
                </h1>
              </Col>
              <Col className="p-0 m-0 text-end noOfItemsNote">
                {subscribed.length === 0 ? (
                  <div></div>
                ) : (
                  <p className="noOfitems">
                    Subtotal (&nbsp;
                    {Number(subscribed.reduce((acc, item) => Number(acc) + Number(item.qty), 0)) +
                      Number(
                        purchase.reduce((acc, item) => Number(acc) + Number(item.qty), 0)
                      )}{" "}
                    ) items
                  </p>
                )}
              </Col>
              <Row className="p-0 m-0 pb-3">
                <hr style={{ marginBottom: "0px", paddingBottom: "0px", width: "100%" }} />
              </Row>
            </Row>
            <Row className="d-flex justify-content-between">
              <Col className="overflow-auto" style={{ maxHeight: "28rem" }}>
                {subscribed.length === 0 && purchase.length === 0 ? (
                  <Message>
                    You cart is empty <Link to="/products">Go Back</Link>
                  </Message>
                ) : (
                  <>
                    {subscribed.length > 0 && (
                      <Container>
                        <Row>
                          <Col>
                            <p
                              className="pt-3"
                              style={{ fontFamily: "Roboto", fontSize: "1rem", fontWeight: "500" }}
                            >
                              Subscribed Items
                            </p>
                          </Col>
                        </Row>
                        <ListGroup variant="flush">
                          {subscribed.map(
                            (item) =>
                              item.subscription && (
                                <ListGroup.Item
                                  key={item.inventory_id}
                                  className="cartItemsListGroup"
                                >
                                  <Row className="d-flex align-items-center justify-content-between">
                                    <Col xs={2} sm={2} md={2} lg={1} xl={1}>
                                      <Image
                                        src={item.image}
                                        alt={item.product_name}
                                        fluid
                                        rounded
                                        style={{ width: "25rem", height: "5rem" }}
                                      />
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={7} xl={6} className="ps-3">
                                      <Link
                                        to={`/product/${item.slug}`}
                                        className="text-decoration-none ps-0"
                                        style={{
                                          fontFamily: "Poppins",
                                          fontSize: "1rem",
                                          letterSpacing: "0px",
                                          fontWeight: "400",
                                        }}
                                      >
                                        {item.product_name}
                                      </Link>
                                    </Col>
                                    <Col xs={2} sm={2} md={2} lg={1} xl={1}>
                                      <Form className="selectQty">
                                        <Form.Control
                                          as="select"
                                          value={item.qty}
                                          onChange={(e) =>
                                            changeQuantityHandler(
                                              item.inventory_id,
                                              e.target.value,
                                              true,
                                              item.period
                                            )
                                          }
                                        >
                                          {[1, 2, 3, 4, 5].map((x) => (
                                            <option key={x} value={x}>
                                              {x}
                                            </option>
                                          ))}
                                        </Form.Control>
                                      </Form>
                                    </Col>
                                    <Col
                                      xs={2}
                                      sm={2}
                                      md={2}
                                      lg={1}
                                      xl={1}
                                      className="d-flex justify-content-end"
                                    >
                                      <Button
                                        type="button"
                                        variant="light"
                                        className="text-capitalize text-decoration-underline removeBtn"
                                        style={{ color: "grey" }}
                                        onClick={() => {
                                          removeFromCartHandler(item.inventory_id, true);
                                        }}
                                      >
                                        Remove
                                      </Button>
                                    </Col>
                                    <Col
                                      xs={6}
                                      sm={8}
                                      md={7}
                                      lg={1}
                                      xl={1}
                                      className="d-flex justify-content-end priceinCart"
                                    >
                                      AED
                                      {item.qty *
                                        (leasePeriod === "12"
                                          ? addDecimals(item.twelve_month_price / 12)
                                          : addDecimals(item.six_month_price / 6))}
                                      /mo
                                    </Col>
                                  </Row>
                                </ListGroup.Item>
                              )
                          )}
                        </ListGroup>
                      </Container>
                    )}
                    {purchase.length > 0 && (
                      <Container>
                        <Row>
                          <Col>
                            <p
                              className="pt-3"
                              style={{ fontFamily: "Roboto", fontSize: "1rem", fontWeight: "500" }}
                            >
                              Purchased Items
                            </p>
                          </Col>
                        </Row>
                        <ListGroup variant="flush">
                          {purchase.map(
                            (item) =>
                              !item.subscription && (
                                <ListGroup.Item
                                  key={item.inventory_id}
                                  className="cartItemsListGroup"
                                >
                                  <Row className="d-flex align-items-center justify-content-between">
                                    <Col xs={2} sm={2} md={2} lg={1} xl={1}>
                                      <Image
                                        src={item.image}
                                        alt={item.product_name}
                                        fluid
                                        rounded
                                        style={{ width: "25rem", height: "5rem" }}
                                      />
                                    </Col>
                                    <Col xs={8} sm={8} md={8} lg={6} xl={6} className="ps-3">
                                      <Link
                                        to={`/product/${item.slug}`}
                                        className="text-decoration-none ps-0"
                                        style={{
                                          fontFamily: "Poppins",
                                          fontSize: "1rem",
                                          letterSpacing: "0px",
                                          fontWeight: "400",
                                        }}
                                      >
                                        {item.product_name}
                                      </Link>
                                    </Col>
                                    <Col xs={2} sm={2} md={2} lg={1} xl={1}>
                                      <Form className="selectQty">
                                        <Form.Control
                                          as="select"
                                          value={item.qty}
                                          onChange={(e) =>
                                            changeQuantityHandler(
                                              item.inventory_id,
                                              e.target.value,
                                              false
                                            )
                                          }
                                        >
                                          {[1, 2, 3, 4, 5].map((x) => (
                                            <option key={x} value={x}>
                                              {x}
                                            </option>
                                          ))}
                                        </Form.Control>
                                      </Form>
                                    </Col>
                                    <Col
                                      xs={2}
                                      sm={2}
                                      md={2}
                                      lg={1}
                                      xl={1}
                                      className="d-flex justify-content-end"
                                    >
                                      <Button
                                        type="button"
                                        variant="light"
                                        className="text-capitalize text-decoration-underline removeBtn"
                                        style={{ color: "grey" }}
                                        onClick={() => {
                                          removeFromCartHandler(item.inventory_id, false);
                                        }}
                                      >
                                        Remove
                                      </Button>
                                    </Col>
                                    <Col
                                      xs={6}
                                      sm={8}
                                      md={7}
                                      lg={1}
                                      xl={1}
                                      style={{ fontWeight: 600, fontFamily: "Poppins" }}
                                      className="d-flex justify-content-end"
                                    >
                                      AED{item.qty * item.price}
                                    </Col>
                                  </Row>
                                </ListGroup.Item>
                              )
                          )}
                        </ListGroup>
                      </Container>
                    )}
                  </>
                )}
              </Col>
            </Row>
          </Col>
          {subscribed.length === 0 && purchase.length === 0 ? (
            <Col></Col>
          ) : (
            <Col xs={12} sm={12} md={5} lg={4} xl={4} className="cartPageCheckoutCol ps-3 pe-3">
              <Card
                className="pt-4 text-center"
                style={{ background: "transparent", border: "none" }}
              >
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
                    {subscribed.length > 0 && (
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
                          AED&nbsp;
                          {addDecimals(
                            subscribed
                              .reduce(
                                (acc, item) =>
                                  Number(acc) +
                                  Number(item.qty) *
                                    Number(
                                      leasePeriod === "12"
                                        ? item.twelve_month_price / 12
                                        : item.six_month_price / 6
                                    ),
                                0
                              )
                              .toFixed(2)
                          )}
                        </Col>
                      </Row>
                    )}
                    {purchase.length > 0 && (
                      <Row className="py-2">
                        <Col
                          style={{
                            fontFamily: "Poppins",
                            fontSize: "1rem",
                            letterSpacing: "0px",
                            fontWeight: "300",
                          }}
                        >
                          <p>Purchase Items</p>
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
                          AED&nbsp;
                          {addDecimals(
                            purchase.reduce(
                              (acc, item) => Number(acc) + Number(item.qty) * Number(item.price),
                              0
                            )
                          )}
                        </Col>
                      </Row>
                    )}
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
                    {subscribed.length > 0 && (
                      <Row className="py-2">
                        <Col
                          style={{
                            fontFamily: "Poppins",
                            fontSize: "1rem",
                            letterSpacing: "0px",
                            fontWeight: "300",
                          }}
                        >
                          <p>Plan Lease:</p>
                        </Col>
                        <Col xs={6} sm={8} md={3} lg={3} xl={3}>
                          <Form.Select
                            size="sm"
                            className="selectleaseperiod"
                            defaultValue={leasePeriod}
                            onChange={(e) => {
                              setLeasePeriod(e.target.value);
                            }}
                          >
                            <option value={"6"}>6 Month</option>
                            <option value={"12"}>12 Month</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    )}
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
                    <p className="p-0 m-0">Subtotal</p>AED
                    {calCulateTotal()}
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
                    <Row className="pb-0">
                      <Button
                        type="button"
                        className="text-capitalize checkOutBtn rounded-pill mt-2"
                        disabled={(subscribed.length === 0 && purchase.length === 0) || !agree}
                        onClick={checkOutHandler}
                      >
                        Proceed To Checkout
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          )}
        </Row>
        {/* <Container fluid>
          <Row className="py-5 mt-5">
            <RelatedProductsComponent />
          </Row>
        </Container> */}
      </Container>
      <Row>
        <Col>
          {window.location.pathname !== "/login" && window.location.pathname !== "/register" && (
            <Footer />
          )}
        </Col>
      </Row>
    </>
  );
};

export default CartPage;

// import React from "react";
// import { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Row, Col, Button, Image, Form, Card, ListGroup, Container } from "react-bootstrap";
// import Message from "../components/Message";
// import Header from "../components/Header";
// import { addToCart, removeFromCart } from "../actions/cartActions";
// import RelatedProductsComponent from "../components/RelatedProductsComponent";
// import Footer from "../components/Footer";
// import "./cartpage.css";
// const CartPage = () => {
//   const { slug: productId } = useParams();
//   const location = useLocation();
//   const navigate = useNavigate();
//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;
//   const qty = location.search ? location.search.split("=")[1] : 1;
//   const dispatch = useDispatch();
//   const [agree, setAgree] = useState(false);
//   const checkboxHandler = () => {
//     setAgree(!agree);
//   };

//   console.log("cart", cartItems);
//   useEffect(() => {
//     if (productId) {
//       dispatch(addToCart(productId, qty));
//     }
//   }, [dispatch, productId, qty]);

//   const removeFromCartHandler = (id) => {
//     console.log("called remove handler");
//     dispatch(removeFromCart(id));
//   };

//   const changeQuantityHandler = (item, qty, subscription, inventory) => {
//     dispatch(addToCart(item.slug, qty, subscription, inventory));
//   };
//   const checkOutHandler = () => {
//     console.log("Checkout");
//     navigate("/login?redirect=/checkout");
//   };
//   return (
//     <>
//       <Row>
//         <Col>
//           <Header />
//         </Col>
//       </Row>
//       <Container fluid className="cartMainContainer">
//         <Row className="h-100">
//           <Col xs={12} sm={12} md={7} lg={8} xl={8} className="pe-5">
//             <Row>
//               <Col className="p-0 m-0">
//                 <h1 className="text-capitalize" style={{ fontWeight: 500, fontFamily: "Poppins" }}>
//                   Your Cart
//                 </h1>
//               </Col>
//               <Col className="p-0 m-0 text-end noOfItemsNote">
//                 {cartItems.length === 0 ? (
//                   <div></div>
//                 ) : (
//                   <p className="noOfitems">
//                     Subtotal ({cartItems.reduce((acc, item) => Number(acc) + Number(item.qty), 0)})
//                     items
//                   </p>
//                 )}
//               </Col>
//               <Row className="p-0 m-0 pb-3">
//                 <hr style={{ marginBottom: "0px", paddingBottom: "0px", width: "100%" }} />
//               </Row>
//             </Row>
//             <Row className="d-flex justify-content-between">
//               <Col className="overflow-auto" style={{ height: "28rem" }}>
//                 {cartItems.length === 0 ? (
//                   <Message>
//                     You cart is empty <Link to="/products">Go Back</Link>
//                   </Message>
//                 ) : (
//                   <>
//                     <Row>
//                       <Col>Subscribed Items</Col>
//                     </Row>
//                     <Row>
//                       <Col></Col>
//                     </Row>
//                     <ListGroup variant="flush">
//                       {cartItems.map(
//                         (item) =>
//                           item.subscription && (
//                             <ListGroup.Item key={item.product} className="cartItemsListGroup">
//                               <Row className="d-flex align-items-center justify-content-between">
//                                 <Col xs={2} sm={2} md={2} lg={1} xl={1}>
//                                   <Image
//                                     src={item.image}
//                                     alt={item.name}
//                                     fluid
//                                     rounded
//                                     style={{ width: "25rem", height: "5rem" }}
//                                   />
//                                 </Col>
//                                 <Col xs={8} sm={8} md={8} lg={7} xl={7} className="ps-3">
//                                   <Link
//                                     to={`/product/${item.slug}`}
//                                     className="text-decoration-none ps-0"
//                                     style={{
//                                       fontFamily: "Poppins",
//                                       fontSize: "1rem",
//                                       letterSpacing: "0px",
//                                       fontWeight: "400",
//                                     }}
//                                   >
//                                     {item.name}
//                                   </Link>
//                                 </Col>
//                                 <Col xs={2} sm={2} md={2} lg={1} xl={1}>
//                                   <Form className="selectQty">
//                                     <Form.Control
//                                       as="select"
//                                       value={item.qty}
//                                       onChange={(e) =>
//                                         changeQuantityHandler(
//                                           item,
//                                           e.target.value,
//                                           true,
//                                           item.productInventoryIndex
//                                         )
//                                       }
//                                     >
//                                       {[...Array(item.countInStock).keys()].map((x) => (
//                                         <option key={x + 1} value={x + 1}>
//                                           {x + 1}
//                                         </option>
//                                       ))}
//                                     </Form.Control>
//                                   </Form>
//                                 </Col>
//                                 <Col
//                                   xs={2}
//                                   sm={2}
//                                   md={2}
//                                   lg={1}
//                                   xl={1}
//                                   className="d-flex justify-content-end"
//                                 >
//                                   <Button
//                                     type="button"
//                                     variant="light"
//                                     className="text-capitalize text-decoration-underline"
//                                     style={{ color: "grey" }}
//                                     onClick={() => {
//                                       removeFromCartHandler(item.product);
//                                     }}
//                                   >
//                                     Remove
//                                   </Button>
//                                 </Col>
//                                 <Col
//                                   xs={6}
//                                   sm={8}
//                                   md={7}
//                                   lg={1}
//                                   xl={1}
//                                   style={{ fontWeight: 600, fontFamily: "Poppins" }}
//                                   className="d-flex justify-content-end priceinCart"
//                                 >
//                                   ${item.price}
//                                 </Col>
//                               </Row>
//                             </ListGroup.Item>
//                           )
//                       )}
//                     </ListGroup>
//                     <Row>
//                       <Col>Purchased Items</Col>
//                     </Row>
//                     <ListGroup variant="flush">
//                       {cartItems.map(
//                         (item) =>
//                           !item.subscription && (
//                             <ListGroup.Item key={item.product} className="cartItemsListGroup">
//                               <Row className="d-flex align-items-center justify-content-between">
//                                 <Col xs={2} sm={2} md={2} lg={1} xl={1}>
//                                   <Image
//                                     src={item.image}
//                                     alt={item.name}
//                                     fluid
//                                     rounded
//                                     style={{ width: "25rem", height: "5rem" }}
//                                   />
//                                 </Col>
//                                 <Col xs={8} sm={8} md={8} lg={7} xl={7} className="ps-3">
//                                   <Link
//                                     to={`/product/${item.slug}`}
//                                     className="text-decoration-none ps-0"
//                                     style={{
//                                       fontFamily: "Poppins",
//                                       fontSize: "1rem",
//                                       letterSpacing: "0px",
//                                       fontWeight: "400",
//                                     }}
//                                   >
//                                     {item.name}
//                                   </Link>
//                                 </Col>
//                                 <Col xs={2} sm={2} md={2} lg={1} xl={1}>
//                                   <Form className="selectQty">
//                                     <Form.Control
//                                       as="select"
//                                       value={item.qty}
//                                       onChange={(e) =>
//                                         changeQuantityHandler(
//                                           item,
//                                           e.target.value,
//                                           false,
//                                           item.productInventoryIndex
//                                         )
//                                       }
//                                     >
//                                       {[...Array(item.countInStock).keys()].map((x) => (
//                                         <option key={x + 1} value={x + 1}>
//                                           {x + 1}
//                                         </option>
//                                       ))}
//                                     </Form.Control>
//                                   </Form>
//                                 </Col>
//                                 <Col
//                                   xs={2}
//                                   sm={2}
//                                   md={2}
//                                   lg={1}
//                                   xl={1}
//                                   className="d-flex justify-content-end"
//                                 >
//                                   <Button
//                                     type="button"
//                                     variant="light"
//                                     className="text-capitalize text-decoration-underline"
//                                     style={{ color: "grey" }}
//                                     onClick={() => {
//                                       removeFromCartHandler(item.product);
//                                     }}
//                                   >
//                                     Remove
//                                   </Button>
//                                 </Col>
//                                 <Col
//                                   xs={6}
//                                   sm={8}
//                                   md={7}
//                                   lg={1}
//                                   xl={1}
//                                   style={{ fontWeight: 600, fontFamily: "Poppins" }}
//                                   className="d-flex justify-content-end"
//                                 >
//                                   ${item.price}
//                                 </Col>
//                               </Row>
//                             </ListGroup.Item>
//                           )
//                       )}
//                     </ListGroup>
//                   </>
//                 )}
//               </Col>
//             </Row>
//           </Col>
//           <Col xs={12} sm={12} md={5} lg={4} xl={4} className="cartPageCheckoutCol ps-3 pe-3">
//             <Card
//               className="pt-4 text-center"
//               style={{ background: "transparent", border: "none" }}
//             >
//               <Card.Title
//                 className="text-capitalize pb-4 text-center"
//                 style={{
//                   fontFamily: "Poppins",
//                   fontSize: "1.8rem",
//                   letterSpacing: "0px",
//                 }}
//               >
//                 Order Summary
//               </Card.Title>
//               <ListGroup variant="flush" className="text-start">
//                 <ListGroup.Item className="d-flex flex-column py-3">
//                   <Row className="py-2">
//                     <Col
//                       style={{
//                         fontFamily: "Poppins",
//                         fontSize: "1rem",
//                         letterSpacing: "0px",
//                         fontWeight: "300",
//                       }}
//                     >
//                       <p>Monthly Furniture Total:</p>
//                     </Col>
//                     <Col
//                       className="text-end"
//                       style={{
//                         fontFamily: "Poppins",
//                         fontSize: "1rem",
//                         letterSpacing: "0px",
//                         fontWeight: "600",
//                       }}
//                     >
//                       $
//                       {cartItems
//                         .reduce(
//                           (acc, item) => Number(acc) + Number(item.qty) * Number(item.price),
//                           0
//                         )
//                         .toFixed(2)}
//                     </Col>
//                   </Row>
//                   <Row className="py-2">
//                     <Col
//                       style={{
//                         fontFamily: "Poppins",
//                         fontSize: "1rem",
//                         letterSpacing: "0px",
//                         fontWeight: "300",
//                       }}
//                     >
//                       <p>Delivery & Assembly:</p>
//                     </Col>
//                     <Col
//                       className="text-end"
//                       style={{
//                         fontFamily: "Poppins",
//                         fontSize: "1rem",
//                         letterSpacing: "0px",
//                         fontWeight: "600",
//                       }}
//                     >
//                       Free
//                     </Col>
//                   </Row>
//                 </ListGroup.Item>
//                 <ListGroup.Item
//                   style={{
//                     fontFamily: "Poppins",
//                     fontSize: "1rem",
//                     letterSpacing: "0px",
//                     fontWeight: "600",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     paddingTop: "4%",
//                     paddingBottom: "4%",
//                   }}
//                 >
//                   <p className="p-0 m-0">Subtotal</p>$
//                   {cartItems
//                     .reduce((acc, item) => Number(acc) + Number(item.qty) * Number(item.price), 0)
//                     .toFixed(2)}
//                 </ListGroup.Item>
//                 <ListGroup.Item className="d-flex flex-column">
//                   <Row className="py-3">
//                     <Col>
//                       <div>
//                         <input type="checkbox" id="agree" onChange={checkboxHandler} />
//                         <label htmlFor="agree" className="ps-3">
//                           I agree to{" "}
//                           <a href="#" style={{ color: "blue" }}>
//                             terms and conditions
//                           </a>
//                         </label>
//                       </div>
//                     </Col>
//                   </Row>
//                   <Row className="pb-0">
//                     <Button
//                       type="button"
//                       className="text-capitalize checkOutBtn rounded-pill mt-2"
//                       disabled={cartItems.length === 0 || !agree}
//                       onClick={checkOutHandler}
//                     >
//                       Proceed To Checkout
//                     </Button>
//                   </Row>
//                 </ListGroup.Item>
//               </ListGroup>
//             </Card>
//           </Col>
//         </Row>
//         <Container fluid>
//           <Row className="py-5 mt-5">
//             <RelatedProductsComponent />
//           </Row>
//         </Container>
//       </Container>
//       <Row>
//         <Col>
//           {window.location.pathname !== "/login" && window.location.pathname !== "/register" && (
//             <Footer />
//           )}
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default CartPage;
