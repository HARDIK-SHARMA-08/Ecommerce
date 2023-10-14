import React, { useState, useEffect } from "react";
import { Layout } from "../components/Layout/Layout";
import { useCart } from "../context/cart";
import { useAuth } from "../context/auth";
import axios from "axios";
import toast from "react-hot-toast";
import DropIn from "braintree-web-drop-in-react";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function ShoppingCart() {
  const [cart, setCart] = useCart();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  //Total Amount
  const totalPrice = () => {
    try {
      let total = 0;
      cart.map((item) => {
        total = total + item.quantity * item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {
      console.log(error);
    }
  };

  //Delete Cart Item
  const removeCartItem = (cid) => {
    try {
      let myCart = [...cart];
      let index = myCart.findIndex((item) => item._id === cid);
      myCart.splice(index, 1);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };

  //Get Checkout gateway token
  const getToken = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/checkout/token");
      setClientToken(data.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getToken();
  }, [auth.token]);

  //Handle Checkouts
  const handleCheckout = async () => {
    try {
      setLoading(true);
      const { nonce } = await instance.requestPaymentMethod();
      // Send the cart data to the backend
      const { data } = await axios.post("/api/v1/order/checkout/payment", {
        nonce,
        cart,
      });
      if (data.success) {
        setLoading(true);
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user/orders");
        toast.success("Checkout Completed Successfully");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      // Handle other errors if needed
      toast.error("An error occurred during checkout");
    }
  };
  return (
    <Layout>
      <div className=" bg-gray-100 p-8">
        <div className="mb-12 text-3xl font-extrabold tracking-tight text-center leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-black">
          <ShoppingCartIcon sx={{ fontSize: 80 }} />
          Shopping Cart{" "}
        </div>
        <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
          <div className="rounded-lg md:w-2/3">
            {cart.length > 0 ? (
              <>
                {cart.map((cart) => (
                  <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                    <img
                      src={`/api/v1/product/product-photo/${cart._id}`}
                      alt="product-image"
                      className="w-full rounded-lg sm:w-40"
                    />
                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2 className="text-lg font-bold text-gray-900">
                          {cart.name}
                        </h2>
                        <p className="mt-1 text-xs text-gray-700">36EU - 4US</p>
                      </div>
                      <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                        <div className="flex items-center border-gray-100">
                          <h1 className="bg-gray-100 py-1 px-3.5 ">Quantity</h1>
                          <h1 className="bg-gray-100 py-1 px-3.5 ">
                            {cart.quantity}
                          </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                          <p className="text-sm">
                            {cart.price.toLocaleString("en-US", {
                              style: "currency",
                              currency: "INR",
                            })}
                          </p>
                          <div onClick={() => removeCartItem(cart._id)}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                <div>
                  <div className="max-w-4xl mx-auto px-10 py-4 bg-white rounded-lg">
                    <div className="flex flex-col items-center justify-center py-12">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-24 w-24 text-gray-400 mb-4"
                      >
                        <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
                      </svg>
                      <p className="text-gray-600 text-lg font-semibold mb-4">
                        Your shopping cart is empty.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          {/* Sub total */}
          {cart.length > 0 ? (
            <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
              <hr className="my-4" />
              <div className="flex justify-between">
                <p className="text-lg font-bold">Total</p>
                <div className>
                  <p className="mb-1 text-lg font-bold">{totalPrice()}</p>
                </div>
              </div>
              {!clientToken || !auth.token ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => setInstance(instance)}
                  />
                  <button
                    className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
                    onClick={handleCheckout}
                    disabled={loading || !instance}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="motion-reduce:hidden animate-spin ..."
                          viewBox="0 0 24 24"
                        ></svg>
                        Processing...
                      </>
                    ) : (
                      "Make Payment"
                    )}
                  </button>
                </>
              )}
            </div>
          ) : (
            " "
          )}
        </div>
      </div>
    </Layout>
  );
}
