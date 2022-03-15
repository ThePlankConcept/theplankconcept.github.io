import React from "react";
import "./servicepage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Row, Col, Container, Card, Image } from "react-bootstrap";
const ServicePage = () => {
  return (
    <>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Row className="mw-100 servicefirstRow1">
        <Container fluid className="serviceContainer">
          <Row className="d-flex justify-content-center py-5">
            <Col md={8}>
              <h1 className="text-center serviceHeading fontConfig1">
                With Plank, it’s so much more than just furniture.
              </h1>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center pb-5">
            <Col md={8}>
              <h2 className="text-center serviceSubHeading">And here’s why.</h2>
            </Col>
          </Row>
        </Container>
      </Row>
      <Row className="mw-100 servicefirstRow2 ">
        <Container className="serviceContainer">
          <Row className="d-flex justify-content-center pb-5">
            <Col md={6}>
              <h1 className="text-center serviceHeading2">
                We’re flexible.
                <br /> You decide whether you want to rent or buy your items.
              </h1>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center pb-5">
            <Col md={5}>
              <p className="text-center servicePara">
                Renting? Whether it’s an entire room or just a few pieces, live with your new items
                for a period of 6 or 12 months.
              </p>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center ">
            <Col md={5}>
              <Row className="d-flex justify-content-center ">
                <Col md={4}>
                  <Container>
                    <Container className="rentOptionService">
                      <h1 className="periodNumberService">6</h1>
                    </Container>
                    <h1 className="text-center pt-2">MONTHS</h1>
                  </Container>
                </Col>
                <Col md={1} className="ortag">
                  <Container>
                    <h3 className="text-center">OR</h3>
                  </Container>
                </Col>
                <Col md={4}>
                  <Container>
                    <Container className="rentOptionService">
                      <h1 className="periodNumberService">12</h1>
                    </Container>
                    <h1 className="text-center pt-2">MONTHS</h1>
                  </Container>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Row>
      <Row className="mw-100 servicefirstRow3 ">
        <Container fluid className="serviceContainer">
          <Row
            className="d-flex justify-content-center"
            style={{ paddingTop: "8%", paddingBottom: "3%" }}
          >
            <Col md={5}>
              <h1 className="text-center serviceHeading fontConfig2">
                Then leave it to us!
                <br /> We’ll come and do all the work!
              </h1>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center pb-5">
            <Col md={5} className="px-5">
              <p className="text-center servicePara2">
                A week or so after you place your order, our team of highly capable individuals will
                show up at your doorstep.
              </p>
            </Col>
          </Row>
          <Row
            className="d-flex justify-content-center pb-5"
            style={{ paddingLeft: "10%", paddingRight: "10%" }}
          >
            <Col md={4} className="d-flex justify-content-center">
              <Card style={{ width: "26rem", background: "transparent", border: "none" }}>
                <Card.Header
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    padding: "0",
                  }}
                >
                  <h1
                    className="text-center"
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "2.6rem",
                      color: "white",
                      fontWeight: "400",
                      padding: "5% 0% 7% 0%",
                    }}
                  >
                    WE DELIVER
                  </h1>
                </Card.Header>
                <Card.Img
                  variant="top"
                  src="/Images/pexels-pavel-danilyuk-6407569.jpg"
                  style={{
                    width: "100%",
                    height: "25rem",
                    objectFit: "cover",
                    border: ".8rem white solid",
                    borderRadius: "10%",
                  }}
                />
                <Card.Body>
                  <Card.Text
                    className="text-center"
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "1.45rem",
                      color: "white",
                      fontWeight: "300",
                    }}
                  >
                    After an initial assessment of your space, they’ll find the safest, most
                    efficient way to bring your new stuff in.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="d-flex justify-content-center">
              <Card style={{ width: "26rem", background: "transparent", border: "none" }}>
                <Card.Header
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    padding: "0",
                  }}
                >
                  <h1
                    className="text-center"
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "2.6rem",
                      color: "white",
                      fontWeight: "400",
                      padding: "5% 0% 7% 0%",
                    }}
                  >
                    WE ASSEMBLE
                  </h1>
                </Card.Header>
                <Card.Img
                  variant="top"
                  src="/Images/weassemble.jpg"
                  style={{
                    width: "100%",
                    height: "25rem",
                    objectFit: "cover",
                    border: ".8rem white solid",
                    borderRadius: "10%",
                  }}
                />
                <Card.Body>
                  <Card.Text
                    className="text-center"
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "1.45rem",
                      color: "white",
                      fontWeight: "300",
                    }}
                  >
                    No tools necessary. At all. We put each and every item together and double check
                    that it’s safe, sturdy and ready be lived with.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="d-flex justify-content-center">
              <Card style={{ width: "26rem", background: "transparent", border: "none" }}>
                <Card.Header
                  style={{
                    border: "none",
                    backgroundColor: "transparent",
                    padding: "0",
                  }}
                >
                  <h1
                    className="text-center"
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "2.6rem",
                      color: "white",
                      fontWeight: "400",
                      padding: "5% 0% 7% 0%",
                    }}
                  >
                    WE ARRANGE
                  </h1>
                </Card.Header>
                <Card.Img
                  variant="top"
                  src="/Images/pexels-vecislavas-popa-1571467.jpg"
                  style={{
                    width: "100%",
                    height: "25rem",
                    objectFit: "cover",
                    border: ".8rem white solid",
                    borderRadius: "10%",
                  }}
                />
                <Card.Body>
                  <Card.Text
                    className="text-center"
                    style={{
                      fontFamily: "Roboto",
                      fontSize: "1.45rem",
                      color: "white",
                      fontWeight: "300",
                    }}
                  >
                    Tell us where you want everything to go, this is your home, we help make it one.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </Row>
      <Row className="m-100 servicefirstRow4">
        <Container className="serviceContainer">
          <Row className="d-flex justify-content-center pb-5">
            <Col md={8}>
              <h1 className="text-center serviceHeading2">
                What happens at the end of your rental term?
              </h1>
            </Col>
          </Row>

          <Row className="px-5">
            <Col md={4} className="text-center">
              <Row className="py-5 d-flex justify-content-center">
                <Col md={4} className="serviceIcons rounded-pill">
                  <Image src="/asset3.png" fluid className="rounded-pill" />
                </Col>
              </Row>
              <Row className="d-flex justify-content-center">
                <Col md={4}>
                  <h1 className="headinginwhathappens py-3">EXTEND</h1>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center py-3">
                <Col md={10}>
                  <p className="parainWhatHappens px-3">
                    Not ready to part ways? Just keep the party going for another 2- to 12-month
                    term.
                  </p>
                </Col>
              </Row>
            </Col>
            <Col md={4} className="text-center">
              <Row className="py-5 d-flex justify-content-center">
                <Col md={4} className="serviceIcons rounded-pill">
                  <Image src="/asset1.png" fluid className="rounded-pill" />
                </Col>
              </Row>
              <Row className="d-flex justify-content-center">
                <Col md={4}>
                  <h1 className="headinginwhathappens py-3">SWAP</h1>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center py-3">
                <Col md={10}>
                  <p className="parainWhatHappens px-3">
                    Find something else on the site you think may tie the room together a bit
                    better? We’ll come swap it. For free.
                  </p>
                </Col>
              </Row>
            </Col>
            <Col md={4} className="text-center">
              <Row className="py-5 d-flex justify-content-center">
                <Col md={4} className="serviceIcons">
                  <Image src="/asset2.png" fluid className="rounded-pill" />
                </Col>
              </Row>
              <Row className="d-flex justify-content-center">
                <Col md={4}>
                  <h1 className="headinginwhathappens py-3">KEEP</h1>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center py-3">
                <Col md={10}>
                  <p className="parainWhatHappens px-3">
                    Grown attached? Just pay the difference between the total value and what you’ve
                    paid to date. Never more than retail.
                  </p>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Row>
      <Row className="m-100 servicefirstRow5">
        <Container fluid className="serviceContainer">
          <Row className="d-flex justify-content-center py-5">
            <Col md={8}>
              <h1 className="text-center serviceHeading fontConfig2">Moving on?</h1>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center pb-5">
            <Col md={8}>
              <h2 className="text-center servicePara3">
                We’ll come pick up everything at no cost. We’ll miss you though.
              </h2>
            </Col>
          </Row>
        </Container>
      </Row>
      <Row className="m-100 servicefirstRow4">
        <Container className="serviceContainer">
          <Row className="d-flex justify-content-center pb-5">
            <Col md={8}>
              <h1 className="text-center serviceHeading2">How we keep it fresh.</h1>
            </Col>
          </Row>
          <Row className="d-flex justify-content-center pb-5">
            <Col md={9} className="px-5">
              <p className="text-center servicePara">
                Our furniture is durable and modular enough for us to give it a second life once
                you’re done using it. We carry out refurbishment through a combination of parts (or
                fabric) replacement and an 11-step sanitation and refurbishment process using
                sustainably sourced materials.
              </p>
            </Col>
          </Row>
        </Container>
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

export default ServicePage;
