import React from "react";
import { Layout } from "../../components/Layout/Layout";
import UserProfile from "../../components/Layout/UserProfile";

const Order = () => {
  return (
    <Layout>
      <>
        <section className="p-8 z-0 bg-white dark:bg-gray-900 bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern.svg')] dark:bg-[url('https://flowbite.s3.amazonaws.com/docs/jumbotron/hero-pattern-dark.svg')]">
          <div className="flex flex-col items-center px-4 text-center z-10">
            <div>
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
                All Orders{" "}
              </h1>
            </div>
            <div className="w-full sm:w-4/12 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <UserProfile />
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
};

export default Order;
