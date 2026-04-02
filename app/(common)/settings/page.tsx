"use client";

import { Avatar, Badge, message, Switch } from "antd";
import { Typography } from "antd";
import { MdOutlineChevronRight } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { useRouter } from "next/navigation";
import AcountSettings from "@/app/_components/_settings/AcountSettings";
import PasswordChange from "@/app/_components/_settings/PasswordChange";
import ChangeLanguage from "@/app/_components/_settings/ChangeLanguage";
import SupermarketSelection from "@/app/_components/_settings/SupermarketSelection";
import PackagePlans from "@/app/_components/_settings/PackagePlans";
import { useMyProfile } from "@/app/api-services/userServices";
import { BASE_URL, fetcherWithTokenPatch } from "@/app/api-services/api";
import { UserOutlined } from "@ant-design/icons";

const { Title } = Typography;

const settingsMenu = [
  { src: "referral", label: "Referral", icon: "/static/settings/referral.svg" },
  {
    src: "terms",
    label: "Terms & Condition",
    icon: "/static/settings/terms.svg",
  },
  {
    src: "privacy-policy",
    label: "Privacy Policy",
    icon: "/static/settings/privacy.svg",
  },
];

const Page = () => {
  const router = useRouter();

  const { profileData, isLoading, isError, mutate } = useMyProfile();

  const onChange = async (checked: boolean) => {
    console.log(`switch to ${checked}`);

    try {
      const res = await fetcherWithTokenPatch(
        "/api/auth/user/notification/toggle/",
        {},
      );

      console.log("res", res);

      message.success("Notification updated successfully!");
      mutate();
    } catch (error: any) {
      console.log("error", error);
      message.error("Failed to update notification!");
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full rounded-lg shadow-md bg-white p-6 sm:p-8 lg:p-10 border border-gray-200">
      <div className="text-center">
        <Avatar
          size={100}
          icon={<UserOutlined />}
          src={BASE_URL + profileData?.profile_picture}
          className="profile-avatar"
        />
        <Title level={4} className="mt-2">
          {profileData?.full_name || "Your Name"}
        </Title>
        <p className="text-sm leading-3">
          {profileData?.is_premium ? "Premium User" : "Free User"}
        </p>
      </div>
      <Title level={4} className="mt-3 text-[#18365D]">
        {"Profile"}
      </Title>
      <div className="divide-y divide-gray-200/80">
        <AcountSettings
          profileData={profileData}
          isLoading={isLoading}
          isError={isError}
          mutate={mutate}
        />

        <PasswordChange />

        <div className="flex justify-between items-center py-3 px-2.5">
          <div className="flex items-center gap-3 md:text-lg text-[#18365D]">
            <Badge count={4} offset={[-2, 5]} size="small">
              <IoIosNotifications className="text-[#ffc107]" size={28} />
            </Badge>
            Notification
          </div>

          {profileData && (
            <>
              <Switch
                size="small"
                defaultChecked={profileData.is_notification}
                onChange={onChange}
              />
            </>
          )}
        </div>
      </div>

      <Title level={4} className="mt-3 text-[#18365D]">
        {"More Languages Supermarket"}
      </Title>
      <div className="divide-y divide-gray-200/80">
        <SupermarketSelection />

        <ChangeLanguage />

        <PackagePlans />

        {settingsMenu.map((memu) => (
          <div
            key={memu.label}
            onClick={() => router.push("/settings/" + memu.src)}
            className="flex justify-between items-center py-3 px-2.5 cursor-pointer hover:bg-blue-50 transition-all"
          >
            <div className="flex items-center gap-3 md:text-lg text-[#18365D]">
              <img
                src={memu.icon}
                alt={"setting"}
                className="size-6 md:size-7"
              />
              {memu.label}
            </div>
            <MdOutlineChevronRight size={22} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
