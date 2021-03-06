import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Breadcrumb } from "react-bootstrap";
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
import Header from "../components/Header";
import { filterProducts } from "../actions/productActions";
import { listCategory } from "../actions/categoryActions";
import { getUserWishListAction } from "../actions/wishlistAction";

const ProductsListingPage = () => {
  const [sortValue, setSortValue] = useState();
  const [istypeOpen, setIsTypeOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [updateView, setUpdateView] = useState(false);
  const [wishListProduct, setWishlistProducts] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productFilter = useSelector((state) => state.productFilter);
  const { loading, error, products } = productFilter;
  const categoryList = useSelector((state) => state.categoryList);
  const { category } = categoryList;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const getUserWishList = useSelector((state) => state.getUserWishlist);
  const { userWishList } = getUserWishList;
  const { keyword } = useParams();
  const location = useLocation();
  const search = location.search;
  const ftype = new URLSearchParams(search).get("type")
    ? new URLSearchParams(search).get("type")
    : [];
  const fbrand = new URLSearchParams(search).get("brand")
    ? new URLSearchParams(search).get("brand")
    : [];

  const [filtertypeOption, setFiltertypeOption] = useState(
    ftype.indexOf(",") > -1 ? ftype.split(",") : ftype[0] === "" ? [] : ftype
  );
  const [filterbrandOption, setFilterbrandOption] = useState(
    fbrand.indexOf(",") > -1 ? fbrand.split(",") : fbrand[0] === "" ? [] : fbrand
  );

  let wishlistAndProducts = [];
  useEffect(() => {
    dispatch(getUserWishListAction("product"));
    dispatch(filterProducts({ keyword, type: filtertypeOption, brand: filterbrandOption }));
    let tempObj = {};
    if (userWishList && userWishList.data.length > 0) {
      userWishList.data.map((wish) => {
        tempObj[wish.id] = wish.attributes.products.data.map((p) => p.id);
        return wishlistAndProducts.push(tempObj);
      });
    }
    setWishlistProducts(wishlistAndProducts);
  }, [dispatch, keyword, filtertypeOption, filterbrandOption]);

  useEffect(() => {
    dispatch(listCategory(keyword));
  }, [dispatch, keyword]);

  const updateWishlist = async () => {
    if (userInfo) {
      dispatch(getUserWishListAction("products"));
    }
    setUpdateView(!updateView);
    // console.log("Its called");
  };

  let brands = {};
  let types = {};
  if (category[0]) {
    types = category[0].attributes.types;
    brands = category[0].attributes.brands;
  } else {
    types = category.types;
    brands = category.brands;
  }
  let brandIconRotate = isBrandOpen ? "fa-rotate-180" : "";
  let typeIconRotate = istypeOpen ? "fa-rotate-180" : "";
  let categoryIconRotate = isCategoryOpen ? "fa-rotate-180" : "";

  const handleFiltertypeChange = (e) => {
    const checkedType = e.target.id;

    if (filtertypeOption === []) {
      setFiltertypeOption(checkedType);
    } else if (typeof filtertypeOption === "string") {
      if (!e.target.checked) {
        setFiltertypeOption([]);
        navigate(location.pathname);
      } else {
        // console.log("elsepart");
        let tempArray = [filtertypeOption, checkedType];
        setFiltertypeOption(tempArray);
        if (tempArray.length > 0 && filterbrandOption.length === 0) {
          navigate(`?type=${tempArray}`);
          // console.log("part1");
        } else if (tempArray.length > 0 && filterbrandOption.length > 0) {
          navigate(`?type=${tempArray}&brand=${filterbrandOption}`);
          // console.log("part2");
        } else if (tempArray.length === 0 && filterbrandOption.length > 0) {
          navigate(`?brand=${tempArray}`);
          // console.log("part3");
        } else {
          navigate(location.pathname);
          // console.log("part4");
        }
      }
    } else {
      const indexFound = filtertypeOption.indexOf(checkedType);
      let updatedCategoryIds;
      if (indexFound === -1) {
        updatedCategoryIds = [...filtertypeOption, checkedType];
        setFiltertypeOption(updatedCategoryIds);
      } else {
        updatedCategoryIds = [...filtertypeOption];
        updatedCategoryIds.splice(indexFound, 1);
        setFiltertypeOption(updatedCategoryIds);
      }

      // dispatch(filterProducts({ keyword, type: updatedCategoryIds, brand: filterbrandOption }));
      if (updatedCategoryIds.length > 0 && filterbrandOption.length === 0) {
        navigate(`?type=${updatedCategoryIds}`);
      } else if (updatedCategoryIds.length > 0 && filterbrandOption.length > 0) {
        navigate(`?type=${updatedCategoryIds}&brand=${filterbrandOption}`);
      } else if (updatedCategoryIds.length === 0 && filterbrandOption.length > 0) {
        navigate(`?brand=${filterbrandOption}`);
      } else {
        navigate(`/products/${keyword}`);
      }
    }
  };

  const handleFilterbrandChange = (e) => {
    const checkedType = e.target.id;

    if (filterbrandOption === []) {
      setFilterbrandOption(checkedType);
    } else if (typeof filterbrandOption === "string") {
      if (!e.target.checked) {
        setFilterbrandOption([]);
        navigate(location.pathname);
      } else {
        let tempArray = [filterbrandOption, checkedType];
        setFilterbrandOption(tempArray);
        if (tempArray.length > 0 && filtertypeOption.length === 0) {
          navigate(`?brand=${tempArray}`);
        } else if (tempArray.length > 0 && filtertypeOption.length > 0) {
          navigate(`?type=${filtertypeOption}&brand=${tempArray}`);
        } else if (tempArray.length === 0 && filtertypeOption.length > 0) {
          navigate(`?type=${filtertypeOption}`);
        } else {
          navigate(location.pathname);
        }
      }
    } else {
      const indexFound = filterbrandOption.indexOf(checkedType);
      let updatedCategoryIds;
      if (indexFound === -1) {
        updatedCategoryIds = [...filterbrandOption, checkedType];
        setFilterbrandOption(updatedCategoryIds);
      } else {
        updatedCategoryIds = [...filterbrandOption];
        updatedCategoryIds.splice(indexFound, 1);
        setFilterbrandOption(updatedCategoryIds);
      }

      // dispatch(filterProducts({ keyword, type: updatedCategoryIds, brand: filterbrandOption }));
      if (updatedCategoryIds.length > 0 && filtertypeOption.length === 0) {
        navigate(`?brand=${updatedCategoryIds}`);
      } else if (updatedCategoryIds.length > 0 && filtertypeOption.length > 0) {
        navigate(`?type=${filtertypeOption}&brand=${updatedCategoryIds}`);
      } else if (updatedCategoryIds.length === 0 && filtertypeOption.length > 0) {
        navigate(`?type=${filtertypeOption}`);
      } else {
        navigate(`/products/${keyword}`);
      }
    }
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
      <Row>
        <Col>
          <Header />
        </Col>
      </Row>
      {loading ? (
        <>
          <Row
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <Col>
              <Loader />
            </Col>
          </Row>
        </>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Container className="ProductListPageMainContainer" fluid>
          <Row>
            <Col>
              <Container
                className="pt-5"
                style={{ boxShadow: "rgba(17, 17, 26, 0.1) 0px 1px 0px" }}
              >
                <Row>
                  <Col>
                    <Breadcrumb>
                      <Breadcrumb.Item href="/products" style={{ color: "black" }}>
                        All Items
                      </Breadcrumb.Item>
                      <Breadcrumb.Item
                        href="/products"
                        active
                        style={{ textTransform: "capitalize" }}
                      >
                        {keyword}
                      </Breadcrumb.Item>
                    </Breadcrumb>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>

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
                              <Form>
                                {types &&
                                  types.data.map((type) => {
                                    return (
                                      <Form.Check
                                        key={type.id}
                                        className="formCheck pb-1"
                                        checked={
                                          filtertypeOption.includes(
                                            type.attributes.type_name.toLowerCase()
                                          )
                                            ? true
                                            : false
                                        }
                                        type={"checkbox"}
                                        id={type.attributes.type_name.toLowerCase()}
                                        label={type.attributes.type_name}
                                        onChange={(e) => {
                                          handleFiltertypeChange(e);
                                        }}
                                      />
                                    );
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
                          <FontAwesomeIcon className={brandIconRotate} icon={faChevronDown} />
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
                                    return (
                                      <Form.Check
                                        key={brand.id}
                                        className="formCheck pb-1"
                                        checked={
                                          filterbrandOption.includes(
                                            brand.attributes.brand_name.toLowerCase()
                                          )
                                            ? true
                                            : false
                                        }
                                        type={"checkbox"}
                                        id={brand.attributes.brand_name.toLowerCase()}
                                        label={brand.attributes.brand_name}
                                      />
                                    );
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
                                  <LinkContainer
                                    to="/products/living%20room"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <p>Living Room</p>
                                  </LinkContainer>
                                </Col>
                              </Row>

                              <Row className="categoryOptionRow pb-2">
                                <Col>
                                  <LinkContainer
                                    to="/products/bedroom"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <p>Bedroom</p>
                                  </LinkContainer>
                                </Col>
                              </Row>
                              <Row className="categoryOptionRow pb-2">
                                <Col>
                                  <LinkContainer
                                    to="/products/dining%20room"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <p>Dining</p>
                                  </LinkContainer>
                                </Col>
                              </Row>
                              <Row className="categoryOptionRow pb-2">
                                <Col>
                                  <LinkContainer
                                    to="/products/office"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <p>Home Office</p>
                                  </LinkContainer>
                                </Col>
                              </Row>
                              <Row className="categoryOptionRow pb-2">
                                <Col>
                                  <LinkContainer
                                    to="/products/accessories"
                                    style={{ cursor: "pointer" }}
                                  >
                                    <p>Accessories</p>
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
                        <a
                          href="/products"
                          style={{
                            fontFamily: "Poppins",
                            fontWeight: "600",
                            fontSize: "18px",
                            paddingTop: "0",
                            marginTop: "0",
                          }}
                        >
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
                      <Col
                        key={product.id}
                        xs={6}
                        sm={6}
                        md={6}
                        lg={4}
                        xl={4}
                        className=" mb-5 d-flex justify-content-center"
                      >
                        <Product
                          product={product}
                          updateMethod={updateWishlist}
                          wishlistItem={wishListProduct}
                        />
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </Container>
          <Row>
            <Col>
              {window.location.pathname !== "/login" &&
                window.location.pathname !== "/register" && <Footer />}
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ProductsListingPage;

// return filtertypeOption.includes(
//   type.attributes.type_name.toLowerCase()
// ) ? (
//   <Form.Check
//     key={type.id}
//     className="formCheck pb-1"
//     checked={true}
//     type={"checkbox"}
//     id={type.attributes.type_name.toLowerCase()}
//     label={type.attributes.type_name}
//     onChange={(e) => {
//       handleFiltertypeChange(e);
//     }}
//   />
// ) : (
//   <Form.Check
//     key={type.id}
//     className="formCheck pb-1"
//     type={"checkbox"}
//     id={type.attributes.type_name.toLowerCase()}
//     label={type.attributes.type_name}
//     onChange={(e) => {
//       handleFiltertypeChange(e);
//     }}
//   />
// );
