import React, { createContext, useContext, useState } from "react";
import { ApiResponse } from "../../typeDeclarations/apiResponse";
import { toast } from "react-toastify";
import user from "../../users";

interface ApiContextType {
  isLoading: boolean;
  response: ApiResponse | null;
  error: string | null;
  callApi: (body: any) => Promise<void>;
}

const ApiContext = createContext<ApiContextType | undefined>(undefined);

interface ApiProviderProps {
  children: React.ReactNode;
}

const pathNames = ["/login"];

export const ApiProvider: React.FC<ApiProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem("token");

  const callApi = async (body: any) => {
    setIsLoading(true);

    try {
      if (!token) {
        if (!pathNames.includes(window.location.pathname)) {
          window.location.href = "/login";
        }
      }

      const findUser = user.filter(
        (el) => el.email === body.email && el.password === body.password
      );

      if (findUser.length > 0) {
        setResponse(findUser[0]);
      } else {
        throw { message: "Invalid Credentials" };
      }

      setError(null);
    } catch (err: any) {
      if (typeof err.message === "string") {
        toast.error(err.message);
      } else {
        toast.error("Something Went wrong. Please try again later");
      }
      setResponse(null);
      setError(err.message);
    }

    setIsLoading(false);
  };

  const apiContextValue: ApiContextType = {
    isLoading,
    response,
    error,
    callApi,
  };

  return (
    <ApiContext.Provider value={apiContextValue}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const apiContext = useContext(ApiContext);

  if (!apiContext) {
    throw new Error("useApi must be used within an ApiProvider");
  }

  return apiContext;
};
