import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import Message from "./Message";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faAward, faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  saveBillingInfo,
  saveDeliveryInfo,
  createDeliveryAddress,
} from "../actions/checkoutActions";
import { getAddresses } from "../actions/userActions";
import { Link } from "react-router-dom";
import "./deliveryInfo.css";

const DeliveryInfo = () => {
  const userAddresses = useSelector((state) => state.userAddresses);
  const { loadingAddress, errorAddress, userAddress } = userAddresses;
  const checkoutDetail = useSelector((state) => state.checkoutDetails);
  const { checkoutDeliveryInfo } = checkoutDetail;

  // console.log("addressreduxstate", userAddresses);
  // console.log("addressreduxstatevalue", userAddress);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [street_name, setStreet_name] = useState("");
  const [building_name, setBuilding_name] = useState("");
  const [flat_number, setFlat_number] = useState("");
  const [emirate, setEmirate] = useState("Dubai");
  const [area, setArea] = useState("");
  const [notes, setNotes] = useState("");
  const [sameBilling, setSameBilling] = useState(true);
  const [addnew, setAddnew] = useState(false);
  const [addressSelected, setAddressSelected] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAddresses(userInfo.jwt));
    checkoutDeliveryInfo.sameBilling = sameBilling;
  }, [dispatch, userInfo]);

  useEffect(() => {
    setAddnew(userAddress.length === 0 ? true : false);
  }, [userAddress]);

  const selectAddressHandler = (address) => {
    setAddressSelected(address);
    dispatch(saveDeliveryInfo({ address, sameBilling }));
  };

  const sameBillingHandler = (e) => {
    setSameBilling(e.target.checked);
    checkoutDeliveryInfo.sameBilling = e.target.checked;
  };
  const newAddressHanlder = () => {
    dispatch(
      createDeliveryAddress({ street_name, building_name, emirate, notes, flat_number, area })
    );
    setAddnew(false);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("adddress selected", addressSelected);
    console.log("reduxstate", checkoutDeliveryInfo);
    if (checkoutDeliveryInfo.sameBilling) {
      dispatch(
        saveBillingInfo({
          street_name: checkoutDeliveryInfo.address.attributes.street_name,
          building_name: checkoutDeliveryInfo.address.attributes.building_name,
          emirate: checkoutDeliveryInfo.address.attributes.emirate,
          notes: checkoutDeliveryInfo.address.attributes.notes,
          flat_number: checkoutDeliveryInfo.address.attributes.flat_number,
          area: checkoutDeliveryInfo.address.attributes.area,
        })
      );
      navigate("/checkout/paymentinfo");
    } else {
      navigate("/checkout/billinginfo");
    }
  };
  return (
    <>
      {loadingAddress ? (
        <Loader />
      ) : errorAddress ? (
        <Message variant="danger">{errorAddress}</Message>
      ) : (
        <Container className="deliveryInfoContainer">
          <Row>
            <Col style={{ fontFamily: "Poppins", fontSize: "2.5rem", fontWeight: "500" }}>
              <p>Delivery Info</p>
            </Col>
          </Row>
          <Row>
            <Col>
              {loadingAddress === false && addnew ? (
                <Form className="plankDeliveryInfoForm pb-4" onSubmit={newAddressHanlder}>
                  <Form.Group className="mb-3" controlId="building_name">
                    <Form.Label>Building name/no.</Form.Label>
                    <Form.Control
                      type="text"
                      value={building_name}
                      onChange={(e) => setBuilding_name(e.target.value)}
                      placeholder="e.g. Princess Tower"
                      required={true}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="street_name">
                    <Form.Label>Street_name Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={street_name}
                      onChange={(e) => setStreet_name(e.target.value)}
                      placeholder="e.g. Omar Ibn Al Khattab Street_name "
                      required={true}
                    />
                  </Form.Group>
                  <Row className="d-flex justify-content-between">
                    <Col xs={12} sm={12} md={12} lg={6} xl={6} className="pe-3">
                      <Form.Group className="mb-3" controlId="flat_number">
                        <Form.Label>Flat No</Form.Label>
                        <Form.Control
                          type="text"
                          value={flat_number}
                          onChange={(e) => setFlat_number(e.target.value)}
                          placeholder="e.g. Apt 5023"
                          required={true}
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
                          required={true}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Form.Group className="mb-3">
                    <Form.Label>Emirate</Form.Label>
                    <Form.Select
                      value={emirate}
                      onChange={(e) => setEmirate(e.target.value)}
                      required={true}
                    >
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
                  <Button
                    variant="primary"
                    type="submit"
                    className="rounded-pill deliveryInfoSavebtn pt-1 "
                  >
                    Add Address
                  </Button>
                </Form>
              ) : (
                <Form className="addressSelector">
                  {userAddress &&
                    loadingAddress === false &&
                    userAddress.map((address) => {
                      return (
                        <Row key={address.id} className="addressSelectorRow">
                          <Col xs={2} sm={2} md={2} lg={1} xl={1}>
                            {checkoutDeliveryInfo.address &&
                            checkoutDeliveryInfo.address.id === address.id ? (
                              <Form.Check
                                name="address"
                                type={"radio"}
                                id={address.id}
                                checked
                                onChange={(e) => {
                                  selectAddressHandler(address);
                                }}
                              />
                            ) : (
                              <Form.Check
                                name="address"
                                type={"radio"}
                                id={address.id}
                                checked={false}
                                onChange={(e) => {
                                  selectAddressHandler(address);
                                }}
                              />
                            )}
                          </Col>
                          <Col xs={6} sm={6} md={6} lg={6} xl={6}>
                            <p>
                              {address.attributes.flat_number}, {address.attributes.building_name}{" "}
                            </p>
                            <p>
                              {address.attributes.area}, {address.attributes.emirate}
                            </p>
                          </Col>
                        </Row>
                      );
                    })}
                  <Row className="py-4">
                    <Col className="text-start">
                      <Button
                        className="plankCheckoutBacktoCart p-0 m-0"
                        style={{ fontSize: "1rem" }}
                        onClick={() => {
                          setAddnew(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faPlus} className="pe-2" />
                        Add New Address
                      </Button>
                    </Col>
                  </Row>
                </Form>
              )}

              <Form>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    defaultChecked
                    label="Use this address for my billing address"
                    value={sameBilling}
                    onChange={(e) => {
                      sameBillingHandler(e);
                    }}
                  />
                </Form.Group>
              </Form>
              <Row>
                <Col>
                  <hr className="deliveryInfoHr" />
                </Col>
              </Row>
              <Row>
                <Col className="schedulingDelivery">
                  <h6>Scheduling your delivery:</h6>
                </Col>
                <Row className="py-3">
                  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                    <FontAwesomeIcon icon={faCalendar} fontSize="2rem" />
                  </Col>
                  <Col
                    xs={8}
                    sm={8}
                    md={8}
                    lg={8}
                    xl={8}
                    style={{ fontFamily: "Poppins", fontSize: "small", fontWeight: "500" }}
                  >
                    Once you place your order and sign your lease, you pick your delivery date.
                  </Col>
                </Row>
                <Row className="py-3">
                  <Col xs={1} sm={1} md={1} lg={1} xl={1}>
                    <FontAwesomeIcon icon={faAward} fontSize="2rem" />
                  </Col>
                  <Col
                    xs={8}
                    sm={8}
                    md={8}
                    lg={8}
                    xl={8}
                    style={{ fontFamily: "Poppins", fontSize: "small", fontWeight: "500" }}
                    className="my-auto"
                  >
                    We deliver in as little as 7 days!
                  </Col>
                </Row>
              </Row>

              <Row>
                <Col>
                  <hr className="deliveryInfoHr" />
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="plankcovidquote">
                    Plank’s standard in-home delivery and assembly is available for all orders!
                    We’re also offering a no-contact option in response to COVID-19{" "}
                    <a href="#">Learn more</a>.
                  </p>
                </Col>
              </Row>

              <Row>
                <Col className="d-flex justify-content-center">
                  {sameBilling ? (
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        submitHandler(e);
                      }}
                      className="rounded-pill deliveryInfoSavebtn pt-1 pb-1 "
                    >
                      Continue to Payment Info
                    </Button>
                  ) : (
                    <Button
                      variant="primary"
                      onClick={(e) => {
                        submitHandler(e);
                      }}
                      className="rounded-pill deliveryInfoSavebtn pt-1 pb-1 "
                    >
                      Continue to Billing Info
                    </Button>
                  )}
                </Col>
              </Row>
              <Row className="py-4">
                <Col className="text-center plankCheckoutBacktoCart">
                  <Link to="/checkout">
                    <Button className="plankCheckoutBacktoCart p-0 m-0">
                      Return to Customer Info
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col className="d-flex justify-content-center">
              <hr className="deliveryInfoHr2" />
            </Col>
          </Row>
          <Row className="customerInfoStepContainerRow">
            {userInfo.user && (
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
          </Row>
        </Container>
      )}
    </>
  );
};

export default DeliveryInfo;
