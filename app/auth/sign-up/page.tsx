"use client";
import { useState } from "react";
import { Form, Input, Button, Divider, Typography, Image } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Link from "next/link";

const { Text } = Typography;

export default function SignUpPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      console.log("Login values:", values);
      // handle login logic here
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col px-8 md:px-12 py-10">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8">
        <Image
          src="/static/images/auth_logo.svg"
          alt="Logo"
          style={{ objectFit: "contain" }}
          sizes="100vw"
          preview={false}
        />
      </div>

      {/* Form Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-800">Sign Up</h2>
        <p className="text-gray-400 text-sm mt-1">
          Please enter your details to sign up
        </p>
      </div>

      {/* Form */}
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        size="large"
      >
        <Form.Item
          label={
            <span className="text-gray-700 font-medium text-sm">Email</span>
          }
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input
            placeholder="Enter your email"
            className="!rounded-lg !bg-[#f0f4ff] !border-transparent hover:!border-blue-300 focus:!border-blue-400 !h-11"
            style={{ backgroundColor: "#f0f4ff" }}
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-gray-700 font-medium text-sm">Password</span>
          }
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
          className="!mb-1"
        >
          <Input.Password
            placeholder="Enter your password"
            className="!rounded-lg !bg-[#f0f4ff] !border-transparent hover:!border-blue-300 focus:!border-blue-400 !h-11"
            style={{ backgroundColor: "#f0f4ff" }}
            iconRender={(visible) =>
              visible ? (
                <EyeTwoTone className="text-gray-400" />
              ) : (
                <EyeInvisibleOutlined className="text-gray-400" />
              )
            }
          />
        </Form.Item>

        <Form.Item
          label={
            <span className="text-gray-700 font-medium text-sm">
              Confirm Password
            </span>
          }
          name="password"
          rules={[{ required: true, message: "Please enter your password" }]}
          className="!mb-1"
        >
          <Input.Password
            placeholder="Enter your password"
            className="!rounded-lg !bg-[#f0f4ff] !border-transparent hover:!border-blue-300 focus:!border-blue-400 !h-11"
            style={{ backgroundColor: "#f0f4ff" }}
            iconRender={(visible) =>
              visible ? (
                <EyeTwoTone className="text-gray-400" />
              ) : (
                <EyeInvisibleOutlined className="text-gray-400" />
              )
            }
          />
        </Form.Item>
        <span className="!my-4 "></span>
        {/* Log In Button */}
        <Form.Item className="!mb-3">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
            className="!h-12 !rounded-lg !bg-red-500 hover:!bg-red-600 !border-none !text-white !font-semibold !text-base"
            style={{ backgroundColor: "#e53e3e", border: "none" }}
          >
            Sign Up
          </Button>
        </Form.Item>

        {/* Sign Up Button */}
        <Form.Item className="!mb-4">
          <Button
            block
            className="!h-12 !rounded-lg !bg-white !border-red-500 !text-red-500 hover:!bg-red-50 hover:!border-red-600 !font-semibold !text-base"
          >
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
        </Form.Item>
      </Form>

      {/* Footer text */}
      <div className="text-center mt-6">
        <Text className="text-gray-400 text-xs">
          Save money on groceries with smart deals alerts
        </Text>
      </div>
    </div>
  );
}
