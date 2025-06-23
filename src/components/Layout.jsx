import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col ">
    <Header />
    <main className="flex-1 flex flex-col">{children}</main>
    <Footer />
    <ScrollToTopButton />
  </div>
);

export default Layout; 