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
              <Col className="firstrowfirstcol">
                <Container className=" ms-5 me-0" fluid>
                  <Row>
                    <Col>
                      <p className="heading">Make your house into a home</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="brief">Free delivery and assembly with flexibility to rent your furniture</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="d-flex justify-content-start">
                      <div className="d-grid gap-2">
                        <Button onClick={startBrowsingHandler} className=" start-browsing-btn rounded-pill mt-2">
                          Start Browsing
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col>
                <img src="/Images/spacejoy-RqO6kwm4tZY-unsplash.jpg" className="firstColImg img-responsive" alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />
              </Col>
            </Row>
          </Container>
          <Container className="categoryRow " fluid>
            <Row className=" pt-0 mb-5 ">
              <p className="categoryHeader">Shop by room</p>
              <Col className="d-flex categorycardcol">
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
          <Container className=" whyplankit text-center">
            <Row>
              <Col className="content">
                <p>Why would you Plank it ?</p>
              </Col>
            </Row>
            <Row className="d-flex justify-content-between">
              <Col>
                <Card className="cardInWhyPlank">
                  <div className="whyPlankIconContainer">
                    <Card.Img variant="top" src="/noun_payment_2281176.png" className="whyPlankIcon" />
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
                    <Card.Img variant="top" src="/noun_payment_2281176.png" className="whyPlankIcon" />
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
                    <Card.Img variant="top" src="/noun_guarantee_2519048.png" className="whyPlankIcon" />
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
                    <Card.Img variant="top" src="/noun_materials_308312.png" className="whyPlankIcon" />
                  </div>
                  <Card.Body>
                    <Card.Title className="featureText">Finest Quality</Card.Title>
                    <Card.Text className="featureDesc">Designed to last, each of our products has been chosen from the finest materials.</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <Container fluid>
            <Row className="h-100">
              <Col fluid>
                <Image src="/Images/spacejoy-io5Tvjh7vCc-unsplash_copy.jpg" className="img-responsive firstColImg" width="100%" height="100%" />
              </Col>
              <Col className="firstrowfirstcol">
                <Container className=" ms-5">
                  <Row>
                    <Col>
                      <p className="heading">Don't pay upfront for your furniture</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <p className="brief">Rent your furniture for a tiny amount per month with flexible pricing from Dhs100/month.</p>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mt-2 startbrowsing">
                      <p className="mb-0" onClick={startBrowsingHandler}>
                        START BROWSING
                      </p>
                      <hr className="hrstyling" />
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
          <Container className="popularRow" fluid>
            <Row className=" pt-0 mb-5 ">
              <p className="categoryHeader">Shop most popular</p>
              <Col className="d-flex categorycardcol">
                <Card className=" cardItemHome">
                  <Card.Img variant="top" src="/Images/ogdenbookcase.jpg" />
                  <Card.Body>
                    <Card.Title className="text-capitalize">Ogden Bookcase</Card.Title>
                  </Card.Body>
                </Card>
                <Card className="cardItemHome">
                  <Card.Img variant="top" src="/Images/nicobartablelamp.jpg" />
                  <Card.Body>
                    <Card.Title className="text-capitalize">Nicobar Table Lamp</Card.Title>
                  </Card.Body>
                </Card>
                <Card className=" cardItemHome">
                  <Card.Img variant="top" src="/Images/bowerfloorlamb.jpg" />
                  <Card.Body>
                    <Card.Title className="text-capitalize">Bower Floor Lamp</Card.Title>
                  </Card.Body>
                </Card>
                <Card className=" cardItemHome">
                  <Card.Img variant="top" src="/Images/barrowconsole.jpg" />
                  <Card.Body>
                    <Card.Title className="text-capitalize">Barrow Console</Card.Title>
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
                    <p className="brief">
                      &nbsp; We move a lot. There are countless floor plans and roommates (oh, and your evolving tastes) between here and there. With
                      Plank, furnish your space without breaking a sweat or reaching for a screwdriver.
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
          <Container fluid>
            <Row className="p-5">
              <Col>
                <p className="OfferLine">Get 10% off your first month when you decide to Plank your furniture!</p>
              </Col>
              <Col>
                <Form>
                  <Row>
                    <Col lg={8} md={8} className="pe-3">
                      <Form.Group controlId="email">
                        <Form.Control
                          className="rounded-pill control-styling"
                          type="email"
                          placeholder="Email"
                          value={subemail}
                          onChange={(e) => setSubEmail(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col lg={4} md={4}>
                      <Button type="submit" size="md" className=" subscribe-btn rounded-pill mb-2">
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

// const HomePage = () => {
//   const dispatch = useDispatch();
//   const { keyword } = useParams();
//   const productList = useSelector((state) => state.productList);

//   const { loading, error, products } = productList;

//   useEffect(() => {
//     dispatch(listProducts(keyword));
//   }, [dispatch, keyword]);

//   // console.log("products", products);
//   return (
//     <>
//       <h1>Grab Your furniture</h1>
// {loading ? (
//   <Loader />
// ) : error ? (
//   <Message variant="danger">{error}</Message>
// ) : (
//         <Row>
//           {products.map((product) => {
//             return (
//               <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
//                 <Product product={product} />
//               </Col>
//             );
//           })}
//         </Row>
//       )}
//     </>
//   );
// };

// export default HomePage;
