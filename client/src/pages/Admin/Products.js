import React, { useState, useEffect } from "react";
import { Layout } from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import CategoryForm from "../../components/Form/CategoryForm";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { blue } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import UserProfile from "../../components/Layout/UserProfile";

const Products = () => {
  const [products, setProducts] = useState([]);

  //Get all Products
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get("/api/v1/product/get-product");
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("Someething Went Wrong");
    }
  };

  //Lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  //Delete Category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/v1/product/delete-product/${pId}`
      );
      if (data.success) {
        toast.success(`Product deleted successfully`);
        getAllProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  return (
    <Layout>
      <>
        <section className="p-8 z-0 bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
          <div className="flex flex-col-reverse items-center justify-between sm:flex-row-reverse sm:items-start px-4 text-center z-10 gap-6">
            <div className="basis-3/4">
              <div className="mb-6 text-3xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Manage Product{" "}
              </div>

              <div className="relative overflow-x-auto shadow-md rounded-lg sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3">
                        <span class="sr-only">Image</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price (₹)
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr
                        key={p.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="w-32 p-4">
                          <img
                            src={`/api/v1/product/product-photo/${p._id}`}
                            alt="Apple Watch"
                          />
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {p.name}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {p.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "INR",
                          })}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {p.quantity}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            <EditIcon sx={{ color: blue[500] }} />{" "}
                            <span className="hidden sm:inline"> Edit</span>
                          </button>

                          <Modal>
                            <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px]">
                              <CategoryForm />
                            </Box>
                          </Modal>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          <button
                            type="button"
                            className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                            onClick={() => {
                              handleDelete(p._id);
                            }}
                          >
                            <svg
                              className="w-5 h-5 mr-1 -ml-1"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="hidden sm:inline">Remove</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className=" basis-1/4  w-full sm:sticky top-28 sm:w-4/12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <UserProfile />
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
};

export default Products;
