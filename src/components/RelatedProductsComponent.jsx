import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useState } from "react";
import { listCategory } from "../actions/categoryActions";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import "./relatedComponent.css";
import { addToCart2 } from "../actions/cartActions";
const RelatedProductsComponent = () => {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, category } = categoryList;
  // category[0] && console.log("cat", category[0].attributes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategory("accessories"));
  }, [dispatch]);
  const addToCartHandler = (id) => {
    dispatch(
      addToCart2({
        id: id,
        qty: "1",
        subscription: false,
        period: "0",
      })
    );
  };
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

  return (
    <Carousel
      swipeable={false}
      draggable={false}
      responsive={responsive}
      infinite={true}
      containerClass="carousel-container"
      itemClass="carousel-item-padding-0-px"
    >
      {category[0] ? (
        category[0].attributes.products.data.map((c) => {
          return (
            <div className="px-2 pt-5" key={c.id}>
              <Card
                key={c.id}
                className="moreIncartCard"
                style={{ width: "90%", height: "20rem" }}
                onClick={() => {
                  addToCartHandler(c.attributes.product_inventories.data[0].id);
                }}
              >
                <Card.Img
                  src={
                    c.attributes.product_inventories.data[0].attributes.images.data[0].attributes
                      .formats.medium.url
                  }
                  style={{ height: "80%", objectFit: "cover" }}
                />
                <Card.Body className="text-start p-0 pt-2">
                  <Card.Text className="productprice ">
                    AED{Number(Math.ceil(c.attributes.twelve_month_price / 12))}
                    /mo
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          );
        })
      ) : (
        <Loader />
      )}
    </Carousel>
  );
};

export default RelatedProductsComponent;

{
  /* // <div>
            //   <Card key={c.id} className="moreIncartCard">
            //     <Card.Img src={c.attributes.product_inventories.data[0].attributes.images.data[0].attributes.formats.medium.url} />
            //     <Card.Body className="text-start p-0 pt-2">
            //       <Card.Text className="productprice ">
            //         AED{Number(Math.ceil(c.attributes.twelve_month_price / 12))}
            //         /mo
            //       </Card.Text>
            //     </Card.Body>
            //   </Card>
            // </div> */
}
{
  /* <div>
<Container fluid>
  <Row>
    <Col>
      <img src={c.attributes.product_inventories.data[0].attributes.images.data[0].attributes.formats.medium.url} width="80%" height="100%" alt={c.attributes.product_name} />
    </Col>
  </Row>
  <Row>
    <Col className="relatedItemsName">{c.attributes.product_name}</Col>
  </Row>
  <Row>
    <Col className="relatedItemsPrice">AED {parseInt(c.attributes.twelve_month_price / parseInt(12))}/mo</Col>
  </Row>
</Container>
</div> */
}
