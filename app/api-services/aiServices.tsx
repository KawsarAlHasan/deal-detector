import useSWR from "swr";
import { fetcherWithToken } from "./api";

export const useChatHistory = () => {
  const { data, error, mutate } = useSWR(
    "/api/ai/chat-history/",
    fetcherWithToken,
  );
  return {
    chatHistory: data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};

export const useRecipesList = () => {
  const { data, error, mutate } = useSWR(
    "/api/ai/recipes/list/",
    fetcherWithToken,
  );
  return {
    recipesList: data,
    isLoading: !data && !error,
    isError: error,
    mutate,
  };
};
