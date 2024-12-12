import React, { useState, useEffect } from "react";
import Image from "next/image";
import chefHat from "../public/assets/icons/svg/chefHat.svg";
import { supabase } from "@lib/supabase";
import { useUser } from "@context/UserContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userDetails, setUserDetails] = useState();

  const user = useUser();
  console.log(user);
  const router = useRouter()

  const handleLogin = async () => {
    const { user, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        scopes: "profile email",
      },
    });

    if (user) {
      await supabase.from("users").upsert({
        id: user.id,
        email: user.email,
      });
    }
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error signing out:", error.message);
    } else {
      console.log("User signed out successfully.");
      alert("User Signed Out Succesfully");
      router.push('/')
    }
  };

  const handleAuthStateChange = () => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          const user = session?.user;
          const fullName = user.user_metadata.full_name || "";
          const avatarUrl = user.user_metadata.avatar_url || "";

          if (user) {
            try {
              const { error: dbError } = await supabase.from("users").upsert(
                {
                  id: user.id,
                  email: user.email,
                  fullName: fullName,
                  avatarUrl: avatarUrl,
                },
                { onConflict: ["id"] }
              );

              if (dbError) {
                console.error(
                  "Error inserting/updating user in database:",
                  dbError.message
                );
              } else {
                console.log("User successfully added/updated in database.");
              }
            } catch (err) {
              console.error("Unexpected error:", err);
            }
          }
        }
      }
    );

    // Return the listener for cleanup
    return authListener.unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = handleAuthStateChange();

    // Cleanup on component unmount
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return (
    <nav className="p-4 bg-pastel-green">
      <div className="container flex items-center justify-between mx-auto">
        {/* Left: Login */}
        <div className="hidden md:block">
          {!user ? (
            <a
              onClick={handleLogin}
              className="text-lg text-white underline cursor-pointer font-mulish hover:no-underline"
            >
              Login/SignUp
            </a>
          ) : (
            <a
              onClick={handleSignOut}
              className="text-lg italic text-black underline cursor-pointer decoration-cherry-red font-mulish hover:no-underline"
            >
              Logout
            </a>
          )}
        </div>

        {/* Center: Logo */}
        <div className="flex items-center space-x-2">
          <a className="text-4xl font-bold text-white font-pacifico" href="/">
            PantryChef
          </a>
          <Image src={chefHat} width={50} height={50} alt="Chef Hat Icon" />
        </div>

        {/* Right: Sign Up */}
        <div className="hidden md:block">
          {!user ? (
            <p className="text-lg text-white">Hello there </p>
          ) : (
            <p className="text-lg text-white">
              Welcome{" "}
              <span>
                <a
                  href="/user"
                  className="text-lg italic text-white underline hover:no-underline"
                >
                  {user?.fullName}
                </a>
              </span>
            </p>
          )}
        </div>

        {/* Hamburger Icon for Small Screens */}
        <div className="md:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-pastel-green">
          <div className="flex flex-col items-center py-4 space-y-4">
            <button
              onClick={handleLogin}
              className="text-lg text-white underline font-mulish hover:no-underline"
            >
              Login/SignUp
            </button>
            <a
              href="#signup"
              className="text-lg text-white underline font-mulish hover:no-underline"
            >
              {!user ? (
                <p className="text-lg text-white">Hello there </p>
              ) : (
                <p className="text-lg text-white">
                  Welcome{" "}
                  <span>
                    <a
                      href="/user"
                      className="text-lg italic text-white underline hover:no-underline"
                    >
                      {user?.fullName}
                    </a>
                  </span>
                </p>
              )}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
