import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import Badge from "@mui/material/Badge";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import Cart from "../../pages/CartPage";
import { useCart } from "../../context/cart";

const Header = ({ id }) => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [click, setClick] = useState(false);

  const handleLogout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logout Successfully");
  };

  const handleClick = () => {
    setClick(!click); // Toggle the 'click' state
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Hide the mobile menu when the screen size is greater than or equal to 768px
        setClick(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <nav className="backdrop-blur-sm bg-gray-900 sticky top-0 w-full z-20 px-5 py-1">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="flex items-center">
            <img
              src="https://lh3.google.com/u/3/d/1LjfKRsM1D_qPruFSmxdK3ropdqUCP1Me=w1920-h883-iv1"
              className="h-12 mr-3"
              alt="Logo"
            />
            <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
              CARTCRAFT
            </span>
          </div>
          <div className="flex flex-row">
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={handleClick}
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>

            <div className="block py-2 pl-3 pr-4 text-gray-900 rounded md:hidden hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
              <Badge badgeContent={cart.length} color="error">
                <Cart />
              </Badge>
            </div>
          </div>
          <div
            className={`${
              click ? "block" : "hidden"
            } md:block w-full md:w-auto`}
          >
            <ul className="font-medium flex flex-col md:flex-row items-center justify-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 md:mt-0 md:border-0">
              <li>
                <Link
                  to="/"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                >
                  Contact
                </Link>
              </li>

              {!auth.user ? (
                <>
                  <li>
                    <button
                      id="dropdownNavbarLink"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                    >
                      <PersonIcon sx={{ fontSize: 30 }} />

                      <svg
                        className="w-2.5 h-2.5 ml-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    {/* Dropdown menu */}
                    <div
                      id="dropdownNavbar"
                      className={`${isDropdownOpen ? "block" : "hidden"}`}
                    >
                      <ul className="absolute group-hover:flex flex-col p-5 bg-white rounded-md shadow-md gap-5 mt-2">
                        <li>
                          <Link to="/register" className="block py-2 pl-3 pr-4">
                            Register
                          </Link>
                        </li>
                        <li>
                          <Link to="/login" className="block py-2 pl-3 pr-4">
                            Login
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button
                      id="dropdownNavbarLink"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center justify-between w-full py-2 pl-3 pr-4 uppercase text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                    >
                      <PersonIcon className="mr-1" sx={{ fontSize: 25 }} />
                      {auth.user.name}{" "}
                      <svg
                        className="w-2.5 h-2.5 ml-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    {/* Dropdown menu */}
                    <div
                      id="dropdownNavbar"
                      className={`${isDropdownOpen ? "block" : "hidden"}`}
                    >
                      <ul className="absolute group-hover:flex flex-col p-5 bg-white rounded-md shadow-md gap-5 mt-2">
                        <li>
                          <Link
                            to={`/dashboard/${
                              auth.user.role === 1 ? "admin" : "user"
                            }`}
                            className="block py-2 pl-3 pr-4"
                          >
                            Dashboard
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/login"
                            onClick={handleLogout}
                            className="block py-2 pl-3 pr-4"
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </li>
                </>
              )}

              <div className="hidden py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:block md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                <Badge badgeContent={cart.length} color="error">
                  <Cart />
                </Badge>
              </div>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
