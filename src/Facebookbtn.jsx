// import React from 'react';
// import FacebookLogin from 'react-facebook-login';

// const FacebookLoginButton = ({ setUser }) => {
//     const responseFacebook = (response) => {
//         console.log(response);  
//         if (response.accessToken) {
//             setUser({
//                 name: response.name,
//                 picture: response.picture.data.url,
//                 accessToken: response.accessToken,
//             });
//         } else {
//             console.error('User not allowed to use the follwing resources !');
//         }
//     };

//     return (
//         <FacebookLogin
//             appId="994007258933295"
//             autoLoad={true}
//             fields="name,picture"
//             callback={responseFacebook}
//         />
//     );
// };

// export default FacebookLoginButton;

import React, { useEffect } from 'react';

const FacebookLoginButton = ({ setUser }) => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '994007258933295',
        cookie: true,
        xfbml: true,
        version: 'v14.0'
      });
    };
//new version
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { return; }
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const handleLogin = () => {
    FB.login((response) => {
      if (response.authResponse) {
        const { accessToken } = response.authResponse;
        FB.api('/me', { fields: 'name,picture' }, (userInfo) => {
          setUser({
            name: userInfo.name,
            picture: userInfo.picture.data.url,
            accessToken: accessToken,
          });
        });
      } else {
        console.error('User cancelled login or failed.');
      }
    }, { scope: 'public_profile' });
  };

  return (
    <button onClick={handleLogin}>Login with Facebook</button>
  );
};

export default FacebookLoginButton;
