import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Overlay,
  Modal,
  Popover,
  Image,
  Breadcrumb,
} from "react-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, relatedItems } from "../actions/productActions";
import {
  createWishlist,
  updateuserwishlist,
  getUserWishListAction,
} from "../actions/wishlistAction";
import { addToCart2 } from "../actions/cartActions";
import Footer from "../components/Footer";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircle,
  faArrowRight,
  faPlus,
  faHeart as heartSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as heartRegular } from "@fortawesome/free-regular-svg-icons";
import Header from "../components/Header";
import { LinkContainer } from "react-router-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./ProductPage.css";
const ProductPage2 = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [inventory, setInventory] = useState(0);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [selected, setSelected] = useState(1);
  const [popperShow, setPopperShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modal1Show, setModal1Show] = useState(false);
  const [modal2Show, setModal2Show] = useState(false);
  const [wishlist, setwishlist] = useState(false);
  const [newProductAdded, setNewProductAdded] = useState(false);
  const [wishlistProduct, setWishlistProduct] = useState("");
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const getUserWishList = useSelector((state) => state.getUserWishlist);
  const { userWishList } = getUserWishList;
  const elementTarget2 = useRef(null);
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  const relatedProducts = useSelector((state) => state.relatedProducts);
  const productdetail = { ...product[0].attributes };
  // console.log("related products", relatedProducts);
  // console.log("product in detail", productdetail, productDetails);

  const heartIconListener = (pid) => {
    setPopperShow(!popperShow);
    setWishlistProduct(pid);
  };

  useEffect(() => {
    dispatch(listProductDetails(slug));
    if (userInfo) {
      dispatch(getUserWishListAction(userInfo));
    }
    if (loading === false) {
      dispatch(relatedItems(productdetail.categories.data[0].id));
      setSelectedProduct(productdetail.product_inventories.data[0].id);
      // console.log("selected", selectedProduct, productdetail.product_inventories.data[0].id);
    }

    setSelected(1);
    if (loading === false) {
      document.getElementById("buy").style.transition = "max-height 0.1s ease-in";
      document.getElementById("rent-1").style.transition = "max-height 0.8s ease-in";
      document.getElementById("rent").style.transition = "max-height 0.8s ease-in";
      document.getElementById("buy").style.overflowY = "hidden";
      document.getElementById("buy").style.maxHeight = "0px";
      document.getElementById("rent").style.opacity = 1;
      document.getElementById("rent").style.maxHeight = "100%";
      document.getElementById("rent-1").style.opacity = 1;
      document.getElementById("rent-1").style.maxHeight = "100%";
    }

    window.scrollTo(0, 0);
  }, [dispatch, slug, loading, inventory, userInfo, wishlist, newProductAdded]); //here was also inventory

  const createWishlistHandler = (e) => {
    e.preventDefault();
    dispatch(createWishlist({ name: e.target[0].value }));
    setModal2Show(false);
    setwishlist(!wishlist);
  };

  const addToCartHandler = (quantity, subscription, period) => {
    dispatch(
      addToCart2({
        id: productdetail.product_inventories.data[inventory].id,
        qty: quantity,
        subscription,
        period,
      })
    );
  };
  const addProductToWishlisthandler = (wish_list) => {
    setNewProductAdded(!newProductAdded);
    dispatch(updateuserwishlist({ product: wishlistProduct, wishlistid: wish_list }));
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
    <Popover id="popover-basic" innerRef={ref} {...props} style={{ left: "20%", minWidth: "60%" }}>
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
        <Container>
          <Container
            className="overflow-auto"
            style={{ maxHeight: "6rem", borderBottom: ".5px solid" }}
          >
            {!loading &&
              userWishList &&
              userWishList.data.map((list) => {
                return (
                  <Row key={list.id} className="py-1">
                    <Col>
                      <Button
                        className="wishlistButton"
                        style={{ width: "100%", textTransform: "none" }}
                        onClick={() => {
                          addProductToWishlisthandler(list);
                        }}
                      >
                        {list.attributes.wishlist_name}
                      </Button>
                    </Col>
                  </Row>
                );
              })}
          </Container>

          <Row className="pt-2">
            <Col>
              <Button
                className="plank-wishlist-create-button btn text-center w-100 rounded-pill"
                onClick={() => setModal2Show(true)}
              >
                <FontAwesomeIcon icon={faPlus} /> Create a new Wishlist
              </Button>
            </Col>
          </Row>
        </Container>
      </Popover.Body>
    </Popover>
  ));
  let variable = "";
  const setTheFirstImage = (imgUrl) => {};
  const formSubmit_buy = (e) => {
    e.preventDefault();
    addToCartHandler(buyQuantity, false);
    // console.log(e.target.value);
  };
  const [image, setImage] = useState();
  const [quantity, setQuantity] = useState(1);
  const [period, setPeriod] = useState("12");
  const changeImage = (src) => {
    setImage(src);
    //"https://plank-strapi.herokuapp.com"
  };

  const addSomethingForCart = (index, id) => {
    setInventory(index);
    setSelectedProduct(id);
  };
  const formSubmit = (e) => {
    e.preventDefault();
    addToCartHandler(quantity, true, period);
  };
  const selectedRadio = (e) => {
    if (e.target.value == "rent") {
      setSelected(1);
      document.getElementById("buy").style.transition = "max-height 0.1s ease-in";
      document.getElementById("rent-1").style.transition = "max-height 0.8s ease-in";
      document.getElementById("rent").style.transition = "max-height 0.8s ease-in";
      document.getElementById("buy").style.overflowY = "hidden";
      document.getElementById("buy").style.maxHeight = "0px";
      document.getElementById("rent").style.opacity = 1;
      document.getElementById("rent").style.maxHeight = "100%";
      document.getElementById("rent-1").style.opacity = 1;
      document.getElementById("rent-1").style.maxHeight = "100%";
    } else {
      if (e.target.value == "buy") {
        setSelected(2);
        document.getElementById("rent").style.transition = "max-height 0.1s ease-in";
        document.getElementById("rent-1").style.transition = "max-height 0.1s ease-in";
        document.getElementById("buy").style.transition = "max-height 0.8s ease-in";
        document.getElementById("rent").style.overflowY = "hidden";
        document.getElementById("rent").style.maxHeight = "0px";
        document.getElementById("rent-1").style.overflowY = "hidden";
        document.getElementById("rent-1").style.maxHeight = "0px";
        document.getElementById("buy").style.opacity = 1;
        document.getElementById("buy").style.maxHeight = "100%";
      }
    }
  };
  const addDecimals = (num) => {
    return Math.ceil(num).toLocaleString("en");
  };
  return (
    <>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      {loading ? (
        <Row
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Col>
            <Loader />
          </Col>
        </Row>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container>
          <Row className="mb-3">
            <Col>
              <Container
                className="pt-5"
                style={{ boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px" }}
              >
                <Row>
                  {productDetails.product[0].attributes.product_inventories.data.length > 0 ? (
                    <Col>
                      <Breadcrumb>
                        <Breadcrumb.Item href="/products" style={{ color: "black" }}>
                          All Items
                        </Breadcrumb.Item>

                        <Breadcrumb.Item
                          href={`/products/${
                            productDetails &&
                            productDetails.product[0].attributes.categories.data[0].attributes
                              .category_name
                          }`}
                          style={{ textTransform: "capitalize" }}
                        >
                          {productDetails &&
                            productDetails.product[0].attributes.categories.data[0].attributes
                              .category_name}
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>
                          {productDetails && productDetails.product[0].attributes.product_name}
                        </Breadcrumb.Item>
                      </Breadcrumb>
                    </Col>
                  ) : (
                    <></>
                  )}
                </Row>
              </Container>
            </Col>
          </Row>
          <Row>
            <Col lg="1">
              <Container fluid>
                <Row>
                  <Col>
                    <Container fluid style={{ maxHeight: "41rem", overflowX: "auto" }}>
                      {productDetails && loading == false ? (
                        <>
                          {productdetail.product_inventories.data[
                            inventory
                          ].attributes.images.data.map((imgData, index) => {
                            return (
                              <Row className=" pe-2 pb-1  " key={index}>
                                <Col className="  d-flex justify-content-end">
                                  {/* "https://plank-strapi.herokuapp.com"+ */}
                                  <img
                                    onClick={() => {
                                      changeImage(imgData.attributes.formats.small.url);
                                    }}
                                    src={imgData.attributes.url}
                                    className="sideImages"
                                    alt="spacejoy-RqO6kwm4tZY-unsplash.jpg"
                                  />
                                </Col>
                              </Row>
                            );
                          })}
                        </>
                      ) : (
                        <></>
                      )}

                      {/* <Row className="pe-2 pb-1   " >
                <Col className="  d-flex justify-content-end">
                  <img  onClick={() =>{changeImage("/Images/barrowconsole.jpg")}} src="/Images/barrowconsole.jpg"  width="80%" height="100%" alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />
                  </Col>
                </Row>
                <Row className="pe-2 pb-1  " >
                <Col className="  d-flex justify-content-end">
               <img onClick={() =>{changeImage("/Images/signin.jpg")}}  src="/Images/signin.jpg"width="80%" height="100%" alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />       </Col>
                </Row>
                <Row className="pe-2  " >
                  <Col className="  d-flex justify-content-end">
                  <img  onClick={() =>{changeImage("/Images/signup.jpg")}}  src="/Images/signup.jpg" width="80%" height="100%"  alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />
                  </Col>
                </Row> */}
                    </Container>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col lg="6">
              <Container fluid>
                <Row>
                  <Col className="firstimageContainer" ref={elementTarget2}>
                    {/* "https://plank-strapi.herokuapp.com"+ */}
                    {productDetails && loading == false ? (
                      <>
                        <Image
                          fluid
                          src={
                            image
                              ? image
                              : productDetails.product[0].attributes.product_inventories.data[
                                  inventory
                                ].attributes.images.data[0].attributes.formats.medium.url
                          }
                          className="firstColImg "
                        />
                        {userInfo ? (
                          <>
                            <FontAwesomeIcon
                              icon={heartRegular}
                              width="100px"
                              className="the-wrapper icon-tag1"
                              onClick={() => heartIconListener(productDetails.product[0].id)}
                            />
                            <Overlay
                              container={elementTarget2.current}
                              show={popperShow}
                              placement="right"
                              rootClose
                              rootCloseEvent="click"
                            >
                              {(props) => <CustomPopovers props={props} />}
                            </Overlay>

                            <MyVerticallyCenteredModal2
                              show={modal2Show}
                              onHide={() => setModal2Show(false)}
                            />
                          </>
                        ) : (
                          <>
                            <img
                              src="/wishlisticon.png"
                              alt="cart"
                              width="100px"
                              className="the-wrapper icon-tag1"
                              onClick={() => setModal1Show(true)}
                            />
                            <MyVerticallyCenteredModal
                              show={modal1Show}
                              onHide={() => setModal1Show(false)}
                            />
                          </>
                        )}
                      </>
                    ) : (
                      <>x</>
                    )}
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col lg="5">
              <Container className="ps-5   " fluid>
                <Row>
                  <Col>
                    <Container className="" fluid>
                      <Row>
                        <Col>
                          <p className="firstParagraph">
                            {productDetails.product[0].attributes.product_name}
                          </p>
                        </Col>
                      </Row>
                      <Row></Row>
                      {productDetails.product[0].attributes.product_inventories.data.length > 1 ? (
                        <>
                          <Row>
                            <Col>
                              <p className="choose-color">Choose a color :</p>
                            </Col>
                          </Row>
                          <Row>
                            {productDetails.product[0].attributes.product_inventories.data.map(
                              (data, index) => {
                                return (
                                  <Col
                                    key={index}
                                    className="add-cursor"
                                    onClick={() => {
                                      addSomethingForCart(index, data.id);
                                    }}
                                    lg={1}
                                  >
                                    <FontAwesomeIcon
                                      icon={faCircle}
                                      style={{
                                        color: data.attributes.color.data.attributes.color_name,
                                        border: "1px solid black",
                                        borderRadius: "25px",
                                      }}
                                    />
                                  </Col>
                                );
                              }
                            )}
                          </Row>
                        </>
                      ) : (
                        <></>
                      )}
                      <Row>
                        <Col>
                          <p className="secondParagraph">Choose how you want it:</p>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <Container className="addTocart p-3">
                            <Row className="">
                              <Col lg="8">
                                <span className="thirdParagraph ">
                                  Rent for{" "}
                                  {period === "6"
                                    ? parseInt(
                                        (productDetails.product[0].attributes.six_month_price /
                                          parseInt(period)) *
                                          parseInt(quantity)
                                      )
                                    : parseInt(
                                        (productDetails.product[0].attributes.twelve_month_price /
                                          parseInt(period)) *
                                          parseInt(quantity)
                                      )}
                                  /mo
                                </span>
                              </Col>
                              <Col className="d-flex justify-content-end">
                                <Form.Check
                                  inline
                                  checked={selected === 1}
                                  onChange={selectedRadio}
                                  className="mt-1"
                                  value="rent"
                                  name="group1"
                                  type={"radio"}
                                  id={`inline-${"radio"}-1`}
                                />
                              </Col>
                            </Row>
                            <Row id="rent">
                              <Col>
                                <ul className="details">
                                  <li>Free delivery And assembly</li>
                                  <li>Free pick-up when you’re done</li>
                                  <li>Flexible pricing</li>
                                  <li>24/7 customer service</li>
                                </ul>
                              </Col>
                            </Row>
                            <Row id="rent-1">
                              <Col>
                                <Container fluid>
                                  <Row className="labeling">
                                    <Col>Quantity:</Col>
                                    <Col>Rent Period:</Col>
                                  </Row>
                                  <Row>
                                    <Col className="mx-1 ">
                                      <Form
                                        onSubmit={(e) => {
                                          formSubmit(e);
                                        }}
                                      >
                                        <Row>
                                          <Col>
                                            <Form.Select
                                              size="sm"
                                              className="customDropDown"
                                              aria-label="Default select example"
                                              onChange={(e) => {
                                                setQuantity(e.target.value);
                                              }}
                                            >
                                              <option value="1">1</option>
                                              <option value="2">2</option>
                                              <option value="3">3</option>
                                              <option value="4">4</option>
                                              <option value="5">5</option>
                                            </Form.Select>
                                          </Col>
                                          <Col>
                                            <Form.Select
                                              size="sm"
                                              className="customDropDown"
                                              aria-label="Default select example"
                                              defaultValue={"12"}
                                              onChange={(e) => {
                                                setPeriod(e.target.value);
                                              }}
                                            >
                                              <option value="6">6 Month</option>
                                              <option value="12">12 Month</option>
                                            </Form.Select>
                                          </Col>
                                        </Row>
                                        <Row className="pt-3 ">
                                          <Col lg="12">
                                            <Button type="submit" className="addToCardBtn">
                                              ADD TO CART
                                            </Button>
                                          </Col>
                                        </Row>
                                      </Form>
                                    </Col>
                                  </Row>
                                </Container>
                              </Col>
                            </Row>
                          </Container>
                        </Col>
                      </Row>
                      <Row className="mt-3">
                        <Col>
                          <Container fluid className="p-3 addTocart">
                            <Row>
                              <Col lg={8}>
                                <span className="buyNowText">
                                  {" "}
                                  Buy for{" "}
                                  {addDecimals(
                                    Number(productDetails.product[0].attributes.price * buyQuantity)
                                  )}{" "}
                                  AED
                                </span>
                              </Col>
                              <Col className="d-flex justify-content-end">
                                <Form.Check
                                  inline
                                  checked={selected === 2}
                                  value="buy"
                                  className="mt-1"
                                  onChange={selectedRadio}
                                  name="group1"
                                  type={"radio"}
                                  id={`inline-${"radio"}-2`}
                                />
                              </Col>
                            </Row>
                            <Row>
                              <Col></Col>
                            </Row>
                            <Row id="buy">
                              <Col>
                                <Container fluid>
                                  <Row className="pt-3">
                                    <Col>
                                      <ul className="details">
                                        <li>Fast, free delivery & assembly</li>
                                        <li>30 day return policy</li>
                                      </ul>
                                    </Col>
                                  </Row>
                                  <Row className="labeling  mx-1">
                                    <Col>Quantity:</Col>
                                    <Col></Col>
                                  </Row>

                                  <Row>
                                    <Col className="me-1  mt-1 mx-1 ">
                                      <Form
                                        onSubmit={(e) => {
                                          formSubmit_buy(e);
                                        }}
                                      >
                                        <Row>
                                          <Col>
                                            <Form.Select
                                              size="sm"
                                              className="customDropDown"
                                              aria-label="Default select example"
                                              onChange={(e) => {
                                                setBuyQuantity(e.target.value);
                                              }}
                                            >
                                              <option value="1">1</option>
                                              <option value="2">2</option>
                                              <option value="3">3</option>
                                              <option value="4">4</option>
                                              <option value="5">5</option>
                                            </Form.Select>
                                          </Col>
                                          <Col></Col>
                                          {/* <Col>
                            <Form.Select  size="sm" className="customDropDown" aria-label="Default select example"  onChange={(e)=>{setPeriod(e.target.value)}}>

<option value="6">6 Month</option>
<option value="12">12 Month</option>

</Form.Select>
                            </Col> */}
                                        </Row>
                                        <Row className="pt-3 ">
                                          <Col lg="12">
                                            <Button type="submit" className="addToCardBtn">
                                              ADD TO CART
                                            </Button>
                                          </Col>
                                        </Row>
                                      </Form>
                                    </Col>
                                  </Row>
                                </Container>
                              </Col>
                            </Row>
                          </Container>
                        </Col>
                      </Row>
                    </Container>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <Container>
                <Row>
                  <Col className="d-flex justify-content-center">
                    <span className="item-details-title ">Item Details</span>
                  </Col>
                </Row>
                <Row>
                  <Col className="lower-border"></Col>
                </Row>
              </Container>
            </Col>
            <Col>
              <Container>
                <Row>
                  <Col className="d-flex justify-content-center">
                    <span className="item-details-title-2 ">Why Plank ?</span>
                  </Col>
                </Row>
                <Row>
                  <Col className="lower-border-2"></Col>
                </Row>
              </Container>
            </Col>
          </Row>
          {productDetails && loading == false ? (
            <>
              <Row className="mt-5">
                <Col lg="5">
                  <Container fluid>
                    <Row>
                      <Col lg="2"></Col>
                      <Col>
                        <p className="item-details-header"> Desicription</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="2"></Col>
                      <Col>
                        <p className="item-details-text">
                          There’s nothing better than having a sectional that serves a dual-purpose!
                          The Sophie Sectional Bed has you covered with its comfortable sofa by day
                          and bed by night.{" "}
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="2"></Col>
                      <Col>
                        <p className="item-details-text">
                          {" "}
                          Complete with a chaise, this sofa bed optimizes your space.
                        </p>
                      </Col>
                    </Row>
                  </Container>
                </Col>

                <Col>
                  <Container>
                    <Row>
                      <Col lg="2"></Col>
                      <Col>
                        <Container>
                          <Row>
                            <Col>
                              <p className="item-details-header"> Specifications </p>
                            </Col>
                          </Row>
                          <Row>
                            <Col className="item-details-text">
                              <ul>
                                <li>Upholstery: 100% Polyester</li>
                                <li>Solid Eucalyptus Wood And Plywood Frame</li>
                                <li>High-Density Foam</li>
                              </ul>
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                  </Container>
                </Col>
                <Col>
                  <Container>
                    <Row>
                      <Col lg="2"></Col>
                      <Col>
                        <Container>
                          <Row>
                            <Col>
                              <p className="item-details-header"> Dimensions</p>
                            </Col>
                          </Row>
                          <Row className="item-details-text">
                            <Col>
                              <Container>
                                <Row>
                                  <Col lg="2">
                                    <img src="/images/height.png" width="60%" height="70%" />
                                  </Col>

                                  <Col>Height</Col>

                                  <Col>
                                    {
                                      productDetails.product[0].attributes.product_inventories
                                        .data[0].attributes.height
                                    }
                                  </Col>
                                </Row>
                              </Container>
                            </Col>
                          </Row>
                          <Row className="item-details-text">
                            <Col>
                              <Container>
                                <Row>
                                  <Col lg="2">
                                    <img src="/images/width.png" width="60%" height="70%" />
                                  </Col>
                                  <Col>Width</Col>

                                  <Col>
                                    {
                                      productDetails.product[0].attributes.product_inventories
                                        .data[0].attributes.width
                                    }
                                  </Col>
                                </Row>
                              </Container>
                            </Col>
                          </Row>
                          <Row className="item-details-text">
                            <Col>
                              <Container>
                                <Row>
                                  <Col lg="2">
                                    <img src="/images/length.png" width="60%" height="70%" />
                                  </Col>
                                  <Col>Length</Col>

                                  <Col>
                                    {
                                      productDetails.product[0].attributes.product_inventories
                                        .data[0].attributes.length
                                    }
                                  </Col>
                                </Row>
                              </Container>
                            </Col>
                          </Row>
                        </Container>
                      </Col>
                    </Row>
                  </Container>
                </Col>
              </Row>
            </>
          ) : (
            <></>
          )}

          <Row>
            <Col className="d-flex justify-content-center ">
              <p className="related-items-title py-5">Related Items</p>
            </Col>
          </Row>
          <Row>
            <Col className="pb-5 ps-5">
              <Carousel responsive={responsive}>
                {relatedProducts.loading === false &&
                  relatedProducts.product.map((data) => {
                    if (data.attributes.product_inventories.data[0]) {
                      return (
                        <div key={data.id}>
                          <Container fluid>
                            {/* "https://plank-strapi.herokuapp.com"+ */}
                            <Row>
                              <Col>
                                <a href={`/product/${data.attributes.slug}`}>
                                  <img
                                    // onClick={() => {
                                    //   redirectToProduct(data.attributes.slug);
                                    // }}
                                    src={
                                      data.attributes.product_inventories.data[0].attributes.images
                                        .data[0].attributes.formats.small.url
                                    }
                                    width="80%"
                                    height="100%"
                                    alt="spacejoy-RqO6kwm4tZY-unsplash.jpg"
                                  />
                                </a>
                              </Col>
                            </Row>
                            <Row>
                              <Col className="relatedItemsName">{data.attributes.product_name}</Col>
                            </Row>
                            <Row>
                              <Col className="relatedItemsPrice">
                                AED {parseInt(data.attributes.twelve_month_price / parseInt(12))}/mo
                              </Col>
                            </Row>
                          </Container>
                        </div>
                      );
                    }
                  })}
                {/* <div> <Container fluid>

    <Row><Col>
    <img onClick={() =>{changeImage("/Images/bowerfloorlamb.jpg")}} src="/Images/bowerfloorlamb.jpg"  width="80%" height="100%"  alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />
    </Col></Row>
  </Container></div>
  <div> <Container fluid>
    <Row><Col>        <img onClick={() =>{changeImage("/Images/bowerfloorlamb.jpg")}} src="/Images/bowerfloorlamb.jpg"  width="80%" height="100%"  alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />
    </Col></Row>
  </Container></div>
  <div> <Container fluid>
    <Row><Col>       <img onClick={() =>{changeImage("/Images/bowerfloorlamb.jpg")}} src="/Images/bowerfloorlamb.jpg"  width="80%" height="100%"  alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />
    </Col></Row>
  </Container></div>
  <div> <Container fluid>
    <Row><Col>       <img onClick={() =>{changeImage("/Images/bowerfloorlamb.jpg")}} src="/Images/bowerfloorlamb.jpg"  width="80%" height="100%"  alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />
    </Col></Row>
  </Container></div>
  <div> <Container fluid>
    <Row><Col>       <img onClick={() =>{changeImage("/Images/bowerfloorlamb.jpg")}} src="/Images/bowerfloorlamb.jpg"  width="80%" height="100%"  alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />
    </Col></Row>
  </Container></div> */}
              </Carousel>
            </Col>
          </Row>
        </Container>
      )}
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

export default ProductPage2;

////Latest Code from here

// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Form, Button } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { listProductDetails, relatedItems } from "../actions/productActions";
// import { addToCart2 } from "../actions/cartActions";
// import Footer from "../components/Footer";
// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCircle } from "@fortawesome/free-solid-svg-icons";
// import "./ProductPage.css";
// import Header from "../components/Header";
// const ProductPage2 = () => {
//   const { slug } = useParams();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [inventory, setInventory] = useState(0);
//   const [buyQuantity, setBuyQuantity] = useState(1);
//   const [selected, setSelected] = useState(1);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const responsive = {
//     superLargeDesktop: {
//       // the naming can be any, depends on you.
//       breakpoint: { max: 4000, min: 3000 },
//       items: 5,
//     },
//     desktop: {
//       breakpoint: { max: 3000, min: 1024 },
//       items: 3,
//     },
//     tablet: {
//       breakpoint: { max: 1024, min: 464 },
//       items: 2,
//     },
//     mobile: {
//       breakpoint: { max: 464, min: 0 },
//       items: 1,
//     },
//   };

//   const productDetails = useSelector((state) => state.productDetails);
//   const { loading, error, product } = productDetails;
//   const relatedProducts = useSelector((state) => state.relatedProducts);
//   const productdetail = { ...product[0].attributes };
//   console.log("related products", relatedProducts);
//   // console.log("product in detail", productdetail, productDetails);

//   useEffect(() => {
//     dispatch(listProductDetails(slug));

//     if (loading === false) {
//       dispatch(relatedItems(productdetail.categories.data[0].id));
//       setSelectedProduct(productdetail.product_inventories.data[0].id);
//       // console.log("selected", selectedProduct, productdetail.product_inventories.data[0].id);
//     }

//     console.log("useffect dispatched");
//     setSelected(1);
//     document.getElementById("buy").style.transition = "max-height 0.1s ease-in";
//     document.getElementById("rent-1").style.transition = "max-height 0.8s ease-in";
//     document.getElementById("rent").style.transition = "max-height 0.8s ease-in";
//     document.getElementById("buy").style.overflowY = "hidden";
//     document.getElementById("buy").style.maxHeight = "0px";
//     document.getElementById("rent").style.opacity = 1;
//     document.getElementById("rent").style.maxHeight = "100%";
//     document.getElementById("rent-1").style.opacity = 1;
//     document.getElementById("rent-1").style.maxHeight = "100%";

//     window.scrollTo(0, 0);
//   }, [dispatch, slug, loading, inventory]); //here was also inventory

//   const addToCartHandler = (quantity, subscription, period) => {
//     //  navigate(`/cart/${slug}?qty=${quantity}`);
//     // console.log("izzz", productDetails.product);
//     // dispatch(
//     //   addToCart(productDetails.product["0"].attributes.slug, quantity, subscription, inventory)
//     // );
//     dispatch(
//       addToCart2({
//         id: productdetail.product_inventories.data[inventory].id,
//         qty: quantity,
//         subscription,
//         period,
//       })
//     );
//   };

//   let variable = "";
//   const setTheFirstImage = (imgUrl) => {};
//   const formSubmit_buy = (e) => {
//     e.preventDefault();
//     addToCartHandler(buyQuantity, false);
//     // console.log(e.target.value);
//   };
//   const [image, setImage] = useState();
//   const [quantity, setQuantity] = useState(1);
//   const [period, setPeriod] = useState("12");
//   const changeImage = (src) => {
//     setImage(src);
//     //"https://plank-strapi.herokuapp.com"
//   };

//   const addSomethingForCart = (index, id) => {
//     setInventory(index);
//     setSelectedProduct(id);
//   };
//   const formSubmit = (e) => {
//     e.preventDefault();
//     addToCartHandler(quantity, true, period);
//   };
//   const selectedRadio = (e) => {
//     if (e.target.value == "rent") {
//       setSelected(1);
//       document.getElementById("buy").style.transition = "max-height 0.1s ease-in";
//       document.getElementById("rent-1").style.transition = "max-height 0.8s ease-in";
//       document.getElementById("rent").style.transition = "max-height 0.8s ease-in";
//       document.getElementById("buy").style.overflowY = "hidden";
//       document.getElementById("buy").style.maxHeight = "0px";
//       document.getElementById("rent").style.opacity = 1;
//       document.getElementById("rent").style.maxHeight = "100%";
//       document.getElementById("rent-1").style.opacity = 1;
//       document.getElementById("rent-1").style.maxHeight = "100%";
//     } else {
//       if (e.target.value == "buy") {
//         setSelected(2);
//         document.getElementById("rent").style.transition = "max-height 0.1s ease-in";
//         document.getElementById("rent-1").style.transition = "max-height 0.1s ease-in";
//         document.getElementById("buy").style.transition = "max-height 0.8s ease-in";
//         document.getElementById("rent").style.overflowY = "hidden";
//         document.getElementById("rent").style.maxHeight = "0px";
//         document.getElementById("rent-1").style.overflowY = "hidden";
//         document.getElementById("rent-1").style.maxHeight = "0px";
//         document.getElementById("buy").style.opacity = 1;
//         document.getElementById("buy").style.maxHeight = "100%";
//       }
//     }
//   };
//   const addDecimals = (num) => {
//     return Math.ceil(num).toLocaleString("en");
//   };
//   return (
//     <>
//       <Row>
//         <Col>
//           <Header />
//         </Col>
//       </Row>
//       <Container className="mt-5    ">
//         <Row>
//           <Col lg="1">
//             <Container fluid>
//               <Row>
//                 <Col>
//                   <Container fluid>
//                     {productDetails && loading == false ? (
//                       <>
//                         {productdetail.product_inventories.data[
//                           inventory
//                         ].attributes.images.data.map((imgData, index) => {
//                           return (
//                             <Row className=" pe-2 pb-1  " key={index}>
//                               <Col className="  d-flex justify-content-end">
//                                 {/* "https://plank-strapi.herokuapp.com"+ */}
//                                 <img
//                                   onClick={() => {
//                                     changeImage(imgData.attributes.formats.small.url);
//                                   }}
//                                   src={imgData.attributes.url}
//                                   className="sideImages"
//                                   alt="spacejoy-RqO6kwm4tZY-unsplash.jpg"
//                                 />
//                               </Col>
//                             </Row>
//                           );
//                         })}
//                       </>
//                     ) : (
//                       <></>
//                     )}

//                     {/* <Row className="pe-2 pb-1   " >
//                 <Col className="  d-flex justify-content-end">
//                   <img  onClick={() =>{changeImage("/Images/barrowconsole.jpg")}} src="/Images/barrowconsole.jpg"  width="80%" height="100%" alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />
//                   </Col>
//                 </Row>
//                 <Row className="pe-2 pb-1  " >
//                 <Col className="  d-flex justify-content-end">
//                <img onClick={() =>{changeImage("/Images/signin.jpg")}}  src="/Images/signin.jpg"width="80%" height="100%" alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />       </Col>
//                 </Row>
//                 <Row className="pe-2  " >
//                   <Col className="  d-flex justify-content-end">
//                   <img  onClick={() =>{changeImage("/Images/signup.jpg")}}  src="/Images/signup.jpg" width="80%" height="100%"  alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />
//                   </Col>
//                 </Row> */}
//                   </Container>
//                 </Col>
//               </Row>
//             </Container>
//           </Col>
//           <Col lg="6">
//             <Container fluid>
//               <Row>
//                 <Col>
//                   {/* "https://plank-strapi.herokuapp.com"+ */}
//                   {productDetails && loading == false ? (
//                     <img
//                       src={
//                         image
//                           ? image
//                           : productDetails.product[0].attributes.product_inventories.data[inventory]
//                               .attributes.images.data[0].attributes.formats.medium.url
//                       }
//                       className="firstColImg "
//                     />
//                   ) : (
//                     <>x</>
//                   )}
//                 </Col>
//               </Row>
//             </Container>
//           </Col>
//           <Col lg="5">
//             <Container className="ps-5   " fluid>
//               <Row>
//                 <Col>
//                   <Container className="" fluid>
//                     <Row>
//                       <Col>
//                         <p className="firstParagraph">
//                           {productDetails.product[0].attributes.product_name}
//                         </p>
//                       </Col>
//                     </Row>
//                     <Row></Row>
//                     {productDetails.product[0].attributes.product_inventories.data.length > 1 ? (
//                       <>
//                         <Row>
//                           <Col>
//                             <p className="choose-color">Choose a color :</p>
//                           </Col>
//                         </Row>
//                         <Row>
//                           {productDetails.product[0].attributes.product_inventories.data.map(
//                             (data, index) => {
//                               return (
//                                 <Col
//                                   key={index}
//                                   className="add-cursor"
//                                   onClick={() => {
//                                     addSomethingForCart(index, data.id);
//                                   }}
//                                   lg={1}
//                                 >
//                                   <FontAwesomeIcon
//                                     icon={faCircle}
//                                     style={{
//                                       color: data.attributes.color.data.attributes.color_name,
//                                       border: "1px solid black",
//                                       borderRadius: "25px",
//                                     }}
//                                   />
//                                 </Col>
//                               );
//                             }
//                           )}
//                         </Row>
//                       </>
//                     ) : (
//                       <></>
//                     )}
//                     <Row>
//                       <Col>
//                         <p className="secondParagraph">Choose how you want it:</p>
//                       </Col>
//                     </Row>
//                     <Row>
//                       <Col>
//                         <Container className="addTocart p-3">
//                           <Row className="">
//                             <Col lg="8">
//                               <span className="thirdParagraph ">
//                                 Rent for{" "}
//                                 {period === "6"
//                                   ? parseInt(
//                                       (productDetails.product[0].attributes.six_month_price /
//                                         parseInt(period)) *
//                                         parseInt(quantity)
//                                     )
//                                   : parseInt(
//                                       (productDetails.product[0].attributes.twelve_month_price /
//                                         parseInt(period)) *
//                                         parseInt(quantity)
//                                     )}
//                                 /mo
//                               </span>
//                             </Col>
//                             <Col className="d-flex justify-content-end">
//                               <Form.Check
//                                 inline
//                                 checked={selected === 1}
//                                 onChange={selectedRadio}
//                                 className="mt-1"
//                                 value="rent"
//                                 name="group1"
//                                 type={"radio"}
//                                 id={`inline-${"radio"}-1`}
//                               />
//                             </Col>
//                           </Row>
//                           <Row id="rent">
//                             <Col>
//                               <ul className="details">
//                                 <li>Free delivery And assembly</li>
//                                 <li>Free pick-up when you’re done</li>
//                                 <li>Flexible pricing</li>
//                                 <li>24/7 customer service</li>
//                               </ul>
//                             </Col>
//                           </Row>
//                           <Row id="rent-1">
//                             <Col>
//                               <Container fluid>
//                                 <Row className="labeling">
//                                   <Col>Quantity:</Col>
//                                   <Col>Rent Period:</Col>
//                                 </Row>
//                                 <Row>
//                                   <Col className="mx-1 ">
//                                     <Form
//                                       onSubmit={(e) => {
//                                         formSubmit(e);
//                                       }}
//                                     >
//                                       <Row>
//                                         <Col>
//                                           <Form.Select
//                                             size="sm"
//                                             className="customDropDown"
//                                             aria-label="Default select example"
//                                             onChange={(e) => {
//                                               setQuantity(e.target.value);
//                                             }}
//                                           >
//                                             <option value="1">1</option>
//                                             <option value="2">2</option>
//                                             <option value="3">3</option>
//                                             <option value="4">4</option>
//                                             <option value="5">5</option>
//                                           </Form.Select>
//                                         </Col>
//                                         <Col>
//                                           <Form.Select
//                                             size="sm"
//                                             className="customDropDown"
//                                             aria-label="Default select example"
//                                             defaultValue={"12"}
//                                             onChange={(e) => {
//                                               setPeriod(e.target.value);
//                                             }}
//                                           >
//                                             <option value="6">6 Month</option>
//                                             <option value="12">12 Month</option>
//                                           </Form.Select>
//                                         </Col>
//                                       </Row>
//                                       <Row className="pt-3 ">
//                                         <Col lg="12">
//                                           <Button type="submit" className="addToCardBtn">
//                                             ADD TO CART
//                                           </Button>
//                                         </Col>
//                                       </Row>
//                                     </Form>
//                                   </Col>
//                                 </Row>
//                               </Container>
//                             </Col>
//                           </Row>
//                         </Container>
//                       </Col>
//                     </Row>
//                     <Row className="mt-3">
//                       <Col>
//                         <Container fluid className="p-3 addTocart">
//                           <Row>
//                             <Col lg={8}>
//                               <span className="buyNowText">
//                                 {" "}
//                                 Buy for{" "}
//                                 {addDecimals(
//                                   Number(productDetails.product[0].attributes.price * buyQuantity)
//                                 )}{" "}
//                                 AED
//                               </span>
//                             </Col>
//                             <Col className="d-flex justify-content-end">
//                               <Form.Check
//                                 inline
//                                 checked={selected === 2}
//                                 value="buy"
//                                 className="mt-1"
//                                 onChange={selectedRadio}
//                                 name="group1"
//                                 type={"radio"}
//                                 id={`inline-${"radio"}-2`}
//                               />
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col></Col>
//                           </Row>
//                           <Row id="buy">
//                             <Col>
//                               <Container fluid>
//                                 <Row className="pt-3">
//                                   <Col>
//                                     <ul className="details">
//                                       <li>Fast, free delivery & assembly</li>
//                                       <li>30 day return policy</li>
//                                     </ul>
//                                   </Col>
//                                 </Row>
//                                 <Row className="labeling  mx-1">
//                                   <Col>Quantity:</Col>
//                                   <Col></Col>
//                                 </Row>

//                                 <Row>
//                                   <Col className="me-1  mt-1 mx-1 ">
//                                     <Form
//                                       onSubmit={(e) => {
//                                         formSubmit_buy(e);
//                                       }}
//                                     >
//                                       <Row>
//                                         <Col>
//                                           <Form.Select
//                                             size="sm"
//                                             className="customDropDown"
//                                             aria-label="Default select example"
//                                             onChange={(e) => {
//                                               setBuyQuantity(e.target.value);
//                                             }}
//                                           >
//                                             <option value="1">1</option>
//                                             <option value="2">2</option>
//                                             <option value="3">3</option>
//                                             <option value="4">4</option>
//                                             <option value="5">5</option>
//                                           </Form.Select>
//                                         </Col>
//                                         <Col></Col>
//                                         {/* <Col>
//                             <Form.Select  size="sm" className="customDropDown" aria-label="Default select example"  onChange={(e)=>{setPeriod(e.target.value)}}>

// <option value="6">6 Month</option>
// <option value="12">12 Month</option>

// </Form.Select>
//                             </Col> */}
//                                       </Row>
//                                       <Row className="pt-3 ">
//                                         <Col lg="12">
//                                           <Button type="submit" className="addToCardBtn">
//                                             ADD TO CART
//                                           </Button>
//                                         </Col>
//                                       </Row>
//                                     </Form>
//                                   </Col>
//                                 </Row>
//                               </Container>
//                             </Col>
//                           </Row>
//                         </Container>
//                       </Col>
//                     </Row>
//                   </Container>
//                 </Col>
//               </Row>
//             </Container>
//           </Col>
//         </Row>
//         <Row className="mt-5">
//           <Col>
//             <Container>
//               <Row>
//                 <Col className="d-flex justify-content-center">
//                   <span className="item-details-title ">Item Details</span>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col className="lower-border"></Col>
//               </Row>
//             </Container>
//           </Col>
//           <Col>
//             <Container>
//               <Row>
//                 <Col className="d-flex justify-content-center">
//                   <span className="item-details-title-2 ">Why Plank ?</span>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col className="lower-border-2"></Col>
//               </Row>
//             </Container>
//           </Col>
//         </Row>
//         {productDetails && loading == false ? (
//           <>
//             <Row className="mt-5">
//               <Col lg="5">
//                 <Container fluid>
//                   <Row>
//                     <Col lg="2"></Col>
//                     <Col>
//                       <p className="item-details-header"> Desicription</p>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col lg="2"></Col>
//                     <Col>
//                       <p className="item-details-text">
//                         There’s nothing better than having a sectional that serves a dual-purpose!
//                         The Sophie Sectional Bed has you covered with its comfortable sofa by day
//                         and bed by night.{" "}
//                       </p>
//                     </Col>
//                   </Row>
//                   <Row>
//                     <Col lg="2"></Col>
//                     <Col>
//                       <p className="item-details-text">
//                         {" "}
//                         Complete with a chaise, this sofa bed optimizes your space.
//                       </p>
//                     </Col>
//                   </Row>
//                 </Container>
//               </Col>

//               <Col>
//                 <Container>
//                   <Row>
//                     <Col lg="2"></Col>
//                     <Col>
//                       <Container>
//                         <Row>
//                           <Col>
//                             <p className="item-details-header"> Specifications </p>
//                           </Col>
//                         </Row>
//                         <Row>
//                           <Col className="item-details-text">
//                             <ul>
//                               <li>Upholstery: 100% Polyester</li>
//                               <li>Solid Eucalyptus Wood And Plywood Frame</li>
//                               <li>High-Density Foam</li>
//                             </ul>
//                           </Col>
//                         </Row>
//                       </Container>
//                     </Col>
//                   </Row>
//                 </Container>
//               </Col>
//               <Col>
//                 <Container>
//                   <Row>
//                     <Col lg="2"></Col>
//                     <Col>
//                       <Container>
//                         <Row>
//                           <Col>
//                             <p className="item-details-header"> Dimensions</p>
//                           </Col>
//                         </Row>
//                         <Row className="item-details-text">
//                           <Col>
//                             <Container>
//                               <Row>
//                                 <Col lg="2">
//                                   <img src="/images/height.png" width="60%" height="70%" />
//                                 </Col>

//                                 <Col>Height</Col>

//                                 <Col>
//                                   {
//                                     productDetails.product[0].attributes.product_inventories.data[0]
//                                       .attributes.height
//                                   }
//                                 </Col>
//                               </Row>
//                             </Container>
//                           </Col>
//                         </Row>
//                         <Row className="item-details-text">
//                           <Col>
//                             <Container>
//                               <Row>
//                                 <Col lg="2">
//                                   <img src="/images/width.png" width="60%" height="70%" />
//                                 </Col>
//                                 <Col>Width</Col>

//                                 <Col>
//                                   {
//                                     productDetails.product[0].attributes.product_inventories.data[0]
//                                       .attributes.width
//                                   }
//                                 </Col>
//                               </Row>
//                             </Container>
//                           </Col>
//                         </Row>
//                         <Row className="item-details-text">
//                           <Col>
//                             <Container>
//                               <Row>
//                                 <Col lg="2">
//                                   <img src="/images/length.png" width="60%" height="70%" />
//                                 </Col>
//                                 <Col>Length</Col>

//                                 <Col>
//                                   {
//                                     productDetails.product[0].attributes.product_inventories.data[0]
//                                       .attributes.length
//                                   }
//                                 </Col>
//                               </Row>
//                             </Container>
//                           </Col>
//                         </Row>
//                       </Container>
//                     </Col>
//                   </Row>
//                 </Container>
//               </Col>
//             </Row>
//           </>
//         ) : (
//           <></>
//         )}

//         <Row>
//           <Col className="d-flex justify-content-center ">
//             <p className="related-items-title py-5">Related Items</p>
//           </Col>
//         </Row>
//         <Row>
//           <Col className="pb-5 ps-5">
//             <Carousel responsive={responsive}>
//               {relatedProducts.loading === false &&
//                 relatedProducts.product.map((data) => {
//                   if (data.attributes.product_inventories.data[0]) {
//                     return (
//                       <div key={data.id}>
//                         <Container fluid>
//                           {/* "https://plank-strapi.herokuapp.com"+ */}
//                           <Row>
//                             <Col>
//                               <a href={`/product/${data.attributes.slug}`}>
//                                 <img
//                                   // onClick={() => {
//                                   //   redirectToProduct(data.attributes.slug);
//                                   // }}
//                                   src={
//                                     data.attributes.product_inventories.data[0].attributes.images
//                                       .data[0].attributes.formats.small.url
//                                   }
//                                   width="80%"
//                                   height="100%"
//                                   alt="spacejoy-RqO6kwm4tZY-unsplash.jpg"
//                                 />
//                               </a>
//                             </Col>
//                           </Row>
//                           <Row>
//                             <Col className="relatedItemsName">{data.attributes.product_name}</Col>
//                           </Row>
//                           <Row>
//                             <Col className="relatedItemsPrice">
//                               AED {parseInt(data.attributes.twelve_month_price / parseInt(12))}/mo
//                             </Col>
//                           </Row>
//                         </Container>
//                       </div>
//                     );
//                   }
//                 })}
//               {/* <div> <Container fluid>

//     <Row><Col>
//     <img onClick={() =>{changeImage("/Images/bowerfloorlamb.jpg")}} src="/Images/bowerfloorlamb.jpg"  width="80%" height="100%"  alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />
//     </Col></Row>
//   </Container></div>
//   <div> <Container fluid>
//     <Row><Col>        <img onClick={() =>{changeImage("/Images/bowerfloorlamb.jpg")}} src="/Images/bowerfloorlamb.jpg"  width="80%" height="100%"  alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />
//     </Col></Row>
//   </Container></div>
//   <div> <Container fluid>
//     <Row><Col>       <img onClick={() =>{changeImage("/Images/bowerfloorlamb.jpg")}} src="/Images/bowerfloorlamb.jpg"  width="80%" height="100%"  alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />
//     </Col></Row>
//   </Container></div>
//   <div> <Container fluid>
//     <Row><Col>       <img onClick={() =>{changeImage("/Images/bowerfloorlamb.jpg")}} src="/Images/bowerfloorlamb.jpg"  width="80%" height="100%"  alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />
//     </Col></Row>
//   </Container></div>
//   <div> <Container fluid>
//     <Row><Col>       <img onClick={() =>{changeImage("/Images/bowerfloorlamb.jpg")}} src="/Images/bowerfloorlamb.jpg"  width="80%" height="100%"  alt="spacejoy-RqO6kwm4tZY-unsplash.jpg" />
//     </Col></Row>
//   </Container></div> */}
//             </Carousel>
//           </Col>
//         </Row>
//       </Container>
//       <Row>
//         <Col>
//           {window.location.pathname !== "/login" && window.location.pathname !== "/register" && (
//             <Footer />
//           )}
//         </Col>
//       </Row>
//     </>
//   );
// };

// export default ProductPage2;
