import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout/Layout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useCart } from "../context/cart";
import Rating from "@mui/material/Rating";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CategoryProduct = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  useEffect(() => {
    if (params.slug) getPrductsByCat();
  }, [params.slug]);
  const getPrductsByCat = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/product-category/${params.slug}`
      );
      setProducts(data.products);
      setCategory(data.category);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="p-6 items-center">
        <div className="mb-1 text-3xl text-center font-semibold italic text-gray-900 md:text-5xl lg:text-6xl ">
          <span class="before:block before:absolute before:-inset-1 before:-skew-y-2 hover:before:skew-y-3 before:ease-in before:duration-300 before:bg-[var(--red-color)] relative inline-block">
            <span class="relative text-white">{category.name}</span>
          </span>
          <span className="text-[var(--black-color)] font-extrabold text-6xl pl-2">
            .
          </span>
        </div>
        <h6 className="w-full flex flex-col gap-2 items-start sm:flex-row sm:items-center justify-end sm:gap-6 rounded-3xl p-4">
          {products.length} results found{" "}
        </h6>
        {/* Products */}
        <div className="grid grid-cols-1 gap-10 p-2 sm:p-6 md:grid-cols-2 lg:grid-cols-3 lg:p-28 lg:pt-2 lg:pb-6">
          {products.length
            ? products.map((p) => (
                <div
                  key={p._id}
                  className="relative w-full max-w-sm rounded-3xl bg-[var(--black-color)] shadow-md"
                >
                  <div className="relative flex h-60 overflow-hidden rounded-t-3xl">
                    <img
                      className="object-cover w-full"
                      src={`/api/v1/product/product-photo/${p._id}`}
                      alt="product image"
                    />
                    <span className="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                      39% OFF
                    </span>
                  </div>
                  <div className="mt-4 px-5 pb-5">
                    <button onClick={() => navigate(`/product/${p.slug}`)}>
                      <h5 className="text-xl tracking-tight text-white uppercase font-bold">
                        {p.name}
                      </h5>
                    </button>
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
              ))
            : // Display loading skeletons if products are not available
              Array(6)
                .fill()
                .map((_, index) => (
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
                ))}
        </div>
      </div>
    </Layout>
  );
};

export default CategoryProduct;
