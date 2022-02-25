import React from "react";
import "./footer.css";
import { Container, Row, Col, Image, Card } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container className="main-Container mt-5 pt-4 " fluid>
        <Container className=" innerContainer ms-5 mb-2 " fluid>
          <Row>
            <Col md={4} lg={5} sm={1}>
              <Container className="d-flex flex-column footerlogo">
                <img src="/logo.png" alt="logo" className="logo" />
                <div className="plank-brief">High quality furniture made designed to fit modern and minimalist apartments with the flexibility to rent and swap.</div>
                <Row className="plank-footer-links">
                  <Col className="d-flex justify-content-between">
                    <Image src="/facebook-logo.svg" />

                    <Image src="/twitter.svg" />

                    <Image src="/linkedin.svg" />

                    <Image src="/instagram.svg" />

                    <Image src="/youtube.svg" />
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col md={4} lg={3} sm={1}>
              <Card className="list-group-flush cardItem">
                <Card.Title className="pb-3 text-capitalize font-weight-bolder cardtitle">Shopping online</Card.Title>
                <Card.Text className="textcard mb-1">Order Status</Card.Text>
                <Card.Text className="textcard mb-1 ">Shipping and Delivery</Card.Text>
                <Card.Text className="textcard mb-1">Returns</Card.Text>
                <Card.Text className="textcard mb-1">Payment Options</Card.Text>
                <Card.Text className="textcard mb-1">Contact Us</Card.Text>
              </Card>
            </Col>
            <Col md={4} lg={2} sm={1}>
              <Card className="list-group-flush cardItem">
                <Card.Title className="pb-3 text-capitalize cardtitle">Information</Card.Title>
                <Card.Text className="textcard mb-1">Our Service</Card.Text>
                <Card.Text className="textcard mb-1">Company Profile</Card.Text>
                <Card.Text className="textcard mb-1">Newsletter</Card.Text>
                <Card.Text className="textcard mb-1">Categories</Card.Text>
                <Card.Text className="textcard mb-1">FAQ</Card.Text>
              </Card>
            </Col>
            <Col md={4} lg={2} sm={1}>
              <Card className="list-group-flush cardItem">
                <Card.Title className="pb-3 text-capitalize cardtitle">Contact</Card.Title>
                <Card.Link className="text-decoration-none pb-2 textcard mb-1">contact@plank.live</Card.Link>
                <Card.Text className="textcard mb-1">+971 4 280 11 88</Card.Text>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
      <div className="copyright">&copy; 2022 ALL RIGHTS RESERVED</div>
    </footer>
  );
};
export default Footer;
