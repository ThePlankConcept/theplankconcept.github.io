import React from "react";
import "./allproductpage.css";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import Message from "../components/Message";
import { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, CardGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

import { allProductCategories } from "../actions/categoryActions";

const AllProductPage = () => {
  const dispatch = useDispatch();
  const { loading, error, category } = useSelector((state) => state.allProductCategory);
  // console.log("data", category);

  useEffect(() => {
    dispatch(allProductCategories());
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container className="mainAllProductPageContainer pb-3" fluid>
          <Container fluid style={{ paddingLeft: "6%", paddingRight: "5%" }}>
            <Row className="pb-5">
              <Container fluid>
                <Row className="pt-5">
                  <Col className="text-center">
                    <p className="plankAllproductLabel">Shop by room</p>
                  </Col>
                </Row>
                <Row>
                  <Col className="allProductsShopbyRoomCol">
                    <Row>
                      <Col className="allProductsShopbyRoomCol pe-2" xs={12} sm={12} md={6} lg={3} xl={3}>
                        <Card className="cardInAllProducts">
                          <Link to={"/products/living%20room"}>
                            <Card.Img variant="top" src="/Images/LivingRoom.jpg" className="cardImage" />
                            <Card.Body className="px-0 cardBodyInAllProducts">
                              <Card.Title className="text-capitalize cardTitle">Living Room</Card.Title>
                            </Card.Body>
                          </Link>
                        </Card>
                      </Col>
                      <Col className="allProductsShopbyRoomCol pe-2" xs={12} sm={12} md={6} lg={3} xl={3}>
                        <Card className="cardInAllProducts">
                          <Link to={"/products/bedroom"}>
                            <Card.Img variant="top" src="/Images/BedRoom.jpg" className="cardImage" />
                            <Card.Body className="px-0 cardBodyInAllProducts">
                              <Card.Title className="text-capitalize cardTitle">Bed Room</Card.Title>
                            </Card.Body>
                          </Link>
                        </Card>
                      </Col>
                      <Col className="allProductsShopbyRoomCol pe-2" xs={12} sm={12} md={6} lg={3} xl={3}>
                        <Card className="cardInAllProducts">
                          <Link to={"/products/dining%20room"}>
                            <Card.Img variant="top" src="/Images/DiningRoom.jpg" className="cardImage" />
                            <Card.Body className="px-0 cardBodyInAllProducts">
                              <Card.Title className="text-capitalize cardTitle">Dining Room</Card.Title>
                            </Card.Body>
                          </Link>
                        </Card>
                      </Col>
                      <Col className="allProductsShopbyRoomCol pe-2" xs={12} sm={12} md={6} lg={3} xl={3}>
                        <Card className="cardInAllProducts">
                          <Link to={"/products/office"}>
                            <Card.Img variant="top" src="/Images/HomeOffice.jpg" className="cardImage" />
                            <Card.Body className="px-0 cardBodyInAllProducts">
                              <Card.Title className="text-capitalize cardTitle">Home Office</Card.Title>
                            </Card.Body>
                          </Link>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Container>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col className="text-center pt-5">
                <p className="plankAllproductLabel">Shop by item</p>
              </Col>
            </Row>
            {category.map((c) => {
              return (
                <Row key={c.id}>
                  <Row>
                    <Col className="py-3 ps-4">
                      <p className="shopbyitem-plank-label">{c.attributes.category_name}</p>
                    </Col>
                  </Row>
                  <Row className="px-0">
                    {c.attributes.types.data.map((ptype) => {
                      return (
                        <Col key={ptype.id} className="allProductsShopbyItemCol px-0" xs={6} sm={6} md={6} lg={3} xl={3}>
                          <Card className="cardInAllProductstypes pb-5" style={{ width: "18rem" }}>
                            <Link to={`/products/${c.attributes.category_name}?type=${ptype.attributes.type_name}`}>
                              <Card.Img variant="top" src={ptype.attributes.images.data[0].attributes.formats.medium.url} className="cardImage" style={{ height: "18rem" }} />
                            </Link>
                            <Card.Body className="px-0 cardBodyInAllProductstypes">
                              <Card.Link href={`/products/${c.attributes.category_name}?type=${ptype.attributes.type_name}`} className="text-capitalize cardTitleItem">
                                {ptype.attributes.type_name}
                              </Card.Link>
                            </Card.Body>
                          </Card>
                        </Col>
                      );
                    })}
                  </Row>
                </Row>
              );
            })}
          </Container>

          <Row>
            <Col>{window.location.pathname !== "/login" && window.location.pathname !== "/register" && <Footer />}</Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default AllProductPage;

// {
//   c.attributes.types.data.map((ptype) => {
//     return (
//       <Col className="allProductsShopbyItemCol">
//         <Card className="cardInAllProductstypes" style={{ width: "16rem" }}>
//           <Link to={`/products/${c.attributes.category_name}?type=${ptype.attributes.type_name}`}>
//             <Card.Img variant="top" src={ptype.attributes.images.data[0].attributes.formats.medium.url} className="cardImage" style={{ height: "18rem" }} />
//           </Link>
//           <Card.Body className="px-0 cardBodyInAllProductstypes">
//             <Card.Link href={`/products/${c.attributes.category_name}?type=${ptype.attributes.type_name}`} className="text-capitalize cardTitleItem">
//               {ptype.attributes.type_name}
//             </Card.Link>
//           </Card.Body>
//         </Card>
//       </Col>
//     );
//   });
// }

{
  /* <CardGroup className="w-100 h-100">
<Card className="cardInAllProducts">
  <Link to={"/products/living%20room"}>
    <Card.Img variant="top" src="/Images/diningroom.jpg" className="cardImage" />
    <Card.Body className="px-0 cardBodyInAllProducts">
      <Card.Title className="text-capitalize cardTitle">Living Room</Card.Title>
    </Card.Body>
  </Link>
</Card>

<Card className="cardInAllProducts">
  <Link to={"/products/bed%20room"}>
    <Card.Img variant="top" src="/Images/diningroom.jpg" className="cardImage" />
    <Card.Body className="px-0 cardBodyInAllProducts">
      <Card.Title className="text-capitalize cardTitle">Bed Room</Card.Title>
    </Card.Body>
  </Link>
</Card>

<Card className="cardInAllProducts">
  <Link to={"/products/dining%20room"}>
    <Card.Img variant="top" src="/Images/diningroom.jpg" className="cardImage" />
    <Card.Body className="px-0 cardBodyInAllProducts">
      <Card.Title className="text-capitalize cardTitle">Dining Room</Card.Title>
    </Card.Body>
  </Link>
</Card>

<Card className="cardInAllProducts">
  <Link to={"/products/office"}>
    <Card.Img variant="top" src="/Images/diningroom.jpg" className="cardImage" />
    <Card.Body className="px-0 cardBodyInAllProducts">
      <Card.Title className="text-capitalize cardTitle">Home Office</Card.Title>
    </Card.Body>
  </Link>
</Card>
</CardGroup> */
}

// {c.attributes.types.data.map((ptype) => {
//   if (c.attributes.types.data.length > 0 && c.attributes.types.data.length <= 2) {
//     return (
//       <Col className="allProductsShopbyItemCol " lg={3}>
//         <Card className="cardInAllProductstypes" style={{ width: "16rem" }}>
//           <Link to={`/products/${c.attributes.category_name}?type=${ptype.attributes.type_name}`}>
//             <Card.Img variant="top" src={ptype.attributes.images.data[0].attributes.formats.medium.url} className="cardImage" style={{ height: "18rem" }} />
//           </Link>
//           <Card.Body className="px-0 cardBodyInAllProductstypes">
//             <Card.Link href={`/products/${c.attributes.category_name}?type=${ptype.attributes.type_name}`} className="text-capitalize cardTitleItem">
//               {ptype.attributes.type_name}
//             </Card.Link>
//           </Card.Body>
//         </Card>
//       </Col>
//     );
//   } else {
//     return (
//       <Col className="allProductsShopbyItemCol">
//         <Card className="cardInAllProductstypes" style={{ width: "16rem", marginRight: "2rem" }}>
//           <Link to={`/products/${c.attributes.category_name}?type=${ptype.attributes.type_name}`}>
//             <Card.Img variant="top" src={ptype.attributes.images.data[0].attributes.formats.medium.url} className="cardImage" style={{ height: "18rem" }} />
//           </Link>
//           <Card.Body className="px-0 cardBodyInAllProductstypes">
//             <Card.Link href={`/products/${c.attributes.category_name}?type=${ptype.attributes.type_name}`} className="text-capitalize cardTitleItem">
//               {ptype.attributes.type_name}
//             </Card.Link>
//           </Card.Body>
//         </Card>
//       </Col>
//     );
//   }
// })}

// {category.map((c) => {
//   if (c.id !== 4) {
//     console.log(c);
//     return (
//       <Col className="allProductsShopbyRoomCol pe-2 pb-5" xs={12} sm={12} md={6} lg={3} xl={3}>
//         <Card className="cardInAllProducts">
//           <Link to={"/products/living%20room"}>
//             <Card.Img variant="top" src={c.attributes.images.data[0].attributes.formats.medium.url} className="cardImage" />
//             <Card.Body className="px-0 cardBodyInAllProducts">
//               <Card.Title className="text-capitalize cardTitle">{c.attributes.category_name}</Card.Title>
//             </Card.Body>
//           </Link>
//         </Card>
//       </Col>
//     );
//   }
// })}
