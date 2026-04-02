import useSWR from "swr";
import { fetcher, fetcherWithToken } from "./api";

export const useProducts = (
  page: number,
  pageSize: number,
  category_id?: number,
) => {
  const { data, error, mutate } = useSWR(
    `/api/service/products/?page=${page}&page_size=${pageSize}&category_id=${category_id}`,
    fetcher,
  );
  return {
    productsList: data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};

export const useProduct = (id: number) => {
  const { data, error, mutate } = useSWR(
    `/api/service/products/${id}/`,
    fetcher,
  );
  return {
    product: data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};

export const useWishList = () => {
  const { data, error, mutate } = useSWR(
    "/api/service/favorite-products/",
    fetcherWithToken,
  );
  return {
    wishList: data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};

