import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Select from "react-select";
import "./productlistpage.css";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Footer from "../components/Footer";
import Product from "../components/Product";
import { filterProducts } from "../actions/productActions";
import { listCategory } from "../actions/categoryActions";

const ProductsListingPage = () => {
  const [sortValue, setSortValue] = useState();
  const [istypeOpen, setIsTypeOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productFilter = useSelector((state) => state.productFilter);
  const { loading, error, products } = productFilter;
  const categoryList = useSelector((state) => state.categoryList);
  const { category } = categoryList;
  console.log(category);
  const { keyword } = useParams();
  const search = useLocation().search;
  const qtype = new URLSearchParams(search).get("type") ? new URLSearchParams(search).get("type") : [];
  const qbrand = new URLSearchParams(search).get("brand") ? new URLSearchParams(search).get("brand") : [];
  const [filtertypeOption, setFiltertypeOption] = useState([qtype]);
  const [filterbrandOption, setFilterbrandOption] = useState([qbrand]);

  useEffect(() => {
    dispatch(filterProducts({ keyword, type: qtype, brand: qbrand }));
  }, [dispatch, keyword]);

  useEffect(() => {
    dispatch(listCategory(keyword));
  }, [dispatch, keyword]);

  let brands = {};
  let types = {};
  if (category[0]) {
    types = category[0].attributes.types;
    brands = category[0].attributes.brands;
    console.log(category);
  } else {
    types = category.types;
    brands = category.brands;
    // console.log("types", types);
    // console.log("brands", brands);
  }
  let brandIconRotate = isBrandOpen ? "fa-rotate-180" : "";
  let typeIconRotate = istypeOpen ? "fa-rotate-180" : "";
  let categoryIconRotate = isCategoryOpen ? "fa-rotate-180" : "";

  const handleFiltertypeChange = (e) => {
    const checkedType = e.target.id;
    const allTypeFilters = [...filtertypeOption];

    const indexFound = allTypeFilters.indexOf(checkedType);
    let updatedCategoryIds;
    if (indexFound === -1) {
      updatedCategoryIds = [...filtertypeOption, checkedType];
      setFiltertypeOption(updatedCategoryIds);
    } else {
      updatedCategoryIds = [...filtertypeOption];
      updatedCategoryIds.splice(indexFound, 1);
      setFiltertypeOption(updatedCategoryIds);
    }
    dispatch(filterProducts({ keyword, type: updatedCategoryIds, brand: filterbrandOption }));
    navigate(`?type=${updatedCategoryIds.length > 0 ? updatedCategoryIds : "alltypes"}&brand=${filterbrandOption.length > 0 ? filterbrandOption : "allbrands"}`);
  };

  const handleFilterbrandChange = (e) => {
    const checkedType = e.target.id;
    const allBrandFilters = [...filterbrandOption];

    const indexFound = allBrandFilters.indexOf(checkedType);
    let updatedCategoryIds;
    if (indexFound === -1) {
      updatedCategoryIds = [...filterbrandOption, checkedType];
      setFilterbrandOption(updatedCategoryIds);
    } else {
      updatedCategoryIds = [...filterbrandOption];
      updatedCategoryIds.splice(indexFound, 1);
      setFilterbrandOption(updatedCategoryIds);
    }
    dispatch(filterProducts({ keyword, brand: updatedCategoryIds, type: filtertypeOption }));
    navigate(`?type=${filtertypeOption.length > 0 ? filtertypeOption : "alltypes"}&brand=${updatedCategoryIds.length > 0 ? updatedCategoryIds : "allbrands"}`);
  };

  const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "plh", label: "Price: Low to High" },
    { value: "phl", label: "Price: High to Low" },
    { value: "atoz", label: "A to Z" },
  ];

  // Handler function for the sort
  const handleSortSelection = (e) => {
    setSortValue(e.value);
    switch (e.value) {
      case "phl":
        products.sort((a, b) => {
          return b.attributes.twelve_month_price - a.attributes.twelve_month_price;
        });
        break;
      case "plh":
        products.sort((a, b) => {
          return a.attributes.twelve_month_price - b.attributes.twelve_month_price;
        });
        break;
      case "atoz":
        products.sort((a, b) => {
          var nameA = a.attributes.product_name.toUpperCase(); // ignore upper and lowercase
          var nameB = b.attributes.product_name.toUpperCase(); // ignore upper and lowercase
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
        break;
      default:
        products.sort((a, b) => {
          return b.attributes.product_name - a.attributes.product_name;
        });
        break;
    }
  };

  // Custom Styling for the react select
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "#ecf0f5" : "none",
      color: state.isSelected ? "black" : "black",
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
  useEffect(() => {}, [sortValue]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container className="ProductListPageMainContainer" fluid>
          <Row className="pt-5">
            <Col className="text-center pt-2 productListHeading">
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
                isSearchable={false}
              />
            </Col>
          </Row>
          <Container className="ProductListPageSecondaryContainer" fluid>
            <Row className="h-100">
              <Col className="filterColumn ps-5" md={4} lg={3} sm={0} xl={3}>
                <Container className="filterContainer">
                  <Row>
                    <hr className="hr-1" />
                    {/* Item Type Row */}
                    <Row className="pe-2">
                      <Row
                        className="filterContainerRow"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          setIsTypeOpen(!istypeOpen);
                        }}
                      >
                        <Col md={11} lg={11} sm={11} xs={11}>
                          <Button className="text-capitalize">Item Type</Button>
                        </Col>
                        <Col md={1} lg={1} sm={1} xs={1}>
                          <FontAwesomeIcon className={typeIconRotate} icon={faChevronDown} />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          {istypeOpen && (
                            <Container className="filterOptionContainer ">
                              <Form
                                onChange={(e) => {
                                  handleFiltertypeChange(e);
                                }}
                              >
                                {types &&
                                  types.data.map((type) => {
                                    {
                                      return filtertypeOption.includes(type.attributes.type_name) ? <Form.Check key={type.id} className="formCheck pb-1" checked="true" type={"checkbox"} id={type.attributes.type_name} label={type.attributes.type_name} /> : <Form.Check key={type.id} className="formCheck pb-1" type={"checkbox"} id={type.attributes.type_name} label={type.attributes.type_name} />;
                                    }
                                  })}
                              </Form>
                            </Container>
                          )}
                        </Col>
                      </Row>
                    </Row>
                    <hr className="hr-1" />
                    {/* Brand Row */}
                    <Row className="pe-2">
                      <Row
                        className="filterContainerRow"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          setIsBrandOpen(!isBrandOpen);
                        }}
                      >
                        <Col md={11} lg={11} sm={11} xs={11}>
                          <Button className="text-capitalize">Brand</Button>
                        </Col>
                        <Col md={1} lg={1} sm={1} xs={1}>
                          <FontAwesomeIcon className={brandIconRotate} i icon={faChevronDown} />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          {isBrandOpen && (
                            <Container className="filterOptionContainer ">
                              <Form
                                onClick={(e) => {
                                  handleFilterbrandChange(e);
                                }}
                              >
                                {brands &&
                                  brands.data.map((brand) => {
                                    {
                                      return filterbrandOption.includes(brand.attributes.brand_name) ? (
                                        <Form.Check key={brand.id} className="formCheck pb-1" checked="true" type={"checkbox"} id={brand.attributes.brand_name} label={brand.attributes.brand_name} />
                                      ) : (
                                        <Form.Check key={brand.id} className="formCheck pb-1" type={"checkbox"} id={brand.attributes.brand_name} label={brand.attributes.brand_name} />
                                      );
                                    }
                                  })}
                              </Form>
                            </Container>
                          )}
                        </Col>
                      </Row>
                    </Row>
                    <hr className="hr-1" />
                    {/* Category Row */}
                    <Row className="pe-2">
                      <Row
                        className="filterContainerRow"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          setIsCategoryOpen(!isCategoryOpen);
                        }}
                      >
                        <Col md={11} lg={11} sm={11} xs={11}>
                          <Button className="text-capitalize">Shop by Category</Button>
                        </Col>
                        <Col md={1} lg={1} sm={1} xs={1}>
                          <FontAwesomeIcon className={categoryIconRotate} icon={faChevronDown} />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          {isCategoryOpen && (
                            <Container className="filterOptionContainer ">
                              <Row className="categoryOptionRow underline pb-2">
                                <Col>
                                  <LinkContainer to="/products/living%20room" style={{ cursor: "pointer" }}>
                                    <p>Living Room</p>
                                  </LinkContainer>
                                </Col>
                              </Row>

                              <Row className="categoryOptionRow pb-2">
                                <Col>
                                  <LinkContainer to="/products/bed%20room" style={{ cursor: "pointer" }}>
                                    <p>BedRoom</p>
                                  </LinkContainer>
                                </Col>
                              </Row>
                              <Row className="categoryOptionRow pb-2">
                                <Col>
                                  <LinkContainer to="/products/dining%20room" style={{ cursor: "pointer" }}>
                                    <p>Dining</p>
                                  </LinkContainer>
                                </Col>
                              </Row>
                              <Row className="categoryOptionRow pb-2">
                                <Col>
                                  <LinkContainer to="/products/office" style={{ cursor: "pointer" }}>
                                    <p>Home Office</p>
                                  </LinkContainer>
                                </Col>
                              </Row>
                              <Row className="categoryOptionRow pb-2">
                                <Col>
                                  <LinkContainer to="/products/decor" style={{ cursor: "pointer" }}>
                                    <p>Decor</p>
                                  </LinkContainer>
                                </Col>
                              </Row>
                              <Row className="categoryOptionRow pb-2">
                                <Col>
                                  <LinkContainer to="/products/outdoor" style={{ cursor: "pointer" }}>
                                    <p>Outdoor</p>
                                  </LinkContainer>
                                </Col>
                              </Row>
                            </Container>
                          )}
                        </Col>
                      </Row>
                    </Row>
                    <hr className="hr-1" />
                    {/* Browse all products row */}
                    <Row>
                      <Col>
                        <a href="/products" style={{ fontFamily: "Poppins", fontWeight: "600", fontSize: "18px", paddingTop: "0", marginTop: "0" }}>
                          Or, browse all furniture
                        </a>
                      </Col>
                    </Row>
                  </Row>
                </Container>
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
          <Row>
            <Col>{window.location.pathname !== "/login" && window.location.pathname !== "/register" && <Footer />}</Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ProductsListingPage;
