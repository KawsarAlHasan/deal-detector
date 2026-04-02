"use client";

import Image from "next/image";
import Link from "next/link";
import { FaChevronRight, FaTrash } from "react-icons/fa";

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
        <Link href="/allProduct" className="hover:underline">
          All Products
        </Link>
        <span>/</span>
        <Link href="/shop-list-jumbo" className="underline font-semibold">
          Shop List-Jumbo
        </Link>
      </div>
      <div className="flex justify-center gap-10 mt-4 mb-10">
        <div className="bg-[#F6D64A] shadow-md w-[250px] h-[150px] rounded-md flex flex-col items-center justify-center cursor-pointer">
          <Image
            src="/static/images/bookmark.png"
            width={30}
            height={30}
            alt="Saved"
          />
          <p className="mt-3 font-medium text-[#1C1C1C]">Saved List</p>
        </div>
        <div className="bg-[#EAF2FB] shadow-md w-[250px] h-[150px] rounded-md flex flex-col items-center justify-center cursor-pointer">
          <Image
            src="/static/images/plus.png"
            width={30}
            height={30}
            alt="Add"
          />
          <p className="mt-3 font-medium text-[#1C1C1C]">Create New List</p>
        </div>
      </div>
      <div className="flex justify-between">
        <h2 className="text-xl font-semibold mb-5">Albert Products</h2>
        <button className=" bg-[#18365D] text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#0d233d]">
          <FaChevronRight />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            className="bg-[#FAF3C2] border border-[#DDDDDD] rounded-lg p-4 flex justify-between items-start"
          >
            <div className="flex gap-3">
              <div className=" border  rounded-2xl p-0.5 w-fit h-fit  md:block  hidden">
                <img src="/static/images/carbon_checkmark-filled.svg" alt="" />
              </div>
              {/* <Image
                                   
                                    width={70}
                                    height={70}
                                    alt="Carrot"
                                    className="rounded-md object-cover"
                                /> */}
              <img
                className="rounded-md object-cover md:w-[70px] md:h-[70px]  w-[60px] h-[60px]"
                src="/static/images/food.png"
                alt=""
              />

              <div>
                <p className="font-semibold text-[#1B1B1B]">
                  Carrot1 <span className="font-normal">35% Discount</span>
                </p>

                <button className="mt-2 bg-[#11233D] text-white px-4 py-2 text-sm rounded-md flex items-center gap-2 hover:bg-[#0d1b30] transition">
                  Move to next supermarket →
                </button>
              </div>
            </div>
            <div className="flex flex-col items-end gap-3">
              <p className="font-semibold text-[#1B1B1B]">$420</p>

              <div className=" bg-white  w-fit h-fit flex justify-center items-center p-1 rounded-lg shadow-md">
                <button className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-8">
        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
        <div className="w-3 h-3 rounded-full bg-black"></div>
        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
        <div className="w-3 h-3 rounded-full bg-gray-400"></div>
      </div>
      <div className="flex justify-center gap-2 mt-8">
        <Link
          href="/purchased"
          className="bg-[#18365D] px-10 py-2 rounded-md text-white flex items-center justify-center gap-2"
        >
          <img src="/static/images/2048947 1.png" alt="Checkmark" />
          Purchased
        </Link>
        <button className=" border  border-[#18365D] px-10 py-2 flex items-center gap-2 rounded-md">
          <FaTrash className=" text-red-500 hover:text-red-700" />
          Delete
        </button>
      </div>
    </div>
  );
}

export default page;
