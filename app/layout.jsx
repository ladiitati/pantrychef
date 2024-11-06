import React from "react";
import "@styles/globals.css";

export const metadata = {
  title: "PantryChef",
  description: "Find Best Recipes Based On What's In Your Kitchen",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="main">
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
