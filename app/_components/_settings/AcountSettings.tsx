"use client";
import {
  BASE_URL,
  fetcherWithTokenPatchFormData,
} from "@/app/api-services/api";
import {
  Avatar,
  Button,
  Form,
  FormProps,
  Input,
  Typography,
  Modal,
  message,
  Spin,
} from "antd";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdOutlineChevronRight } from "react-icons/md";

const { Title } = Typography;

type FieldType = {
  full_name: string;
  email: string;
};

interface AccountSettingsProps {
  profileData: any;
  isLoading: boolean;
  isError: any;
  mutate: () => void;
}

function AccountSettings({
  profileData,
  isLoading,
  isError,
  mutate,
}: AccountSettingsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string>(
    "/test/user_demo.svg",
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form] = Form.useForm();

  // Show modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Image change handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        message.error("Image size must be less than 5MB!");
        return;
      }

      // Check file type
      if (!file.type.startsWith("image/")) {
        message.error("Please upload an image file!");
        return;
      }

      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Update form when profileData loads
  useEffect(() => {
    if (profileData) {
      form.setFieldsValue({
        full_name: profileData.full_name,
        email: profileData.email,
      });

      // Set profile image if exists
      if (profileData.profile_picture) {
        setProfileImage(BASE_URL + profileData.profile_picture);
      }
    }
  }, [profileData, form]);

  // Form submit handler
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append("full_name", values.full_name);
      formData.append("email", values.email);

      if (imageFile) {
        formData.append("profile_picture", imageFile);
      }

      // Call the API
      const res = await fetcherWithTokenPatchFormData(
        "/api/auth/profile/update/",
        formData,
      );

      if (res) {
        message.success("Profile updated successfully!");
        mutate(); // Refresh the profile data
        setIsModalOpen(false);
      }
    } catch (error: any) {
      console.log("error", error);
      message.error(error?.message || "Failed to update profile!");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-between items-center py-3 px-2.5">
        <div className="flex items-center gap-3 md:text-lg text-[#18365D] font-medium">
          <img
            src="/static/settings/account.svg"
            alt="setting"
            className="size-6 md:size-7"
          />
          Account Settings
        </div>
        <Spin size="small" />
      </div>
    );
  }

  return (
    <div>
      <div
        onClick={showModal}
        className="flex justify-between items-center py-3 px-2.5 cursor-pointer hover:bg-blue-50 rounded-lg transition-all duration-200"
      >
        <div className="flex items-center gap-3 md:text-lg text-[#18365D] font-medium">
          <img
            src="/static/settings/account.svg"
            alt="setting"
            className="size-6 md:size-7"
          />
          Account Settings
        </div>
        <MdOutlineChevronRight size={22} className="text-gray-400" />
      </div>

      <Modal
        title={false}
        closable={true}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        centered
        className="account-settings-modal"
      >
        <div className="w-full rounded-xl bg-white p-6">
          {/* Header */}
          <div className="text-center mb-8">
            <Title level={3} className="!mb-1 !text-[#18365D]">
              Account Settings
            </Title>
            <p className="text-gray-500 text-sm">
              Update your account information
            </p>
          </div>

          {/* Profile Picture Section */}
          <div className="text-center mb-8">
            <div className="relative w-fit mx-auto group">
              <Avatar
                className="border-4 border-gray-100 shadow-lg transition-all duration-300 group-hover:border-blue-100"
                size={120}
                src={profileImage}
              />
              <label
                htmlFor="image-upload"
                className="absolute bottom-0 right-0 bg-[#18365D] text-white p-2.5 rounded-full cursor-pointer hover:bg-blue-700 transition-all duration-300 shadow-lg hover:scale-110"
              >
                <input
                  type="file"
                  name="image"
                  id="image-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <FiEdit size={18} />
              </label>
            </div>
            <Title level={4} className="!mt-4 !mb-1 !text-[#18365D]">
              {profileData?.full_name ?? "Your Name"}
            </Title>
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <span
                className={`inline-block w-2 h-2 ${profileData?.is_premium ? "bg-yellow-400" : "bg-gray-400"} rounded-full`}
              ></span>
              {profileData?.is_premium ? "Premium User" : "Free User"}
            </p>
          </div>

          {/* Form Section */}
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            className="w-full"
          >
            <Form.Item
              label={
                <span className="font-semibold text-gray-700">Full Name</span>
              }
              name="full_name"
              rules={[
                {
                  required: true,
                  message: "Name is required!",
                },
                {
                  min: 3,
                  message: "Name must be at least 3 characters!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter your full name"
                className="rounded-lg"
                disabled={isSubmitting}
              />
            </Form.Item>

            <Form.Item
              label={
                <span className="font-semibold text-gray-700">
                  Email Address
                </span>
              }
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Please enter a valid email!",
                },
                {
                  required: true,
                  message: "Email is required!",
                },
              ]}
            >
              <Input
                size="large"
                placeholder="Enter your email"
                className="rounded-lg"
                disabled
              />
            </Form.Item>

            {/* Action Buttons */}
            <Form.Item className="!mb-0 !mt-6">
              <div className="flex gap-3">
                <Button
                  size="large"
                  onClick={handleCancel}
                  className="flex-1 rounded-lg"
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="flex-1 rounded-lg bg-[#18365D] hover:bg-blue-700"
                  loading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Save Changes
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default AccountSettings;
