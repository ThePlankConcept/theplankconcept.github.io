import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { savePromoInfo } from "../actions/checkoutActions";
import "./deliveryInfo.css";
const PaymentInfo = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const checkoutDetail = useSelector((state) => state.checkoutDetails);
  const { checkoutDeliveryInfo, checkoutBillingInfo } = checkoutDetail;

  console.log("p", checkoutBillingInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cardNo, setCardNo] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCVC] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [promo, setPromo] = useState("");

  useEffect(() => {
    if (!checkoutBillingInfo) {
      navigate("/checkout/deliveryinfo");
    }
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("Order Placed");
  };

  const promoHandler = (e) => {
    e.preventDefault();
    dispatch(savePromoInfo(promo));
  };
  return (
    <Container className="deliveryInfoContainer">
      <Row>
        <Col style={{ fontFamily: "Poppins", fontSize: "2.5rem", fontWeight: "500" }}>
          <p>Payment Info</p>
        </Col>
      </Row>
      <Row className="pb-3">
        <Col md={4} lg={4} xl={5}>
          <Image src="/paymentIcons.png" fluid />
        </Col>
      </Row>
      <Row>
        <Col>
          <Form className="plankDeliveryInfoForm" onSubmit={submitHandler}>
            <Form.Group className="mb-4" controlId="cardNo">
              <Form.Control
                type="text"
                value={cardNo}
                onChange={(e) => setCardNo(e.target.value)}
                placeholder="1234 1234 1234 1234"
                required
              />
            </Form.Group>
            <Row className="d-flex justify-content-between">
              <Col xs={12} sm={12} md={12} lg={6} xl={6} className="pe-3">
                <Form.Group className="mb-4" controlId="expiry">
                  <Form.Control
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <Form.Group className="mb-4" controlId="cvc">
                  <Form.Control
                    type="text"
                    value={cvc}
                    onChange={(e) => setCVC(e.target.value)}
                    placeholder="CVC"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-4" controlId="Emirate">
              <Form.Control
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                placeholder="Zip Code"
                disabled
              />
            </Form.Group>
            <Row>
              <Col>
                <p>Have a promo code?</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form onSubmit={promoHandler}>
                  <Row>
                    <Col className="pe-3 " lg={5}>
                      <Form.Group controlId="promo">
                        <Form.Control
                          type="email"
                          placeholder="Enter promo code"
                          value={promo}
                          onChange={(e) => setPromo(e.target.value)}
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
              </Col>
            </Row>
            <Row>
              <Col>
                <hr className="deliveryInfoHr" />
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <Button
                  variant="primary"
                  type="submit"
                  className="rounded-pill deliveryInfoSavebtn pt-1 pb-1 "
                >
                  Place Your Order
                </Button>
              </Col>
            </Row>
          </Form>
          <Row className="py-4">
            <Col className="text-center plankCheckoutBacktoCart">
              <Link to="/checkout/billinginfo">
                <Button className="plankCheckoutBacktoCart p-0 m-0">Return to Billing Info</Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="customerInfoStepContainerRow">
        <Row>
          <Col className="d-flex justify-content-center">
            <hr className="deliveryInfoHr3" />
          </Col>
        </Row>
        <Col className="customerInfoStepContainerRowCol">
          {userInfo.user.first_name && (
            <Container className="customerInfoStepContainer">
              <Row>
                <Col className="xyzcol" xs={4} sm={4} md={4} lg={4} xl={4}>
                  <p>
                    Customer Info{"  "}
                    <span>
                      <Link to="/checkout">Edit</Link>
                    </span>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="xyzcol" xs={4} sm={4} md={4} lg={4} xl={4}>
                  <small>{userInfo.user.first_name}</small>
                </Col>
              </Row>
              <Row>
                <Col className="xyzcol" xs={4} sm={4} md={4} lg={4} xl={4}>
                  <small>{userInfo.user.email}</small>
                </Col>
              </Row>
            </Container>
          )}
        </Col>
        <Col className="customerInfoStepContainerRowCol">
          {checkoutDeliveryInfo.address && checkoutDeliveryInfo.address.attributes.building_name && (
            <Container className="customerInfoStepContainer ">
              <Row>
                <Col className="xyzcol" xs={4} sm={4} md={4} lg={4} xl={4}>
                  <p>
                    Delivery Info&nbsp;
                    <span>
                      <Link to="/checkout/deliveryinfo">Edit</Link>
                    </span>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="xyzcol" xs={4} sm={4} md={4} lg={4} xl={4}>
                  <small>
                    {checkoutDeliveryInfo.address.attributes.flat_number},{" "}
                    {checkoutDeliveryInfo.address.attributes.building_name}...
                  </small>
                </Col>
              </Row>
              <Row>
                <Col className="xyzcol" xs={4} sm={4} md={4} lg={4} xl={4}>
                  <small>
                    {checkoutDeliveryInfo.address.attributes.city}
                    {checkoutDeliveryInfo.address.attributes.emirate}
                  </small>
                </Col>
              </Row>
            </Container>
          )}
        </Col>
        <Col className="customerInfoStepContainerRowCol">
          {checkoutBillingInfo && checkoutBillingInfo.building_name && (
            <Container className="customerInfoStepContainer">
              <Row>
                <Col className="xyzcol" xs={4} sm={4} md={4} lg={4} xl={4}>
                  <p>
                    BillingInfo&nbsp;
                    <span>
                      <Link to="/checkout/billinginfo">Edit</Link>
                    </span>
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="xyzcol" xs={4} sm={4} md={4} lg={4} xl={4}>
                  <small>
                    {checkoutBillingInfo.flat_number}, {checkoutBillingInfo.building_name}...
                  </small>
                </Col>
              </Row>
              <Row>
                <Col className="xyzcol" xs={4} sm={4} md={4} lg={4} xl={4}>
                  <small>{checkoutBillingInfo.emirate}</small>
                </Col>
              </Row>
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentInfo;
