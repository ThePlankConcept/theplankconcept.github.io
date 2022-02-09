import React from "react";
import "./header.css";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const Header = () => {
  return (
    <header>
      <Navbar expand="lg" collapseOnSelect className="headerNav">
        <Container fluid className="d-flex justify-content-between navContainer">
          <div>
            <Nav as="ul" className="d-flex initialLinks justify-content-between">
              <Nav.Item as="li" className="listing text-capitalize">
                <Nav.Link href="/products" active>
                  Products
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="listing text-capitalize">
                <Nav.Link href="#" active>
                  Rooms
                </Nav.Link>
              </Nav.Item>
              <Nav.Item as="li" className="listing text-capitalize">
                <Nav.Link href="/services" active>
                  Services
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
          <div>
            <LinkContainer to="/">
              <Navbar.Brand>
                <img width="148px" height="auto" className="img-responsive" src="./logo.png" alt="logo" />
              </Navbar.Brand>
            </LinkContainer>
          </div>
          <div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav cls" justify="true">
              <Nav className="d-flex justify-content-between navItems" flush="true">
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <img src="/searchIcon.svg" alt="search" />
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/wishlist">
                  <Nav.Link>
                    <img src="/cartIcon.svg" alt="cart" />
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/cart">
                  <Nav.Link>
                    <img src="/cartIcon.svg" alt="cart" />
                  </Nav.Link>
                </LinkContainer>

                <NavDropdown title={<img src="/avatarIcon.svg" alt="login" />} id="basic-nav-dropdown" className="float-right">
                  <LinkContainer to="/register">
                    <NavDropdown.Item className="dropdownheader px-2 m-3">Create an Account</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavDropdown.Item className="dropdownheader px-2 m-3">Login</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
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
//             </LinkContainer>
//           </div>
//           <div>
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav" justify>
//               <Nav className="d-flex justify-content-between navItems" flush>
//                 <LinkContainer to="/cart">
//                   <Nav.Link>
//                     <img src="/searchIcon.svg" alt="search" />
//                   </Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to="/wishlist">
//                   <Nav.Link>
//                     <img src="/cartIcon.svg" alt="cart" />
//                   </Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to="/cart">
//                   <Nav.Link>
//                     <img src="/cartIcon.svg" alt="cart" />
//                   </Nav.Link>
//                 </LinkContainer>
//                 <LinkContainer to="/login">
//                   <Nav.Link>
//                     <img src="/avatarIcon.svg" alt="login" />
//                   </Nav.Link>
//                 </LinkContainer>
//               </Nav>
//             </Navbar.Collapse>
//           </div>
//         </Container>
//       </Navbar>
//     </header>
//   );
// };

// export default Header;
