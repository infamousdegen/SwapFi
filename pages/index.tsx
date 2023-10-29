// pages/index.js

import React from "react";
import Pools from "../components/Pools";
import Swap from "../components/Swap";
import Tokens from "../components/Tokens";
import UnifiedNavbar from "../components/UnifiedNavbar";
import Indexpage from "../components/Indexpage";

const MyApp = () => {
  return (
    <div>
      <Swap />
      <Tokens />
      <Pools />
      <Indexpage/>
    </div>
  );
};

export default MyApp;
