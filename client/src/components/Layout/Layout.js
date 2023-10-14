import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
import Newsletter from "./Newsletter";

export const Layout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>
        <Toaster position="bottom-right" reverseOrder={true} />
        {children}
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
};
