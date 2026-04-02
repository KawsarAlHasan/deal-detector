"use client";
import { useState } from "react";
import ChatModal from "./ChatModal";

function HeroSection() {
  const [openChat, setOpenChat] = useState(false);
  return (
    <div className="mt-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-24 lg:px-24">
        <div className="bg-[#E2E8F0] w-full rounded-xl shadow p-6">
          <div className=" flex  justify-between items-center">
            <h2 className="text-2xl font-semibold text-[#0F2A44]">
              Saved Shopping
            </h2>
            <p className="text-green-600 text-2xl font-bold mt-4">$95</p>
          </div>
          <p className="text-gray-600 mt-2">
            Saved from your last shopping list
          </p>
          <button className="cursor-pointer mt-5 px-5 py-2 rounded-full border border-gray-400 hover:bg-gray-200 transition">
            View All
          </button>
        </div>

        <div className="bg-[#0F2A44] w-full rounded-xl shadow p-8 text-center">
          <div className="flex justify-center">
            <img
              src="/static/images/home-logo1.png"
              alt=""
              className="w-10 h-10"
            />
          </div>
          <h2 className="text-white text-xl font-semibold mt-3">
            Ai Chat Bot For Meal Planner
          </h2>
          <button
            onClick={() => setOpenChat(true)}
            className="cursor-pointer mt-6 bg-[#FFD54F] text-black px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 transition"
          >
            Start Chat
          </button>
        </div>
      </div>

      <ChatModal open={openChat} onClose={() => setOpenChat(false)} />
    </div>
  );
}

export default HeroSection;
