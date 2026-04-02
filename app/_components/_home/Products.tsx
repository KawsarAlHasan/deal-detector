import React from "react";
import { FaAngleRight } from "react-icons/fa";

function Products() {
  return (
    <div className="w-full flex flex-col gap-6 mt-14">
      <div className="flex items-center justify-between">
        <p className="font-bold text-lg">Products</p>
        <button className="bg-[#18365D] p-2 rounded-full">
          <FaAngleRight className="text-white text-xl" />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          {
            label: "Search",
            color: "#D1D1D1",
            icon: "/static/images/Frame 2147224448.png",
          },
          {
            label: "Groceries",
            color: "#36B6B7",
            icon: "/static/images/Vector.png",
          },
          {
            label: "Fruits",
            color: "#3FA7F3",
            icon: "/static/images/healthicons_fruits-outline.png",
          },
          {
            label: "Dairy",
            color: "#A850E1",
            icon: "/static/images/Vector (2).png",
          },
          {
            label: "Fruits",
            color: "#3FA7F3",
            icon: "/static/images/healthicons_fruits-outline.png",
          },
          {
            label: "Vegetable",
            color: "#C06BA8",
            icon: "/static/images/Vector (3).png",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="rounded-lg flex flex-col items-center justify-center p-6"
            style={{ backgroundColor: item.color }}
          >
            <img src={item.icon} className="w-14 h-14 mb-3" alt={item.label} />
            <p className="text-white font-medium text-sm">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
