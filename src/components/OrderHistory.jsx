import React from "react";
import { Link, useParams, useNavigate , useLocation} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Card, Button, Form, Carousel,Accordion, Container } from "react-bootstrap";
// import Rating from "../components/Rating";
import { useEffect, useState } from "react";
import { updateUser } from "../actions/userActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import "./OrderHistory.css"
import Footer from "../components/Footer"
import EditUser from "../components/EditUser";
import { getOrderByUser  , getOrderById} from "../actions/orderActions";

const OrderHistory = () => {

const foo = (e)=>{
  e.stopPropagation()
  console.log(e.target)
}
const [loads,setLoads] = useState(true) 
const [open,setOpen] = useState([])
const [clicked,setClicked] = useState([])
const [clicked2,setClicked2] = useState(false)
const orders = useSelector((state) => state.getOrdersReducer);
const userLogin = useSelector((state) => state.userLogin);
const populated_order = useSelector((state) => state.populatedOrderReducer);
const { loading, error, order } = orders;
const {popLoading , popError , populatedOrder} = populated_order
const {userInfo} = userLogin
const [total,setTotal] = useState(0)
const [orderTotal,setOrderTotal] = useState(0)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(()=>{
    dispatch(getOrderByUser())
    if(loading==false && order){
      setOpen(new Array(order.length).fill(0))
      setClicked(new Array(order.length).fill(0))
    }
  },[])


  const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  
  const getOrderDetails = async (id,index)=>{
  setLoads(true)
   console.log("poploading", popLoading)
  await  dispatch(getOrderById(id))
    setLoads(false)
   let x = open
   console.log("x[index]" , x[index] , open[index])
   if(x[index]==1){
    x[index] = 0
   }else{
    x[index] = 1
   }

   setOpen([...x])
   let y = clicked
   y[index] = 0
   setClicked(y)
   console.log("hiiiertyoi", clicked[index])
  }
  const viewOrderDetails = (e,id,index)=>{
    let copyOPen = open
    console.log(copyOPen)
    if(copyOPen[index]==1){
      e.stopPropagation()
    }
    let x = clicked
    console.log("x[index]" , x[index])
    if(x[index]==1){
      x[index] = 0
    }else{
      x[index] = 1
    }
   
   setClicked([...x])
    
    console.log("hiiioi",index, clicked[index])
  }

  return(<Container fluid>
  
  
      <Row>
       <Col>
         <span className="order-history-title"> Order History </span></Col>
       
   
      
      </Row>
      <Row className="mt-5">
          <Col>
         

          <Accordion>
          
          {(loading==false && order && order!=[] )? (<>
          {order.data.map((result,index)=>{
            
        
            return( 
              <Accordion.Item eventKey={index} className="mb-3 " onClick={()=>{getOrderDetails(result.id,index)}}>
            <Accordion.Header className="accordion-styling"><Container fluid>
                <Row>
                    <Col>
                 <p className="order-number">   Order Number: {result.id}</p>
                    </Col>
                    <Col className="d-flex justify-content-end order-date">
                    <p>Date : {result.attributes.order_date}</p>
                    </Col>
                </Row>
                <Row xs="auto">
                    <Col lg={2} className="pt-2">
                   <p className="order-status"> Order Status: </p>
                    </Col>
                    <Col   >
                   <Button  className={(result.attributes.delivery_status === "processing")? ("processing rounded-pill mx-1") : ("delivered rounded-pill mx-1")}  onClick={(e)=>{foo(e)}}>{result.attributes.delivery_status}</Button>
                    </Col>
                    <Col   >
                   <Button className="rounded-pill mx-1 view-details" onClick={(e)=>{viewOrderDetails(e,result.id,index)}}>view order details</Button>
                    </Col>
                    <Col   >
                   <Button className="rounded-pill mx-1 download-invoice" >download invoice </Button>
                    </Col>
                </Row>
                </Container></Accordion.Header>
            <Accordion.Body className="py-2">
             <Container  >
             {(clicked[index]==1) ? (
                 <>
                 <Row>
                 <Col>
                   <Container fluid>
                     <Row>
                       <Col>
                       <Container fluid>
                       <Row>
                           <Col> <span className="delivery-details-title">Delivery Details</span> </Col>
                           </Row>
                         <Row>
                           <Col><span className="delivery-details-body">{userInfo.user.first_name} {userInfo.user.last_name}</span></Col>
                           </Row>
                           <Row>
                           <Col > <span className="delivery-details-body">United Arab Emirates</span></Col>
                           </Row> 
                             <Row>
                           <Col> <span className="delivery-details-body"> {populatedOrder.data.attributes.AddressId.data.attributes.emirate}</span></Col>
                           </Row>  
                            <Row>
                           <Col><span className="delivery-details-body"> {populatedOrder.data.attributes.AddressId.data.attributes.street_name}, {populatedOrder.data.attributes.AddressId.data.attributes.building_name}, {populatedOrder.data.attributes.AddressId.data.attributes.flat_number}</span></Col>
                           </Row>
                           </Container>
                       </Col>
                       </Row>
                       <Row className="mt-3">
                        <Col>
                        <Container>
                          <Row>
                            <Col><span className="delivery-details-title">Mobile Number</span></Col>
                          </Row>
                          <Row>
                            <Col><span className="delivery-details-body">{userInfo.user.phone_number}</span></Col>
                          </Row>
                        </Container>
                        </Col>
                       </Row>
                       </Container>
                   </Col>
                   <Col>
                   <Container fluid>
                     <Row>
                       <Col>
                       <Container fluid>
                       <Row>
                           <Col> <span className="delivery-details-title">Billing Details</span> </Col>
                           </Row>
                         <Row>
                           <Col><span className="delivery-details-body">{userInfo.user.first_name} {userInfo.user.last_name}</span></Col>
                           </Row>
                           <Row>
                           <Col > <span className="delivery-details-body">United Arab Emirates</span></Col>
                           </Row> 
                             <Row>
                           <Col> <span className="delivery-details-body"> {populatedOrder.data.attributes.AddressId.data.attributes.emirate}</span></Col>
                           </Row>  
                            <Row>
                           <Col><span className="delivery-details-body"> {populatedOrder.data.attributes.AddressId.data.attributes.street_name}, {populatedOrder.data.attributes.AddressId.data.attributes.building_name}, {populatedOrder.data.attributes.AddressId.data.attributes.flat_number}</span></Col>
                           </Row>
                           </Container>
                       </Col>
                       </Row>
                       <Row className="mt-3">
                        <Col>
                        <Container>
                          <Row>
                            <Col><span className="delivery-details-title">Mobile Number</span></Col>
                          </Row>
                          <Row>
                            <Col><span className="delivery-details-body">{userInfo.user.phone_number}</span></Col>
                          </Row>
                        </Container>
                        </Col>
                       </Row>
                       </Container>
                   </Col>
                   <Col>

                   <Container fluid>
                     <Row>
                       <Col>
                       <Container fluid>
                       <Row>
                           <Col><Container>
                             <Row>
                               <Col><span className="delivery-details-title">Payment Method</span></Col>
                             </Row>
                             <Row>
                               <Col>
                               <span className="delivery-details-body">{populatedOrder.data.attributes.payment_method}</span>
                               </Col>
                             </Row>
                             </Container> </Col>
                           </Row>
                         <Row>
                           <Col>
                           <Container>
                             <Row>
                               <Col>
                               </Col>
                             </Row>
                             <Row>
                               <Col>
                               </Col>
                             </Row>
                           </Container>
                           </Col>
                           </Row>
                         
                           </Container>
                       </Col>
                       </Row></Container>
                   </Col>
                 </Row>
                 <Row className="mt-5"><Col><hr/>
                 </Col>

                 </Row>
                 <Row>
                   <Col className="d-flex justify-content-center order-number-box">
                   <span>Order Number : {result.id}</span>
                   </Col>
                 </Row>
                 <Row  className="delivery-details-title">
                   <Col lg={8}>
                   <Container>
                     <Row>
                       <Col>Items</Col>
                     </Row>
                     

                   </Container>
                   </Col>
                   <Col>
                   <Container>
                     <Row>
                       <Col>Qty</Col>
                       </Row></Container></Col>
                       <Col>
                   <Container>
                     <Row>
                       <Col>Unit Price</Col>
                       </Row></Container></Col>
                 </Row>
                 {populatedOrder.data.attributes.order_items.data.map((order_item)=>{
                   
                   return( <Row className="delivery-details-body">
                    <Col lg={8}>
                    <Container>
                      <Row>
                        <Col >{order_item.attributes.product_inventory.data.attributes.product.data.attributes.product_name}</Col>
                      </Row>
                      
 
                    </Container>
                    </Col>
                    <Col>
                    <Container>
                      <Row>
                        <Col >{order_item.attributes.quantity}</Col>
                        </Row></Container></Col>
                        <Col>
                    <Container>
                      <Row>
                        <Col>          {(order_item.attributes.period==="six_month_price")? (
                    <span className="accordion-body-name"> AED {parseInt(order_item.attributes.product_inventory.data.attributes.product.data.attributes[order_item.attributes.period]/6)*parseInt(order_item.attributes.quantity)} /mo </span>
                  ) : (
                  <>
                  {(order_item.attributes.period==="0")? (<>
                    <span className="accordion-body-name"> AED {parseInt(order_item.attributes.product_inventory.data.attributes.product.data.attributes.price)*parseInt(order_item.attributes.quantity)}  </span>
                  
                  </>) : (


<span className="accordion-body-name"> AED {parseInt(order_item.attributes.product_inventory.data.attributes.product.data.attributes[order_item.attributes.period]/12)*parseInt(order_item.attributes.quantity)} /mo </span>
                  )}

                  </>

                  )}</Col>
                        </Row></Container></Col>
                  </Row>)
                 })}
                 <Row>
                   <Col>
                   <hr/>
                   </Col>
                 </Row>
                 <Row>
                   <Col>
                  <Container>
                    <Row className="delivery-details-title">
                      <Col>total</Col>
                      <Col className="d-flex justify-content-end">order total</Col>
                    </Row>
                    <Row className="delivery-details-title">
                      <Col>{ populatedOrder.data.attributes.order_items.data.reduce((total, currentValue) => total = total + parseInt(currentValue.attributes.quantity),0)}</Col>
          
                      <Col className="d-flex justify-content-end">{ 
                      
                      
                      populatedOrder.data.attributes.order_items.data.reduce( (total, currentValue) => {
                        if(currentValue.attributes.period == "six_month_price"){
                          return  total = total + (parseInt(currentValue.attributes.product_inventory.data.attributes.product.data.attributes[currentValue.attributes.period])*(currentValue.attributes.quantity)/6)
                        }else{
                          if( currentValue.attributes.period == "twelve_month_price"){
                            return  total = total + (parseInt(currentValue.attributes.product_inventory.data.attributes.product.data.attributes[currentValue.attributes.period])*(currentValue.attributes.quantity)/12)
                          }else{
                            return  total = total + (parseInt(currentValue.attributes.product_inventory.data.attributes.product.data.attributes.price)*(currentValue.attributes.quantity))
                          }
                          
                        }

                      } ,0)
                      
                      
                      
                      
                      }
                      
                        </Col>
                    </Row>
                  </Container>
                   </Col>
                 </Row>
                 <Row>
                   <Col className="d-flex justify-content-end mt-3">
                     <Container>
                       <Row>
                         <Col lg={10} className="d-flex justify-content-end delivery-details-title"> <span>Sub Total (per month) </span></Col>    <Col className="pricing-box  d-flex justify-content-end delivery-details-body">{ 
                      
                      
                      populatedOrder.data.attributes.order_items.data.reduce( (total, currentValue) => {
                        if(currentValue.attributes.period == "six_month_price"){
                          return  total = total + (parseInt(currentValue.attributes.product_inventory.data.attributes.product.data.attributes[currentValue.attributes.period])*(currentValue.attributes.quantity)/6)
                        }else{
                          if( currentValue.attributes.period == "twelve_month_price"){
                            return  total = total + (parseInt(currentValue.attributes.product_inventory.data.attributes.product.data.attributes[currentValue.attributes.period])*(currentValue.attributes.quantity)/12)
                          }else{
                            return  total = total + (parseInt(currentValue.attributes.product_inventory.data.attributes.product.data.attributes.price)*(currentValue.attributes.quantity))
                          }
                          
                        }

                      } ,0)
                      
                      
                      
                      
                      }</Col>
                       </Row>
                       <Row>
                         <Col lg={10} className="d-flex justify-content-end delivery-details-title"> <span>Discount </span> </Col>    <Col className="pricing-box d-flex justify-content-end delivery-details-body ">AED 12.50</Col>
                       </Row>
                       <Row>
                         <Col lg={10} className="d-flex justify-content-end delivery-details-title "> <span>Delivery Charge </span></Col>    <Col className="pricing-box d-flex justify-content-end  delivery-details-body">FREE</Col>
                       </Row>
                       <Row>
                         <Col lg={10} className="d-flex justify-content-end delivery-details-title" > <span>Order Total (per month)</span></Col>    <Col className="pricing-box d-flex justify-content-end delivery-details-body">{ 
                      
                      populatedOrder.data.attributes.order_items.data.reduce( (total, currentValue) => {
                        if(currentValue.attributes.period == "six_month_price"){
                          return  total = total + (parseInt(currentValue.attributes.product_inventory.data.attributes.product.data.attributes[currentValue.attributes.period])*(currentValue.attributes.quantity)/6)
                        }else{
                          if( currentValue.attributes.period == "twelve_month_price"){
                            return  total = total + (parseInt(currentValue.attributes.product_inventory.data.attributes.product.data.attributes[currentValue.attributes.period])*(currentValue.attributes.quantity)/12)
                          }else{
                            return  total = total + (parseInt(currentValue.attributes.product_inventory.data.attributes.product.data.attributes.price)*(currentValue.attributes.quantity))
                          }
                          
                        }

                      } ,0)
                      
                      
                      
                      -12}</Col>
                       </Row>
                       <Row>
                         <Col></Col>    <Col className="d-flex justify-content-end delivery-details-body">(Inclusive of VAT)</Col>
                       </Row>
                     </Container>
                     </Col>
                 </Row>
                 </>
                
              ) : (<>
              {( loads==true ) ? (
              // <Loader />
              <>Loading...</>
            ) : error ? (
              <Message variant="danger">{error}</Message>
            ) : (

              <>
                {(  loads==false && popLoading==false) && populatedOrder.data.attributes.order_items.data.map((order_item)=>{
          
            
          return (
          <>
        
          <Row>

            <Col lg={2} >
                <img src={order_item.attributes.product_inventory.data.attributes.images.data[0].attributes.url} height="100%" width="100%"></img>
            </Col>
            <Col lg={8} className="p-3" >
              <Container>
                <Row>
                  <Col >
                  <span className="accordion-body-name">{order_item.attributes.product_inventory.data.attributes.product.data.attributes.product_name}</span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <span className="accordion-body-details" >Item Code: {order_item.attributes.product_inventory.data.attributes.product.data.attributes.slug}</span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  <span className="accordion-body-details">Quantity: {order_item.attributes.quantity} </span>
                  </Col>
                </Row>
              </Container>
            </Col>
            <Col lg={2} >
              <Container>
                <Row>
                  <Col>
                 <span className="accordion-body-details"> Unit  Price: </span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                  {(order_item.attributes.period==="six_month_price")? (
                    <span className="accordion-body-name"> AED {parseInt(order_item.attributes.product_inventory.data.attributes.product.data.attributes[order_item.attributes.period]/6)*parseInt(order_item.attributes.quantity)} /mo </span>
                  ) : (
                  <>
                  {(order_item.attributes.period==="0")? (<>
                    <span className="accordion-body-name"> AED {parseInt(order_item.attributes.product_inventory.data.attributes.product.data.attributes.price)*parseInt(order_item.attributes.quantity)}  </span>
                  
                  </>) : (


<span className="accordion-body-name"> AED {parseInt(order_item.attributes.product_inventory.data.attributes.product.data.attributes[order_item.attributes.period]/12)*parseInt(order_item.attributes.quantity)} /mo </span>
                  )}

                  </>

                  )}
                 
                  </Col>
                </Row>
              </Container>
            </Col>
        </Row></>) 
         
 
       })}
              
              </>
            )}
              
            </>)
          }
                 
                 
             </Container>
            </Accordion.Body>
          </Accordion.Item>)
          })}
          
          
</>) : (<>Loading...</>)}
 
</Accordion>

          </Col>
      </Row>
      <Row className="mt-5">
        <Col>
        <Container fluid>
          <Row >
            <Col lg={3}>
            </Col>
            <Col lg={7}>
            <Container fluid>
              <Row>
                <Col >
               <span className="customer-support-title"> Our Customer Support team is here to help! </span>
                </Col>
              </Row>
              <Row className="my-3">
                <Col>
               <span className="customer-support-body" >Online support is available Monday through Friday 9 a.m. to 6 p.m., Saturday 9 a.m. to 5 p.m. Pacific. One of our service experts usually responds within 48 hours.</span>
                </Col>
              </Row>
              <Row>
                <Col>
               <Button className="contact-us-bitton"> CONTACT US</Button>
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
export default OrderHistory