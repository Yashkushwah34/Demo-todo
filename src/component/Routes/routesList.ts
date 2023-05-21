import { Routes } from "../../typeDeclarations/routes";

const RouteList: Routes[] = [
  {
    displayName: "Home",
    key: "home",
    link: "/",
  },
  {
    displayName: "Pending",
    key: "pending",
    link: "/pending",
  },
  {
    displayName: "Completed",
    key: "completed",
    link: "/completed",
  },
  {
    displayName: "Todo List",
    key: "list",
    link: "/list",
  },
];

export default RouteList;
