"use client";
import { useState } from "react";
import { Form, Input, Button, Divider, Typography, Image, message } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Link from "next/link";
import { API } from "@/app/api-services/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const { Text } = Typography;

export default function SignInPage() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const res = await API.post("/api/auth/login/", values);

      console.log("res", res);

      const token = res?.data?.access;
      if (token) {
        message.success("Successfully logged in!");
        Cookies.set("token", token);
        router.push("/settings");
      }
    } catch (error: any) {
      console.log("error", error);
      message.error(`${error?.response?.data?.detail}`);
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
        <h2 className="text-xl font-bold text-gray-800">Login</h2>
        <p className="text-gray-400 text-sm mt-1">
          Login to access your travelwise account
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

        {/* Forgot Password */}
        <div className="flex justify-end mb-5">
          <Link
            href="/auth/forgot-password"
            className="text-sm text-red-500 hover:text-red-600 font-medium"
          >
            Forget Password?
          </Link>
        </div>

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
            Log in
          </Button>
        </Form.Item>

        {/* Sign Up Button */}
        <Form.Item className="!mb-4">
          <Button
            block
            className="!h-12 !rounded-lg !bg-white !border-red-500 !text-red-500 hover:!bg-red-50 hover:!border-red-600 !font-semibold !text-base"
          >
            <Link href="/auth/sign-up">Sign up</Link>
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
