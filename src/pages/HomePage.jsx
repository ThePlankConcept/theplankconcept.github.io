import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const navigate = useNavigate();

  const routeChange = () =>{ 
    let path = `/Addresses`; 
    navigate(path);
  }
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;
  return (<div>HOmePage <p>{userInfo.jwt}</p>
  <div> <button onClick={routeChange} > create order </button></div></div>)
};

export default HomePage;
