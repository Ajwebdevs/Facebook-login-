import React, { useEffect } from 'react';

const FacebookLoginButton = ({ setUser }) => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId      : '847627977269779',
        xfbml      : true,
        version    : 'v20.0'
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


  //handel login funcation => excutes when tbtn called
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
