import React from "react";
import "./header.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

const ProductsMenu = () => {
  const navigate = useNavigate();

  const navigateTo = (e, cat) => {
    console.log(e.target.innerHTML);
    navigate(`/products/${cat}?type=${e.target.innerHTML.trim().toLowerCase()}`);
  };

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
                <span className="underline" onClick={(e) => navigateTo(e, "living room")}>
                  Sofas And Sectionals
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline" onClick={(e) => navigateTo(e, "living room")}>
                  Armchairs
                </span>
              </Col>
            </Row>

            <Row>
              <Col className="pb-1 ">
                <span className="underline" onClick={(e) => navigateTo(e, "living room")}>
                  Ottomans & Poufs
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline" onClick={(e) => navigateTo(e, "living room")}>
                  Coffee Tables
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline" onClick={(e) => navigateTo(e, "living room")}>
                  Side Tables
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline" onClick={(e) => navigateTo(e, "living room")}>
                  Tv Stands And Consoles
                </span>
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
                <span className="underline" onClick={(e) => navigateTo(e, "dining room")}>
                  Dining Tables
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline" onClick={(e) => navigateTo(e, "dining room")}>
                  Dining Chairs
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline" onClick={(e) => navigateTo(e, "dining room")}>
                  Benches
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline" onClick={(e) => navigateTo(e, "dining room")}>
                  Bar Stools
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline" onClick={(e) => navigateTo(e, "dining room")}>
                  Side Boards
                </span>
              </Col>
            </Row>
            <Link to="/products/bedroom" style={{ textDecoration: "none" }}>
              <Col className="bold-text" onClick={(e) => navigateTo(e, "bedroom")}>
                BEDROOM
              </Col>
            </Link>
            <Row>
              <Col className="pb-1">
                <span className="underline" onClick={(e) => navigateTo(e, "bedroom")}>
                  Bed Frames
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline" onClick={(e) => navigateTo(e, "bedroom")}>
                  Dressers
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline" onClick={(e) => navigateTo(e, "bedroom")}>
                  Nightstands
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline" onClick={(e) => navigateTo(e, "bedroom")}>
                  Mattresses
                </span>
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
                <span className="underline" onClick={(e) => navigateTo(e, "accessories")}>
                  Lighting
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline" onClick={(e) => navigateTo(e, "accessories")}>
                  Mirrors
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline" onClick={(e) => navigateTo(e, "accessories")}>
                  Rugs
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline" onClick={(e) => navigateTo(e, "accessories")}>
                  Art/Decorations
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline" onClick={(e) => navigateTo(e, "accessories")}>
                  Tabletops
                </span>
              </Col>
            </Row>
            <Row>
              <Col className="pb-1">
                <span className="underline" onClick={(e) => navigateTo(e, "accessories")}>
                  Outdoor
                </span>
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
