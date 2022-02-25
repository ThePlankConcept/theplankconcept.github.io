import React from "react";
import { Spinner, Container } from "react-bootstrap";
const Loader = () => {
  return (
    <Container>
      <Spinner animation="border" role="status" style={{ width: "70px", height: "70px", marginTop: "20%", marginLeft: "50%", display: "block" }} />
      {/* <span className="sr-only text-align-center">Loading...</span> */}
    </Container>
  );
};

export default Loader;
