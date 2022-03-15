import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./deliveryInfo.css";
import { saveBillingInfo } from "../actions/checkoutActions";

const BillingInfo = () => {
  const checkoutDetail = useSelector((state) => state.checkoutDetails);
  const { checkoutDeliveryInfo, checkoutBillingInfo } = checkoutDetail;
  console.log("reducer", checkoutBillingInfo);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [street_name, setStreet_name] = useState(checkoutBillingInfo.street_name);
  const [building_name, setBuilding_name] = useState(checkoutBillingInfo.building_name);
  const [flat_number, setFlat_number] = useState(checkoutBillingInfo.flat_number);
  const [emirate, setEmirate] = useState(checkoutBillingInfo.emirate);
  const [area, setArea] = useState(checkoutBillingInfo.area);
  const [notes, setNotes] = useState(checkoutBillingInfo.notes);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!checkoutDeliveryInfo) {
      navigate("/checkout/deliveryinfo");
    }
  }, [navigate, checkoutDeliveryInfo]);
  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(saveBillingInfo({ street_name, building_name, flat_number, emirate, area, notes }));

    navigate("/checkout/paymentInfo");
  };

  return (
    <Container className="deliveryInfoContainer">
      <Row>
        <Col style={{ fontFamily: "Poppins", fontSize: "2.5rem", fontWeight: "500" }}>
          <p>Billing Info</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form className="plankDeliveryInfoForm" onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="buildingname">
              <Form.Label>Building name/no.</Form.Label>
              <Form.Control
                type="text"
                value={building_name}
                onChange={(e) => setBuilding_name(e.target.value)}
                placeholder="e.g. Princess Tower"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="street">
              <Form.Label>Street Name</Form.Label>
              <Form.Control
                type="text"
                value={street_name}
                onChange={(e) => setStreet_name(e.target.value)}
                placeholder="e.g. Omar Ibn Al Khattab Street"
                required
              />
            </Form.Group>
            <Row className="d-flex justify-content-between">
              <Col xs={12} sm={12} md={12} lg={6} xl={6} className="pe-3">
                <Form.Group className="mb-3" controlId="flatno">
                  <Form.Label>Flat No</Form.Label>
                  <Form.Control
                    type="text"
                    value={flat_number}
                    onChange={(e) => setFlat_number(e.target.value)}
                    placeholder="e.g. Apt 5023"
                    required
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={12} md={12} lg={6} xl={6}>
                <Form.Group className="mb-3" controlId="area">
                  <Form.Label>Area</Form.Label>
                  <Form.Control
                    type="text"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Deira City Center DCC "
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Emirate</Form.Label>
              <Form.Select value={emirate} onChange={(e) => setEmirate(e.target.value)} required>
                <option value="1">Dubai</option>
                <option value="2" disabled>
                  Abu Dhabi
                </option>
                <option value="3" disabled>
                  Sharjah
                </option>
                <option value="4" disabled>
                  Ajman
                </option>
                <option value="5" disabled>
                  Ras Al Khaimah
                </option>
                <option value="6" disabled>
                  Umm Al Quwain
                </option>
                <option value="7" disabled>
                  Fujairah
                </option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="notes">
              <Form.Label>Notes</Form.Label>
              <Form.Control
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="e.g. Ring a bell"
              />
            </Form.Group>

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
                  Continue to Payment Info
                </Button>
              </Col>
            </Row>
          </Form>
          <Row className="py-4">
            <Col className="text-center plankCheckoutBacktoCart">
              <Link to="/checkout/deliveryinfo">
                <Button className="plankCheckoutBacktoCart p-0 m-0">Return to Delivery Info</Button>
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
      </Row>
    </Container>
  );
};

export default BillingInfo;
