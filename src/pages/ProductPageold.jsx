import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Card, Button, Form, Carousel } from "react-bootstrap";
// import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import { listProductDetails } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
const ProductPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productdetail = { ...product[0].attributes };

  // console.log("product", productdetail, productDetails);

  useEffect(() => {
    // console.log("useffect dispatched");
    dispatch(listProductDetails(slug));
  }, [dispatch, slug]);

  const addToCartHandler = () => {
    console.log("Item Added");
    navigate(`/cart/${slug}?qty=${qty}`);
  };
  return (
    <>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : productdetail !== {} ? (
        <Row>
          <Col md={6}>
            <Carousel interval={null}>
              {productdetail.product_inventories &&
                productdetail.product_inventories.data.map((sku) => {
                  return sku.attributes.images.data.map((im) => {
                    return (
                      <Carousel.Item key={im.id}>
                        <img className="d-block w-100" src={im.attributes.formats.medium.url} alt={im.id} />
                      </Carousel.Item>
                    );
                  });
                })}
            </Carousel>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{productdetail.product_name}</h3>
              </ListGroup.Item>
              {/* <ListGroup.Item>
                <Rating value={product.rating ? product.rating : 0} text={`${product.numReviews} reviews`} />
              </ListGroup.Item> */}
              <ListGroup.Item>Price:${productdetail.twelve_month_price}/month</ListGroup.Item>
              <ListGroup.Item>Description: {productdetail.product_desc}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card border="none">
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${productdetail.twelve_month_price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>{productdetail.product_inventories.data[0] && productdetail.product_inventories.data[0].attributes.quantity > 0 ? "In Stock" : "Out Of Stock"}</Col>
                  </Row>
                </ListGroup.Item>

                {productdetail.product_inventories.data[0] && productdetail.product_inventories.data[0].attributes.quantity > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                          {[...Array(productdetail.product_inventories.data[0].attributes.quantity).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button onClick={addToCartHandler} className="btn-block" type="button" disabled={productdetail.product_inventories.data[0] && productdetail.product_inventories.data[0].attributes.quantity === 0}>
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default ProductPage;
