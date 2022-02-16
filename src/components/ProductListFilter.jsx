import React, { useState } from "react";
import { Container, Row, Col, Button, Form, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./productlistfilter.css";
import { useEffect } from "react";
const ProductListFilter = () => {
  const [istypeOpen, setIsTypeOpen] = useState(true);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(true);
  const [filtertypeOption, setFiltertypeOption] = useState([]);
  const [filterbrandOption, setFilterbrandOption] = useState([]);

  const navigate = useNavigate();
  let brands = {};
  let types = {};
  const categoryList = useSelector((state) => state.categoryList);
  const { loading, error, category } = categoryList;

  if (category[0]) {
    types = category[0].attributes.types;
    brands = category[0].attributes.brands;
    // console.log(brands, types);
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
    let tempArr = [...filtertypeOption];
    if (e.target.checked) {
      tempArr.push(e.target.id);
    } else {
      tempArr.splice(tempArr.indexOf(e.target.id));
    }
    setFiltertypeOption(tempArr);
    // console.log(filtertypeOption);
  };
  const handleFilterbrandChange = (e) => {
    let tempArr1 = [...filterbrandOption];
    if (e.target.checked) {
      tempArr1.push(e.target.id);
    } else {
      tempArr1.splice(tempArr1.indexOf(e.target.id));
    }
    setFilterbrandOption(tempArr1);
    // console.log(filterbrandOption);
  };

  useEffect(() => {
    console.log("do Something");
  }, [filterbrandOption, filtertypeOption]);

  return (
    <Container className="filterContainer">
      <Row>
        <hr />
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
                <Container className="filterOptionContainer ps-3">
                  <Form
                    onChange={(e) => {
                      handleFiltertypeChange(e);
                    }}
                  >
                    {types &&
                      types.data.map((type) => {
                        return <Form.Check key={type.id} className="formCheck pb-1" type={"checkbox"} id={type.attributes.type_name} label={type.attributes.type_name} />;
                      })}
                  </Form>
                </Container>
              )}
            </Col>
          </Row>
        </Row>
        <hr />
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
                <Container className="filterOptionContainer ps-3">
                  <Form
                    onClick={(e) => {
                      handleFilterbrandChange(e);
                    }}
                  >
                    {brands &&
                      brands.data.map((brand) => {
                        return <Form.Check key={brand.id} className="formCheck pb-1" type={"checkbox"} id={brand.attributes.brand_name} label={brand.attributes.brand_name} />;
                      })}
                  </Form>
                </Container>
              )}
            </Col>
          </Row>
        </Row>
        <hr />
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
                <Container className="filterOptionContainer ps-3">
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
                        <p>Bed Room</p>
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
        <hr />
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
  );
};

export default ProductListFilter;
