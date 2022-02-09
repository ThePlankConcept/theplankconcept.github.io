import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { register } from "../actions/userActions";
import "./RegisterScreen.css";
import { useLocation, useNavigate } from "react-router-dom";

// import signupImage from  "../assets/signup.jpg"
const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fName, setFirstName] = useState("");
  const [lName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const routeChange = () => {
    let path = `/login`;
    navigate(path);
  };
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split("=")[1] : "/";
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, navigate, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    // Dispatch register method
    dispatch(register(fName, lName, email, password));
  };

  return (
    <Container fluid="true">
      <Row>
        <Col>
          <img src="/signup.jpg" height="100%" width="110%"></img>
        </Col>
        <Col>
          <Container fluid="true" className="mt-2 mb-2">
            <Row>
              <Col className=" d-flex justify-content-center">
                <p className="create-account-text">Create Account</p>
              </Col>
            </Row>
            <Row>
              <Col className="   adding-margins    ">
                {message && <Message variant="danger">{message}</Message>}
                {error && <Message variant="danger">{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                  <Form.Group className=" ">
                    <Form.Control
                      className=" rounded-pill mb-3 pt-2 pb-2  control-styling"
                      type="name"
                      placeholder="First Name"
                      value={fName}
                      onChange={(e) => setFirstName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group controlId="last Name">
                    <Form.Control
                      className="rounded-pill  pt-2 pb-2   mb-3 control-styling "
                      type="name"
                      placeholder="Last Name"
                      value={lName}
                      onChange={(e) => setLastName(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
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

                  <div className="d-grid gap-2">
                    <Button type="submit" size="md" className=" create-account-btn rounded-pill mt-2">
                      CREATE ACCOUNT
                    </Button>
                  </div>
                </Form>
              </Col>
            </Row>
            <Row>
              <Col>
                <hr className="hr-margin"></hr>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <p>Already Have Account ?</p>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <Button onClick={routeChange} className="rounded-pill login-btn pt-1 pb-1 ">
                  LOGIN
                </Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
    // <Container>
    //   <h1>Sign Up</h1>
    //   {message && <Message variant="danger">{message}</Message>}
    //   {error && <Message variant="danger">{error}</Message>}
    //   {loading && <Loader />}
    //   <Form onSubmit={submitHandler}>
    //     <Form.Group >
    //       <Form.Label>First Name</Form.Label>
    //       <Form.Control type="name" placeholder="Enter name" value={fName} onChange={(e) => setFirstName(e.target.value)}></Form.Control>
    //     </Form.Group>
    //     <Form.Group controlId="last Name">
    //       <Form.Label>Last Name</Form.Label>
    //       <Form.Control type="name" placeholder="Enter name" value={lName} onChange={(e) => setLastName(e.target.value)}></Form.Control>
    //     </Form.Group>
    //     <Form.Group controlId="email">
    //       <Form.Label>Email address</Form.Label>
    //       <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}></Form.Control>
    //     </Form.Group>
    //     <Form.Group controlId="password">
    //       <Form.Label>Password</Form.Label>
    //       <Form.Control type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)}></Form.Control>
    //     </Form.Group>
    //     <Form.Group controlId="confirmpassword">
    //       <Form.Label>Confirm Password</Form.Label>
    //       <Form.Control
    //         type="password"
    //         placeholder="Confirm password"
    //         value={confirmPassword}
    //         onChange={(e) => setConfirmPassword(e.target.value)}
    //       ></Form.Control>
    //     </Form.Group>
    //     <Button type="submit" variant="primary" className="mt-2">
    //       Register
    //     </Button>
    //   </Form>
    //   <Row className="py-3">
    //     <Col>
    //       Have an account ?<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>Login</Link>
    //     </Col>
    //   </Row>
    // </Container>
  );
};

export default RegisterScreen;
