import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { googleLogin } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
function GoogleAuthCallback() {
  const [auth, setAuth] = useState();
  const location = useLocation();
  const userLogin = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, userInfo } = userLogin;
  const redirect = "/";
  {
    /* <script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '{your-app-id}',
      cookie     : true,
      xfbml      : true,
      version    : '{api-version}'
    });
      
    FB.AppEvents.logPageView();   
      
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script> */
  }
  useEffect(() => {
    if (!location) {
      return;
    }
    const { search } = location;
    dispatch(googleLogin(search));

    if (userInfo) {
      navigate(redirect);
    }

    // console.log(location)
    // axios({
    //   method: 'GET',
    //   url: `http://localhost:1337/api/auth/google/callback?${search}`,
    // })
    //   .then((res) => res.data)
    //   .then(setAuth).then(     /* dispatch(login(email, password))*/ )
  }, [location, userInfo, redirect]);

  return (
    <div>
      {auth && (
        <>
          <div>Jwt: {auth.jwt}</div>
          <div>User Id: {JSON.stringify(auth.user)}</div>
          <div>Provider: {auth.user.provider}</div>
        </>
      )}
    </div>
  );
}
export default GoogleAuthCallback;
