import React from "react";
import "./header.css";

import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

const ProductsMenu = () => {
  return (
    <Container className="pb-5">
      <Row>
        <Col>
          <Container>
            <Row className="pt-5">
              <Col className="bold-text">LATEST ARRIVAL</Col>
            </Row>
            <Row>
              <Col className="bold-text">MOST POPULAR</Col>
            </Row>
          </Container>
        </Col>
        <Col>
          <Container>
            <Row className="pb-2">
              <Col className="bold-text">
                <Link to="/products/living%20room" style={{ textDecoration: "none" }}>
                  <span className="underline"> LIVING ROOM </span>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Sofas And Sectionals</span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Armchairs</span>
              </Col>
            </Row>

            <Row>
              <Col className="pb-1 ">
                <span className="underline"> Ottomans And Poufs</span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Coffe Tables </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Side Tables </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Tv Stands And Consoles </span>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col>
          <Container>
            <Row className="pb-2">
              <Link to="/products/dining%20room" style={{ textDecoration: "none" }}>
                <Col className="bold-text">DINING ROOM</Col>
              </Link>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline">Dining Tables</span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Dining Chairs</span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Benches </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Bar Stools </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Side Boards </span>
              </Col>
            </Row>
            <Link to="/products/bedroom" style={{ textDecoration: "none" }}>
              <Col className="bold-text">BEDROOM</Col>
            </Link>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Bed Frames </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Dressers </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Nightstands </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Mattresses </span>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col>
          <Container>
            <Link to="/products/accessories" style={{ textDecoration: "none" }}>
              <Col className="bold-text">ACCESSORIES</Col>
            </Link>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Lighting </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Mirrors </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Rugs </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Art/Decorations </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Tabletops </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline"> Outdoor </span>
              </Col>
            </Row>
          </Container>
        </Col>
        <Col>
          <Container>
            <Row>
              <Col className="bold-text">INSPIRATION</Col>
            </Row>
            <Row>
              <Col>
                <img src="/images/spacejoy-ctyssSFmXmU-unsplash.jpg" width="100%" height="80%" />
              </Col>
            </Row>
            <Row>
              <Col>
                <img src="/images/spacejoy-ctyssSFmXmU-unsplash.jpg" width="100%" height="80%" />
              </Col>
            </Row>
            <Row>
              <Col>
                <img src="/images/spacejoy-ctyssSFmXmU-unsplash.jpg" width="100%" height="80%" />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductsMenu;
