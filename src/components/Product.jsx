import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faPlus, faHeart as heartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import { Card, Row, Col, Button, Popover, Container, Modal, Form, Overlay } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Link, useLocation } from "react-router-dom";
import {
  createWishlist,
  updateuserwishlist,
  removeItemFromWishlist,
} from "../actions/wishlistAction";
import "./product.css";
import { useEffect } from "react";
import Loader from "./Loader";
const Product = ({ product, updateMethod, wishlistItem }) => {
  const [modal1Show, setModal1Show] = useState(false);
  const [modal2Show, setModal2Show] = useState(false);
  const [wishlist, setwishlist] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const [popperShow, setPopperShow] = useState(false);
  const { userInfo } = userLogin;
  const elementTarget = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState("");
  const location = useLocation();
  // console.log(location);
  const getUserWishList = useSelector((state) => state.getUserWishlist);
  const { loading, userWishList } = getUserWishList;
  const updateUserWishList = useSelector((state) => state.updateUserWishList);
  const { loading: updateWishlistLoading, success } = updateUserWishList;
  const deleteItemFromWishlist = useSelector((state) => state.deleteItemFromWishlist);
  const { loading: deleteItemLoading, success: deleted } = deleteItemFromWishlist;
  const [toggler, setToggler] = useState(false);
  const item = product.attributes;
  const dispatch = useDispatch();

  useEffect(() => {
    // console.log("userWooo", userWishList);
    // let tempValue = 0;
    // if (wishlistItem !== {}) {
    //   wishlistItem.map((item) =>
    //     Object.values(item).map((i) => {
    //       if (i.includes(product.id)) {
    //         tempValue += 1;
    //       }
    //     })
    //   );
    //   if (tempValue > 0) {
    //     setToggler(true);
    //   }
    // }
  }, [wishlist, loading, updateWishlistLoading]);

  const checkItemInWishlist = () => {
    if (userWishList) {
      const prod = userWishList.data.map((wish) => {
        return wish.attributes.products.data.some((p) => p.id === product.id);
      });
      if (prod.includes(true)) {
        return heartSolid;
      } else {
        return heartRegular;
      }
    } else {
      return heartRegular;
    }
  };
  const createWishlistHandler = (e) => {
    e.preventDefault();
    dispatch(createWishlist({ name: e.target[0].value }));
    setModal2Show(false);
    updateMethod();
    setwishlist(!wishlist);
  };

  const addDecimals = (num) => {
    return Math.ceil(num).toLocaleString("en");
  };
  const heartIconListener = (pid) => {
    setPopperShow(true);
    setSelectedProduct(pid);
    // if (toggler) {
    //   dispatch(removeItemFromWishlist(pid));
    //   setToggler(false);
    // } else {
    //   setPopperShow(true);
    //   setSelectedProduct(pid);
    // }
  };
  const removeProductFromWishlist = (wish_list) => {
    dispatch(removeItemFromWishlist({ product: product.id, wishlistId: wish_list.id }));
  };
  const addProductToWishlisthandler = (wish_list) => {
    dispatch(updateuserwishlist({ product: selectedProduct, wishlistid: wish_list }));
    setToggler(true);
  };
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Container>
          <Modal.Header closeButton style={{ borderBottom: "none" }} className="px-5 pt-5 pb-0">
            <Modal.Title id="contained-modal-title-vcenter" className="modal-heading ">
              Log in to save item to your wishlist
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Container className="px-5 pt-3 d-flex flex-column justify-content-center">
                  <Row className="py-3">
                    <Col
                      style={{
                        fontFamily: "Poppins",
                        fontSize: ".8rem",
                        fontWeight: "600",
                        color: "black",
                      }}
                    >
                      <FontAwesomeIcon className="pe-3" icon={faArrowRight} color="green" />
                      Save your favourites as you shop
                    </Col>
                  </Row>
                  <Row className="py-3">
                    <Col
                      style={{
                        fontFamily: "Poppins",
                        fontSize: ".8rem",
                        fontWeight: "600",
                        color: "black",
                      }}
                    >
                      <FontAwesomeIcon className="pe-3" icon={faArrowRight} color="green" />
                      Share your selections
                    </Col>
                  </Row>
                  <Row className="py-3">
                    <Col
                      style={{
                        fontFamily: "Poppins",
                        fontSize: ".8rem",
                        fontWeight: "600",
                        color: "black",
                      }}
                    >
                      <FontAwesomeIcon className="pe-3" icon={faArrowRight} color="green" />
                      Add the list to your cart
                    </Col>
                  </Row>
                </Container>
              </Col>
              <Col className="d-flex justify-content-center">
                <img
                  src="/Images/add-to-wishlist-159ecea0fa55d85a61eee1ef83411e65f55d0afb60c8eae6746de615a376f2d4.gif"
                  alt="add"
                  style={{ width: "18rem", height: "15rem" }}
                />
              </Col>
            </Row>
            <Row className="pt-5">
              <Col className="d-flex justify-content-end pe-5">
                <LinkContainer to="/register">
                  <Button type="submit" className=" modal-btn rounded-pill">
                    Create Account
                  </Button>
                </LinkContainer>
              </Col>
              <Col>
                <LinkContainer to={`/login?redirect=${location.pathname}`}>
                  <Button type="submit" className=" modal-btn-login rounded-pill">
                    Log In
                  </Button>
                </LinkContainer>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-center p-0" style={{ borderTop: "none" }}>
            <Button
              onClick={props.onHide}
              style={{
                border: "none",
                background: "none",
                color: "blue",
                textTransform: "none",
                textDecoration: "underline",
              }}
            >
              Cancel
            </Button>
          </Modal.Footer>
        </Container>
      </Modal>
    );
  }

  function MyVerticallyCenteredModal2(props) {
    return (
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{ zIndex: "99999" }}
      >
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
                  onSubmit={(e) => createWishlistHandler(e)}
                  autocomplete="off"
                  className="createNewWishListForm"
                >
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Wishlist Name</Form.Label>
                    <Form.Control type="text" placeholder="Wishlist Name" required />
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

  const CustomPopovers = React.forwardRef((props, ref) => (
    <Popover id="popover-basic" {...props} style={{ left: "15%", minWidth: "50%" }}>
      <Popover.Header
        as="p"
        className="text-start"
        style={{
          background: "transparent",
          fontFamily: "Poppins",
          fontSize: "100%",
          fontWeight: "600",
          paddingRight: "2rem",
        }}
      >
        Save this item to a wishlist
      </Popover.Header>

      <Popover.Body className="px-4">
        {loading || updateWishlistLoading ? (
          <Loader />
        ) : (
          <Container>
            <Container
              className="overflow-auto"
              style={{ maxHeight: "6rem", borderBottom: ".5px solid" }}
            >
              {userWishList &&
                userWishList.data.map((list) => {
                  return (
                    <Row key={list.id} className="py-1">
                      <Col>
                        {list.attributes.products.data.some((prod) => prod.id === product.id) ? (
                          <Button
                            className="rounded-pill"
                            style={{ width: "100%", textTransform: "none" }}
                            onClick={() => {
                              removeProductFromWishlist(list);
                            }}
                          >
                            {list.attributes.wishlist_name}
                          </Button>
                        ) : (
                          <Button
                            className="wishlistButton rounded-pill"
                            style={{ width: "100%", textTransform: "none" }}
                            onClick={() => {
                              addProductToWishlisthandler(list);
                            }}
                          >
                            {list.attributes.wishlist_name}
                          </Button>
                        )}
                      </Col>
                    </Row>
                  );
                })}
            </Container>

            <Row className="pt-2">
              <Col>
                <Button
                  className="plank-wishlist-create-button btn text-center w-100"
                  onClick={() => setModal2Show(true)}
                  style={{ borderRadius: "15px" }}
                >
                  <FontAwesomeIcon icon={faPlus} /> Create a new Wishlist
                </Button>
              </Col>
            </Row>
          </Container>
        )}
      </Popover.Body>
    </Popover>
  ));

  return (
    <>
      <Card
        className="rounded productCard"
        style={{ paddingBottom: "1.5rem", paddingLeft: "1rem" }}
        border="light"
        onMouseLeave={() => setPopperShow(false)}
        ref={elementTarget}
      >
        {item.product_inventories && (
          <>
            <Link to={`/product/${item.slug}`} className="cardImageProductListing">
              <Card.Img
                src={
                  item.product_inventories.data[0].attributes.images.data[0].attributes.formats
                    .medium.url
                }
                alt={item.product_inventories.data[0].attributes.sku}
                variant="top"
              />
            </Link>
            {userInfo || deleteItemLoading ? (
              <>
                <FontAwesomeIcon
                  icon={checkItemInWishlist()}
                  width="100px"
                  className="the-wrapper icon-tag"
                  onClick={() => heartIconListener(product.id)}
                />
                <Overlay container={elementTarget.current} show={popperShow} placement="right">
                  {(props) => <CustomPopovers props={props} />}
                </Overlay>

                <MyVerticallyCenteredModal2 show={modal2Show} onHide={() => setModal2Show(false)} />
              </>
            ) : (
              <>
                <img
                  src="/wishlisticon.png"
                  alt="cart"
                  width="100px"
                  className="the-wrapper icon-tag"
                  onClick={() => setModal1Show(true)}
                />
                <MyVerticallyCenteredModal show={modal1Show} onHide={() => setModal1Show(false)} />
              </>
            )}
          </>
        )}
        <Card.Body className="text-start p-0 pt-2">
          <Link to={`/product/${item.slug}`} style={{ textDecoration: "none" }}>
            <Card.Title as="div" className="text-truncate producttitle" style={{ width: "100%" }}>
              <strong>{item.product_name}</strong>
            </Card.Title>
          </Link>
          <Card.Text className="productBuyPrice">
            Buy for
            <span> AED {addDecimals(item.price)}</span>
          </Card.Text>
          <Card.Text className="productprice ">
            AED{addDecimals(item.twelve_month_price / 12)}
            /mo
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};

export default Product;
