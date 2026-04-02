"use client";

import { Button, message } from "antd";
import React from "react";

const page = () => {
  const benefitsData = [
    {
      icon: "🆓",
      friendsReferred: 1,
      title: "For Free Users:",
      description: "You unlocked 1 extra favorite place by referring a friend!",
      notes: [
        {
          icon: "📝",
          text: "Note: Your friend must download the app and buy a subscription to complete the referral.",
        },
      ],
    },
    {
      icon: "👑",
      friendsReferred: 1,
      title: "For Premium Users:",
      description: "Refer a friend and both of you get 1 month free premium!",
      notes: [
        {
          icon: "📝",
          text: "Note: Your friend must use your referral link and purchase a premium plan to activate the reward.",
        },
      ],
    },
  ];
  const referrals = [
    {
      isPremium: false,
      friendsReferred: 1,
      totalSlots: "4",
      benefitsData,
    },
    {
      isPremium: false,
      friendsReferred: 1,
      totalSlots: "Unlimited",
      benefitsData,
    },
  ];

  const handleCopyLink = () => {
    // Simulate copying referral link
    navigator.clipboard.writeText("https://app.example.com/ref/abc123");
    message.success("Referral link copied to clipboard!");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {referrals.map((item, index) => (
        <div
          key={index}
          className="max-w-lg rounded-lg shadow-md bg-white p-6 sm:p-8 lg:p-10 border border-gray-200 mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-6 md:px-10">
            <h1 className="text-2xl font-bold text-gray-900 mb-3">
              Get More Favorites – Just by Referring!
            </h1>
            <p className="text-gray-600 text-sm">
              You unlocked 1 extra favorite slot by referring 1 friend!
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-blue-50 rounded-lg py-10 px-6 mb-6 grid grid-cols-2 items-center place-items-center divide-x divide-gray-300 border-2 border-gray-100">
            {/* Friends Referred */}
            <div className="w-full flex-1 text-center px-4">
              <div className="text-2xl sm:text-3xl text-gray-900 mb-2">
                {item.friendsReferred}
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                Friends Referred
              </div>
            </div>

            {/* Total Slots */}
            <div className="w-full flex-1 text-center px-4">
              <div
                className={`text-2xl sm:text-3xl mb-2 ${
                  item.totalSlots === "Unlimited"
                    ? "text-green-600"
                    : "text-gray-900"
                }`}
              >
                {item.totalSlots}
              </div>
              <div className="text-sm text-gray-600 font-semibold">
                Total Slots in favorite
              </div>
            </div>
          </div>

          {/* Benefits List */}
          <div className="space-y-6 mb-6">
            {item.benefitsData.map((benefit, index) => (
              <div key={index}>
                <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <span>{benefit.icon}</span>
                  {benefit.title}
                </h3>

                <p className="text-sm text-gray-700 mb-3">
                  {benefit.description}
                </p>

                {benefit.notes.map((note, noteIndex) => (
                  <div
                    key={noteIndex}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span className="mt-0.5">{note.icon}</span>
                    <span>{note.text}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <Button
            size="large"
            onClick={handleCopyLink}
            className="w-full text-[#18365D]! border-[#18365D]!"
          >
            Copy Referral Link
          </Button>
        </div>
      ))}
    </div>
  );
};

export default page;
