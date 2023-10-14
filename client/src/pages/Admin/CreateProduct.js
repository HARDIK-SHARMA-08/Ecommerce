import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";
import UserProfile from "../../components/Layout/UserProfile";
import toast from "react-hot-toast";
import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CategoryIcon from "@mui/icons-material/Category";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [Categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");
  const [anchorEl, setanchorEl] = React.useState(null);
  const [checked, setChecked] = useState([]);

  const navigate = useNavigate();

  const openCategory = Boolean(anchorEl);
  const handleClickCategory = (event) => {
    setanchorEl(event.currentTarget);
  };
  const handleCloseCategory = () => {
    setanchorEl(null);
  };

  //Get All Category
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get("/api/v1/category/get-category");
      if (data.success) {
        setCategories(data.category);
      } else {
        toast.error(data.message);
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

  //Create Product Function
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);

      const response = await axios.post(
        "/api/v1/product/create-product",
        productData
      );
      console.log(response);
      if (response && response.data && response.data.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error("Product creation failed.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <>
        <section className="p-8 z-0 bg-white">
          <div className="flex flex-col-reverse items-center justify-between sm:flex-row-reverse sm:items-start px-4 text-center z-10 gap-6">
            <div className="basis-3/4 w-[85vw]">
              <div className="mb-6 text-3xl text-center font-semibold italic text-gray-900 md:text-5xl lg:text-6xl ">
                Create{" "}
                <span class="before:block before:absolute before:-inset-1 before:-skew-y-2 hover:before:skew-y-3 before:ease-in before:duration-300 before:bg-[var(--red-color)] relative inline-block">
                  <span class="relative text-white">product</span>
                </span>
              </div>

              <div className="relative overflow-x-auto ">
                <div class="grid md:grid-cols-2 md:gap-6">
                  <div className="mb-6">
                    <div className="flex items-center justify-center w-full">
                      <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-full border-2 border-[var(--black-color)] border-dashed rounded-lg cursor-pointer bg-gray-50 "
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 ">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 ">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file"
                          type="file"
                          className="hidden"
                          onChange={(e) => setPhoto(e.target.files[0])}
                        />
                      </label>
                    </div>
                  </div>
                  <div className="mb-3 border-2 border-[var(--black-color)] border-dashed rounded-lg w-full h-full bg-gray-50">
                    <p className="mb-2 text-sm text-gray-500 ">
                      <span className="font-semibold">Image preview</span>{" "}
                    </p>
                    {photo && (
                      <div className="text-center">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt="product_photo"
                          height={"200px"}
                          className="img img-responsive"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="Name"
                    className="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-[var(--black-color)]"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    className="bg-gray-50 border border-[var(--black-color)] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    placeholder="Name"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="large-input"
                    className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-[var(--black-color)]"
                  >
                    Description
                  </label>
                  <textarea
                    type="large-input"
                    value={description}
                    rows={6}
                    className="bg-gray-50 border border-[var(--black-color)] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    required
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div class="grid md:grid-cols-3 md:gap-6">
                  <div className="mb-6">
                    <label
                      htmlFor="Price"
                      className="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-[var(--black-color)]"
                    >
                      Price (₹)
                    </label>
                    <input
                      type="Number"
                      value={price}
                      className="bg-gray-50 border border-[var(--black-color)] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="Price"
                      required
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="Name"
                      className="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-[var(--black-color)]"
                    >
                      Quantity
                    </label>
                    <input
                      type="Number"
                      value={quantity}
                      className="bg-gray-50 border border-[var(--black-color)] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      placeholder="Quantity"
                      required
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="Name"
                      className="block mb-2 text-sm font-medium text-left text-gray-900 dark:text-[var(--black-color)]"
                    >
                      Category
                    </label>
                    <select
                      className="bg-gray-50 border border-[var(--black-color)] text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                      onChange={(e) => {
                        setCategory(e.target.value);
                      }}
                    >
                      <option>Select Category</option>
                      {Categories.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="w-full">
                  <button
                    type="submit"
                    className="text-white  bg-[var(--red-color)] hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                    onClick={handleCreate}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
            <div className=" basis-1/4  w-full sm:sticky top-28 sm:w-4/12 bg-white border-2 border-[var(--black-color)] rounded-lg shadow-xl">
              <UserProfile />
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
};

export default CreateProduct;
