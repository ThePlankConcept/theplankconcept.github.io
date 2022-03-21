import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Image } from "react-bootstrap";
import "./EditBilling.css";

const EditBilling = () => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <p className="edit-billing-title">Edit Billing</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <span className="edit-billing-text-1 py-5 ">
            Please contact us to update your billing method for your existing subscriptions.
          </span>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container>
            <Row>
              <Col lg={1}></Col>
              <Col lg={7} md={8}>
                <Container>
                  <Row className="mt-5 mb-3">
                    <Col>
                      <span className="edit-billing-text-2">
                        Our Customer Support team is here to help!
                      </span>
                    </Col>
                  </Row>
                  <Row className="">
                    <Col md={2} className="p-1">
                      <Image
                        src="/Images/customerSupport.png"
                        alt="customerSupport"
                        fluid
                        width="80%"
                        height="80%"
                      ></Image>
                    </Col>
                    <Col className="py-2">
                      <span className="edit-billing-text-3">
                        Online support is available Monday through Friday 9 a.m. to 6 p.m., Saturday
                        9 a.m. to 5 p.m. Pacific. One of our service experts usually responds within
                        48 hours.
                      </span>
                    </Col>
                  </Row>
                </Container>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col lg={1}></Col>
              <Col>
                <Button className="contact-us-button">CONTACT US</Button>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </Container>
  );
};
export default EditBilling;
