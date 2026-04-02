import useSWR from "swr";
import { fetcher, fetcherWithToken } from "./api";

export const useSupermarkets = () => {
  const { data, error, mutate } = useSWR(
    "/api/service/supermarkets/",
    fetcherWithToken,
  );
  return {
    supermarkets: data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};

export const useMySupermarkets = () => {
  const { data, error, mutate } = useSWR(
    "/api/service/selected-supermarkets/",
    fetcherWithToken,
  );
  return {
    mySupermarkets: data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};
