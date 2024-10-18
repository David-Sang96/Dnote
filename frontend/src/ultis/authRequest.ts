import axios from "axios";
import toast from "react-hot-toast";
import axiosInstance from "./axiosInstance";

interface Props {
  setIsLoading: (val: boolean) => void;
  path: string;
  method: "POST" | "PATCH" | "DELETE";
  values: {
    name?: string;
    email: string;
    password: string;
  };
}

const authRequest = async ({ setIsLoading, path, values, method }: Props) => {
  try {
    setIsLoading(true);
    const response = await axiosInstance({
      url: path,
      method,
      data: values,
      headers: { "Content-Type ": "application/json" },
    });

    toast.success(response.data.message);
    return { status: response.status, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Server response with non-2xx status
      if (error.response) {
        const serverMessage =
          error.response.data.message || "An error occurred";
        toast.error(serverMessage);
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

export default authRequest;
