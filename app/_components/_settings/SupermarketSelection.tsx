"use client";
import { Button, Form, FormProps, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import { FiCheck } from "react-icons/fi";
import { fetcherWithTokenPost } from "@/app/api-services/api";
import {
  useMySupermarkets,
  useSupermarkets,
} from "@/app/api-services/superMercketServices";

type FieldType = {
  supermarket: string;
};

function SupermarketSelection() {
  const { supermarkets, isLoading, mutate } = useSupermarkets();
  const {
    mySupermarkets,
    isLoading: isMySupermarketsLoading,
    mutate: mutateMySupermarkets,
  } = useMySupermarkets();

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState<number[]>([]);
  const [savedValues, setSavedValues] = useState<number[]>([]);

  useEffect(() => {
    if (mySupermarkets && mySupermarkets.length > 0) {
      const ids = mySupermarkets.map((m: any) => m.supermarket_id);
      setSelectedValues(ids);
      setSavedValues(ids);
    }
  }, [mySupermarkets]);

  const showModal = () => {
    setSelectedValues(savedValues);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedValues(savedValues);
  };

  const toggleSelection = (marketId: number) => {
    setSelectedValues((prev) =>
      prev.includes(marketId)
        ? prev.filter((id) => id !== marketId)
        : [...prev, marketId],
    );
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async () => {
    try {
      if (selectedValues.length === 0) {
        message.error("Please select at least one supermarket!");
        return;
      }

      const payload = { supermarket_id: selectedValues };

      const res = await fetcherWithTokenPost(
        "/api/service/selected-supermarkets/",
        payload,
      );

      if (res) {
        setSavedValues(selectedValues);
        message.success("Supermarket selection updated successfully!");
        mutate?.();
        mutateMySupermarkets?.();
        setIsModalOpen(false);
      }
    } catch (error) {
      message.error("Failed to update supermarket selection!");
      console.error("error", error);
    }
  };

  const savedNames = supermarkets?.supermarkets
    ?.filter((m: any) => savedValues.includes(m.id))
    ?.map((m: any) => m.name)
    ?.join(", ");

  return (
    <div>
      <div
        onClick={showModal}
        className="flex justify-between items-center py-3 px-2.5 cursor-pointer hover:bg-blue-50 transition-all rounded-lg"
      >
        <div className="flex items-center gap-3 md:text-lg text-[#18365D]">
          <img
            src="/static/settings/market.svg"
            alt="supermarket"
            className="size-6 md:size-7"
          />
          <div className="flex flex-col">
            <span>Supermarket Selection</span>
            {savedNames ? (
              <span className="text-sm text-gray-500 capitalize mt-0.5">
                Current: {savedNames}
              </span>
            ) : isMySupermarketsLoading ? (
              <span className="text-sm text-gray-400 mt-0.5">Loading...</span>
            ) : null}
          </div>
        </div>
        <MdOutlineChevronRight size={22} />
      </div>

      <Modal
        title={
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-[#18365D]">
              Select Your Supermarket
            </h3>
            <p className="text-sm text-gray-500 mt-1.5">
              Choose one or more supermarkets for shopping
            </p>
          </div>
        }
        closable={true}
        open={isModalOpen}
        onCancel={handleCancel}
        width={650}
        footer={false}
        centered
        className="supermarket-selection-modal"
      >
        <div className="w-full pt-6">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className="w-full"
          >
            {selectedValues.length > 0 && (
              <p className="text-sm text-blue-600 mb-3 font-medium">
                {selectedValues.length} supermarket
                {selectedValues.length > 1 ? "s" : ""} selected
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 mb-6">
              {isLoading ? (
                <p className="text-gray-400 col-span-3 text-center py-8">
                  Loading supermarkets...
                </p>
              ) : (
                supermarkets?.supermarkets?.map((market: any) => (
                  <div
                    key={market.id}
                    onClick={() => toggleSelection(market.id)}
                    className={`relative py-4 px-4 flex flex-col items-center justify-center min-h-[160px] border-2 rounded-xl transition-all duration-200 cursor-pointer hover:border-blue-500 hover:shadow-lg ${
                      selectedValues.includes(market.id)
                        ? "border-blue-500 bg-blue-50/50 shadow-lg ring-2 ring-blue-100"
                        : "border-gray-200 bg-gray-50/50 hover:bg-white"
                    }`}
                  >
                    {selectedValues.includes(market.id) && (
                      <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <FiCheck className="text-white" size={16} />
                      </div>
                    )}

                    <div className="relative w-full h-[70px] flex items-center justify-center mb-3">
                      <img
                        src={market?.logo_url ?? "/static/settings/market.svg"}
                        alt={market.name}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    <p
                      className={`font-semibold text-center text-base transition-colors ${
                        selectedValues.includes(market.id)
                          ? "text-blue-600"
                          : "text-gray-700"
                      }`}
                    >
                      {market.name}
                    </p>
                  </div>
                ))
              )}
            </div>

            <div className="flex gap-3">
              <Button size="large" onClick={handleCancel} className="flex-1 h-11">
                Cancel
              </Button>
              <Button
                type="primary"
                size="large"
                htmlType="submit"
                className="flex-1 h-11 font-medium"
              >
                Save Changes
              </Button>
            </div>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default SupermarketSelection;