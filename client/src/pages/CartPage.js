import React, { useState, useEffect } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useAuth } from "../context/auth";
import { useCart } from "../context/cart";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [auth, setAuth] = useAuth();
  const [cart, setCart] = useCart();
  const [openDrawer, setOpenDrawer] = useState(false);

  const navigate = useNavigate();

  const handleToggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

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

  return (
    <>
      <ShoppingCartIcon sx={{ fontSize: 25 }} onClick={handleToggleDrawer} />

      <Drawer anchor="right" open={openDrawer} onClose={handleToggleDrawer}>
        <div className="w-max">
          <List>
            <ListItem>
              <div className="flex items-start justify-between">
                <div>
                  <h2
                    className="text-lg font-medium text-gray-900"
                    id="slide-over-title"
                  >
                    Shopping cart
                  </h2>
                </div>
                <div className="ml-3 flex h-7 items-center">
                  <button
                    type="button"
                    className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                    onClick={handleToggleDrawer}
                  >
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Close panel</span>
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </ListItem>

            <ListItem>
              <div className="mt-8">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cart.length > 0 ? (
                    <>
                      {cart.map((cart) => (
                        <li className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={`/api/v1/product/product-photo/${cart._id}`}
                              className="h-full w-full object-contain object-center"
                            />
                          </div>
                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3 className="font-bold uppercase">
                                  <a href="#">{cart.name}</a>
                                </h3>
                                <p className="ml-4">
                                  {cart.price.toLocaleString("en-US", {
                                    style: "currency",
                                    currency: "INR",
                                  })}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {cart.color}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500">
                                Qty {cart.quantity}
                              </p>
                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium text-[var(--red-color)] hover:text-red-500"
                                  onClick={() => removeCartItem(cart._id)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
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
                </ul>
              </div>
            </ListItem>

            <ListItem>
              {cart.length > 0 ? (
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6 w-full">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>{totalPrice()}</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    {!auth.token ? (
                      <>
                        <Link to="/login">
                          <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-[var(--red-color)] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700">
                            Login to Checkout
                          </button>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link to="/cart">
                          <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-[var(--red-color)] px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700">
                            Checkout
                          </button>
                        </Link>
                      </>
                    )}
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <button
                        type="button"
                        className="font-medium text-[var(--red-color)] hover:text-red-500"
                        onClick={handleToggleDrawer}
                      >
                        Continue Shopping
                        <span aria-hidden="true"> →</span>
                      </button>
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
            </ListItem>
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Cart;
