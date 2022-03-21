import React, { useState } from "react";
import {
  Nav,
  Navbar,
  Container,
  Button,
  Image,
  Dropdown,
  NavDropdown,
  Col,
  Row,
  Modal,
  FormControl,
  Form,
} from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { productsSearch } from "../actions/productActions";
import "./search.css";
import { debounce } from "lodash";

function Search(props) {
  const searchResult = useSelector((state) => state.searchProductsReducer);
  const { loading, error, product } = searchResult;
  console.log("products", product);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [show, setShow] = useState(false);
  const debouncedSearch = React.useRef(
    debounce(async (product_name) => {
      dispatch(productsSearch(product_name));
      //  setCharacters(await search(criteria));
    }, 300)
  ).current;
  const handleClick = (slug) => {
    navigate(`/product/${slug}`);
  };
  const handleOnChange = (e) => {
    debouncedSearch(e.target.value);
  };
  React.useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);
  return (
    <>
      {/* <Button variant="primary" onClick={() => setShow(true)}>
          Custom Width Modal
        </Button>
   */}
      <Modal
        {...props}
        // onHide={() => setShow(false)}
        fullscreen={true}
        aria-labelledby="example-custom-modal-styling-title"
        className="test-modal"
      >
        <Modal.Header closeButton>
          <Container>
            <Row>
              <Col className=" custom-margin justify-content-center">
                <Form className="">
                  <Form.Control
                    onChange={(e) => {
                      handleOnChange(e);
                    }}
                    type="search"
                    placeholder="Search"
                    className="me-2 search-bar"
                    aria-label="Search"
                  />
                  {/* <Button variant="outline-success">Search</Button> */}
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col className=" custom-margin justify-content-center">
                <p className="bold-item">Items</p>
                <ul className="ul-style">
                  {loading == false && product ? (
                    <>
                      {product.map((productData) => {
                        console.log(productData);
                        return (
                          <li
                            onClick={() => {
                              handleClick(productData.attributes.slug);
                            }}
                            className="items"
                          >
                            <Container>
                              <Row className="pb-3 centertheList">
                                <Col lg={1}>
                                  <img
                                    src={
                                      productData.attributes.product_inventories.data[0].attributes
                                        .images.data[0].attributes.formats.thumbnail.url
                                    }
                                    style={{ maxWidth: 50, maxHeight: 50 }}
                                  />
                                </Col>
                                <Col> {productData.attributes.product_name}</Col>
                              </Row>
                            </Container>
                          </li>
                        );
                      })}
                    </>
                  ) : (
                    <></>
                  )}
                </ul>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Search;
