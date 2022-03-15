import React from "react";
import "./header.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Card, Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const RoomsMenu = () => {
  const navigate = useNavigate();
  const navigateToProducts = (room, type) => {
    console.log("roooom");
    //   http://localhost:3000/products/bed%20room?type=Bedframes&brand=allbrands
    //console.log("Item Added");
    if (type) {
      navigate(`/products/${room}?type=${type}&brand=allbrands`);
    } else {
      navigate(`/products/${room}?brand=allbrands`);
    }
  };
  return (
    <Container className="py-4">
      <Row>
        <Col xs={2} sm={2} md={2} lg={2} xl={2}>
          <Container>
            <Row className="pt-5">
              <Col className="bold-text">LATEST ARRIVAL</Col>
            </Row>
            <Row>
              <Col className="bold-text">MOST POPULAR</Col>
            </Row>
          </Container>
        </Col>

        <Col xs={10} sm={10} md={10} lg={10} xl={10}>
          <Row>
            <Col>
              <Card className="cardInRoomsMenu">
                <Link to={"/products/living%20room"}>
                  <Card.Img
                    variant="top"
                    src="/Images/LivingRoomRoomMenu.jpg"
                    className="cardImageinRoomsMenu"
                  />
                  <Card.Body className="px-0 cardBodyInRoomsMenu">
                    <Card.Title className="text-capitalize cardTitleinRoomsMenu">
                      Living Room
                    </Card.Title>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
            <Col>
              <Card className="cardInRoomsMenu">
                <Link to={"/products/bedroom"}>
                  <Card.Img
                    variant="top"
                    src="/Images/bedroomRoomMenu.jpg"
                    className="cardImageinRoomsMenu"
                  />
                  <Card.Body className="px-0 cardBodyInRoomsMenu">
                    <Card.Title className="text-capitalize cardTitleinRoomsMenu">
                      Bedroom
                    </Card.Title>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
            <Col>
              <Card className="cardInRoomsMenu">
                <Link to={"/products/dining%20room"}>
                  <Card.Img
                    variant="top"
                    src="/Images/DiningRoomRoomsMenu.jpg"
                    className="cardImageinRoomsMenu"
                  />
                  <Card.Body className="px-0 cardBodyInRoomsMenu">
                    <Card.Title className="text-capitalize cardTitleinRoomsMenu">
                      Dining Room
                    </Card.Title>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
            <Col>
              <Card className="cardInRoomsMenu">
                <Link to={"/products/office"}>
                  <Card.Img
                    variant="top"
                    src="/Images/HomeOfficeRoomMenu.jpg"
                    className="cardImageinRoomsMenu"
                  />
                  <Card.Body className="px-0 cardBodyInRoomsMenu">
                    <Card.Title className="text-capitalize cardTitleinRoomsMenu">
                      Home Office
                    </Card.Title>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RoomsMenu;

// <Col lg={8} md={8}>
// <Container fluid>
//   <Row className="">
//     <Col className="pe-5 ">
//       <Container fluid>
//         <Row>
//           <Col
//             className="bold-text"
//             onClick={() => {
//               navigateToProducts("living room");
//             }}
//           >
//             LIVING ROOM
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <img
//               src="/images/spacejoy-ctyssSFmXmU-unsplash.jpg"
//               width="100%"
//               height="80%"
//             />
//           </Col>
//         </Row>
//       </Container>
//     </Col>
//     <Col className="pe-5 ">
//       <Container fluid>
//         <Row>
//           <Col
//             className="bold-text"
//             onClick={() => {
//               navigateToProducts("bed room");
//             }}
//           >
//             BEDROOM
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <img
//               src="/images/spacejoy-ctyssSFmXmU-unsplash.jpg"
//               width="100%"
//               height="80%"
//             />
//             {/* <img src="/images/spacejoy-io5Tvjh7vCc-unsplash_copy.jpg" width="100%" height="46%" /> */}
//           </Col>
//         </Row>
//       </Container>
//     </Col>
//     <Col className="pe-5 ">
//       <Container fluid>
//         <Row>
//           <Col
//             className="bold-text"
//             onClick={() => {
//               navigateToProducts("outdoor");
//             }}
//           >
//             OUTDOOR
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <img
//               src="/images/spacejoy-ctyssSFmXmU-unsplash.jpg"
//               width="100%"
//               height="80%"
//             />
//             {/* <img src="/images/pexels-maria-orlova-4915593.jpg" width="100%" height="150px" /> */}
//           </Col>
//         </Row>
//       </Container>
//     </Col>
//   </Row>
//   <Row>
//     <Col className="pe-5 ">
//       <Container>
//         <Row>
//           <Col
//             className="bold-text"
//             onClick={() => {
//               navigateToProducts("dining room");
//             }}
//           >
//             DINING ROOM
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <img
//               src="/images/spacejoy-ctyssSFmXmU-unsplash.jpg"
//               width="100%"
//               height="80%"
//             />
//           </Col>
//         </Row>
//       </Container>
//     </Col>
//     <Col className="pe-5 ">
//       <Container>
//         <Row>
//           <Col
//             className="bold-text"
//             onClick={() => {
//               navigateToProducts("office");
//             }}
//           >
//             OFFICE
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <img
//               src="/images/spacejoy-ctyssSFmXmU-unsplash.jpg"
//               width="100%"
//               height="80%"
//             />
//           </Col>
//         </Row>
//       </Container>
//     </Col>
//     <Col className="pe-5 ">
//       <Container>
//         <Row>
//           <Col
//             className="bold-text"
//             onClick={() => {
//               navigateToProducts("other");
//             }}
//           >
//             OTHER
//           </Col>
//         </Row>
//         <Row>
//           <Col>
//             <img
//               src="/images/spacejoy-ctyssSFmXmU-unsplash.jpg"
//               width="100%"
//               height="80%"
//             />
//           </Col>
//         </Row>
//       </Container>
//     </Col>
//   </Row>
// </Container>
// </Col>
