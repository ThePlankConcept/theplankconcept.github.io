import React from "react";
import { Spinner, Container } from "react-bootstrap";
const Loader = () => {
  return (
    <Container>
      <Spinner animation="border" role="status" style={{ width: "100px", height: "100px", margin: "auto", display: "block" }} />
      {/* <span className="sr-only text-align-center">Loading...</span> */}
    </Container>
  );
};

export default Loader;
