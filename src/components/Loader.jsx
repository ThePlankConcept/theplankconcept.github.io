import React from "react";
import { Container, Image, Row, Col } from "react-bootstrap";
const Loader = () => {
  return (
    <Container
      style={{
        maxWidth: "100px",
        paddingBottom: "5%",
        minHeight: "100%",
      }}
    >
      {/* <Spinner animation="border" role="status" style={{ width: "70px", height: "70px", marginTop: "20%", marginLeft: "50%", display: "block" }} /> */}
      {/* <span className="sr-only text-align-center">Loading...</span> */}
      <Row>
        <Col>
          {" "}
          <Image src="/loadingImage.gif" role="status" fluid />
        </Col>
      </Row>
    </Container>
  );
};

export default Loader;
