import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, useParams, useNavigate, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, relatedItems } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import "./ProductPage.css";
import Footer from "../components/Footer";
const ProductPage2 = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [buyQuantity, setBuyQuantity] = useState(1);
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
  console.log("related products", relatedProducts);
  console.log("product in detail", productdetail, productDetails);

  useEffect(() => {
    // console.log("useffect dispatched");
    dispatch(listProductDetails(slug));

    if (loading == false) {
      dispatch(relatedItems(productdetail.categories.data[0].id));
    }
    document.getElementById("buy").style.transition = "max-height 0.1s ease-in";
    document.getElementById("rent-1").style.transition = "max-height 0.8s ease-in";
    document.getElementById("rent").style.transition = "max-height 0.8s ease-in";
    document.getElementById("buy").style.overflowY = "hidden";
    document.getElementById("buy").style.maxHeight = "0px";
    document.getElementById("rent").style.opacity = 1;
    document.getElementById("rent").style.maxHeight = "100%";
    document.getElementById("rent-1").style.opacity = 1;
    document.getElementById("rent-1").style.maxHeight = "100%";

    setTheFirstImage("x");
    window.scrollTo(0, 0);
  }, [dispatch, slug, loading]);

  const addToCartHandler = () => {
    navigate(`/cart/${slug}?qty=${quantity}`);
  };
  const redirectToProduct = (slug) => {
    navigate(`/product/${slug}`);
  };

  let variable = "";
  const setTheFirstImage = (imgUrl) => {};
  const formSubmit_buy = (e) => {
    console.log(e.target.value);
  };
  const [image, setImage] = useState();
  const [quantity, setQuantity] = useState(1);
  const [period, setPeriod] = useState(12);
  const changeImage = (src) => {
    setImage(src);
    //"https://plank-strapi.herokuapp.com"
  };

  const formSubmit = (e) => {
    e.preventDefault();
    console.log(quantity, period);
  };
  const selected = (e) => {
    if (e.target.value == "rent") {
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

  return (
    <Container className="mt-5    ">
      <Row>
        <Col lg="1">
          <Container fluid>
            <Row>
              <Col>
                <Container fluid>
                  {productDetails ? (
                    <>
                      {productdetail.product_inventories.data.map((data) => {
                        return data.attributes.images.data.map((imgData, index) => {
                          return (
                            <Row className=" pe-2 pb-1  ">
                              <Col className="  d-flex justify-content-end" style={{ cursor: "pointer" }}>
                                {/* "https://plank-strapi.herokuapp.com"+ */}
                                <img
                                  onClick={() => {
                                    changeImage(imgData.attributes.url);
                                  }}
                                  src={imgData.attributes.url}
                                  className="sideImages"
                                  alt="spacejoy-RqO6kwm4tZY-unsplash.jpg"
                                />
                              </Col>
                            </Row>
                          );
                        });
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
              <Col>
                {/* "https://plank-strapi.herokuapp.com"+ */}
                {productDetails && loading == false ? <img src={image ? image : productDetails.product[0].attributes.product_inventories.data[0].attributes.images.data[0].attributes.url} className="firstColImg " /> : <>x</>}
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
                      <p className="firstParagraph">{productDetails.product[0].attributes.product_name}</p>
                    </Col>
                  </Row>
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
                            <span className="thirdParagraph ">Rent for {period == "6" ? parseInt((productDetails.product[0].attributes.six_month_price / parseInt(period)) * parseInt(quantity)) : parseInt((productDetails.product[0].attributes.twelve_month_price / parseInt(period)) * parseInt(quantity))}/mo</span>
                          </Col>
                          <Col className="d-flex justify-content-end">
                            <Form.Check inline checked onClick={selected} className="mt-1" value="rent" name="group1" type={"radio"} id={`inline-${"radio"}-1`} />
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
                            <span className="buyNowText"> Buy for {productDetails.product[0].attributes.price * buyQuantity} AED</span>
                          </Col>
                          <Col className="d-flex justify-content-end">
                            <Form.Check inline value="buy" className="mt-1" onClick={selected} name="group1" type={"radio"} id={`inline-${"radio"}-2`} />
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
                                      addToCartHandler();
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
                    <p className="item-details-text">There’s nothing better than having a sectional that serves a dual-purpose! The Sophie Sectional Bed has you covered with its comfortable sofa by day and bed by night. </p>
                  </Col>
                </Row>
                <Row>
                  <Col lg="2"></Col>
                  <Col>
                    <p className="item-details-text"> Complete with a chaise, this sofa bed optimizes your space.</p>
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

                              <Col>{productDetails.product[0].attributes.product_inventories.data[0].attributes.height}</Col>
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

                              <Col>{productDetails.product[0].attributes.product_inventories.data[0].attributes.width}</Col>
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

                              <Col>{productDetails.product[0].attributes.product_inventories.data[0].attributes.length}</Col>
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
            {relatedProducts.loading == false ? (
              relatedProducts.product.map((data) => {
                if (data.attributes.product_inventories.data[0]) {
                  return (
                    <div>
                      {" "}
                      <Container fluid>
                        {/* "https://plank-strapi.herokuapp.com"+ */}
                        <Row>
                          <Col>
                            <img
                              onClick={() => {
                                redirectToProduct(data.attributes.slug);
                              }}
                              src={data.attributes.product_inventories.data[0].attributes.images.data[0].attributes.url}
                              width="80%"
                              height="100%"
                              alt="spacejoy-RqO6kwm4tZY-unsplash.jpg"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col className="relatedItemsName">{data.attributes.product_name}</Col>
                        </Row>
                        <Row>
                          <Col className="relatedItemsPrice">AED {parseInt(data.attributes.twelve_month_price / parseInt(12))}/mo</Col>
                        </Row>
                      </Container>
                    </div>
                  );
                }
              })
            ) : (
              <></>
            )}
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
      <Row>
        <Col>{window.location.pathname !== "/login" && window.location.pathname !== "/register" && <Footer />}</Col>
      </Row>
    </Container>
  );
};

export default ProductPage2;
