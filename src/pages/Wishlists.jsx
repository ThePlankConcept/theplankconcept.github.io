import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Row,
  Col,
  Button,
  Popover,
  OverlayTrigger,
  Container,
  Modal,
  Form,
} from "react-bootstrap";
// import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createWishlist, deleteWishlist, getUserWishListAction } from "../actions/wishlistAction";

import "./Wishlists.css";

import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import useWindowDimensions from "./../hooks/ScreenSizeHook";
import Footer from "../components/Footer";
import Header from "../components/Header";

const Wishlists = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [tizi, setTizi] = useState(false);
  const getUserWishlist = useSelector((state) => state.getUserWishlist);
  const { loading, error, userWishList } = getUserWishlist;
  console.log(userWishList);
  //  dispatch(createWishlist())
  const sleep = (milliseconds) => {
    return new Promise((resolve) => setTimeout(resolve, milliseconds));
  };
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    if (userInfo) {
      dispatch(getUserWishListAction("wishlist"));
    } else {
      // navigate("/login")
    }
  }, [tizi, dispatch]);
  const createWishlistHandler = async (e) => {
    e.preventDefault();
    dispatch(createWishlist({ user: userInfo, name: e.target[0].value }));
    await sleep(1000);
    // dispatch(getUserWishListAction(userInfo))
    setModalShow(false);
    setTizi(!tizi);
  };
  function MyVerticallyCenteredModal(props) {
    console.log("called");
    console.log(modalShow);
    return (
      <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter " className="ps-5">
            <p>Create a new wishlist.</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col>
                <Form
                  onSubmit={(e) => {
                    createWishlistHandler(e);
                  }}
                >
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Wishlist Name</Form.Label>
                    <Form.Control type="text" placeholder="Wishlist Name" />
                  </Form.Group>

                  <Row>
                    <Col className="d-flex justify-content-center">
                      <Button variant=" rounded-pill popup-submit-btn" type="submit">
                        Create Wishlist
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-center">
          <Button className="cancel" onClick={props.onHide}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  const deleteList = (wishlist) => {
    console.log(wishlist);
    dispatch(deleteWishlist(wishlist));
  };
  const { height, width } = useWindowDimensions();
  return (
    <>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Container fluid>
        <Row className="ps-5 ms-3">
          <Col>
            <p className="wishlists-header pt-5 pb-3">Wishlists</p>
          </Col>
        </Row>
        <Row className="px-5 ">
          <Col lg={4}>
            <Container
              className="add-new-wishlist py-5 ms-3   "
              onClick={() => setModalShow(true)}
              fluid
            >
              <Row>
                <Col className="d-flex justify-content-center">
                  <FontAwesomeIcon className="plus-sign" icon={faPlus} />
                </Col>
              </Row>
              <Row>
                <Col className="d-flex justify-content-center">
                  <span> create a new wishlist</span>
                </Col>
              </Row>
            </Container>
          </Col>
          {loading == false && userWishList ? (
            <>
              {userWishList.data.map((data) => {
                return (
                  <Col lg={4} sm={12} className="px-2  ps-5 wishlist-box ">
                    <Container fluid>
                      <Row
                        className="view-images"
                        onClick={() => {
                          navigate("/wishlist/" + data.attributes.slug);
                        }}
                      >
                        {data.attributes.products.data.map((product, index) => {
                          //.images.data[0].attributes.url
                          return (
                            <>
                              {index == 0 ? (
                                <Col lg={6} md={6} sm={6}>
                                  <Container fluid>
                                    <Row>
                                      <Col className="image-col">
                                        {" "}
                                        <img
                                          src={
                                            product.attributes.product_inventories.data[0]
                                              .attributes.images.data[0].attributes.formats.small
                                              .url
                                          }
                                          height={"100%"}
                                          width={"100%"}
                                        />
                                      </Col>
                                    </Row>
                                  </Container>
                                </Col>
                              ) : (
                                <>
                                  {index % 2 != 0 ? (
                                    <>
                                      <Col lg={3} md={3} sm={3}>
                                        <Container fluid>
                                          <Row>
                                            <Col className="image-col">
                                              {" "}
                                              <img
                                                src={
                                                  product.attributes.product_inventories.data[0]
                                                    .attributes.images.data[0].attributes.formats
                                                    .small.url
                                                }
                                                height={"100%"}
                                                width={"100%"}
                                              />
                                            </Col>
                                          </Row>
                                          <Row>
                                            <Col className="image-col">
                                              {" "}
                                              {data.attributes.products.data[index + 1] ? (
                                                <img
                                                  src={
                                                    data.attributes.products.data[index + 1]
                                                      .attributes.product_inventories.data[0]
                                                      .attributes.images.data[0].attributes.formats
                                                      .small.url
                                                  }
                                                  width={"100%"}
                                                  height={"100%"}
                                                />
                                              ) : (
                                                <></>
                                              )}{" "}
                                            </Col>
                                          </Row>
                                        </Container>
                                      </Col>
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </>
                              )}
                            </>
                          );

                          // console.log("products", product.attributes.product_inventories.data[0].attributes.images.data[0].attributes.url)
                        })}
                        {/* <Col lg={6} md={6} sm={6} >
                   <Container fluid>
                      
                       <Row>
                           <Col>         <img className="responsive"  src="/images/ogdenbookcase.jpg" height={height*0.236}   width={width*0.149} /></Col>
                       </Row>

                   </Container>
                    </Col> */}
                        {/* <Col  lg={3} md={3} sm={3} >
                   <Container fluid>
                       <Row>
                           <Col>         <img  className="responsive-2"    src="/images/pexels-maria-orlova-4915593.jpg" height={height*0.118} width={width*0.07343} /></Col>
                       </Row>
                       <Row>
                           <Col>         <img className="responsive-2"    src="/images/ogdenbookcase.jpg"  width={width*0.07343} height={height*0.118} /></Col>
                       </Row>
                   </Container>
                    </Col> */}
                        {/* <Col   lg={3} md={3} sm={3}    >
                   <Container fluid>
                       <Row>
                           <Col>         <img className="responsive-2"   src="/images/ogdenbookcase.jpg"  height={height*0.118} width={width*0.07343} /></Col>
                       </Row>
                       <Row>
                           <Col>   {height} , {width}       </Col>
                       </Row>
                   </Container>
                    </Col> */}
                      </Row>
                      <Row className="pt-2">
                        <Col>{data.attributes.wishlist_name}</Col>
                        <Col md={1} className="text-end">
                          <FontAwesomeIcon icon={faTrash} onClick={() => deleteList(data.id)} />
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                );
              })}
            </>
          ) : (
            <></>
          )}
        </Row>
        <Row>
          <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} />
        </Row>
        <Row>
          <Col>
            <Footer />
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Wishlists;
