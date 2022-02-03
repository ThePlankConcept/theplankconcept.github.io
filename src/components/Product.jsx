import React from "react";
import { Card, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${product.slug}`}>
        <Carousel interval={null}>
          {product.product_inventories[0] &&
            product.product_inventories[0].images.map((image) => {
              return (
                <Carousel.Item key={image.id}>
                  <img className="d-block w-100" src={image.formats.medium.url} alt={image.name} />
                </Carousel.Item>
              );
            })}
        </Carousel>
      </Link>

      <Card.Body>
        <Link to={`/product/${product.slug}`} style={{ textDecoration: "none" }}>
          <Card.Title as="div">
            <strong>{product.product_name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h5">dhs{Number(product.price).toFixed(2)}</Card.Text>
        <Card.Text>
          <strong>rent for dhs{Number(product.twelve_month_price / 12).toFixed(2)}</strong>
          /mo
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
