"use client";
import Cookies from "js-cookie";
import axios from "axios";

export const BASE_URL = "http://10.10.7.76:14003";

export const API = axios.create({
  baseURL: BASE_URL,
});

export const fetcher = (url: string) => API.get(url).then((res) => res.data);

export const fetcherWithToken = (url: string) => {
  const token = Cookies.get("token");
  return API.get(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  }).then((res) => res.data);
};

export const fetcherWithTokenPost = (url: string, data: any) => {
  const token = Cookies.get("token");
  return API.post(url, data, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  }).then((res) => res.data);
};

export const fetcherWithTokenPatch = (url: string, data: any) => {
  const token = Cookies.get("token");
  return API.patch(url, data, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  }).then((res) => res.data);
};

export const fetcherWithTokenPostFormData = (
  url: string,
  formData: FormData,
) => {
  const token = Cookies.get("token");
  return API.post(url, formData, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }).then((res) => res.data);
};

export const fetcherWithTokenPatchFormData = (
  url: string,
  formData: FormData,
) => {
  const token = Cookies.get("token");
  return API.patch(url, formData, {
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  }).then((res) => res.data);
};

export const fetcherWithTokenDelete = (url: string) => {
  const token = Cookies.get("token");
  return API.delete(url, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  }).then((res) => res.data);
};
