import React from "react";
import { Container, Row, Col, ListGroup, Image, Accordion } from "react-bootstrap";
import Header from "../components/Header";
import "./faq.css";
const FAQ = () => {
  return (
    <>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Container className="faqMainContainer" fluid>
        <Row>
          <Col xs={12} sm={12} md={12} lg={12} xl={12}>
            <img src="/Images/faq.jpg" alt="faqheader" className="img-fluid" />
          </Col>
        </Row>
        <Row className="p-0 " style={{ marginTop: "4.43875rem" }}>
          <Col className="text-center" xs={12} sm={12} md={12} lg={12} xl={12}>
            <h2
              style={{
                fontFamily: "Roboto",
                fontSize: "2.75rem",
                fontWeight: 600,
                letterSpacing: "0.055rem",
              }}
            >
              FAQ
            </h2>
          </Col>
          <Col className="text-center py-4">
            <p className="plankfaqquote">
              You have questions, we have answers. Don’t see your Q&A below? Just&nbsp;
              <a href="/contactus">contact us</a> and we’ll get you an answer ASAP.{" "}
            </p>
          </Col>
        </Row>
        <Container className="plankfaqindexContainer py-5" fluid>
          <Row>
            <Col>
              <h2 style={{ textTransform: "none" }} className="plankfaqindexh2">
                <a
                  href="#overview"
                  className="plankfaqtopics "
                  style={{ textDecoration: "none" }}
                  f="#"
                >
                  Overview
                </a>
              </h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <hr className="plankfaqhr" />
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 style={{ textTransform: "none" }} className="plankfaqindexh2">
                <a
                  href="#subscription"
                  className="plankfaqtopics"
                  style={{ textDecoration: "none" }}
                >
                  The Subscription
                </a>
              </h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <hr className="plankfaqhr" />
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 style={{ textTransform: "none" }} className="plankfaqindexh2">
                <a href="#furniture" className="plankfaqtopics" style={{ textDecoration: "none" }}>
                  The Furniture
                </a>
              </h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <hr className="plankfaqhr" />
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 style={{ textTransform: "none" }} className="plankfaqindexh2">
                <a href="#delivery" className="plankfaqtopics" style={{ textDecoration: "none" }}>
                  The Delivery
                </a>
              </h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <hr className="plankfaqhr" />
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 style={{ textTransform: "none" }} className="plankfaqindexh2">
                <a
                  href="#renttoownoverview"
                  className="plankfaqtopics"
                  style={{ textDecoration: "none" }}
                >
                  Rent-to-own Overview
                </a>
              </h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <hr className="plankfaqhr" />
            </Col>
          </Row>
        </Container>
        <Container className="plankfaqqueandanswer" fluid>
          <Container id="overview" fluid>
            <Row>
              <Col className="text-center" xs={12} sm={12} md={12} lg={12} xl={12}>
                <h3 className="plankfaqtopicname">Overview</h3>
              </Col>
            </Row>
            <Accordion className="plankfaqqueanswerContainer py-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3 className="plankFaqQuestion"> What is Plank?</h3>
                </Accordion.Header>
                <Accordion.Body>
                  <p className="plankFaqAnswer">
                    Plank is a monthly subscription service for your home that lets you easily get
                    the furniture you need, for the amount of time you need it. You can subscribe to
                    individual pieces such as beds or sofas, or get an entire dining room or bedroom
                    set-up, all for a low monthly price that works for you.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="plankfaqqueanswerContainer py-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3 className="plankFaqQuestion">
                    What are the benefits of subscribing to home furnishings?
                  </h3>
                </Accordion.Header>
                <Accordion.Body>
                  <p className="plankFaqAnswer">
                    Moving and furnishing your home can be overwhelming, time-consuming, and
                    stressful. We make it easy to find and enjoy the right pieces that suit your
                    taste - without the commitment of owning furniture. From an easy shopping
                    experience to easy in-home delivery and assembly, we help you feel at home
                    instantly, with affordable, quality furniture so you can focus on living in your
                    home. Need a style refresh? We have you covered! You can swap your items, buy
                    them out, or simply have us pick them up!
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="plankfaqqueanswerContainer py-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3 className="plankFaqQuestion">What cities do you Plank in?</h3>
                </Accordion.Header>
                <Accordion.Body>
                  <p className="plankFaqAnswer">Currently, we are Planking homes in Dubai only.</p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="plankfaqqueanswerContainer py-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3 className="plankFaqQuestion">
                    How does Plank help ease my moving experience?
                  </h3>
                </Accordion.Header>
                <Accordion.Body>
                  <p className="plankFaqAnswer">
                    Let us worry about the heavy lifting—literally. You pick out what you want, and
                    we’ll bring it to your new place, set it up, and put it where you want it. By
                    the time we leave your home, all you need to think about is which side of the
                    sofa you’re claiming to be yours.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="plankfaqqueanswerContainer py-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3 className="plankFaqQuestion">
                    Can I subscribe to decor, kitchenware, air conditioning units, and electronics?
                  </h3>
                </Accordion.Header>
                <Accordion.Body>
                  <p className="plankFaqAnswer">
                    Right now, we only offer furniture, select decor, and televisions. Create an
                    account to be notified of additional items in the future.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="plankfaqqueanswerContainer py-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3 className="plankFaqQuestion">
                    Where can I find the Wishlists I’ve created so I can share it with my friends?
                  </h3>
                </Accordion.Header>
                <Accordion.Body>
                  <p className="plankFaqAnswer">
                    All of your Wishlists can be found at&nbsp;
                    <a href="/wishlists">https://plank/wishlists</a>. From there, you'll be able to
                    share a link to your Wishlist with your friends. You can also create sub
                    categories within the wishlist to organize the items you love, along with
                    changing the name of the list, and editing the items on your list.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Container>
          <Container id="subscription" fluid className="queansContainer">
            <Row>
              <Col className="text-center" xs={12} sm={12} md={12} lg={12} xl={12}>
                <h3 className="plankfaqtopicname">The Subscription</h3>
              </Col>
            </Row>
            <Accordion className="plankfaqqueanswerContainer py-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3 className="plankFaqQuestion">How does a Plank Subscription work?</h3>
                </Accordion.Header>
                <Accordion.Body>
                  <p className="plankFaqAnswer">Subscribing to the furniture you want is simple!</p>
                  <p></p>
                  <ol className="plankFaqAnswer ps-4">
                    <li>Select your market (upper right-hand corner of homepage)</li>
                    <li>
                      Create an account with your email and password creation (verify through email
                      confirmation)
                    </li>
                    <li>
                      Browse the site, and choose the items or rooms you love by adding them to your
                      cart. (Note: There is a AED75 monthly minimum on all subscriptions.)
                    </li>
                    <li>
                      Choose the duration of your furniture subscription—anywhere from 2 to 12
                      months.
                    </li>
                    <li>Check out by adding in your delivery address and payment info. </li>
                  </ol>
                  <p></p>
                  <p className="plankFaqAnswer">
                    You can pick your preferred delivery date—as early as one week from your order
                    date. We’ll contact you to confirm the date and arrival time window a few days
                    before your delivery. If you need to modify your subscription, Just&nbsp;
                    <a href="/contactus">contact us</a>!
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="plankfaqqueanswerContainer py-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3 className="plankFaqQuestion">
                    What are the minimum amounts and terms for the subscription?
                  </h3>
                </Accordion.Header>
                <Accordion.Body>
                  <p className="plankFaqAnswer">
                    Plank subscriptions require a minimum payment of $75 per month, and must last
                    for at least 2 months. If you need your items for less than 2 months, we can
                    pick them up sooner, however, we will still need to process payment for at least
                    2 months.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="plankfaqqueanswerContainer py-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3 className="plankFaqQuestion">How do I update my billing information?</h3>
                </Accordion.Header>
                <Accordion.Body>
                  <p className="plankFaqAnswer">
                    You can change your payment method by going to&nbsp;
                    <a href="#">https://plank.com/dashboard/edit_billing</a>. This will update your
                    default method for all future payments.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="plankfaqqueanswerContainer py-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3 className="plankFaqQuestion">
                    When will I be charged? When does my subscription officially begin?
                  </h3>
                </Accordion.Header>
                <Accordion.Body>
                  <p className="plankFaqAnswer">
                    During your checkout process, we’ll collect the first month’s subscription
                    payment. After that, your monthly subscription fee will be charged on the same
                    day of the month that your furniture is delivered, starting one month after your
                    delivery date.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="plankfaqqueanswerContainer py-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3 className="plankFaqQuestion">
                    What if I need to cancel my subscription before the original end date?
                  </h3>
                </Accordion.Header>
                <Accordion.Body>
                  <p className="plankFaqAnswer">
                    No problem. If your circumstances change and you need to cancel your
                    subscription earlier than anticipated, simply contact us and we can adjust your
                    last payment.
                  </p>
                  <p></p>
                  <p className="plankFaqAnswer">
                    Your last payment will either reflect the remaining payments of your contract or
                    a flat fee of AED300- whichever is less!
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            <Accordion className="plankfaqqueanswerContainer py-3">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <h3 className="plankFaqQuestion">
                    What happens at the end of my subscription period?
                  </h3>
                </Accordion.Header>
                <Accordion.Body>
                  <p className="plankFaqAnswer">
                    What happens next should be as easy as when you first signed up! At the end of
                    your initial contract, you’ll have several options:
                  </p>
                  <p></p>
                  <ul className="plankFaqAnswer ps-4">
                    <li>
                      We’ll help you move! If you’re moving within our delivery area we can help you
                      with that. Just let us know if there’s anything you’d like to swap to make
                      your new space feel more like home, and how long you’d like to keep your
                      adjusted subscription for (anywhere between 1-12 months).
                    </li>
                    <li>
                      You can buy-out your items. If you’re ready to keep everything forever, then
                      you can buy-out your subscription for retail price, minus the amount you’ve
                      already paid toward the particular item in subscription fees.
                    </li>
                    <li>
                      It’s OK if you want to return your items. We get it. Life happens. If it’s
                      time, then we’ll help you end your subscription. Our team will disassemble and
                      remove your Fernish items free of charge (given at least a 7-day notice).
                    </li>
                  </ul>

                  <p className="plankFaqAnswer">
                    If you’re entirely done with your furniture subscription, we’ll coordinate with
                    you on a date to pick it up.
                  </p>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Container>
          <Container id="furniture" fluid className="queansContainer">
            <Row>
              <Col className="text-center" xs={12} sm={12} md={12} lg={12} xl={12}>
                <h3 className="plankfaqtopicname">The Furniture</h3>
              </Col>
            </Row>
          </Container>
          <Container id="delivery" fluid className="queansContainer">
            <Row>
              <Col className="text-center" xs={12} sm={12} md={12} lg={12} xl={12}>
                <h3 className="plankfaqtopicname">The Delivery</h3>
              </Col>
            </Row>
          </Container>
          <Container id="overview" fluid className="queansContainer">
            <Row>
              <Col className="text-center" xs={12} sm={12} md={12} lg={12} xl={12}>
                <h3 className="plankfaqtopicname">Rent-to-own Overview</h3>
              </Col>
            </Row>
          </Container>
        </Container>
      </Container>
    </>
  );
};

export default FAQ;
