"use client";
import { Button, Form, FormProps, Modal, Image, message } from "antd";
import { useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import { FiCheck } from "react-icons/fi";

type FieldType = {
  supermarket: string;
};

const languages = [
  {
    name: "English",
    value: "English",
    image: "/static/images/english.png",
  },
  {
    name: "Dutch",
    value: "Dutch",
    image: "/static/images/dutch.png",
  },
];

function ChangeLanguage() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedSupermarket, setSelectedSupermarket] = useState<string>("");

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedValue(selectedSupermarket);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async () => {
    try {
      if (!selectedValue) {
        message.error("Please select a supermarket!");
        return;
      }
      setSelectedSupermarket(selectedValue);
      message.success("Supermarket selection updated successfully!");
      setIsModalOpen(false);
    } catch (error) {
      message.error("Failed to update supermarket selection!");
      console.log("error", error);
    }
  };

  return (
    <div>
      <div
        onClick={showModal}
        className="flex justify-between items-center py-3 px-2.5 cursor-pointer hover:bg-blue-50 transition-all"
      >
        <div className="flex items-center gap-3 md:text-lg text-[#18365D]">
          <img
            src="/static/settings/language.svg"
            alt={"setting"}
            className="size-6 md:size-7"
          />
          Change the Language
        </div>
        <MdOutlineChevronRight size={22} />
      </div>

      <Modal
        title={
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-semibold text-[#18365D]">
              Choose your language
            </h3>
            <p className="text-sm text-gray-500 mt-1.5">
              Select your preferred language
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6">
              {languages.map((market) => (
                <div
                  key={market.value}
                  onClick={() => setSelectedValue(market.value)}
                  className={`relative py-4 px-4 flex flex-col items-center justify-center min-h-[160px] border-2 rounded-xl transition-all duration-200 cursor-pointer hover:border-blue-500 hover:shadow-lg ${
                    selectedValue === market.value
                      ? "border-blue-500 bg-blue-50/50 shadow-lg ring-2 ring-blue-100"
                      : "border-gray-200 bg-gray-50/50 hover:bg-white"
                  }`}
                >
                  {selectedValue === market.value && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <FiCheck className="text-white" size={16} />
                    </div>
                  )}

                  <div className="relative w-full h-[70px] flex items-center justify-center mb-3">
                    <img
                      src={market.image}
                      alt={market.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>

                  <p
                    className={`font-semibold text-center text-base transition-colors ${
                      selectedValue === market.value
                        ? "text-blue-600"
                        : "text-gray-700"
                    }`}
                  >
                    {market.name}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Button
                size="large"
                onClick={handleCancel}
                className="flex-1 h-11"
              >
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

export default ChangeLanguage;
