import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container, Image, Card, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import "./homepage.css";
const HomePagev2 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subemail, setSubEmail] = useState();

  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  const startBrowsingHandler = () => {
    navigate("/products");
  };

  // console.log("products", products);
  return (
    <>
      <Row>
        <Col>
          <Header />
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
        <Container fluid className="plankHomePageMainContainer">
          <Container className="makeYourHomeContainer h-100" fluid>
            <Row className="h-100">
              <Col className="plankMakeYourHomeCol1" xs={12} s={12} md={6} lg={6} xl={6}>
                <Row>
                  <Col>
                    <p className="plank-makeYourHomelabel">Make your house into a home.</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="plank-makeyourHomebrief">
                      Free delivery and assembly with flexibility to rent your furniture!
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      onClick={startBrowsingHandler}
                      className=" start-browsing-btn rounded-pill mt-2"
                    >
                      Start Browsing
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col className="plankMakeYourHomeCol2" xs={12} s={12} md={6} lg={6} xl={6}>
                <img
                  src="/Images/spacejoy-RqO6kwm4tZY-unsplash.jpg"
                  className="img-responsive plankMakeYourHomeImg"
                  alt="spacejoy-RqO6kwm4tZY-unsplash.jpg"
                />
              </Col>
              <Col className="toggle-display" xs={12} s={12} md={6} lg={6} xl={6}>
                <Row>
                  <Col>
                    <p className="plank-makeYourHomelabel">Make your house into a home.</p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="plank-makeyourHomebrief">
                      Free delivery and assembly with flexibility to rent your furniture!
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Button
                      onClick={startBrowsingHandler}
                      className=" start-browsing-btn rounded-pill mt-2"
                    >
                      Start Browsing
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Container>
          <Container
            fluid
            className="pb-0 plankShopByCategoryContainer"
            style={{ background: "#ecf0f5 0% 0% no-repeat padding-box", opacity: "1" }}
          >
            <Row className="pt-2 ps-5">
              <Col className="text-start pb-3 ">
                <h3 className="plankHomeShopByCategoryLabel text-capitalize">Shop by Room </h3>
              </Col>
            </Row>
            <Container fluid className="px-5 plankShopByCategoryContainer2">
              <Row className=" plankHomeShopByCategoryRow d-flex justify-content-center">
                <Col className="plankHomeShopByCategoryCol" xs={6} sm={6} md={4} lg={3} xl={3}>
                  <Card className="cardInplankHomeShopByCategory">
                    <Link to={"/products/living%20room"} style={{ textDecoration: "none" }}>
                      <Card.Img
                        variant="top"
                        src="/Images/spacejoy-ctyssSFmXmU-unsplash.jpg"
                        className="cardImage"
                      />
                      <Card.Body className="px-0 cardBodyInplankHomeShopByCategory">
                        <Card.Title className="text-capitalize cardTitle">Living Room</Card.Title>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
                <Col className="plankHomeShopByCategoryCol" xs={6} sm={6} md={4} lg={3} xl={3}>
                  <Card className="cardInplankHomeShopByCategory">
                    <Link to={"/products/bedroom"} style={{ textDecoration: "none" }}>
                      <Card.Img
                        variant="top"
                        src="/Images/spacejoy-IARlbQa6Kc8-unsplash.jpg"
                        className="cardImage"
                      />
                      <Card.Body className="px-0 cardBodyInplankHomeShopByCategory">
                        <Card.Title className="text-capitalize cardTitle">Bed Room</Card.Title>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
                <Col className="plankHomeShopByCategoryCol" xs={6} sm={6} md={4} lg={3} xl={3}>
                  <Card className="cardInplankHomeShopByCategory">
                    <Link to={"/products/dining%20room"} style={{ textDecoration: "none" }}>
                      <Card.Img
                        variant="top"
                        src="/Images/spacejoy-io5Tvjh7vCc-unsplash.jpg"
                        className="cardImage"
                      />
                      <Card.Body className="px-0 cardBodyInplankHomeShopByCategory">
                        <Card.Title className="text-capitalize cardTitle">Dining Room</Card.Title>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
                <Col className="plankHomeShopByCategoryCol" xs={6} sm={6} md={4} lg={3} xl={3}>
                  <Card className="cardInplankHomeShopByCategory">
                    <Link to={"/products/accessories"} style={{ textDecoration: "none" }}>
                      <Card.Img
                        variant="top"
                        src="/Images/spacejoy-7fX2YfJIrOQ-unsplash.jpg"
                        className="cardImage"
                      />
                      <Card.Body className="px-0 cardBodyInplankHomeShopByCategory">
                        <Card.Title className="text-capitalize cardTitle">Accessories</Card.Title>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Container>
          <Container className=" whyplankit text-center px-5" fluid>
            <Row>
              <Col className="content">
                <p>Why would you Plank it ?</p>
              </Col>
            </Row>
            <Row className="d-flex justify-content-between px-3">
              <Col>
                <Card className="cardInWhyPlank">
                  <div className="whyPlankIconContainer">
                    <Card.Img variant="top" src="/icon2.png" className="whyPlankIcon" />
                  </div>
                  <Card.Body>
                    <Card.Title className="featureText">Free Delivery</Card.Title>
                    <Card.Text className="featureDesc">
                      {" "}
                      &nbsp; All purchases are eligible for free shipping via our delivery partners.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="cardInWhyPlank">
                  <div className="whyPlankIconContainer">
                    <Card.Img variant="top" src="/icon1.png" className="whyPlankIcon" />
                  </div>
                  <Card.Body>
                    <Card.Title className="featureText">Easy Payments</Card.Title>
                    <Card.Text className="featureDesc">
                      All payments are processed instantly over a secure payment protocol.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="cardInWhyPlank">
                  <div className="whyPlankIconContainer">
                    <Card.Img variant="top" src="/icon4.png" className="whyPlankIcon" />
                  </div>
                  <Card.Body>
                    <Card.Title className="featureText">Money-Back Guarantee</Card.Title>
                    <Card.Text className="featureDesc">
                      If an item arrived damaged or you've changed your mind, you can send it back
                      for a full refund.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="cardInWhyPlank">
                  <div className="whyPlankIconContainer">
                    <Card.Img variant="top" src="/icon3.png" className="whyPlankIcon" />
                  </div>
                  <Card.Body>
                    <Card.Title className="featureText">Finest Quality</Card.Title>
                    <Card.Text className="featureDesc">
                      Designed to last, each of our products has been chosen from the finest
                      materials.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <Container className="plankDontPayUpFrontContainer" fluid>
            <Row className="plankDontPayUpFrontContainerRow h-100">
              <Col xs={12} s={12} md={6} lg={6} xl={6}>
                <img
                  src="/Images/spacejoy-RqO6kwm4tZY-unsplash.jpg"
                  className="plankDontPayUpFrontContainerRowImg img-responsive"
                  alt="spacejoy-RqO6kwm4tZY-unsplash.jpg"
                />
              </Col>
              <Col
                className="plankDontPayUpFrontContainerRowCol2 text-left"
                xs={12}
                s={12}
                md={6}
                lg={6}
                xl={6}
              >
                <Container className=" ms-5">
                  <Row>
                    <Col>
                      <p className="heading text-wrap" style={{ width: "70%" }}>
                        Don't pay upfront for your furniture!
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="brief">
                        Rent your furniture for a tiny amount <br />
                        per month with flexible pricing from Dhs100/month.
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-2 startbrowsing">
                      <p className="mb-0" onClick={startBrowsingHandler}>
                        START BROWSING
                      </p>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
          <Container
            fluid
            className="pb-0 plankShopByPopularContainer"
            style={{ background: "#ffffff 0% 0% no-repeat padding-box", opacity: "1" }}
          >
            <Row className="pt-2 ps-5">
              <Col className="text-start pb-3 ">
                <h3 className="plankHomeShopByPopularLabel text-capitalize">
                  Shop by most popular{" "}
                </h3>
              </Col>
            </Row>
            <Container fluid className="px-5">
              <Row className="pb-5 plankHomeShopByPopularRow d-flex justify-content-center">
                <Col className="plankHomeShopByPopularCol pe-2" xs={6} sm={6} md={4} lg={3} xl={3}>
                  <Card className="cardInplankHomeShopByPopular">
                    <Link to={"/products/living%20room"} style={{ textDecoration: "none" }}>
                      <Card.Img
                        variant="top"
                        src="/Images/ogdenbookcase.jpg"
                        className="cardImage"
                      />
                      <Card.Body className="px-0 cardBodyInplankHomeShopByPopular">
                        <Card.Title className="text-capitalize cardTitle">
                          Ogden Bookcase
                        </Card.Title>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
                <Col className="plankHomeShopByPopularCol pe-2" xs={6} sm={6} md={4} lg={3} xl={3}>
                  <Card className="cardInplankHomeShopByPopular">
                    <Link to={"/products/bed%20room"} style={{ textDecoration: "none" }}>
                      <Card.Img
                        variant="top"
                        src="/Images/nicobartablelamp.jpg"
                        className="cardImage"
                      />
                      <Card.Body className="px-0 cardBodyInplankHomeShopByPopular">
                        <Card.Title className="text-capitalize cardTitle">
                          Nicobar Table Lamp
                        </Card.Title>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
                <Col className="plankHomeShopByPopularCol pe-2" xs={6} sm={6} md={4} lg={3} xl={3}>
                  <Card className="cardInplankHomeShopByPopular">
                    <Link to={"/products/dining%20room"} style={{ textDecoration: "none" }}>
                      <Card.Img
                        variant="top"
                        src="/Images/bowerfloorlamb.jpg"
                        className="cardImage"
                      />
                      <Card.Body className="px-0 cardBodyInplankHomeShopByPopular">
                        <Card.Title className="text-capitalize cardTitle">
                          Bower Floor Lamp
                        </Card.Title>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
                <Col className="plankHomeShopByPopularCol pe-2" xs={6} sm={6} md={4} lg={3} xl={3}>
                  <Card className="cardInplankHomeShopByPopular">
                    <Link to={"/products/office"} style={{ textDecoration: "none" }}>
                      <Card.Img
                        variant="top"
                        src="/Images/barrowconsole.jpg"
                        className="cardImage"
                      />
                      <Card.Body className="px-0 cardBodyInplankHomeShopByPopular">
                        <Card.Title className="text-capitalize cardTitle">
                          Barrow Console
                        </Card.Title>
                      </Card.Body>
                    </Link>
                  </Card>
                </Col>
              </Row>
              <Row className="pt-5 ">
                <Col className="d-flex justify-content-center pt-5">
                  <h3 className="shopLink">Shop All most popular</h3>
                </Col>
              </Row>
            </Container>
          </Container>
          <Container className="plankhowItWorksContainer mt-2 mb-2 " fluid>
            <Row className="plankhowItWorksRow ">
              <Col className="plankHowItWorksCol1" xs={12} s={12} md={6} lg={6} xl={6}>
                <Row>
                  <Col>
                    <p className="plank-HowItWorkslabel">
                      Never, ever <br /> assemble furniture again.
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className="plank-HowItWorksbrief ">
                      We move a lot. There are countless floor plans and roommates (oh, and your
                      evolving tastes) between here and there. With Plank, furnish your space
                      without breaking a sweat or reaching for a screwdriver.
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <p className=" plankHowItWorksLink text-uppercase">How it works </p>
                  </Col>
                </Row>
              </Col>
              <Col xs={12} s={12} md={6} lg={6} xl={6}>
                <img
                  src="/Images/pexels-blue-bird-7217789_copy.jpg"
                  className="plankHowItWorksImg img-responsive"
                  alt="pexels-blue-bird-7217789_copy.jpg"
                />
              </Col>
            </Row>
          </Container>
          <Container fluid className="newsletter">
            <Row className="p-5 ">
              <Col xs={12} s={12} md={6} lg={6} xl={6}>
                <p className="OfferLine fs-1  float-end">
                  Get 10% off your first month when <br />
                  you decide to Plank your furniture!
                </p>
              </Col>
              <Col xs={12} s={12} md={6} lg={6} xl={6}>
                <Form>
                  <Row>
                    <Col className="pe-3 " lg={5}>
                      <Form.Group controlId="email">
                        <Form.Control
                          className="rounded-pill control-styling"
                          type="email"
                          placeholder="Enter your email"
                          value={subemail}
                          onChange={(e) => setSubEmail(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col lg={7}>
                      <Button type="submit" className=" subscribe-btn rounded-pill mb-2">
                        Subscribe
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
          <Row>
            <Col>
              {window.location.pathname !== "/login" &&
                window.location.pathname !== "/register" && <Footer />}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default HomePagev2;
