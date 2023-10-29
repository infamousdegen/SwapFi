import React, { useState } from "react";
import styles from "../assets/styles/Tokens.module.css";

const Tokens = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Function to hide the loading message when the iframe is loaded
  const handleIframeLoad = () => {
    setIsLoading(false);
  };
[]
  return (
    <div className={styles.header}>
      <h1>Top Tokens on SwapFi</h1>
      {isLoading && <p className={styles.loading}>Loading...</p>}
      <div className={styles.holds} style={{ border: "none", overflow: "hidden" }}>
        <iframe
          src="https://tokens-vercel.vercel.app/"
          width="97.5%"
          height="600" // Set the height according to your requirements
          onLoad={handleIframeLoad}
          style={{ borderRadius: "10px",marginRight: "2%"}}
  
        />
      </div>
    </div>
  );
};

export default Tokens;
