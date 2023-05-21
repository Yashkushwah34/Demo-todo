import React from "react";

import { AiFillHome } from "react-icons/ai";
import { MdPending } from "react-icons/md";
import { MdCloudDone } from "react-icons/md";
import { FaListAlt } from "react-icons/fa";

interface iconProps {
  type: string;
  size: number;
  color?: string;
}

const SVGIcons = ({ type, size, color = "black" }: iconProps) => {
  switch (type) {
    case "home":
      return <AiFillHome size={size} fill={color} />;
    case "pending":
      return <MdPending size={size} fill={color} />;
    case "completed":
      return <MdCloudDone size={size} fill={color} />;
    case "list":
      return <FaListAlt size={size} fill={color} />;
    default:
      return <></>;
  }
};

export default SVGIcons;
