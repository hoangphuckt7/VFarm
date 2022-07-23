/*!

=========================================================
* Material Dashboard React - v1.10.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import BubbleChart from "@material-ui/icons/BubbleChart";

// core components/views for Admin layout
//import UserProfile from "views/UserProfile/UserProfile.js";
//import TableList from "views/TableList/TableList.js";
//import Typography from "views/Typography/Typography.js";
//import Icons from "views/Icons/Icons.js";
import OtherButton from "views/Other/Other";
import {
  AssistantOutlined,
  GavelSharp,
  Person,
  SquareFoot,
} from "@material-ui/icons";
import MaterialTable from "views/Material/Material";
//import FormulaTable from "views/Formula/Formula";
import Approve from "views/Approve/Approve";
import UserProfile from "views/UserProfile/UserProfile";
import ProjectTable from "views/Project/Project";

const managerRoutes = [
  {
    path: "/project",
    name: "Dự Án",
    rtlName: "لوحة القيادة",
    icon: GavelSharp,
    component: ProjectTable,
    layout: "/manager",
  },
  {
    path: "/approve",
    name: "Duyệt Công Thức",
    rtlName: "ملف تعريفي للمستخدم",
    icon: AssistantOutlined,
    component: Approve,
    layout: "/manager",
  },
  {
    path: "/material",
    name: "Nguyên Liệu",
    rtlName: "طباعة",
    icon: BubbleChart,
    component: MaterialTable,
    layout: "/manager",
  },
  {
    path: "/profile",
    name: "Thông tin cá nhân",
    rtlName: "قائمة الجدول",
    icon: Person,
    component: UserProfile,
    layout: "/manager",
  },
  {
    path: "/other",
    name: "Khác",
    rtlName: "الرموز",
    icon: SquareFoot,
    component: OtherButton,
    layout: "/manager",
  },
];

export default managerRoutes;
