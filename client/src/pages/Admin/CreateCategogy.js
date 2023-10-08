import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import UserProfile from "../../components/Layout/UserProfile";
import toast from "react-hot-toast";
import axios from "axios";

const CreateCategogy = () => {
  const [Categories, setCategories] = useState([]);

  //Get All Category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Categories not feteched");
    }
  };

  //Get all Categories
  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout>
      <>
        <section className="p-8 z-0 bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
          <div className="flex flex-col-reverse items-center sm:flex-row-reverse sm:items-start px-4 text-center z-10 gap-6">

            <div className="basis-3/4">
              <div className=" mb-6 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                Create Categogy{" "}
              </div>

              <div className="relative overflow-x-auto shadow-md rounded-lg sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Category
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
                    {Categories.map((c) => (
                      <tr
                        key={c.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                      >
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          {c.name}
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          <a
                            href="#"
                            class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                          >
                            Edit
                          </a>
                        </td>
                        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                          <a
                            href="#"
                            class="font-medium text-red-600 dark:text-red-500 hover:underline"
                          >
                            Remove
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="basis-1/4 w-full sm:w-4/12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <UserProfile />
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
};

export default CreateCategogy;
