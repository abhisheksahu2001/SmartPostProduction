/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState, useEffect } from 'react';

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
  }
}

// Injects the Facebook SDK into the page
const injectFbSDKScript = () => {
  // eslint-disable-next-line func-names
  (function (d, s, id) {
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    const js = d.createElement(s);
    js.id = id;
    // @ts-ignore
    js.src = 'https://connect.facebook.net/en_US/sdk.js';
    // @ts-ignore
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
};

const UseInitFbSDK = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line func-names
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '655985629660872',
        cookie: true,
        xfbml: true,
        version: 'v17.0',
      });

      window.FB.AppEvents.logPageView();
      setIsInitialized(true);
    };

    injectFbSDKScript();
  }, []);

  return isInitialized;
};

export default UseInitFbSDK;
