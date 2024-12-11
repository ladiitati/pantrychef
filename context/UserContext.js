"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@lib/supabase";

// Create Context
const UserContext = createContext(null);

// Context Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error.message);
        return;
      }

      if (user) {
        setUser({
          email: user.email,
          fullName: user.user_metadata?.full_name || "",
          avatar: user.user_metadata?.avatar_url || "",
        });
      }

      const { data: subscription } = supabase.auth.onAuthStateChange(
        (event) => {
          if (event === "SIGNED_OUT") {
            setUser(null);
          }
        }
      );

      subscription.unsubscribe();
    };

    fetchUser();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

// Hook to use User Context
export const useUser = () => useContext(UserContext);
