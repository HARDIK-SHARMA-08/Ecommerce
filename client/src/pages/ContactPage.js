import React from "react";
import { Layout } from "../components/Layout/Layout";

const ContactPage = () => {
  return (
    <Layout>
      <section className="bg-white ">
        <div className="p-8 mx-auto max-w-screen-md">
          <div className="mb-1 text-3xl text-center font-semibold italic text-[var(--black-color)] md:text-5xl lg:text-6xl ">
            <span class="before:block before:absolute before:-inset-1 before:-skew-y-2 hover:before:skew-y-3 before:ease-in before:duration-300 before:bg-[var(--red-color)] relative inline-block">
              <span class="relative text-white">contact</span>
            </span>{" "}
            us
            <span className="text-[var(--red-color)] font-extrabold text-6xl">
              .
            </span>
          </div>
          <p className="mb-8 lg:m-10 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
            Got a technical issue? Want to send feedback about a beta feature?
            Need details about our Business plan? Let us know.
          </p>
          <form action="#" className="space-y-8">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-[var(--black-color)] dark:text-[var(--black-color)]"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-[var(--black-color)] text-[var(--black-color)] text-sm rounded-lg focus:ring-[var(--red-color)] focus:border-[var(--red-color)] block w-full p-2.5"
                placeholder="hardiksharma602@gmail.com"
                required
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block mb-2 text-sm font-medium text-[var(--black-color)] dark:text-[var(--black-color)]"
              >
                Subject
              </label>
              <input
                type="text"
                id="subject"
                className="block p-3 w-full text-sm text-[var(--black-color)] bg-gray-50 rounded-lg border border-[var(--black-color)] shadow-sm focus:ring-[var(--red-color)] focus:border-[var(--red-color)]"
                placeholder="Let us know how we can help you"
                required
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-[var(--black-color)] "
              >
                Your message
              </label>
              <textarea
                id="message"
                rows={6}
                className="block p-2.5 w-full text-sm text-[var(--black-color)] bg-gray-50 rounded-lg shadow-sm border border-[var(--black-color)] focus:ring-[var(--red-color)] focus:border-[var(--red-color)] "
                placeholder="Leave a comment..."
                defaultValue={""}
              />
            </div>
            <button
              type="submit"
              className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-[var(--red-color)] sm:w-fit hover:bg-red-800  "
            >
              Send message
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
