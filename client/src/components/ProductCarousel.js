import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import axios from "axios";
import Rating from "@mui/material/Rating";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCarousel = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);

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
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <Carousel
      swipeable={true}
      draggable={true}
      responsive={responsive}
      keyBoardControl={true}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
    >
      {products.length
        ? products.map((p) => (
            <div className="justify-center items-center flex mx-2">
              <div
                key={p._id}
                className="relative w-full max-w-sm rounded-3xl bg-[var(--black-color)] shadow-md"
              >
                <a
                  className="relative flex h-60 overflow-hidden rounded-t-3xl"
                  href="#"
                >
                  <img
                    className="object-cover w-full"
                    src={`/api/v1/product/product-photo/${p._id}`}
                    alt="product image"
                  />
                  <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                    39% OFF
                  </span>
                </a>
                <div className="mt-4 px-5 pb-5">
                  <a href="#">
                    <h5 className="text-xl tracking-tight text-white uppercase font-bold">
                      {p.name}
                    </h5>
                  </a>
                  <div className="mt-2 mb-5 flex items-center justify-between">
                    <p>
                      <span className="text-3xl font-semibold text-white">
                        {p.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "INR",
                        })}
                      </span>
                    </p>
                    {/* Rating */}
                    <div className="flex items-center mt-2.5 mb-5">
                      <Rating name="read-only" value={5} readOnly />
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-3">
                        5.0
                      </span>
                    </div>
                  </div>
                  <button
                    className="flex items-center justify-center rounded-xl w-full bg-[var(--red-color)] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                    onClick={() => {
                      const existingProductIndex = cart.findIndex(
                        (item) => item._id === p._id
                      );

                      if (existingProductIndex !== -1) {
                        // If the product is already in the cart, update its quantity
                        const updatedCart = [...cart];
                        updatedCart[existingProductIndex].quantity += 1;

                        setCart(updatedCart);
                      } else {
                        // If the product is not in the cart, add it as a new item with a quantity of 1
                        setCart([...cart, { ...p, quantity: 1 }]);
                      }

                      // Save the updated cart to localStorage
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );

                      toast.success(`${p.name} Added to Cart`);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-2 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          ))
        : // Display loading skeletons if products are not available
          Array(3)
            .fill()
            .map((_, index) => (
              <div className="justify-center items-center flex mx-2">
                <div
                  key={index}
                  className="relative w-full max-w-sm rounded-3xl bg-white shadow-md"
                >
                  <Skeleton height={280} borderRadius={"1.5rem"} />
                  <div className="mt-4 px-5 pb-5">
                    <Skeleton count={1} />
                    <br />
                    <Skeleton height={24} width={80} />
                    <br />
                    <Skeleton count={2} />
                  </div>
                </div>
              </div>
            ))}
    </Carousel>
  );
};

export default ProductCarousel;
