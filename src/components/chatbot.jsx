// src/components/BotpressChat.jsx

import  { useEffect } from 'react';

const BotpressChat = () => {
  useEffect(() => {
    // Function to dynamically load external script
    const loadScript = (src) => {
      const script = document.createElement('script');
      script.src = src;
      script.async = true;
      document.body.appendChild(script);

      // Cleanup function to remove script when component unmounts
      return () => {
        document.body.removeChild(script);
      };
    };

    // Load Botpress webchat scripts
    const cleanupWebchatScript = loadScript('https://cdn.botpress.cloud/webchat/v2.1/inject.js');
    const cleanupConfigScript = loadScript("https://mediafiles.botpress.cloud/d0deb5d9-5dfd-4ccb-8359-8389951cdc31/webchat/v2.1/config.js");

    // Cleanup function to remove scripts on component unmount
    return () => {
      cleanupWebchatScript();
      cleanupConfigScript();
    };
  }, []); // Empty dependency array ensures this runs once after the component mounts

  return (
    <div id="botpress-webchat" />
  );
};

export default BotpressChat;