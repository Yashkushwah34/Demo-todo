import React, { createContext, useContext, useState } from "react";

import {
  ApiResponse,
  DashboardCountData,
} from "../../typeDeclarations/apiResponse";

import user from "../../users";
import { toast } from "react-toastify";

type UserContextType = {
  response: ApiResponse | null;
  setResponse: React.Dispatch<React.SetStateAction<ApiResponse | null>>;
  dashboardCount: DashboardCountData | null;
  setDashboardCount: React.Dispatch<
    React.SetStateAction<DashboardCountData | null>
  >;
  getUser: () => Promise<void>;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [dashboardCount, setDashboardCount] =
    useState<DashboardCountData | null>(null);

  const getUser = async () => {
    const token = localStorage.getItem("token");

    try {
      const findUser = user.filter(
        (el: { token: string }) => el.token === token
      );

      if (findUser.length > 0) {
        setResponse(findUser[0]);
      } else {
        if (token) {
          localStorage.removeItem("token");
        }
        throw { message: "No User Found" };
      }
    } catch (err: any) {
      if (typeof err.message === "string") {
        toast.error(err.message);
        window.location.href = "/login";
      } else {
        toast.error("Something Went wrong. Please try again later");
      }
      setResponse(null);
    }
  };

  return (
    <UserContext.Provider
      value={{
        response,
        setResponse,
        dashboardCount,
        setDashboardCount,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
