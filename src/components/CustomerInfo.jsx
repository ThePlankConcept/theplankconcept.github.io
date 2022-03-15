import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./customerInfo.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { updateUser } from "../actions/userActions";

const CustomerInfo = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const {
    loading,
    error,
    userInfo: { user },
  } = userLogin;
  const [first_name, setFirstName] = useState(user.first_name);
  const [last_name, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [phone_number, setPhone] = useState(user.phone_number);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.first_name) {
      navigate("/login");
    }
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(updateUser({ first_name, last_name, email, phone_number }));
    console.log(first_name, last_name, email, phone_number);
    navigate("/checkout/deliveryinfo");
  };
  return (
    <Container className="customerInfoContainer">
      <Row>
        <Col style={{ fontFamily: "Poppins", fontSize: "2.5rem", fontWeight: "500" }}>
          <p>Customer Info</p>
        </Col>
      </Row>
      <Row>
        <Row>
          <Col>
            <Form className="plankCustomerInfo" onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="name"
                  value={first_name}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="name"
                  value={last_name}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="mobileNo">
                <Form.Label>Mobile Number</Form.Label>

                <PhoneInput
                  inputProps={{
                    name: "phone",
                    required: true,
                    autoFocus: true,
                  }}
                  onlyCountries={["ae"]}
                  country="ae"
                  value={phone_number}
                  onChange={(phone_number) => setPhone(phone_number)}
                />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="companyName">
                <Form.Label>Company Name(Optional)</Form.Label>
                <Form.Control
                  type="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </Form.Group> */}
              {/* <Form.Group className="mb-3">
                <Form.Label>How do you intend to use your furniture? (Optional)</Form.Label>
                <Form.Select
                  value={useOfFurniture}
                  onChange={(e) => setUseOfFurniture(e.target.value)}
                  required
                >
                  <option value="0">Please choose an Option</option>
                  <option value="1">Personal/Residential</option>
                  <option value="2">Staging</option>
                  <option value="3">Home Office</option>
                  <option value="4">Other(fill in the blank)</option>
                </Form.Select>
              </Form.Group> */}
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Row>
                <Col className="d-flex justify-content-center">
                  <Button
                    variant="primary"
                    type="submit"
                    className="rounded-pill customerInfoSavebtn pt-1 pb-1 "
                    disabled={phone_number ? false : true}
                  >
                    Continue to Delivery Info
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Row>
      <Row className="py-4">
        <Col className="text-center plankCheckoutBacktoCart">
          <Link to="/cart">
            <Button className="plankCheckoutBacktoCart p-0 m-0">Return to Cart</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default CustomerInfo;
