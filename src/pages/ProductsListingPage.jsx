import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Select from "react-select";
import "./productlistpage.css";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import { listProducts } from "../actions/productActions";
import { listCategory } from "../actions/categoryActions";
import ProductListFilter from "../components/ProductListFilter";

const ProductsListingPage = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const productList = useSelector((state) => state.productList);
  const [sortValue, setSortValue] = useState();
  const { loading, error, products } = productList;
  console.log(useParams());
  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "plh", label: "Price: Low to High" },
    { value: "phl", label: "Price: High to Low" },
    { value: "atoz", label: "A to Z" },
  ];

  // Handler function for the sort
  const handleSortSelection = (e) => {
    setSortValue(e.value);
  };

  // Custom Styling for the react select
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "green" : "none",
    }),
    control: (provided, state) => ({
      ...provided,
      border: state.isFocused ? 0 : 0,
      boxShadow: state.isFocused ? 0 : 0,
      "&:hover": {
        border: state.isFocused ? 0 : 0,
      },
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transform: state.selectProps.menuIsOpen ? "rotate(-180deg)" : "rotate(0)",
      transition: "250ms",
    }),
  };
  const handleit = (e) => {
    console.log(e);
  };
  useEffect(() => {
    dispatch(listProducts(keyword));
    dispatch(listCategory(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container className="ProductListPageMainContainer" fluid>
          <Row className="py-5">
            <Col className="text-center py-5 productListHeading">
              <h1 className="text-capitalize">{`Shop ${keyword}`}</h1>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex pb-3 sortFromCol">
              <Select
                options={sortOptions}
                styles={customStyles}
                className="sortForm"
                defaultValue={sortOptions[0]}
                onChange={(e) => {
                  handleSortSelection(e);
                }}
                components={{ IndicatorSeparator: () => null }}
              />
            </Col>
          </Row>
          <Container className="ProductListPageSecondaryContainer" fluid>
            <Row className="h-100">
              <Col className="filterColumn ps-5" md={4} lg={3} sm={0} xl={3}>
                <ProductListFilter category={keyword} />
              </Col>
              <Col md={8} lg={9} xl={9}>
                <Row className="productsListRow">
                  {products.map((product) => {
                    return (
                      <Col key={product.id} xs={6} sm={6} md={6} lg={6} xl={4} className=" mb-5 d-flex justify-content-center">
                        <Product product={product} />
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </Container>
        </Container>
      )}
    </>
  );
};

export default ProductsListingPage;
