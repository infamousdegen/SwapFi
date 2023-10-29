import React from "react";
import Head from "next/head";
import styles from "../assets/styles/Buy.module.css";

const IndexPage = () => {
  return (
    <div className={styles.main}>
      <Head>
        <title>SwapFi- Buy Crypto</title>
      </Head>
      <iframe
        src="https://buy-page.vercel.app/"
        title="Buy Crypto"
        className={styles["custom-iframe"]} 
      ></iframe>
    </div>
  );
};

export default IndexPage;
