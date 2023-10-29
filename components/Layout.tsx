import React, { PropsWithChildren } from "react";
import UnifiedNavbar from "./UnifiedNavbar"; 

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <UnifiedNavbar />
      {children}
    </>
  );
};

export default Layout;
