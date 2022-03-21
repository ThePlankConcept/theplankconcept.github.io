import React from "react";
import "./companypage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Row, Col, Container, Image } from "react-bootstrap";
const CompanyPage = () => {
  return (
    <>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row
        className="plankCompanyPageFirstRow"
        style={{ background: "url('/Images/companyPage1.jpg')" }}
      >
        <Col md={6} className="plankCompanyPageCol text-center">
          <h1>We help turn your house into a home.</h1>
        </Col>
      </Row>
      <Row className="plankCompanyPageSecondRow">
        <Col md={8} className="plankCompanyPageCol text-center ">
          <p className="text-center">
            Plank launched in 2022 with a simple concept—furniture that fits the way we live today.
            City renters move on average every 1-2 years.
          </p>
          <p className="text-center pt-4 px-2">
            We believe furniture shouldn’t involve so much compromise. Affordable and well-made.
            Convenient and sustainable. Smart and stylish. These things are all possible with Plank.
            We built a more responsible approach to furniture, one that’s grounded in rental, reuse,
            and refurbishment. There’s still a lot of work to be done, but we’re proud to be
            offering a more circular approach and helping a new generation of renters create homes
            they love even when life is in motion.
          </p>
        </Col>
      </Row>
      <Row className="plankCompanyPageThirdRow">
        <Col md={6} className="plankCompanyPageThirdRowCol1">
          <Image src="/Images/companyPage2.jpg" fluid className="imagePlankcompany1" />
        </Col>
        <Col md={6} className="plankCompanyPageThirdRowCol2">
          <Row className="d-flex justify-content-start">
            <Col md={1}></Col>
            <Col md={8} className="ps-5">
              <p>
                We built a more responsible approach to furniture, one that’s grounded in rental,
                reuse, and refurbishment. There’s still a lot of work to be done, but we’re proud to
                be offering a more circular approach and helping a new generation of renters create
                homes they love even when life is in motion.
              </p>
              <p></p>
              <p>
                We built a more responsible approach to furniture, one that’s grounded in rental,
                reuse, and refurbishment.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row className="plankCompanyPageFourthRow d-flex justify-content-center">
        <Col md={8}>
          <p className="text-center">
            We want to make your move-in and move-out process a hassle free experience.
          </p>
        </Col>
      </Row>
      <Row className="plankCompanyPageThirdRow">
        <Col md={6} className="plankCompanyPageFifthRowCol1">
          <Row className="d-flex justify-content-end">
            <Col md={8} className="ps-5">
              <Row>
                <Col>
                  <p>
                    We built a more responsible approach to furniture, one that’s grounded in
                    rental, reuse, and refurbishment. There’s still a lot of work to be done, but
                    we’re proud to be offering a more circular approach and helping a new generation
                    of renters create homes they love even when life is in motion.
                  </p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>
                    We built a more responsible approach to furniture, one that’s grounded
                    <span> in rental, reuse, and refurbishment.</span>
                  </p>
                </Col>
              </Row>
            </Col>
            <Col md={1}></Col>
          </Row>
        </Col>
        <Col md={6} className="plankCompanyPageFifthRowCol2">
          <Image src="/Images/companyPage3.jpg" fluid className="imagePlankcompany2" />
        </Col>
      </Row>
      <Row className="plankCompanyPageFourthRow d-flex justify-content-center">
        <Col md={7}>
          <p className="differentPara text-center">
            Convenient and sustainable. Smart and stylish. These things are all possible with Plank.
            We built a more responsible approach to furniture, one that’s grounded in rental, reuse,
            and refurbishment. There’s still a lot of work to be done, but we’re proud to be
            offering a more circular approach and helping a new generation of renters create homes
            they love even when life is in motion.
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          {window.location.pathname !== "/login" && window.location.pathname !== "/register" && (
            <Footer />
          )}
        </Col>
      </Row>
    </>
  );
};

export default CompanyPage;
