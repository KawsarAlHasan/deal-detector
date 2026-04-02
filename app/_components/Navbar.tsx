"use client";
import {
  Badge,
  Button,
  ConfigProvider,
  Drawer,
  Dropdown,
  Input,
  MenuProps,
  Select,
  Space,
} from "antd";
import { SearchProps } from "antd/es/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { GoChevronDown } from "react-icons/go";
import { IoIosNotifications } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { markets } from "../constants";

const { Search } = Input;

const items: MenuProps["items"] = [
  {
    label: "English",
    key: "0",
  },
  {
    label: "Dutch",
    key: "1",
  },
];

const Navbar = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onSearch: SearchProps["onSearch"] = (value, _e, info) =>
    console.log(info?.source, value);
  return (
    <ConfigProvider
      theme={{
        components: {
          Input: {
            borderRadiusLG: 50,
            padding: 20,
            paddingInlineLG: 20,
            colorTextPlaceholder: "#2d2d31",
          },
          Button: {
            borderRadiusLG: 50,
            colorPrimary: "#FFD74A",
            paddingInlineLG: 20,
          },
          Select: {
            colorTextPlaceholder: "#000000",
            colorBorder: "none",
            activeOutlineColor: "none",
            borderRadiusLG: 0,
            fontSize: 16,
          },
        },
      }}
    >
      <div className="bg-[#0000A3] text-white py-3">
        <div className="container max-w-[1320px] w-full mx-auto px-2 sm:px-4 lg:px-6 flex justify-between items-center">
          <h1 className="md:text-3xl text-[20px] font-bold">
            <Link href="/">DealDetector</Link>
          </h1>

          <div className="hidden w-full md:flex md:justify-center ">
            <Search
              placeholder="Search By Product Name..."
              onSearch={onSearch}
              enterButton
              size="large"
              className=" max-w-md  rounded-full "
              styles={{}}
            />
          </div>

          <div className="flex md:hidden lg:hidden ">
            <Search
              placeholder="Search By Product Name..."
              onSearch={onSearch}
              enterButton
              size="small"
              className="rounded-full !w-[200px]"
              styles={{}}
            />
          </div>

          <div className="hidden md:flex justify-end items-center gap-2 lg:gap-4 ">
            <Link href={"/settings"}>
              <button className=" flex items-center gap-x-2 border pl-2.5 pr-3.5  py-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer">
                <FaRegUser size={18} className="mb-[2px]" />
                <span className="inline-block mt-0.5">Profile</span>
              </button>
            </Link>
            <Link href={"/notifications"} className="relative">
              <Badge dot={true} offset={[-2, 5]} size="default">
                <IoIosNotifications className="text-white" size={28} />
              </Badge>
            </Link>
            <Dropdown
              menu={{ items }}
              trigger={["click"]}
              className="select-none"
            >
              <Space className="cursor-pointer">
                English
                <GoChevronDown size={18} />
              </Space>
            </Dropdown>
          </div>

          <div className="flex md:hidden">
            <GiHamburgerMenu onClick={showDrawer} size={28} />
          </div>

          <Drawer
            title="Deal Detector"
            closable={{ "aria-label": "Close Button" }}
            onClose={onClose}
            open={open}
            size={300}
          >
            <Link href={"/settings"}>
              <button className="w-full flex items-center gap-x-2 border pl-2.5 pr-3.5  py-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer">
                <FaRegUser size={18} className="mb-[2px]" />
                <span className="inline-block mt-0.5">Profile</span>
              </button>
            </Link>
            <Link href={"/notifications"}>
              <button className="w-full mt-2 flex items-center gap-x-2 border pl-2.5 pr-3.5  py-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer">
                <IoIosNotifications size={18} className="mb-[2px]" />
                <span className="inline-block mt-0.5">Notifications</span>
              </button>
            </Link>

            <button className="w-full mt-2 flex items-center gap-x-2 border pl-2.5 pr-3.5  py-1.5 rounded-lg hover:bg-white/10 transition cursor-pointer">
              <Dropdown
                menu={{ items }}
                trigger={["click"]}
                className="select-none"
              >
                <Space className="cursor-pointer flex justify-between w-full">
                  English
                  <GoChevronDown size={18} />
                </Space>
              </Dropdown>
            </button>

            <Link href={"/notifications"}>
              <button className="w-full mt-2 flex items-center gap-x-2 rounded-lg hover:bg-white/10 transition cursor-pointer">
                <div className="w-64 h-14">
                  <img src="/static/images/image 3.png" alt="" />
                </div>
              </button>
            </Link>
          </Drawer>
        </div>
      </div>

      <div className="bg-white shadow-md">
        <div className="py-3 md:py-6 max-w-[1320px] m-auto relative">
          <div className="flex justify-center items-center gap-2 md:gap-5 w-full lg:ml-[-60px]">
            <Link href={"/"}>Home</Link>
            {/* <Select
              // style={{ width: 140, }}
              onChange={(value) => router.push(`?market=${value}`)}
              options={markets.map((market) => ({
                value: market.value,
                label: (
                  <div className="flex items-center gap-2" title={market.label}>
                    <img
                      src={market.src}
                      alt={market.label}
                      className="w-6 h-6"
                    />
                    {market.label}
                  </div>
                ),
              }))}
              placeholder="Super market"
              variant="borderless"
              suffixIcon={
                <GoChevronDown size={17} className="mt-1.5 text-black" />
              }
            /> */}
            <Link href={"/shop-list"}> Shop list</Link>
            <Link href={"/favorite-products"} className="mx-2">
              Favorite
            </Link>
          </div>
          <Link href={"#app-download"}>
            <div className="w-64 h-14 hidden md:block absolute top-1/2 right-[2%] -translate-y-1/2">
              <img src="/static/images/image 3.png" alt="" />
            </div>
          </Link>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Navbar;
