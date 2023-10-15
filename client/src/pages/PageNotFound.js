import React from "react";
import { Layout } from "../components/Layout/Layout";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <Layout>
      <div className="bg-white items-center flex justify-center flex-col-reverse lg:flex-row md:gap-28 gap-16">
        <div className="xl:pt-24 w-full xl:w-1/2 relative pb-12 lg:pb-0">
          <div className="relative">
            <div className="absolute">
              <div className>
                <h1 className="my-2 text-gray-800 font-bold text-2xl">
                  Looks like you've found the doorway to the great nothing
                </h1>
                <p className="my-2 text-gray-800">
                  Sorry about that! Please visit our hompage to get where you
                  need to go.
                </p>
                <Link to ="/">
                <button className="sm:w-full lg:w-auto my-2 border rounded md py-4 px-8 text-center bg-[var(--red-color)] text-white hover:bg-indigo-700 ">
                  Take me there!
                </button>
                </Link>
              </div>
            </div>
            <div>
              <img src="https://i.ibb.co/G9DC8S0/404-2.png" alt="" />
            </div>
          </div>
        </div>
        <div>
          <img src="https://i.ibb.co/ck1SGFJ/Group.png" alt="" />
        </div>
      </div>
    </Layout>
  );
};

export default PageNotFound;
