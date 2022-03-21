import React, { useState, useEffect } from "react";

import { Form, Row, Col, Button, Container, Accordion, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import "./EditUser.css";
import { useLocation, useNavigate } from "react-router-dom";
import { updateUser } from "../actions/userActions";

// import signupImage from  "../assets/signup.jpg"
const EditUser = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [newPassword, setNewPassword] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  //  const userLogin = useSelector((state) => state.userLogin);;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  const submitForm = (e) => {
    e.preventDefault();
    console.log("hii ifrom form");
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: newPassword,
      phone_number: mobileNumber,
    };
    dispatch(updateUser(userInfo.jwt, data, userInfo.user.id));
  };
  useEffect(() => {
    if (userInfo) {
      console.log(userInfo);
      console.log("Home screen", userInfo.user);
      setFirstName(userInfo.user.first_name);
      setLastName(userInfo.user.last_name);
      setEmail(userInfo.user.email);
      setMobileNumber(userInfo.user.phone_number);
    } else {
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h1 className="account-details">Account Details</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form
            className="plankCustomerInfo pe-5"
            onSubmit={(e) => {
              submitForm(e);
            }}
          >
            <Row className="mb-3">
              <Col lg={3}>
                <Form.Group controlId="formGridEmail">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => {
                      setFirstName(e.target.value);
                    }}
                    className="input-styling"
                  />
                </Form.Group>
              </Col>
              <Col lg={4}>
                <Form.Group className="ms-4" controlId="formGridPassword">
                  <Form.Control
                    Label="appliance"
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => {
                      setLastName(e.target.value);
                    }}
                    className="input-styling"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={11}>
                <Form.Group className="mb-3 " controlId="formGridAddress1">
                  <Form.Control
                    placeholder="Email"
                    className="input-styling"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col lg={11}>
                <Form.Group className="mb-3 " controlId="formGridAddress1">
                  <Form.Control
                    placeholder="Mobile Number"
                    className="input-styling"
                    value={mobileNumber}
                    onChange={(e) => {
                      setMobileNumber(e.target.value);
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={11}>
                <Form.Group className="mb-2 small-font mt-4 " controlId="formGridAddress2 ">
                  <Form.Label>
                    If you would like to change your password, please enter a new password.
                    Otherwise, leave this field blank. (New passwords must contain at least one
                    uppercase letter, one lowercase letter, one digit, and one special character
                    #!@$_%^&*-.)
                  </Form.Label>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col lg={11}>
                <Form.Group className="mb-3  " controlId="formGridAddress2 ">
                  <Form.Control
                    placeholder=" New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                    className="input-styling"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col className="mb-2 mt-4 small-font">
                You must enter your current password to confirm any changes made above.
              </Col>
            </Row>
            <Row>
              <Col lg={11}>
                <Form.Group className="mb-3 " controlId="formGridAddress2 ">
                  <Form.Control
                    placeholder=" Current Password"
                    value={currentPassword}
                    type="password"
                    onChange={(e) => {
                      setCurrentPassword(e.target.value);
                    }}
                    className="input-styling"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="" className="btn btn-md rounded-pill update-btn mt-3" type="submit">
              Update
            </Button>
          </Form>
        </Col>
      </Row>
      <Row className="mt-5 pe-5 ">
        <Col lg={11}>
          <Container className="furniture-care-box py-3 " fluid>
            <Row>
              <Col className="furniture-care-header" lg={3}>
                <Image
                  src="/Images/editUser.png"
                  alt="editStar"
                  fluid
                  width="80%"
                  height="80%"
                  className="ps-4"
                ></Image>
              </Col>
              <Col>
                <Container fluid>
                  <Row>
                    <Col className="furniture-care-header">Furniture Care Guide</Col>
                  </Row>
                  <Row>
                    <Col className="furniture-care-text-1">
                      Get out experts'S advice on how to tske care of your furniture
                    </Col>
                  </Row>
                  <Row>
                    <Col className="furniture-care-text-2 ">
                      {" "}
                      <span className="underline-1">View the guide</span>{" "}
                    </Col>
                  </Row>
                  <Row className="">{/* <Col className="line " lg={3}></Col> */}</Row>
                </Container>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col className="faq">Frequently Asked Questions</Col>
      </Row>
      <Row className="mt-5 pe-5 ">
        <Col>
          <Accordion>
            <Accordion.Item eventKey="0" className="accordion-item-2">
              <Accordion.Header className="py-2 accord-header">
                How do I update my payment method that is charged for my subscription?
              </Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1" className="accordion-item">
              <Accordion.Header className="py-2 accord-header ">
                What if I need to cancel my subscription before the original end date?
              </Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="3">
              <Accordion.Header className="py-2 accord-header">
                What happens if I accidentally break or stain an item?
              </Accordion.Header>
              <Accordion.Body>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Col>
      </Row>
    </Container>
  );
};
export default EditUser;
