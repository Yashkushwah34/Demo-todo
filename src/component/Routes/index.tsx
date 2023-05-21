import React from "react";

import styles from "./routesContainer.module.scss";
import { Routes } from "../../typeDeclarations/routes";
import RouteList from "./routesList";

import { FcTodoList } from "react-icons/fc";
import RouteComponent from "./routeComponent";
import { Link } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";

const RoutesContainer = () => {
  const logoutHandler = () => {
    if (localStorage.getItem("token")) {
      localStorage.removeItem("token");
    }
    window.location.href = "/login";
  };

  return (
    <>
      <div className={styles.container}>
        <Link to="/">
          <div className={styles.iconContainer}>
            <FcTodoList size={30} />
            <h2>Todo List</h2>
          </div>
        </Link>
        <div className={styles.routeContainer}>
          <div>
            {RouteList.length > 0 &&
              RouteList.map((el: Routes, index: number) => {
                return (
                  <RouteComponent
                    key={index}
                    name={el.displayName}
                    link={el.link}
                    Key={el.key}
                  />
                );
              })}
          </div>
          <div className={styles.logoutButtonContainer} onClick={logoutHandler}>
            <AiOutlineLogout size={18} color="#fff" />
            <h2>Logout</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoutesContainer;
