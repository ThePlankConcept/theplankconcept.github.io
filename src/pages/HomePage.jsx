import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container, Image, Card, Button, Form } from "react-bootstrap";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import "./homepage.css";
const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [subemail, setSubEmail] = useState();
  const { keyword } = useParams();
  const productList = useSelector((state) => state.productList);

  const { loading, error, products } = productList;

  const startBrowsingHandler = () => {
    navigate("/products");
  };
  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  // console.log("products", products);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Container className="firstContainer" fluid>
            <Row className="firstRow h-100">
              <Col className="firstrowfirstcol text-left" lg={6} md={6} sm={12}>
                <p className="heading display-1 font-weight-bold ">Make your house into a home.</p>
                <p className="brief text-wrap" style={{ width: "80%" }}>
                  Free delivery and assembly with flexibility to rent your furniture!
                </p>
                <Button onClick={startBrowsingHandler} className=" start-browsing-btn rounded-pill mt-2">
                  Start Browsing
                </Button>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <img src="/Images/spacejoy-RqO6kwm4tZY-unsplash.jpg" className="firstColImg img-responsive" alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />
              </Col>
            </Row>
          </Container>
          <Container className="categoryRow" fluid>
            <Row className="h-100">
              <p className="categoryHeader ">Shop by room</p>
              <Col className="categorycardcol">
                <Card className=" cardItemHome">
                  <Card.Img variant="top" src="/Images/spacejoy-ctyssSFmXmU-unsplash.jpg" />
                  <Card.Body>
                    <Card.Title className="text-capitalize">Living Room</Card.Title>
                  </Card.Body>
                </Card>
                <Card className="cardItemHome">
                  <Card.Img variant="top" src="/Images/spacejoy-IARlbQa6Kc8-unsplash.jpg" />
                  <Card.Body>
                    <Card.Title className="text-capitalize">Bed Room</Card.Title>
                  </Card.Body>
                </Card>
                <Card className=" cardItemHome">
                  <Card.Img variant="top" src="/Images/spacejoy-io5Tvjh7vCc-unsplash.jpg" />
                  <Card.Body>
                    <Card.Title className="text-capitalize">Dining</Card.Title>
                  </Card.Body>
                </Card>
                <Card className=" cardItemHome">
                  <Card.Img variant="top" src="/Images/spacejoy-7fX2YfJIrOQ-unsplash.jpg" />
                  <Card.Body>
                    <Card.Title className="text-capitalize">Accessories</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <Container className=" whyplankit text-center" fluid>
            <Row>
              <Col className="content">
                <p>Why would you Plank it ?</p>
              </Col>
            </Row>
            <Row className="d-flex justify-content-between row2plankit">
              <Col>
                <Card className="cardInWhyPlank">
                  <div className="whyPlankIconContainer">
                    <Card.Img variant="top" src="/icon2.png" className="whyPlankIcon" />
                  </div>
                  <Card.Body>
                    <Card.Title className="featureText">Free Delivery</Card.Title>
                    <Card.Text className="featureDesc"> &nbsp; All purchases are eligible for free shipping via our delivery partners.</Card.Text>
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
                    <Card.Text className="featureDesc">All payments are processed instantly over a secure payment protocol.</Card.Text>
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
                      If an item arrived damaged or you've changed your mind, you can send it back for a full refund.
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
                    <Card.Text className="featureDesc">Designed to last, each of our products has been chosen from the finest materials.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <Container className="middleContainer" sm={6} fluid>
            <Row className="firstRow h-100">
              <Col lg={6} md={6} sm={6}>
                <img src="/Images/spacejoy-RqO6kwm4tZY-unsplash.jpg" className="firstColImg img-responsive" alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />
              </Col>
              <Col className="middleContainerSecondcol text-left" lg={6} md={6} sm={6}>
                <Container className=" ms-5">
                  <Row>
                    <Col>
                      <p className="heading text-wrap" style={{ width: "60%" }}>
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

          <Container className="popularRow" fluid>
            <Row className="h-100">
              <p className="categoryHeader ">Shop most popular</p>
              <Col className="categorycardcol">
                <Card className=" cardItemHome">
                  <Card.Img variant="top" src="/Images/ogdenbookcase.jpg" />
                  <Card.Body>
                    <Card.Title className="text-capitalize">Ogden Bookcase</Card.Title>
                  </Card.Body>
                </Card>
                <Card className="cardItemHome">
                  <Card.Img variant="top" src="/Images/spacejoy-IARlbQa6Kc8-unsplash.jpg" />
                  <Card.Body>
                    <Card.Title className="text-capitalize">Bed Room</Card.Title>
                  </Card.Body>
                </Card>
                <Card className=" cardItemHome">
                  <Card.Img variant="top" src="/Images/spacejoy-io5Tvjh7vCc-unsplash.jpg" />
                  <Card.Body>
                    <Card.Title className="text-capitalize">Dining</Card.Title>
                  </Card.Body>
                </Card>
                <Card className=" cardItemHome">
                  <Card.Img variant="top" src="/Images/spacejoy-7fX2YfJIrOQ-unsplash.jpg" />
                  <Card.Body>
                    <Card.Title className="text-capitalize">Accessories</Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <h3 className="shopLink">Shop All most popular</h3>
              </Col>
            </Row>
          </Container>
          <Container className="lastContainer mt-5 mb-5 " fluid>
            <Row className="lastContainerRow ">
              <Col className="lastrowfirstcol" lg={6}>
                <Row>
                  <Col>
                    <p className="heading">
                      Never, ever <br /> assemble furniture again.
                    </p>
                    <p className="brief ">
                      We move a lot. There are countless floor plans and roommates (oh, and your evolving tastes) between here and there. With Plank,
                      furnish your space without breaking a sweat or reaching for a screwdriver.
                    </p>
                    <p className=" linkhow text-uppercase">How it works </p>
                  </Col>
                </Row>
              </Col>
              <Col lg={6}>
                <img src="/Images/pexels-blue-bird-7217789_copy.jpg" className="firstColImg img-responsive" alt="pexels-blue-bird-7217789_copy.jpg" />
              </Col>
            </Row>
          </Container>
          <Container fluid className="newsletter">
            <Row className="p-5 ">
              <Col md={3} lg={6}>
                <p className="OfferLine fs-1  float-end">Get 10% off your first month when you decide to Plank your furniture!</p>
              </Col>
              <Col md={3} lg={6}>
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
        </>
      )}
    </>
  );
};

export default HomePage;
