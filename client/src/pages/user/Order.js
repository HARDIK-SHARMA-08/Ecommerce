import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import UserProfile from "../../components/Layout/UserProfile";
import { useAuth } from "../../context/auth";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const getOrders = async () => {
    try {
      const { data } = await axios.get("/api/v1/order/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth.token) getOrders();
  }, [auth.token]);
  return (
    <Layout>
      <>
        <section className="p-8 z-0 bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
          <div className="flex flex-col-reverse items-center justify-between sm:flex-row-reverse sm:items-start px-4 text-center z-10 gap-6">
            <div className="basis-3/4">
              <div className="mb-6 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                All Orders{" "}
              </div>

              <div className="p-3"></div>

              <div className="relative overflow-x-auto shadow-md rounded-lg sm:rounded-lg">
                {orders.map((c, i) => (
                  <>
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th scope="col" className="px-6 py-3">
                            S No.
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Buyer
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Date
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Payment
                          </th>
                          <th scope="col" className="px-6 py-3">
                            Quantity
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {i + 1}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white uppercase">
                            {c.buyer.name}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {c.createdAt}
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            Success
                          </td>
                          <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                            {c.products.length}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <div className="grid grid-cols-1 gap-10 p-3 sm:grid-cols-3">
                        {c.products.map((p, i) => (
                          <div className="flex py-6">
                            <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                              <img
                                src={`/api/v1/product/product-photo/${p._id}`}
                                className="h-full w-full object-contain object-center"
                              />
                            </div>
                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex flex-col items-start text-base font-medium text-white">
                                  <h3 className="font-bold">
                                    <a href="#">{p.name}</a>
                                  </h3>
                                  <p className="">
                                    {p.price.toLocaleString("en-US", {
                                      style: "currency",
                                      currency: "INR",
                                    })}
                                  </p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <p className="text-white">Qty {p.quantity}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </div>
            <div className=" basis-1/4 w-full sm:sticky top-28 sm:w-4/12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <UserProfile />
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
};

export default Order;
