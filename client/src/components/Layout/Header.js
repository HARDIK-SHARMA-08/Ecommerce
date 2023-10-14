import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import Badge from "@mui/material/Badge";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import Cart from "../../pages/CartPage";
import { useCart } from "../../context/cart";
import Hamburger from "hamburger-react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";

const Header = ({ id }) => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [click, setClick] = useState(false);
  const [Categories, setCategories] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEll, setAnchorEll] = useState(null);

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


  // Handle common logic for opening dropdown menus
  const handleOpen = (event, setAnchor) => {
    setAnchor(event.currentTarget);
  };

  // Handle common logic for closing dropdown menus
  const handleClose = (setAnchor) => {
    setAnchor(null);
  };

  //Get All Category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      } else {
        console.log("Error in getting Category");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Get all Categories
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <>
      <nav className="backdrop-filter backdrop-blur-lg bg-opacity-30 bg-white sticky top-0 w-full z-20 ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/">
            <div className="flex items-center">
              <span className="self-center text-4xl font-bold whitespace-nowrap font-[CustomFont] text-[var(--black-color)]">
                uncommon
                <span className="text-[var(--red-color)] font-extrabold text-3xl">
                  .
                </span>
              </span>
            </div>
          </Link>
          <div className="flex flex-row items-center">
            <div className="block rounded md:hidden md:border-0 md:hover:text-blue-700 md:p-0 dark:text-[var(--black-color)] md:dark:hover:text-[var(--red-color)] dark:hover:bg-gray-700 dark:hover:text-[var(--black-color)] md:dark:hover:bg-transparent">
              <Badge badgeContent={cart.length} color="error">
                <Cart />
              </Badge>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center text-gray-500 rounded-lg md:hidden"
              onClick={handleClick}
            >
              <Hamburger />
            </button>
          </div>
          <div
            className={`${
              click ? "block" : "hidden"
            } md:block w-full md:w-auto`}
          >
            <ul className="font-medium flex flex-col md:flex-row items-center justify-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-8 md:mt-0 md:border-0">
              <li>
                <Link
                  to="/all-products"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded md:border-0 md:hover:text-blue-700 md:p-0 dark:text-[var(--black-color)] md:dark:hover:text-[var(--red-color)] dark:hover:bg-gray-700 dark:hover:text-[var(--black-color)] md:dark:hover:bg-transparent"
                  aria-current="page"
                >
                  Shop All
                </Link>
              </li>

              <li>
                <button
                  id="dropdownNavbarLink2"
                  className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-[var(--black-color)] md:dark:hover:text-[var(--red-color)] dark:focus:text-[var(--black-color)] dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                  onClick={(e) => handleOpen(e, setAnchorEl)}
                >
                  Categories
                  <KeyboardArrowDownIcon />
                </button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={() => handleClose(setAnchorEl)}
                >
                  {Categories.map((c) => (
                    <MenuItem>
                      <Link to={`/category/${c.slug}`} className="block py-2 pl-3 pr-4">
                        {c.name}
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded md:border-0 md:hover:text-blue-700 md:p-0 dark:text-[var(--black-color)] md:dark:hover:text-[var(--red-color)] dark:hover:bg-gray-700 dark:hover:text-[var(--black-color)] md:dark:hover:bg-transparent"
                >
                  Contact
                </Link>
              </li>
              {!auth.user ? (
                <>
                  <li>
                    <button
                      id="dropdownNavbarLink"
                      onClick={(e) => handleOpen(e, setAnchorEll)}
                      className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-[var(--black-color)] md:dark:hover:text-[var(--red-color)] dark:focus:text-[var(--black-color)] dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
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
                    <Menu
                      anchorEl={anchorEll}
                      open={Boolean(anchorEll)}
                      onClose={() => handleClose(setAnchorEll)}
                    >
                      <MenuItem>
                        <Link to="/register" className="block py-2 pl-3 pr-4">
                          Register
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link to="/login" className="block py-2 pl-3 pr-4">
                          Login
                        </Link>
                      </MenuItem>
                    </Menu>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <button
                      id="dropdownNavbarLink"
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center justify-between w-full py-2 pl-3 pr-4 uppercase text-gray-900 rounded md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-[var(--black-color)] md:dark:hover:text-[var(--red-color)] dark:focus:text-[var(--black-color)] dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
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

              <div className="hidden py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:block md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-[var(--black-color)] md:dark:hover:text-[var(--red-color)] dark:hover:bg-gray-700 dark:hover:text-[var(--black-color)] md:dark:hover:bg-transparent">
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
