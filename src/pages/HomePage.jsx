import React from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Container, Image, Card, Button } from "react-bootstrap";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import "./homepage.css";
const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      <Container className="firstContainer" fluid>
        <Row className="firstRow">
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
            <img src="/Images/spacejoy-RqO6kwm4tZY-unsplash.jpg" className="firstColImg img-responsive" />
          </Col>
        </Row>
      </Container>
      <Container className="categoryRow " fluid>
        <Row className=" pt-0 mb-5 ">
          <p className="categoryHeader">Shop by room</p>
          <Col className="d-flex categorycardcol">
            <Card className=" cardItemHome">
              <Card.Img variant="top" src="/Images/spacejoy-RqO6kwm4tZY-unsplash.jpg" />
              <Card.Body>
                <Card.Title className="text-capitalize">Living Room</Card.Title>
              </Card.Body>
            </Card>
            <Card className="cardItemHome">
              <Card.Img variant="top" src="/Images/spacejoy-RqO6kwm4tZY-unsplash.jpg" />
              <Card.Body>
                <Card.Title className="text-capitalize">Bed Room</Card.Title>
              </Card.Body>
            </Card>
            <Card className=" cardItemHome">
              <Card.Img variant="top" src="/Images/spacejoy-RqO6kwm4tZY-unsplash.jpg" />
              <Card.Body>
                <Card.Title className="text-capitalize">Dining</Card.Title>
              </Card.Body>
            </Card>
            <Card className=" cardItemHome">
              <Card.Img variant="top" src="/Images/spacejoy-RqO6kwm4tZY-unsplash.jpg" />
              <Card.Body>
                <Card.Title className="text-capitalize">Accessories</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Container fluid className="firstContainer">
        <Row className="firstRow">
          <Col fluid>
            <Image src="/Images/spacejoy-RqO6kwm4tZY-unsplash.jpg" className="img-responsive firstColImg" width="100%" height="auto" />
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
              <Card.Img variant="top" src="/Images/spacejoy-RqO6kwm4tZY-unsplash.jpg" />
              <Card.Body>
                <Card.Title className="text-capitalize">Ogden Bookcase</Card.Title>
              </Card.Body>
            </Card>
            <Card className="cardItemHome">
              <Card.Img variant="top" src="/Images/spacejoy-RqO6kwm4tZY-unsplash.jpg" />
              <Card.Body>
                <Card.Title className="text-capitalize">Nicobar Table Lamp</Card.Title>
              </Card.Body>
            </Card>
            <Card className=" cardItemHome">
              <Card.Img variant="top" src="/Images/spacejoy-RqO6kwm4tZY-unsplash.jpg" />
              <Card.Body>
                <Card.Title className="text-capitalize">Bower Floor Lamp</Card.Title>
              </Card.Body>
            </Card>
            <Card className=" cardItemHome">
              <Card.Img variant="top" src="/Images/spacejoy-RqO6kwm4tZY-unsplash.jpg" />
              <Card.Body>
                <Card.Title className="text-capitalize">Barrow Console</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col className="d-flex justify-content-center">
            <h3>Shop All most popular</h3>
          </Col>
        </Row>
      </Container>
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
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <Message variant="danger">{error}</Message>
//       ) : (
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
