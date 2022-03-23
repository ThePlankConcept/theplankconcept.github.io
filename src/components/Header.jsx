import React, { useState } from "react";

import "./header.css";
import AboutUs from "./AboutUs";
import Search from "./Search";
import { LinkContainer } from "react-router-bootstrap";
import {
  Nav,
  Badge,
  Navbar,
  Container,
  Button,
  Image,
  Dropdown,
  NavDropdown,
  Col,
  Row,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RoomsMenu from "./RoomsMenu";
import ProductMenu from "./ProductsMenu";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const cart = useSelector((state) => state.cart2);
  const { subscribed, purchase } = cart;
  const [menu, setMenu] = useState();
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const [onShow, setOnShow] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  // console.log("header", userInfo);
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/");
  };
  function chbg(value) {
    // display: none;
    // position: absolute;

    // width: 100%;
    // left: 0;
    // box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    // z-index: 1;
    setMenu(value);
    setOnShow(true);
    document.getElementById("b").style.maxHeight = "500px";
    document.getElementById("b").style.display = "";
    document.getElementById("b").style.position = "absolute";
    document.getElementById("b").style.zIndex = "1";
    document.getElementById("b").style.opacity = 1;
    // document.getElementById('b').style.maxHeight= "500px"
  }
  window.onscroll = function (e) {
    // print "false" if direction is down and "true" if up
    // console.log(this.oldScroll > this.scrollY);
    this.oldScroll = this.scrollY;
    if (this.oldScroll > this.scrollY) {
    } else {
      document.getElementById("b").style.transition = "max-height 0.3s ease-out";
      document.getElementById("b").style.opacity = 0;
      document.getElementById("b").style.maxHeight = 0;
    }
  };
  return (
    <header>
      <Container fluid>
        <Row>
          <Col>
            <Navbar expand="lg" collapseOnSelect className="headerNav plank-px ">
              <Container className="" fluid>
                <Nav as="ul" className="">
                  <Nav.Item as="li" className="listing text-capitalize ">
                    <Nav.Link href="/products" onMouseOver={() => chbg("products")} id="a" active>
                      Products
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li" className="listing text-capitalize">
                    <Nav.Link
                      href="/products/living%20room"
                      active
                      onMouseOver={() => chbg("rooms")}
                    >
                      Rooms
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li" className="listing text-capitalize">
                    <Nav.Link href="/services" active onMouseOver={() => chbg("aboutus")}>
                      About Us
                    </Nav.Link>
                  </Nav.Item>
                </Nav>

                <LinkContainer to="/" className="d-flex justify-content-center">
                  <Navbar.Brand>
                    <Image src="/logo.ico" alt="logo" fluid className="navbranding pe-5" />
                  </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav cls " className="ms-5" justify="true">
                  <Nav className="ms-auto  navItems" flush="true">
                    <Nav.Link>
                      <img
                        src="/searchIcon.svg"
                        alt="search"
                        width="100%"
                        onClick={() => setShow(true)}
                      />
                    </Nav.Link>

                    <LinkContainer to="/wishlists">
                      <Nav.Link>
                        <img src="/heart-regular.svg" alt="cart" width="40px" />
                      </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/cart">
                      <Nav.Link>
                        <div className="cartIcon">
                          <Image src="/cartIcon.svg" alt="cart" width="100%" height="100%" />
                          {subscribed.length || purchase.length ? (
                            <Badge className="cart-basket">
                              {subscribed.length + purchase.length}
                            </Badge>
                          ) : (
                            <></>
                          )}
                        </div>
                      </Nav.Link>
                    </LinkContainer>
                    {userInfo ? (
                      <NavDropdown
                        title={<img src="/avatarIcon.svg" alt="login" width="100%" />}
                        id="basic-nav-dropdown"
                        className="bdnav"
                      >
                        <LinkContainer to="/user/edit">
                          <NavDropdown.Item className="dropdownheader px-2 m-3">
                            Profile
                          </NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item
                          className="dropdownheader px-2 m-3"
                          onClick={logoutHandler}
                        >
                          Logout
                        </NavDropdown.Item>
                      </NavDropdown>
                    ) : (
                      <NavDropdown
                        title={<img src="/avatarIcon.svg" alt="login" width="100%" />}
                        id="basic-nav-dropdown"
                        className="bdnav"
                      >
                        <LinkContainer to="/register">
                          <NavDropdown.Item className="dropdownheader px-2 m-3">
                            Create an Account
                          </NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer to="/login">
                          <NavDropdown.Item className="dropdownheader px-2 m-3">
                            Login
                          </NavDropdown.Item>
                        </LinkContainer>
                      </NavDropdown>
                    )}
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
        </Row>

        <Row id="b" className="specialDropDown">
          {/* <Col>{menu == "rooms" ? <RoomsMenu /> : <ProductMenu />}</Col> */}
          {onShow && (
            <Col onMouseLeave={() => setOnShow(false)} className="py-5">
              {menu == "rooms" ? <RoomsMenu /> : menu == "products" ? <ProductMenu /> : <AboutUs />}
            </Col>
          )}
        </Row>

        <Row>
          <Col>
            <Search show={show} onHide={() => setShow(false)} />
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;

// import React from "react";
// import "./header.css";
// import { Navbar, Nav, Container } from "react-bootstrap";
// import { LinkContainer } from "react-router-bootstrap";
// const Header = () => {
//   return (
//     <header>
//       <Navbar expand="lg" collapseOnSelect className="headerNav">
//         <Container classname="d-flex justify-content-between">
//           <div>
//             <Nav as="ul" className="d-flex initialLinks justify-content-between">
//               <Nav.Item as="li">
//                 <Nav.Link href="/products">Products</Nav.Link>
//               </Nav.Item>
//               <Nav.Item as="li">
//                 <Nav.Link href="#">Rooms</Nav.Link>
//               </Nav.Item>
//               <Nav.Item as="li">
//                 <Nav.Link href="/services">Services</Nav.Link>
//               </Nav.Item>
//             </Nav>
//           </div>
//           <div>
//             <LinkContainer to="/">
//               <Navbar.Brand>
//                 <img width="148px" height="auto" className="img-responsive" src="./logo.png" alt="logo" />
//               </Navbar.Brand>
//           </LinkContainer>
//           </div>
//           <div>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav" justify>
//               <Nav className="d-flex justify-content-between navItems" flush>
//                 <LinkContainer to="/cart">
//                   <Nav.Link>
//                     <img src="/searchIcon.svg" alt="search" />
//                   </Nav.Link>
//               </LinkContainer>
//                 <LinkContainer to="/wishlist">
//                   <Nav.Link>
//                     <img src="/cartIcon.svg" alt="cart" />
//                   </Nav.Link>
//               </LinkContainer>
//                 <LinkContainer to="/cart">
//                   <Nav.Link>
//                     <img src="/cartIcon.svg" alt="cart" />
//                   </Nav.Link>
//               </LinkContainer>
//                 <LinkContainer to="/login">
//                   <Nav.Link>
//                     <img src="/avatarIcon.svg" alt="login" />
//                   </Nav.Link>
//               </LinkContainer>
//               </Nav>
//             </Navbar.Collapse>
//           </div>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

// export default Header;
