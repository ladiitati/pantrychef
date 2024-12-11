"use client";
import React from "react";
import "@styles/globals.css";
import { UserProvider } from "@context/UserContext";

// export const metadata = {
//   title: "PantryChef",
//   description: "Find Best Recipes Based On What's In Your Kitchen",
// };

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>PantryChef</title>
        <meta name="description" content="Find Best Recipes Based On What's In Your Kitchen"></meta>
      </head>
      <body className="main">
        <UserProvider>
          <main>{children}</main>
        </UserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
