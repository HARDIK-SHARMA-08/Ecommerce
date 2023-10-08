import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>
        <Toaster position="bottom-right" reverseOrder={true} />
        {children}
      </main>
      <Footer />
    </div>
  );
};
