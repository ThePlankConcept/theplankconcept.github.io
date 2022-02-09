import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Row, Col , Container , Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getAddresses , createAddress } from "../actions/userActions";
const  CreateAddress =  () =>{
    //get the user jwt 
     const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;


    const [selected ,setSelected] = useState() 
    const [emirate , setEmirate] = useState()
    const [area,setArea] = useState() 
    const [streetName , setStreetName] = useState()
    const [buidlingName,setBuildingName]=useState()
    const [flatNumber , setFlatNumber] = useState() 

    const [notes,setNotes] = useState() 

    const [addresses, setAddresses] = useState()
    const submitHandler = (e) => {
        e.preventDefault();
        let data = {
            "data" : {
                emirate : emirate , 
                area : area , 
                street_name : streetName , 
                building_name : buidlingName , 
                flat_number : flatNumber , 
                notes : notes
            }
        }
        console.log(data)
      dispatch(createAddress(userInfo.jwt , data));
      };
   // use the dispatch to run a function
  const dispatch = useDispatch();

// useEffect(()=>{
//     dispatch(getAddresses(userInfo.jwt));
// }, [])
     // const userAddresses = useSelector((state) => state.userAddresses);
   // const {loadingAddress, errorAddress, userAddress } = userAddresses;

        return (
          <Container>
              <Row>
                  <Col md="12">
                  <Form onSubmit={submitHandler}>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Emirate</Form.Label>
    <Form.Control type="text" value={emirate} onChange={(e) => setEmirate(e.target.value)} />
   
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Area </Form.Label>
    <Form.Control type="text"  value={area} onChange={(e) => setArea(e.target.value)} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Street Name</Form.Label>
    <Form.Control type="text" value={streetName} onChange={(e) => setStreetName(e.target.value)} />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Building Name</Form.Label>
    <Form.Control type="text" value={buidlingName} onChange={(e) => setBuildingName(e.target.value)}  />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Flat Number</Form.Label>
    <Form.Control type="text" value={flatNumber} onChange={(e) => setFlatNumber(e.target.value)}  />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Notes</Form.Label>
    <Form.Control type="text" value={notes} onChange={(e) => setNotes(e.target.value)} />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
                  </Col>
              </Row>
          </Container>
        )
} 
export default CreateAddress