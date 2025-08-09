import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollToTopButton from "./ScrollToTopButton";
import DifyChatbot from "./DifyChatbot";

const Layout = ({ children }) => (
  <div className="min-h-screen flex flex-col ">
    <Header />
    <main className="flex-1 flex flex-col pt-[110px] md:pt-[153px]">{children}</main>
    <DifyChatbot
      token="bA0pmmUYhi0caSwE"
      userName="Nam đẹp trai"
      avatarUrl="https://yourdomain.com/avatar.png"
      buttonColor="#f97316"
      width="28rem"
      height="40rem"
      bottom="4rem"
      right="2rem"
    />

    <ScrollToTopButton className="absolute right-10 bottom-8" />

    <Footer />

  </div>
);

export default Layout; 