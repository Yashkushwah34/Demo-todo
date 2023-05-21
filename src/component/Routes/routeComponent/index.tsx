import React from "react";

import styles from "./routeComponent.module.scss";

import { Link } from "react-router-dom";
import SVGIcons from "../../ReusableComponent/icons";
import { useLocation } from "react-router-dom";
import classNames from "classnames";

interface RouteProps {
  name: string;
  Key: string;
  link: string;
}

const RouteComponent = ({ name, Key, link }: RouteProps) => {
  const location = useLocation();

  const { pathname } = location || {};

  return (
    <>
      <Link to={link}>
        <div
          className={classNames(styles.container, {
            [styles.activeNav]: pathname === link,
          })}
        >
          <SVGIcons type={Key} size={25} color="white" />
          <h4>{name}</h4>
        </div>
      </Link>
    </>
  );
};

export default RouteComponent;
