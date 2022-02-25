import React from "react";
import "./header.css";
import { Link, useParams, useNavigate } from "react-router-dom" ;
import { LinkContainer } from "react-router-bootstrap";
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
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const RoomsMenu = () => {
    const navigate = useNavigate();
    const navigateToProducts = (room , type) => {
        console.log("roooom")
     //   http://localhost:3000/products/bed%20room?type=Bedframes&brand=allbrands
        //console.log("Item Added");
        if(type){
            navigate(`/products/${room}?type=${type}&brand=allbrands`);
        }else{
            navigate(`/products/${room}?brand=allbrands`);
        }
     
      };
    return (
    <Container className="py-4">
    <Row>
      <Col lg={2} >
      <Container>
        <Row className="pt-5">
          <Col className="bold-text">
          LATEST ARRIVAL
          </Col>
        </Row>
        <Row>
          <Col  className="bold-text">
         MOST POPULAR
          </Col>
        </Row>
      </Container>
      </Col>
      
     <Col lg="8" md="8">
     <Container fluid>
        <Row className="">
            <Col className="pe-5 ">
            <Container fluid>
                <Row>
                <Col  className="bold-text"  onClick={()=>{navigateToProducts("living room")}}>
                    LIVING ROOM
                    </Col>
                  
                </Row>
                <Row>
                <Col>
                 <img src="/images/spacejoy-ctyssSFmXmU-unsplash.jpg" width="100%" height="80%" /> 
                    </Col>
                </Row>
            </Container>
            </Col>
            <Col className="pe-5 ">
            <Container fluid>
                <Row>
                <Col  className="bold-text" onClick={()=>{navigateToProducts("bed room")}}> 
                    BEDROOM
                    </Col>
                   
                </Row>
                <Row>
                <Col>
                <img src="/images/spacejoy-ctyssSFmXmU-unsplash.jpg" width="100%" height="80%" /> 
                    {/* <img src="/images/spacejoy-io5Tvjh7vCc-unsplash_copy.jpg" width="100%" height="46%" /> */}
                    </Col>
                </Row>
            </Container>
            </Col>
            <Col className="pe-5 ">
            <Container fluid>
                <Row>
                <Col  className="bold-text"  onClick={()=>{navigateToProducts("outdoor")}}>
                    OUTDOOR
                    </Col>
                   
                </Row>
                <Row>
                <Col>
                <img src="/images/spacejoy-ctyssSFmXmU-unsplash.jpg" width="100%" height="80%" /> 
                    {/* <img src="/images/pexels-maria-orlova-4915593.jpg" width="100%" height="150px" /> */}
                    </Col>
                </Row>
            </Container>
            </Col>
        </Row>
        <Row>
        <Col className="pe-5 ">
        <Container >
                <Row>
                <Col  className="bold-text"  onClick={()=>{navigateToProducts("dining room")}}>
                DINING ROOM
                    </Col>
                   
                </Row>
                <Row>
                <Col>
                <img src="/images/spacejoy-ctyssSFmXmU-unsplash.jpg" width="100%" height="80%" /> 
                    </Col>
                </Row>
            </Container>
            </Col>
            <Col className="pe-5 ">
        <Container >
                <Row>
                <Col  className="bold-text"  onClick={()=>{navigateToProducts("office")}}>
                OFFICE
                    </Col>
                   
                </Row>
                <Row>
                <Col>
                <img src="/images/spacejoy-ctyssSFmXmU-unsplash.jpg" width="100%" height="80%" /> 
                    </Col>
                </Row>
            </Container>
            </Col>
            <Col className="pe-5 ">
        <Container >
                <Row>
                <Col  className="bold-text"  onClick={()=>{navigateToProducts("other")}}>
                OTHER
                    </Col>
                   
                </Row>
                <Row>
                <Col>
                <img src="/images/spacejoy-ctyssSFmXmU-unsplash.jpg" width="100%" height="80%" /> 
                    </Col>
                </Row>
            </Container>
            </Col>
        </Row>
     </Container>
     </Col>
     

    

    </Row>
    </Container>)

}

export default RoomsMenu;
