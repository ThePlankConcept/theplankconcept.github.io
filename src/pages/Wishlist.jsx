import React from "react";
import { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faShareNodes } from "@fortawesome/free-solid-svg-icons";
import Loader from "../../src/components/Loader";
import Message from "./../components/Message";
import { deleteWishlist, getWishlistBySlug } from "../actions/wishlistAction";

import "./Wishlist.css";
import { useSelector, useDispatch } from "react-redux";
import Header from "../components/Header";

const Wishlist = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistData = useSelector((state) => state.getWishlistBySlugReducer);
  const { slug } = useParams();
  const { wishlists_loading, error, wishlist } = wishlistData;
  const deleteList = (wishlist) => {
    console.log(wishlist);
    dispatch(deleteWishlist(wishlist.data[0].id, userLogin));
    navigate("/wishlists");
  };
  useEffect(() => {
    dispatch(getWishlistBySlug(slug, userLogin));
  }, [dispatch]);
  return (
    <>
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      <Container fluid>
        {/* <Row className=" wishlist-heading mt-5">
            <Col> <span className="wishlist-name-heading">{(wishlists_loading)?(<></>):(<>{wishlist && wishlist.data[0].attributes.wishlist_name}</>)}</span> </Col>
        </Row> */}

        <Row className=" wishlist-heading py-5 ">
          <Col lg={2}>
            <Container fluid>
              <Row>
                <Col lg={1}>
                  <FontAwesomeIcon icon={faShareNodes} />
                </Col>

                <Col className="ps-1">
                  <span className="delete-list-text">Share </span>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col lg={2}>
            <Container fluid>
              <Row
                className="delete-btn"
                onClick={() => {
                  deleteList(wishlist);
                }}
              >
                <Col lg={1}>
                  <FontAwesomeIcon icon={faTrash} />
                </Col>

                <Col className="ps-1">
                  <span className="delete-list-text">Delete list</span>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
        <Row className="products-row mt-5">
          <Container fluid>
            <Row>
              <Col>
                {" "}
                <span className="saved-items-title">
                  {wishlists_loading ? (
                    <></>
                  ) : (
                    <>{wishlist && wishlist.data[0].attributes.wishlist_name}</>
                  )}
                </span>{" "}
              </Col>
            </Row>
            <Row>
              {wishlists_loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <>
                  {wishlist &&
                    wishlist.data.map((data) => {
                      return data.attributes.products.data.map((product) => {
                        return (
                          <Col lg={3} className="p-2">
                            <Container fluid>
                              <Row>
                                <Col>
                                  <img
                                    src={
                                      product.attributes.product_inventories.data[0].attributes
                                        .images.data[0].attributes.formats.medium.url
                                    }
                                    height="100%"
                                    width="100%"
                                  />
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <span>{product.attributes.product_name}</span>
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <Container fluid>
                                    <Row>
                                      <Col>
                                        <span className="rent-price">
                                          AED {product.attributes.twelve_month_price / 12}/mo
                                        </span>
                                      </Col>
                                      <Col>
                                        <span className="buy-price">
                                          AED {product.attributes.price} to buy
                                        </span>
                                      </Col>
                                    </Row>
                                  </Container>
                                </Col>
                              </Row>
                            </Container>
                          </Col>
                        );
                      });
                    })}
                </>
              )}
            </Row>
          </Container>
        </Row>
      </Container>
    </>
  );
};
export default Wishlist;
