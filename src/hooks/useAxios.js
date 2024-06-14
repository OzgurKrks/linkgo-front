import { useCallback } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const useAxios = () => {
  const user = useSelector((state) => state.auth.user);

  const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL, // Replace with your API base URL
    headers: {
      Authorization: `Bearer ${user?.token}`, // Assume token is stored in user object
      "Content-Type": "application/json",
    },
  });

  const get = useCallback(
    async (url, body) => {
      try {
        const response = await axiosInstance.get(url, body);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    [axiosInstance]
  );

  const post = useCallback(
    async (url, body) => {
      try {
        const response = await axiosInstance.post(url, body);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    [axiosInstance]
  );

  const put = useCallback(
    async (url, body) => {
      try {
        const response = await axiosInstance.put(url, body);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    [axiosInstance]
  );

  const del = useCallback(
    async (url, config = {}) => {
      try {
        const response = await axiosInstance.delete(url, config);
        return response.data;
      } catch (error) {
        throw error;
      }
    },
    [axiosInstance]
  );

  return { get, post, put, del };
};

export default useAxios;
