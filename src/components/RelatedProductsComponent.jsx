import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import { listCategory } from "../actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const RelatedProductsComponent = () => {
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, category } = categoryList;
  console.log("cat", category[0].attributes);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listCategory("accessories"));
  }, [dispatch]);

  console.log(category);
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
    <Carousel responsive={responsive}>
      {/* {category[0].attributes.products.data.map((c) => {
        console.log("cat", c);
        return <div>Hi</div>;
      })} */}
      <div>item1</div>
    </Carousel>
  );
};

export default RelatedProductsComponent;
