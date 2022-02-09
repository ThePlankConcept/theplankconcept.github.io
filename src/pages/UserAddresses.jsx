import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col, Button , Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses } from "../actions/userActions";
import { useNavigate } from 'react-router-dom';
const  UserAddresses =  () =>{
    const navigate = useNavigate();
    //get the user jwt 
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;


    const [selected ,setSelected] = useState() 
    const [addresses, setAddresses] = useState()

    //use the dispatch to run a function
    const dispatch = useDispatch();
    const routeChange = () =>{ 
        let path = `/Create-Address`; 
        navigate(path);
      }
useEffect(()=>{
    dispatch(getAddresses(userInfo.jwt));
}, [])
    const userAddresses = useSelector((state) => state.userAddresses);
    const {loadingAddress, errorAddress, userAddress } = userAddresses;

        return (
            <Container fluid="true">
                    <Row>
                   
                      
                      {(userAddress) ? (<>
                       {(userAddress.data.length>0) ? (<>
                        {userAddress.data.map((data1)=>{
                            console.log("data1", data1)
                    
                            return(
                                <Col>
                                <Container fluid="true" className="mt-5 border p-4">
                                    <Row>
                                        <Col >
                                        Emirate :   {data1.attributes.emirate}
                                        </Col>
                                        <Col  >
                                        Area :   {data1.attributes.area}
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col >
                                        Building Name :   {data1.attributes.building_name}
                                        </Col>
                                        <Col >
                                        Flat Number :  {data1.attributes.flat_number}
                                        </Col>
                                    </Row>
                                    </Container>
                                    </Col>
                            )
                          
                        })}
                       
                       
                       </>) : (<> <Button onClick={routeChange}>Create Addresses </Button></>)}
                     
                      </>) : (<> </>) } 
                    
                   
                      
                    </Row>
            </Container>
        )
} 
export default UserAddresses