import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./checkoutPage.css";
import CustomerInfo from "../components/CustomerInfo";
import { useLocation } from "react-router-dom";
import DeliveryInfo from "../components/DeliveryInfo";
import BillingInfo from "../components/BillingInfo";
import PaymentInfo from "../components/PaymentInfo";
import { checkoutCartInfo, savePromoInfo } from "../actions/checkoutActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
const CheckoutPage = () => {
  const checkoutCart = useSelector((state) => state.checkoutCart);
  const { loading, error, cartcheckout } = checkoutCart;
  // console.log("checkoutcart", cartcheckout);

  const [subscribedProducts, setsubscribedProducts] = useState([]);
  const [purchaseProducts, setpurchaseProducts] = useState([]);
  const location = useLocation();
  const [promoAdd, setPromoAdd] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkoutCartInfo());
  }, [dispatch]);

  useEffect(() => {
    if (loading === false && cartcheckout) {
      console.log("debug", cartcheckout);
      const sub = cartcheckout[0].attributes.cart_items.data.filter(
        (item) => item.attributes.period !== "0"
      );
      const pur = cartcheckout[0].attributes.cart_items.data.filter(
        (item) => item.attributes.period === "0"
      );
      setsubscribedProducts(sub);
      setpurchaseProducts(pur);
    }
  }, [loading]);
  const promoHandler = (e) => {
    e.preventDefault();
    dispatch(savePromoInfo(promoCode));
  };
  const addDecimals = (num) => {
    return Math.ceil(num).toLocaleString("en");
  };

  const calculatePurchaseAmount = () => {
    return purchaseProducts.reduce(
      (acc, item) =>
        Number(acc) +
        Number(item.attributes.quantity) *
          Number(item.attributes.product_inventory.data.attributes.product.data.attributes.price),
      0
    );
  };
  const calculateRentingAmount = () => {
    const total = subscribedProducts.reduce(
      (acc, item) =>
        Number(acc) +
        Number(item.attributes.quantity) *
          Number(
            item.attributes.period === "six_month_price"
              ? addDecimals(
                  Number(
                    item.attributes.product_inventory.data.attributes.product.data.attributes
                      .six_month_price
                  ) / 6
                )
              : addDecimals(
                  Number(
                    item.attributes.product_inventory.data.attributes.product.data.attributes
                      .twelve_month_price
                  ) / 12
                )
          ),
      0
    );
    return total;
  };

  const pid = location.pathname.split("/").pop();

  const customMethodforRendering = (value) => {
    console.log("subs", subscribedProducts);
    console.log("purss", purchaseProducts);
    if (loading === false && cartcheckout !== []) {
      if (value) {
        const obj = cartcheckout[0].attributes.cart_items.data.filter(
          (item) => item.attributes.period !== "0"
        );

        if (obj.length > 0) {
          return (
            <>
              <Row>
                <Col>Subscribed Items</Col>
              </Row>
              {obj.map((item) => (
                <Row className="align-items-center py-3" key={item.id}>
                  <Col xs={2} sm={2} md={2} lg={2} xl={2}>
                    <Image
                      src={
                        item.attributes.product_inventory.data.attributes.images.data[0].attributes
                          .formats.thumbnail.url
                      }
                      alt={item.name}
                      fluid
                      rounded
                      style={{ width: "5rem", height: "5rem" }}
                    />
                  </Col>
                  <Col xs={6} sm={8} md={7} lg={6} xl={6}>
                    <Link
                      to={`/product/${item.slug}`}
                      className="text-decoration-none ps-4"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "1rem",
                        letterSpacing: "0px",
                        fontWeight: "400",
                      }}
                    >
                      {
                        item.attributes.product_inventory.data.attributes.product.data.attributes
                          .product_name
                      }
                    </Link>
                  </Col>
                  <Col xs={6} sm={8} md={7} lg={2} xl={2} className="text-center">
                    <small>{item.attributes.quantity} unit</small>
                  </Col>
                  <Col
                    xs={6}
                    sm={8}
                    md={7}
                    lg={1}
                    xl={2}
                    style={{ fontWeight: 600, fontFamily: "Poppins" }}
                    className="text-end"
                  >
                    AED
                    {item.attributes.quantity *
                      (item.attributes.period === "twelve_month_price"
                        ? addDecimals(
                            Number(
                              item.attributes.product_inventory.data.attributes.product.data
                                .attributes.twelve_month_price
                            ) / 12
                          )
                        : addDecimals(
                            Number(
                              item.attributes.product_inventory.data.attributes.product.data
                                .attributes.six_month_price
                            ) / 6
                          ))}
                    <small>/mo</small>
                  </Col>
                </Row>
              ))}
            </>
          );
        }
      } else {
        const obj2 = cartcheckout[0].attributes.cart_items.data.filter(
          (item) => item.attributes.period === "0"
        );
        if (obj2.length > 0) {
          // console.log("onj in false", obj2);
          return (
            <>
              <Row>
                <Col>Purchased Items</Col>
              </Row>
              {obj2.map((item) => (
                <Row className="align-items-center py-3" key={item.id}>
                  <Col xs={1} sm={1} md={1} lg={2} xl={2}>
                    <Image
                      src={
                        item.attributes.product_inventory.data.attributes.images.data[0].attributes
                          .formats.thumbnail.url
                      }
                      alt={item.name}
                      fluid
                      rounded
                      style={{ width: "5rem", height: "5rem" }}
                    />
                  </Col>
                  <Col xs={6} sm={8} md={7} lg={6} xl={6}>
                    <Link
                      to={`/product/${item.slug}`}
                      className="text-decoration-none ps-4"
                      style={{
                        fontFamily: "Poppins",
                        fontSize: "1rem",
                        letterSpacing: "0px",
                        fontWeight: "400",
                      }}
                    >
                      {
                        item.attributes.product_inventory.data.attributes.product.data.attributes
                          .product_name
                      }
                    </Link>
                  </Col>
                  <Col xs={6} sm={8} md={7} lg={2} xl={2} className="text-center">
                    <small>{item.attributes.quantity} unit</small>
                  </Col>
                  <Col
                    xs={6}
                    sm={8}
                    md={7}
                    lg={2}
                    xl={2}
                    style={{ fontWeight: 600, fontFamily: "Poppins" }}
                    className="text-end "
                  >
                    AED
                    {
                      item.attributes.product_inventory.data.attributes.product.data.attributes
                        .price
                    }
                  </Col>
                </Row>
              ))}
            </>
          );
        }
      }
    }
  };
  // console.log("p", pid);
  return (
    <>
      <Row>
        <Col>
          <Navbar className="checkoutHeader">
            <Container className="d-flex justify-content-center">
              <LinkContainer to="/" className="d-flex justify-content-center">
                <Navbar.Brand className=" ">
                  <Image className=" " src="/logo.ico" alt="logo" />
                </Navbar.Brand>
              </LinkContainer>
            </Container>
          </Navbar>
        </Col>
      </Row>
      {loading ? (
        <>
          <Row
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Col>
              <Loader />
            </Col>
          </Row>
        </>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Container fluid>
            <Row className="h-100">
              <Col xs={12} sm={12} md={6} lg={7} xl={7}>
                {pid === "checkout" ? (
                  <CustomerInfo />
                ) : pid === "deliveryinfo" ? (
                  <DeliveryInfo />
                ) : pid === "billinginfo" ? (
                  <BillingInfo />
                ) : (
                  <PaymentInfo />
                )}
              </Col>

              <Col xs={12} sm={12} md={6} lg={5} xl={5}>
                <Container className="pt-3 pe-5">
                  <Row>
                    <Col className="text-end plankCheckoutBacktoCart">
                      <Link to="/cart">
                        <Button className="plankCheckoutBacktoCart p-0 m-0">Back to Cart</Button>
                      </Link>
                    </Col>
                  </Row>
                  <Row className="pt-5">
                    <Col className="plankcheckoutOrderSummary">
                      <Row className="d-flex justify-content-between">
                        <Col className="plankCheckOrderSummaryHeading">
                          <p>Order Summary</p>
                        </Col>
                        <Col
                          className="text-end"
                          style={{ color: "rgb(130, 130, 130)", letterSpacing: "0px" }}
                        >
                          {!loading &&
                          cartcheckout[0] &&
                          cartcheckout[0].attributes.cart_items.length !== 0 ? (
                            <p>
                              {cartcheckout[0].attributes.cart_items.data.reduce(
                                (acc, item) => Number(acc) + Number(item.attributes.quantity),
                                0
                              )}{" "}
                              items
                            </p>
                          ) : (
                            <></>
                          )}
                        </Col>
                      </Row>
                      <Container
                        className="cartCheckoutContainer pe-3 "
                        style={{ height: "25rem" }}
                      >
                        <Container>{customMethodforRendering(true)}</Container>
                        <Container>{customMethodforRendering(false)}</Container>
                      </Container>
                    </Col>
                  </Row>
                </Container>
                <Row style={{ height: "100%" }}>
                  <Container
                    className="py-5 ps-5"
                    style={{ backgroundColor: "rgba(194, 207, 222, 0.3)" }}
                  >
                    <Row>
                      {promoAdd ? (
                        <Form onSubmit={promoHandler}>
                          <Row>
                            <Col className="pe-3 " lg={5}>
                              <Form.Group controlId="promoCode">
                                <Form.Control
                                  className="rounded-pill control-styling"
                                  type="email"
                                  placeholder="Enter promo code"
                                  value={promoCode}
                                  onChange={(e) => setPromoCode(e.target.value)}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col lg={7}>
                              <Button type="submit" className=" promoCode-btn rounded-pill mb-2">
                                Apply
                              </Button>
                            </Col>
                          </Row>
                        </Form>
                      ) : (
                        <Col className="plankPromoCode">
                          <Button
                            className="promoAddBtn"
                            onClick={() => {
                              setPromoAdd(true);
                            }}
                          >
                            <FontAwesomeIcon icon={faPlus} /> &nbsp; Add Promo Code
                          </Button>
                        </Col>
                      )}
                    </Row>
                    <Container className="pt-3 pe-5">
                      {subscribedProducts.length > 0 && (
                        <>
                          <Row className="py-3">
                            <Col className="briefing">
                              <p className="parainCheckout"> Plan Lease</p>
                              <hr className="checkouthr" />
                              <p className="parainCheckout">
                                {subscribedProducts[0] &&
                                subscribedProducts[0].attributes.period === "six_month_price"
                                  ? "6 Month"
                                  : "12 Month"}
                              </p>
                            </Col>
                            <small className="p-0 m-0">
                              Term begins on furniture delivery date.
                            </small>
                          </Row>
                          <Row className="py-1">
                            <Col className="briefing">
                              <p className="parainCheckout">Monthly Furniture Total</p>

                              <hr className="checkouthr" />

                              <p className="parainCheckout">{`AED ${addDecimals(
                                calculateRentingAmount()
                              )}/mo`}</p>
                            </Col>
                          </Row>
                        </>
                      )}
                      {purchaseProducts.length > 0 && (
                        <Row className="py-1">
                          <Col className="briefing">
                            <p className="parainCheckout">Purchase Total</p>

                            <hr className="checkouthr" />

                            <p className="parainCheckout">{`AED ${addDecimals(
                              calculatePurchaseAmount()
                            )}`}</p>
                          </Col>
                        </Row>
                      )}
                      <Row className="py-1">
                        <Col className="briefing">
                          <p className="parainCheckout">Delivery & Assembly</p>

                          <hr className="checkouthr" />

                          <p className="parainCheckout">Free</p>
                        </Col>
                      </Row>
                      <Row className="pt-3">
                        <Col className="briefing">
                          <p className="parainCheckout">Pick Up</p>

                          <hr className="checkouthr" />

                          <p className="parainCheckout">Free</p>
                        </Col>
                      </Row>
                      <Row className="py-3">
                        <Col className="briefing">
                          <p className="parainCheckout1 ">Amount Due Now</p>

                          <hr className="checkouthr" />

                          <p className="parainCheckout">{`AED ${addDecimals(
                            calculatePurchaseAmount() + calculateRentingAmount()
                          )}`}</p>
                        </Col>
                      </Row>
                    </Container>
                  </Container>
                </Row>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </>
  );
};

export default CheckoutPage;

{
  /* <Row>
<Col>Purchased Items</Col>
</Row>
{!loading &&
cartcheckout[0] &&
cartcheckout[0].attributes.cart_items.data.map((item) => {
  if (item.attributes.period !== "0") {
    return (
      <Row className="align-items-center py-3" key={item.id}>
        <Col xs={6} sm={8} md={7} lg={2} xl={2}>
          <Image
            src={
              item.attributes.product_inventory.data.attributes.images
                .data[0].attributes.formats.thumbnail.url
            }
            alt={item.name}
            fluid
            rounded
            style={{ width: "5rem", height: "5rem" }}
          />
        </Col>
        <Col xs={6} sm={8} md={7} lg={6} xl={9}>
          <Link
            to={`/product/${item.slug}`}
            className="text-decoration-none ps-4"
            style={{
              fontFamily: "Poppins",
              fontSize: "1rem",
              letterSpacing: "0px",
              fontWeight: "400",
            }}
          >
            {
              item.attributes.product_inventory.data.attributes.product
                .data.attributes.product_name
            }
          </Link>
        </Col>
        <Col
          xs={6}
          sm={8}
          md={7}
          lg={2}
          xl={1}
          style={{ fontWeight: 600, fontFamily: "Poppins" }}
          className="text-end"
        >
          $
          {item.attributes.period === "twelve_month_price"
            ? addDecimals(
                Number(
                  item.attributes.product_inventory.data.attributes
                    .product.data.attributes.twelve_month_price
                ) / 12
              )
            : item.attributes.period === "0"
            ? addDecimals(
                item.attributes.product_inventory.data.attributes
                  .product.data.attributes.price
              )
            : addDecimals(
                Number(
                  item.attributes.product_inventory.data.attributes
                    .product.data.attributes.twelve_month_price
                ) / 6
              )}
        </Col>
      </Row>
    );
  }
})} */
}
