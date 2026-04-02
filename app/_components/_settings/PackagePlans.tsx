"use client";
import { Modal } from "antd";
import { useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import Link from "next/link";

function PackagePlans() {
  const [selectedPlan, setSelectedPlan] = useState("annual");

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div
        onClick={showModal}
        className="flex justify-between items-center py-3 px-2.5 cursor-pointer hover:bg-blue-50 transition-all"
      >
        <div className="flex items-center gap-3 md:text-lg text-[#18365D]">
          <img
            src="/static/settings/plan.svg"
            alt={"setting"}
            className="size-6 md:size-7"
          />
          Package & Plans
        </div>
        <MdOutlineChevronRight size={22} />
      </div>

      <Modal
        title={
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-[#18365D]">
              Get Premium
            </h3>
            <p className="text-sm text-gray-500 mt-1.5">
              Unlock all the power of this mobile tool and enjoy digital
              experience like never before!
            </p>
          </div>
        }
        closable={true}
        open={isModalOpen}
        onCancel={handleCancel}
        width={550}
        footer={false}
        centered
        className="supermarket-selection-modal"
      >
        <div className="w-full pt-6">
          {/* Illustration */}
          <div className="relative p-8 mb-2">
            <img
              src="/static/images/plan-image.svg"
              alt="Logo"
              width={1000}
              height={1000}
            />
          </div>
          {/* Pricing Plans */}
          <div className="space-y-4 mb-6">
            {/* Annual Plan */}
            <button
              onClick={() => setSelectedPlan("annual")}
              className={`w-full p-5 rounded-2xl border-2 transition-all ${
                selectedPlan === "annual"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-gray-900">
                  Annual
                </span>
                <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  Best Value
                </span>
              </div>
              <p className="text-left text-sm text-gray-600">
                First 30 days free - Then $999/Year
              </p>
            </button>

            {/* Monthly Plan */}
            <button
              onClick={() => setSelectedPlan("monthly")}
              className={`w-full p-5 rounded-2xl border-2 transition-all ${
                selectedPlan === "monthly"
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 bg-gray-50 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-gray-900">
                  Monthly
                </span>
              </div>
              <p className="text-left text-sm text-gray-600">
                First 7 days free - Then $99/Month
              </p>
            </button>
          </div>

          {/* CTA Button */}
          <button className="w-full bg-[#18365D] hover:bg-[#18365de5] text-white font-semibold py-4 rounded-2xl transition-colors mb-4 cursor-pointer">
            Start 30-day free trial
          </button>

          {/* Terms */}
          <p className="text-xs text-gray-600 leading-relaxed text-center">
            By placing this order, you agree to the{" "}
            <Link
              href={"/settings/terms"}
              className="font-semibold text-gray-900"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href={"/settings/privacy-policy"}
              className="font-semibold text-gray-900"
            >
              Privacy Policy
            </Link>
            . Subscription automatically renews unless auto-renew is turned off
            at least 24-hours before the end of the current period.
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default PackagePlans;
