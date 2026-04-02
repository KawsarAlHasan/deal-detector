"use client";

import Link from "next/link";
import ProductCard from "../../_components/ProductCard";
import { FaAngleDown } from "react-icons/fa";

const products = [
  {
    title: "Fried Chips",
    price: 12,
    image: "/static/images/c1c69cdd321fa0d61fa05668a7b660c9a730b8a1.jpg",
    primary: true,
    favorite: true,
  },
  {
    title: "Fried Chips",
    price: 12,
    image: "/static/images/c1c69cdd321fa0d61fa05668a7b660c9a730b8a1.jpg",
    primary: false,
    favorite: false,
  },
  {
    title: "Fried Chips",
    price: 12,
    image: "/static/images/c1c69cdd321fa0d61fa05668a7b660c9a730b8a1.jpg",
    primary: false,
    favorite: false,
  },
  {
    title: "Fried Chips",
    price: 12,
    image: "/static/images/c1c69cdd321fa0d61fa05668a7b660c9a730b8a1.jpg",
    primary: false,
    favorite: false,
  },
  {
    title: "Fried Chips",
    price: 12,
    image: "/static/images/c1c69cdd321fa0d61fa05668a7b660c9a730b8a1.jpg",
    primary: false,
    favorite: false,
  },
  {
    title: "Fried Chips",
    price: 12,
    image: "/static/images/c1c69cdd321fa0d61fa05668a7b660c9a730b8a1.jpg",
    primary: false,
    favorite: false,
  },
  {
    title: "Fried Chips",
    price: 12,
    image: "/static/images/c1c69cdd321fa0d61fa05668a7b660c9a730b8a1.jpg",
    primary: false,
    favorite: false,
  },
  {
    title: "Fried Chips",
    price: 12,
    image: "/static/images/c1c69cdd321fa0d61fa05668a7b660c9a730b8a1.jpg",
    primary: false,
    favorite: true,
  },
  {
    title: "Fried Chips",
    price: 12,
    image: "/static/images/c1c69cdd321fa0d61fa05668a7b660c9a730b8a1.jpg",
    primary: false,
    favorite: true,
  },
  {
    title: "Fried Chips",
    price: 12,
    image: "/static/images/c1c69cdd321fa0d61fa05668a7b660c9a730b8a1.jpg",
    primary: false,
    favorite: false,
  },
  {
    title: "Fried Chips",
    price: 12,
    image: "/static/images/c1c69cdd321fa0d61fa05668a7b660c9a730b8a1.jpg",
    primary: false,
    favorite: false,
  },
  {
    title: "Fried Chips",
    price: 12,
    image: "/static/images/c1c69cdd321fa0d61fa05668a7b660c9a730b8a1.jpg",
    primary: false,
    favorite: false,
  },
];

function page() {
  return (
    <div className="max-w-7xl mx-4 lg:mx-auto mt-6">
      <div className="text-sm text-[#18365D] flex items-center gap-1 mb-4">
        <Link href="/" className="hover:underline">
          Back
        </Link>
        <span>/</span>
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <span>/</span>
        <Link href="/products" className="underline font-semibold">
          All Products
        </Link>
      </div>

      <div className="w-full flex flex-col gap-5">
        <div className=" flex  justify-center items-center md:gap-5 gap-2">
          <p className="text-1xl  bg-[#18365D]  text-white px-3 md:px-5 py-2 rounded-2xl md:w-32 text-center ">
            Groceries
          </p>
          <p className="text-1xl border  text-[#94A2B8]  border-[#94A2B8]  px-3 md:px-5 py-2 rounded-2xl md:w-32 text-center ">
            Fruits
          </p>
          <p className="text-1xl border  text-[#94A2B8]  border-[#94A2B8]  px-3 md:px-5 py-2 rounded-2xl md:w-32 text-center ">
            Vegetable
          </p>
          <p className="text-1xl border  text-[#94A2B8]  border-[#94A2B8]  px-3 md:px-5 py-2 rounded-2xl md:w-32 text-center ">
            Drinks
          </p>
        </div>
        <div className="flex justify-between">
          <p className="font-bold text-lg"> All Product</p>
          <p className=" border rounded border-[#FEAD2B] px-2 text-[#18365D] cursor-pointer flex items-center gap-3">
            <FaAngleDown />
            Short list
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {products.map((item, index) => (
            <ProductCard
              key={index}
              title={item.title}
              price={item.price}
              image={item.image}
              primary={item.primary}
              favorite={item.favorite}
              tag="Jumbo"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
