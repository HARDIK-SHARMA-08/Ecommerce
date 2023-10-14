import React from "react";
import { Layout } from "../components/Layout/Layout";
import HeroSection from "../components/HeroSection";
import OversizedImage from "../Assets/Gojo_Back_2-removebg-preview.png";
import PoloImage from "../Assets/0526420730_6_1_1-removebg-preview.png";
import JeansImage from "../Assets/0108401707_6_1_1-removebg-preview.png";
import ProductCarousel from "../components/ProductCarousel";
import { Link } from "react-router-dom";

const HomePage = () => {
  const categoryData = [
    {
      name: "Oversized T-Shirts",
      slug: "oversized-t-shirts",
      image: OversizedImage,
    },
    {
      name: "T-Shirts",
      slug: "t-shirts",
      image: PoloImage,
    },
    {
      name: "Jeans",
      slug: "jeans",
      image: JeansImage,
    },
  ];

  return (
    <Layout>
      <div className="-mt-0 md:-mt-20 items-center">
        {/* Carousel */}
        <HeroSection />
        <div className="flex flex-col items-center justify-center w-full p-8 md:p-6">
          <span className="text-5xl font-bold font-[CustomFont] text-[var(--black-color)] md:text-6xl">
            uncommon
            <span className="text-[var(--red-color)] font-extrabold text-5xl">
              .
            </span>
          </span>
          <p className="text-justify w-full md:w-10/12 md:text-center justify-center md:text-xl pt-2">
            The fashion revolution you've been waiting for. We're not just a
            brand, we're a movement. Unleash your individuality, break the style
            norms, and embrace the extraordinary. Uncommon, because being
            ordinary is so last season
          </p>
        </div>

        <div className="inline-flex items-center justify-center w-full">
          <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded " />
          <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 ">
            <svg
              className="w-4 h-4 text-gray-700 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 14"
            >
              <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
            </svg>
          </div>
        </div>

        <div className="mb-1 mt-8 text-5xl text-center font-semibold italic text-gray-900 md:text-5xl lg:text-6xl ">
          Best{" "}
          <span class="before:block before:absolute before:-inset-1 before:-skew-y-2 hover:before:skew-y-3 before:ease-in before:duration-300 before:bg-[var(--red-color)] relative inline-block">
            <span class="relative text-white">sellers</span>
          </span>
          <span className="text-[var(--black-color)] font-extrabold text-6xl pl-2">
            .
          </span>
        </div>
        <div className="p-6">
          <ProductCarousel />
        </div>
        <hr className="h-px m-8 bg-gray-200 border-0 dark:bg-gray-300 " />

        <div className="mb-1 pt-8 text-5xl text-center font-semibold italic text-gray-900 md:text-5xl lg:text-6xl ">
          All{" "}
          <span class="before:block before:absolute before:-inset-1 before:-skew-y-2 hover:before:skew-y-3 before:ease-in before:duration-300 before:bg-[var(--red-color)] relative inline-block">
            <span class="relative text-white">categories</span>
          </span>
          <span className="text-[var(--black-color)] font-extrabold text-6xl pl-2">
            .
          </span>
        </div>

        <div className="p-6 grid grid-cols-1 gap-6 md:grid-cols-3 md:p-20 md:pt-6">
          {categoryData.map((c) => (
            <Link
              to={`/category/${c.slug}`}
              className="flex flex-row items-center justify-evenly bg-[var(--black-color)] rounded-[30px] w-full h-[200px]"
            >
              <div className="">
                <img src={c.image} className="h-[175px]" />
              </div>
              <div className="flex flex-col items-start font-extrabold uppercase rounded-br-[30px] text-left text-white">
                {c.name}
                <div className="font-medium text-sm uppercase rounded-[30px] bg-white px-4 py-1 mt-2 text-[var(--black-color)]">
                  Shop Now
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
