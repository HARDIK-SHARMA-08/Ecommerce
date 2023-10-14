import React, { useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  //Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/v1/auth/register", {
        name,
        email,
        password,
        phone,
      });

      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went Wrong");
    }
  };

  return (
    <Layout>
      <section className="min-h-screen flex items-stretch text-white ">
        <div
          className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0" />
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">
              Keep it special
            </h1>
            <p className="text-3xl my-4">
              Capture your personal memory in unique way, anywhere.
            </p>
          </div>
        </div>
        <div
          className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0"
          style={{ backgroundColor: "#161616" }}
        >
          <div
            className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1523381294911-8d3cead13475?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)",
            }}
          >
            <div className="absolute bg-black opacity-60 inset-0 z-0" />
          </div>
          <div className="w-full p-6 z-20">
            <h1 className="my-6">
              <div className="flex items-center">
                <span className="text-5xl font-bold whitespace-nowrap text-white">
                  uncommon
                  <span className="text-[var(--red-color)] font-extrabold text-3xl">
                    .
                  </span>
                </span>
              </div>
            </h1>

            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-white text-left"
                >
                  Name
                </label>
                <input
                  type="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  className="bg-gray-50 border border-[var(--black-color)] text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Full Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-white text-left"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="bg-gray-50 border border-[var(--black-color)] text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-white text-left"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-[var(--black-color)] text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-white text-left"
                >
                  Contact phone
                </label>
                <input
                  type="phone"
                  name="numner"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phone"
                  className="bg-gray-50 border border-[var(--black-color)] text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="+91 99500XXXXX"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-[var(--red-color)] hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign up
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[var(--red-color)] hover:underline "
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Register;
