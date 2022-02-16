import React from "react";
import { Card, Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./product.css";
const Product = ({ product }) => {
  const item = product.attributes;
  // console.log(item);
  return (
    <Card className="rounded productCard" style={{ width: "24rem", paddingBottom: "1.5rem", paddingLeft: "1rem" }} border="light">
      <Link to={`/product/${item.slug}`}>
        {item.product_inventories && (
          <Card.Img src={item.product_inventories.data[0].attributes.images.data[0].attributes.formats.medium.url} alt={item.product_inventories.data[0].attributes.sku} variant="top" />
        )}
      </Link>
      <Card.Body>
        <Link to={`/product/${item.slug}`} style={{ textDecoration: "none" }}>
          <Card.Title as="div" className="text-truncate producttitle" style={{ width: "100%" }}>
            <strong>{item.product_name}</strong>
          </Card.Title>
        </Link>
        <Card.Text className="productprice">
          AED{Number(Math.ceil(item.twelve_month_price / 12))}
          /mo
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;

// Carousel
// const Product = ({ product }) => {
//   const item = product.attributes;
//   // console.log("item", item);
//   return (
//     <Card className="my-3 p-3 rounded productCard">
//       <Link to={`/product/${item.slug}`}>
//         <Carousel interval={null}>
//           {item.product_inventories &&
//             item.product_inventories.data.map(({ id, attributes }) => {
//               const { sku, images } = attributes;
//               return images.data.map((i) => {
//                 return (
//                   <Carousel.Item key={i.id}>
//                     <img className="d-block w-100" src={i.attributes.formats.medium.url} alt={sku} />
//                   </Carousel.Item>
//                 );
//               });
//             })}
//         </Carousel>
//       </Link>
//       <Card.Body>
//         <Link to={`/product/${item.slug}`} style={{ textDecoration: "none" }}>
//           <Card.Title as="div">
//             <strong>{item.product_name}</strong>
//           </Card.Title>
//         </Link>
//         <Card.Text>
//           <strong>{Number(item.twelve_month_price / 12).toFixed(2)}</strong>
//           /mo
//         </Card.Text>
//       </Card.Body>
//     </Card>
//   );
// };

// export default Product;

// Just =one image

{
  /* <Card className="rounded productCard">
<Link to={`/product/${item.slug}`}>
  {item.product_inventories &&
    item.product_inventories.data.map(({ id, attributes }) => {
      const { sku, images } = attributes;
      return <Card.Img key={id} className="d-block w-100" src={images.data[0].attributes.formats.medium.url} alt={sku} variant="top" />;
    })}
</Link>
<Card.Body>
  <Link to={`/product/${item.slug}`} style={{ textDecoration: "none" }}>
    <Card.Title as="div">
      <strong>{item.product_name}</strong>
    </Card.Title>
  </Link>
  <Card.Text>
    <strong>{Number(item.twelve_month_price / 12).toFixed(2)}</strong>
    /mo
  </Card.Text>
</Card.Body>
</Card> */
}
