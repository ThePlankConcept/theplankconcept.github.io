import React from "react";
import { Link, useParams, useNavigate, useLocation, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Button,
  Form,
  Carousel,
  Accordion,
  Container,
} from "react-bootstrap";
// import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import { logout, updateUser } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./personalDetails.css";
import Footer from "../components/Footer";
import Header from "../components/Header";
import EditUser from "../components/EditUser";
import OrderHistory from "../components/OrderHistory";
import EditBilling from "../components/EditBilling";

const PersonalDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [selected, setSelected] = useState("account-details");
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [mobileNumber, setMobileNumber] = useState();
  const [newPassword, setNewPassword] = useState();
  const [currentPassword, setCurrentPassword] = useState();
  const userLogin = useSelector((state) => state.userLogin);
  const pid = location.pathname.split("/").pop();
  const { loading, error, userInfo } = userLogin;
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
    console.log(data);
    dispatch(updateUser(userInfo.jwt, data, userInfo.user.id));
  };
  const signouthandler = () => {
    dispatch(logout());
    navigate("/");
  };
  return (
    <>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Container fluid>
        <Row className=" margin-top">
          <Col lg={5} className="px-5">
            <Container fluid>
              <Row>
                <Col className="d-flex justify-content-center   ">
                  <span className=" circle-border d-flex justify-content-center ">
                    {userInfo.user.first_name[0]}
                    {userInfo.user.last_name[0]}
                  </span>
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center mt-3 ">
                  {userInfo.user.first_name} {userInfo.user.last_name}
                </Col>
              </Row>
              <Row>
                <Col className="px-5 mt-4">
                  <hr />
                </Col>
              </Row>
              <Row>
                <Col
                  id="account details"
                  className={
                    selected == "account-details"
                      ? "px-3 pt-4 decoration-selected"
                      : "px-3 pt-4 decoration"
                  }
                >
                  <p
                    onClick={() => {
                      navigate("/user/edit");
                      setSelected("account-details");
                    }}
                  >
                    Account Details
                  </p>
                </Col>
              </Row>
              <Row>
                <Col
                  className={
                    selected == "order-history" ? "px-3 decoration-selected" : "px-3 decoration"
                  }
                >
                  <p
                    id="order history"
                    onClick={(e) => {
                      navigate("/user/order-history");
                      setSelected("order-history");
                    }}
                  >
                    Order/Payment History
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="px-3 decoration">
                  <p>Payment Timeline</p>
                </Col>
              </Row>
              <Row>
                <Col
                  className={
                    selected == "edit-billing" ? "px-3 decoration-selected" : "px-3 decoration"
                  }
                >
                  <p
                    id="edit billing"
                    onClick={(e) => {
                      navigate("/user/edit-billing");
                      setSelected("edit-billing");
                    }}
                  >
                    Edit Billing
                  </p>
                </Col>
              </Row>
              <Row>
                <Col className="px-3 decoration">
                  <p onClick={() => signouthandler()}>Sign Out</p>
                </Col>
              </Row>
            </Container>
          </Col>

          <Col>
            {/* <Col xs={12} sm={12} md={6} lg={7} xl={7}> */}
            {pid === "edit" ? (
              <EditUser />
            ) : pid === "order-history" ? (
              <OrderHistory />
            ) : pid === "edit-billing" ? (
              <EditBilling />
            ) : (
              <>hi</>
            )}
          </Col>
          {/* </Col> */}
        </Row>
        <Row className="mt-5">
          <Col>
            <Footer />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PersonalDetails;
