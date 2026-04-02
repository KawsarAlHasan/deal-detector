"use client";
import {
  Button,
  Form,
  FormProps,
  Input,
  Typography,
  Modal,
  message,
} from "antd";
import { useState } from "react";
import { MdOutlineChevronRight } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";

const { Title } = Typography;

type FieldType = {
  old_password: string;
  new_password: string;
  confirm_password: string;
};

function PasswordChange() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.new_password !== values.confirm_password) {
      message.error("New password and confirm password do not match!");
      return;
    }

    try {
      console.log("Password Values:", values);

      message.success("Password changed successfully!");
      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.log("error", error);
      message.error("Failed to change password!");
    }
  };

  return (
    <div>
      <div
        onClick={showModal}
        className="flex justify-between items-center py-3 px-2.5 cursor-pointer hover:bg-blue-50 rounded-lg transition-all duration-200"
      >
        <div className="flex items-center gap-3 md:text-lg text-[#18365D]">
          <div className="border text-gray-400 rounded-full p-0.5">
            <RiLockPasswordLine size={22} />
          </div>
          Change Password
        </div>
        <MdOutlineChevronRight size={22} className="text-gray-400" />
      </div>

      <Modal
        title={false}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        centered
        className="account-settings-modal"
      >
        <div className="w-full rounded-xl bg-white p-2">
          <div className="text-center mb-6">
            <Title level={3} className="!mb-1 !text-[#18365D]">
              Change Password
            </Title>
            <p className="text-gray-500 text-sm">
              Update your account password
            </p>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
          >
            <Form.Item
              label="Old Password"
              name="old_password"
              rules={[
                { required: true, message: "Old password is required!" },
              ]}
            >
              <Input.Password size="large" placeholder="Enter old password" />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="new_password"
              rules={[
                { required: true, message: "New password is required!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password size="large" placeholder="Enter new password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="confirm_password"
              dependencies={["new_password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("new_password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Passwords do not match!")
                    );
                  },
                }),
              ]}
            >
              <Input.Password size="large" placeholder="Confirm new password" />
            </Form.Item>

            <Form.Item className="!mb-0 !mt-6">
              <div className="flex gap-3">
                <Button
                  size="large"
                  onClick={handleCancel}
                  className="flex-1 rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="flex-1 rounded-lg bg-[#18365D] hover:bg-blue-700"
                >
                  Change Password
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Modal>
    </div>
  );
}

export default PasswordChange;
