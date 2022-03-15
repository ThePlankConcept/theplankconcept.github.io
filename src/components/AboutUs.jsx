import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const AboutUs = () => {
  return (
    <Container>
      <Row>
        <Col md={3} lg={2} xl={2} className="text-end">
          <Row className="py-3">
            <Link
              to="/ourstory"
              style={{
                textDecoration: "none",
                fontFamily: "Roboto",
                fontWeight: "500",
                fontSize: "1.2rem",
              }}
            >
              <Col>Our Story</Col>
            </Link>
          </Row>
          <Row className="py-3">
            <Link
              to="/ourstory"
              style={{
                textDecoration: "none",
                fontFamily: "Roboto",
                fontWeight: "500",
                fontSize: "1.2rem",
              }}
            >
              <Col>How It Works</Col>
            </Link>
          </Row>
          <Row className="py-3">
            <Link
              to="/ourstory"
              style={{
                textDecoration: "none",
                fontFamily: "Roboto",
                fontWeight: "500",
                fontSize: "1.2rem",
              }}
            >
              <Col>FAQ</Col>
            </Link>
          </Row>
          <Row className="py-3">
            <Link
              to="/ourstory"
              style={{
                textDecoration: "none",
                fontFamily: "Roboto",
                fontWeight: "500",
                fontSize: "1.2rem",
              }}
            >
              <Col>Blogs</Col>
            </Link>
          </Row>
        </Col>
        <Col md={9} lg={10} xl={10}></Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
