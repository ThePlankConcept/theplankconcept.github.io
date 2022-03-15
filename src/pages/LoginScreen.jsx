import React, { useState, useEffect } from "react";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { login } from "../actions/userActions";
import "./LoginScreen.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";
import useWindowDimensions from "./../hooks/ScreenSizeHook";
import Header from "../components/Header";
const LoginScreen = () => {
  const { height, width } = useWindowDimensions();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const [message, setMessage] = useState(null);
  const { loading, error, userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      console.log("Home screen", userInfo);
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const routeChange = () => {
    let path = `/register`;
    navigate(path);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Container fluid="true">
        <Row>
          <Col sm="12" lg="6" className={width > 360 ? " " : "hide"}>
            <img src="/Images/signin.jpg" height="150%" width="100%" className="the-login"></img>
          </Col>
          <Col sm="12" lg="6">
            <Container fluid="true" className="m-5 pt-5 pb-5">
              <Row className="   adding-margins    ">
                <Col className=" d-flex justify-content-center">
                  <p className="create-account-text ">Log In </p>
                </Col>
              </Row>
              <Row className="   adding-margins    ">
                <Col>
                  <Container>
                    <Row>
                      <Col>
                        {message && <Message variant="danger">{message}</Message>}
                        {error && <Message variant="danger">{error}</Message>}
                        {loading && <Loader />}
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Container fluid>
                          <Row className="mb-3">
                            <Col
                              className={
                                width > 1309
                                  ? " d-flex justify-content-end "
                                  : " d-flex justify-content-end"
                              }
                            >
                              <Button
                                className="rounded-pill  btn btn-sm google-btn"
                                onClick={() =>
                                  (window.location = "http://localhost:1337/api/connect/google")
                                }
                              >
                                <FontAwesomeIcon
                                  icon={faGoogle}
                                  fontSize="medium"
                                  className="pe-2"
                                />{" "}
                                sign up via Google
                              </Button>
                            </Col>
                            <Col
                              className={
                                width > 1309
                                  ? " d-flex justify-content-start"
                                  : " d-flex justify-content-start"
                              }
                            >
                              <Button
                                className="rounded-pill btn btn-sm facebook-btn"
                                onClick={() =>
                                  (window.location = "http://localhost:1337/api/connect/facebook")
                                }
                              >
                                <span>
                                  {" "}
                                  <FontAwesomeIcon
                                    icon={faFacebookF}
                                    fontSize="medium"
                                    className="pe-2 "
                                  />{" "}
                                  <span className="text-top"> sign up via Facebook</span>
                                </span>
                              </Button>
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form onSubmit={submitHandler} className="plankloginForm">
                          {/* <Form.Group  className=" " >
       
         <Form.Control   className=" rounded-pill mb-3 pt-2 pb-2  control-styling" type="name" placeholder="First Name" value={fName} onChange={(e) => setFirstName(e.target.value)}></Form.Control>
       </Form.Group>
       <Form.Group controlId="last Name">
   
        <Form.Control  className="rounded-pill  pt-2 pb-2   mb-3 control-styling " type="name" placeholder="Last Name" value={lName} onChange={(e) => setLastName(e.target.value)}></Form.Control>
     </Form.Group> */}
                          <Form.Group controlId="email">
                            <Form.Control
                              className="rounded-pill pt-2 pb-2   mb-3 control-styling"
                              type="email"
                              placeholder="Email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          <Form.Group controlId="password">
                            <Form.Control
                              className="rounded-pill  mb-3 pt-2 pb-2 control-styling"
                              type="password"
                              placeholder="Password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                            ></Form.Control>
                          </Form.Group>
                          {/* <Form.Group controlId="confirmpassword">

     <Form.Control className="rounded-pill pt-2 pb-2  control-styling  mb-3 "
       type="password"
        placeholder="Confirm password"
        value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
      ></Form.Control>
      </Form.Group> */}

                          <div className="d-grid gap-2 d-flex justify-content-center">
                            <Button
                              type="submit"
                              size=""
                              className=" login-account-btn rounded-pill mt-2 px-5 "
                            >
                              LOG IN
                            </Button>
                          </div>
                        </Form>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr className="hr-login-margin"></hr>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center already-account-text">
                  <p>No Account Yet ?</p>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center">
                  <Button onClick={routeChange} className="rounded-pill login-btn pt-1 pb-1 ">
                    CREATE ACCOUNT
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>

    // <Container>
    //   <h1>Sign In</h1>
    //   {error && <Message variant="danger">{error}</Message>}
    //   {loading && <Loader />}
    //   <Form onSubmit={submitHandler}>
    //     <Form.Group controlId="email">
    //       <Form.Label>Email address</Form.Label>
    //       <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
    //     </Form.Group>
    //     <Form.Group controlId="password">
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
    //     </Form.Group>
    //     <Button type="submit" variant="primary" className="mt-2">
    //       Sign In
    //     </Button>
    //   </Form>
    //   <Row className="py-3">
    //     <Col>
    //       New Customer?<Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Register</Link>
    //     </Col>
    //   </Row>
    // </Container>
  );
};

export default LoginScreen;
