import React from 'react';
import FacebookLogin from 'react-facebook-login';

const FacebookLoginButton = ({ setUser }) => {
    const responseFacebook = (response) => {
        console.log(response);  
        if (response.accessToken) {
            setUser({
                name: response.name,
                picture: response.picture.data.url,
                accessToken: response.accessToken,
            });
        } else {
            console.error('User not allowed to use the follwing resources !');
        }
    };

    return (
        <FacebookLogin
            appId="994007258933295"
            autoLoad={true}
            fields="name,picture"
            callback={responseFacebook}
        />
    );
};

export default FacebookLoginButton;
