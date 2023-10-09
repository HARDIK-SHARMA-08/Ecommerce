import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout/Layout";
import axios from "axios";
import Rating from "@mui/material/Rating";
import { Prices } from "../components/Search_Filter/PriceFilter";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Checkbox from "@mui/material/Checkbox";
import Radio from "@mui/material/Radio";
import { FormControlLabel } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CategoryIcon from "@mui/icons-material/Category";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const HomePage = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);
  const [Categories, setCategories] = useState([]);
  const [anchorEl, setanchorEl] = React.useState(null);
  const [anchorEll, setanchorEll] = React.useState(null);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);

  const openCategory = Boolean(anchorEl);
  const handleClickCategory = (event) => {
    setanchorEl(event.currentTarget);
  };
  const handleCloseCategory = () => {
    setanchorEl(null);
  };

  const openPrice = Boolean(anchorEll);
  const handleClickPrice = (event) => {
    setanchorEll(event.currentTarget);
  };
  const handleClosePrice = () => {
    setanchorEll(null);
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

  //Filter by Category
  const handleFilter = (value, id) => {
    let all = Array.isArray(checked) ? [...checked] : [];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  //Get all Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`/api/v1/product/get-product`);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  //Get Filtered Product
  const filterProduct = async () => {
    try {
      const { data } = await axios.post(`/api/v1/product/product-filter`, {
        checked,
        radio,
      });
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length]);

  useEffect(() => {
    if (checked.length || radio.length) filterProduct();
  }, [checked, radio]);

  return (
    <Layout>
      <div className="p-2">
        {/* Carousel */}
        <div
          id="default-carousel"
          className="relative w-full"
          data-carousel="slide"
        >
          {/* Carousel wrapper */}
          <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
            {/* Item 1 */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="/docs/images/carousel/carousel-1.svg"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            {/* Item 2 */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="/docs/images/carousel/carousel-2.svg"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            {/* Item 3 */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="/docs/images/carousel/carousel-3.svg"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            {/* Item 4 */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="/docs/images/carousel/carousel-4.svg"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
            {/* Item 5 */}
            <div className="hidden duration-700 ease-in-out" data-carousel-item>
              <img
                src="/docs/images/carousel/carousel-5.svg"
                className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                alt="..."
              />
            </div>
          </div>
          {/* Slider indicators */}
          <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="true"
              aria-label="Slide 1"
              data-carousel-slide-to={0}
            />
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 2"
              data-carousel-slide-to={1}
            />
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 3"
              data-carousel-slide-to={2}
            />
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 4"
              data-carousel-slide-to={3}
            />
            <button
              type="button"
              className="w-3 h-3 rounded-full"
              aria-current="false"
              aria-label="Slide 5"
              data-carousel-slide-to={4}
            />
          </div>
          {/* Slider controls */}
          <button
            type="button"
            className="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-prev
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 1 1 5l4 4"
                />
              </svg>
              <span className="sr-only">Previous</span>
            </span>
          </button>
          <button
            type="button"
            className="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
            data-carousel-next
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
              <svg
                className="w-4 h-4 text-white dark:text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="sr-only">Next</span>
            </span>
          </button>
        </div>{" "}
        <div className="flex gap-6 flex-col items-start sm:flex-row sm:item-center justify-between m-6">
          <div className="text-5xl text-center font-extrabold tracking-tight leading-none text-black md:text-6xl lg:text-6xl">
            <h1>All Products </h1>
          </div>
          {/* Filters */}
          <div className="flex flex-col gap-2 items-start sm:flex-row sm:items-center justify-end sm:gap-6 w-fit rounded-3xl">
            <div>
              <h4>Filter by</h4>
            </div>

            <div className="flex flex-row gap-2">
              {/* Filter by Category */}
              <div>
                <button
                  type="submit"
                  className="p-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-indigo-600 sm:w-fit hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-600 "
                  onClick={handleClickCategory}
                >
                  <CategoryIcon /> Categories <KeyboardArrowDownIcon />
                </button>
                <Menu
                  iid="basic-menu"
                  anchorEl={anchorEl}
                  open={openCategory}
                  onClose={handleCloseCategory}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {Categories.map((c) => (
                    <MenuItem>
                      <FormControlLabel
                        control={
                          <Checkbox
                            key={c._id}
                            onChange={(e) => {
                              handleFilter(e.target.checked, c._id);
                            }}
                          />
                        }
                        label={c.name}
                      />{" "}
                    </MenuItem>
                  ))}
                </Menu>
              </div>

              {/* Filter by Price */}
              <div>
                {" "}
                <button
                  type="submit"
                  className="p-2 px-3 text-sm font-medium text-center text-white rounded-lg bg-indigo-600 sm:w-fit hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-600 "
                  onClick={handleClickPrice}
                >
                  <CurrencyRupeeIcon /> Price <KeyboardArrowDownIcon />
                </button>
                <Menu
                  iid="basic-menu"
                  anchorEl={anchorEll}
                  open={openPrice}
                  onClose={handleClosePrice}
                  MenuListProps={{
                    "aria-labelledby": "basic-button",
                  }}
                >
                  {Prices.map((p) => (
                    <MenuItem key={p._id}>
                      <FormControlLabel
                        control={
                          <Radio onChange={(e) => setRadio(e.target.value)} />
                        }
                        label={p.name}
                      />{" "}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </div>
          </div>
        </div>
        {/* Products */}
        <div className="grid grid-cols-1 gap-10 p-2 sm:p-28 sm:pt-2 sm:grid-cols-3">
          {products.map((p) => (
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-3xl shadow dark:bg-gray-800 dark:border-gray-700">
              <img
                className="p-8 rounded-t-lg"
                src={`/api/v1/product/product-photo/${p._id}`}
                alt="product image"
              />
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {p.name}{" "}
                  </h5>
                </a>
                {/* Rating */}
                <div className="flex items-center mt-2.5 mb-5">
                  <Rating name="read-only" value={5} readOnly />
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                    5.0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "INR",
                    })}
                  </span>
                  <button
                    className="text-white bg-indigo-600 hover:bg-indigo-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-600 "
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success(`${p.name} Added to Cart`);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
