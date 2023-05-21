import { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import styles from "./main.module.scss";
import Home from "../Page/Home";
import Pending from "../Page/Pending";
import Completed from "../Page/Completed";
import List from "../Page/List";
import NotFoundPage from "../Page/404";
import LoginPage from "../Page/Login";
import classNames from "classnames";

interface MainProps {
  pathname: string;
  pathNameList: string[];
}

const Main = ({ pathname, pathNameList }: MainProps) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const authenticationPaths = ["/login"];
    if (!token) {
      if (!authenticationPaths.includes(location.pathname)) {
        navigate("/login");
      }
    } else {
      if (authenticationPaths.includes(location.pathname)) {
        navigate("/");
      }
    }
  }, [token, location, navigate]);

  return (
    <>
      <div
        className={classNames({
          [styles.container]: !pathNameList.includes(pathname),
          [styles.container2]: pathNameList.includes(pathname),
        })}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/pending" element={<Pending />} />
          <Route path="/list" element={<List />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </>
  );
};

export default Main;
