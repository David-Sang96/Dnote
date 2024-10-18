/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

interface ServerRequestProps {
  setIsLoading: (val: boolean) => void;
  path: string;
  method: "POST" | "PATCH" | "DELETE";
  values?: {
    title: string;
    content: string;
    cover_image?: File | string;
  };
  token?: string;
}

const serverRequestFn = async ({
  setIsLoading,
  path,
  values,
  method,
  token,
}: ServerRequestProps) => {
  try {
    setIsLoading(true);
    let data: any = values;

    if (values) {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("content", values.content);
      if (values.cover_image && typeof values.cover_image !== "string") {
        formData.append("cover_image", values.cover_image);
      }
      data = formData;
    }

    const response = await axiosInstance({
      url: path,
      method,
      data,
      headers: {
        "Content-Type": values ? "multipart/form-data" : "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success(response.data.message);
    return response.status;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Server response with non-2xx status
      if (error.response) {
        const serverMessage =
          error.response.data.message || "An error occurred";
        toast.error(serverMessage);
      } else if (error.request) {
        // Request was made but no response
        toast.error("No response received from the server.");
      } else {
        // Something else went wrong during the request setup
        toast.error(error.message);
      }
    } else if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error("An unknown error occurred");
    }
  } finally {
    setIsLoading(false);
  }
};

export default serverRequestFn;
