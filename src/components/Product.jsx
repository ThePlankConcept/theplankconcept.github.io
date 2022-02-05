import React from "react";
import { Card, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  const item = product.attributes;
  // console.log("item", item);
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/product/${item.slug}`}>
        <Carousel interval={null}>
          {item.product_inventories &&
            item.product_inventories.data.map(({ id, attributes }) => {
              const { sku, images } = attributes;
              return images.data.map((i) => {
                return (
                  <Carousel.Item key={i.id}>
                    <img className="d-block w-100" src={i.attributes.formats.medium.url} alt={sku} />
                  </Carousel.Item>
                );
              });
            })}
        </Carousel>
      </Link>

      <Card.Body>
        <Link to={`/product/${item.slug}`} style={{ textDecoration: "none" }}>
          <Card.Title as="div">
            <strong>{item.product_name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="h5">dhs{Number(item.price).toFixed(2)}</Card.Text>
        <Card.Text>
          <strong>rent for dhs{Number(item.twelve_month_price / 12).toFixed(2)}</strong>
          /mo
        </Card.Text>
        <Card.Text>
          <strong>{item.typeId.data.attributes.type_name}</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
