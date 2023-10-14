import axios from "axios";
import Rating from "@mui/material/Rating";
import toast from "react-hot-toast";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";

const ProductCard = () => {
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
  return (
    <>
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
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
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
    </>
  );
};

export default ProductCard;
