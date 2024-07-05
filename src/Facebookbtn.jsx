import React, { useState, useEffect } from 'react';

const FacebookLoginButton = ({ setUser, setPages }) => {
  useEffect(() => {
    window.fbAsyncInit = function () {
      FB.init({
        appId: '994007258933295', 
        cookie: true,
        xfbml: true,
        version: 'v20.0'
      });

      FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
      });
    };

    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  const statusChangeCallback = (response) => {
    console.log('statusChangeCallback');
    console.log(response);
    if (response.status === 'connected') {
      testAPI();
    } else {
      console.error('Please log into this webpage.');
    }
  };

  const checkLoginState = () => {
    FB.getLoginStatus(function (response) {
      statusChangeCallback(response);
    });
  };

  const testAPI = () => {
    console.log('Fetching your information.... ');
    FB.api('/me', function (response) {
      console.log('Successful login for: ' + response.name);
      setUser({
        name: response.name,
        picture: `https://graph.facebook.com/${response.id}/picture?type=large`
      });
    });

    FB.api('/me/accounts', function (response) {
      console.log('Pages:', response);
      if (response && !response.error) {
        setPages(response.data);
      }
    });
  };

  return (
    <div>
      <fb:login-button 
        scope="public_profile,pages_show_list,pages_read_engagement"
        onlogin={checkLoginState}>
      </fb:login-button>
      <div id="status"></div>
    </div>
  );
};

export default FacebookLoginButton;
