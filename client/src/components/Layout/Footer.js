import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="bg-[var(--black-color)]  bottom-0">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center">
              <span className="self-center text-5xl sm:text-6xl font-bold whitespace-nowrap font-[CustomFont] text-white">
                uncommon
                <span className="text-[var(--red-color)] font-extrabold text-6xl">
                  .
                </span>
              </span>
            </div>
            <ul className="flex flex-wrap items-center mb-6 text-md font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <a href="https://github.com/HARDIK-SHARMA-08" className="mr-4 hover:underline md:mr-6 ">
                  Github
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/hardik-sharma8/" className="mr-4 hover:underline md:mr-6">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://twitter.com/Hardik602sharma" className="mr-4 hover:underline md:mr-6 ">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <a href="#" className="hover:underline">
              uncommon™
            </a>
            . All Rights Reserved.
          </span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
