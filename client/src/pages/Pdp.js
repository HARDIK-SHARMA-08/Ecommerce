import React, { useState, useEffect } from "react";
import { Layout } from "./../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import { useCart } from "../context/cart";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const [cart, setCart] = useCart();
  const params = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initalp details
  useEffect(() => {
    if (params.slug) getProduct();
  }, [params.slug]);
  //getProduct
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/get-product/${params.slug}`
      );
      setProduct(data.product);
      getSimilarProduct(data.product._id, data.product.category._id);
    } catch (error) {
      console.log(error);
    }
  };
  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `/api/v1/product/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="pt-8 bg-white items-center">
        <div className="flex flex-col md:flex-row">
          {/* Image gallery */}
          <div className="mx-auto w-full md:w-1/2 h-96 sm:px-6 lg:px-8">
            <img
              src={`/api/v1/product/product-photo/${product._id}`}
              alt="Two each of gray, white, and black shirts laying flat."
              className="h-full w-full object-cover object-center rounded-3xl px-2"
            />
          </div>
          {/* Product info */}
          <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:flex lg:flex-col">
            <div className="lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl uppercase">
                {product.name}
              </h1>
            </div>
            {/* Options */}
            <div className="mt-4 lg:mt-0">
              <h2 className="sr-only">Product information</h2>
              <p className="text-xl tracking-tight text-gray-900">
                ₹{product.price}
              </p>

              <form className="mt-10">
                <button
                  className="flex items-center justify-center rounded-xl w-full bg-[var(--red-color)] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  onClick={() => {
                    const existingProductIndex = cart.findIndex(
                      (item) => item._id === product._id
                    );

                    if (existingProductIndex !== -1) {
                      // If the product is already in the cart, update its quantity
                      const updatedCart = [...cart];
                      updatedCart[existingProductIndex].quantity += 1;

                      setCart(updatedCart);
                    } else {
                      // If the product is not in the cart, add it as a new item with a quantity of 1
                      setCart([...cart, { ...product, quantity: 1 }]);
                    }

                    // Save the updated cart to localStorage
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );

                    toast.success(`${product.name} Added to Cart`);
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
              </form>
            </div>
            <div className="pt-10 lg:col-span-2 lg:col-start-1lg:border-gray-200">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>
              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>
                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Hand cut and sewn locally
                      </span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Dyed with our proprietary colors
                      </span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Pre-washed &amp; pre-shrunk
                      </span>
                    </li>
                    <li className="text-gray-400">
                      <span className="text-gray-600">
                        Ultra-soft 100% cotton
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>
                <div className="mt-4">
                  <p className="text-sm text-gray-600">
                    The 6-Pack includes two black, two white, and two heather
                    gray Basic Tees. Sign up for our subscription service and be
                    the first to get new, exciting colors, like our upcoming
                    "Charcoal Gray" limited release.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="h-px m-6 md:m-16 bg-gray-200 border-0 dark:bg-gray-300 " />

      <div className="pb-8 items-center">
        <div className="mb-6 text-4xl text-center font-semibold italic text-gray-900 md:text-5xl lg:text-6xl ">
          Similar{" "}
          <span class="before:block before:absolute before:-inset-1 before:-skew-y-2 hover:before:skew-y-3 before:ease-in before:duration-300 before:bg-[var(--red-color)] relative inline-block">
            <span class="relative text-white">products</span>
          </span>
          <span className="text-[var(--black-color)] font-extrabold text-6xl pl-2">
            .
          </span>
        </div>
        <div className="max-w-full flex items-center justify-evenly">
          <div className="grid grid-cols-1 gap-10 p-2 justify-center items-center sm:p-6 md:grid-cols-2 lg:grid-cols-3 lg:p-28 lg:pt-6 lg:pb-6">
            {relatedProducts.length
              ? relatedProducts.map((p) => (
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
                        <h5 className="text-xl tracking-tight text-white font-bold uppercase">
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
                        onClick={() => navigate(`/product/${p.slug}`)}
                        className="flex items-center justify-center rounded-xl w-full bg-[var(--red-color)] px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                      >
                        More Details{" "}
                      </button>
                    </div>
                  </div>
                ))
              : // Display loading skeletons if products are not available
                Array(3)
                  .fill()
                  .map((_, index) => (
                    <div
                      key={index}
                      className="relative w-screen max-w-sm rounded-3xl bg-white shadow-md"
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
      </div>
    </Layout>
  );
};

export default ProductDetails;
