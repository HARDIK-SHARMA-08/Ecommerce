import React from "react";
import { Layout } from "../../components/Layout/Layout";
import UserProfile from "../../components/Layout/UserProfile";

const UserDashboard = () => {
  return (
    <Layout>
      <>
        <section className="p-8 z-0 bg-white">
          <div className="flex flex-col items-center px-4 text-center z-10">
            <div className="mb-6 text-3xl text-center font-semibold italic text-gray-900 md:text-5xl lg:text-6xl ">
              <span class="before:block before:absolute before:-inset-1 before:-skew-y-2 hover:before:skew-y-3 before:ease-in before:duration-300 before:bg-[var(--red-color)] relative inline-block">
                <span class="relative text-white">Dashboard</span>
              </span>
              <span className="text-[var(--black-color)] font-extrabold text-6xl pl-2">
                .
              </span>
            </div>
            <div className="w-full sm:w-4/12 bg-white border-2 border-[var(--black-color)] rounded-lg shadow-xl">
              <UserProfile />
            </div>
          </div>
        </section>
      </>
    </Layout>
  );
};

export default UserDashboard;
