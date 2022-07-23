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
//import TableList from "views/TableList/TableList.js";
//import Typography from "views/Typography/Typography.js";
import EmployeeTable from "views/Employee/Employee";
//import Icons from "views/Icons/Icons.js";
import OtherButton from "views/Other/Other";
import {
  AssistantOutlined,
  GavelSharp,
  Person,
  SquareFoot,
} from "@material-ui/icons";
import MaterialTable from "views/Material/Material";
import UserProfile from "views/UserProfile/UserProfile";
import Approve from "views/Approve/Approve";
import Task from "views/Task/TaskTable";
import ProjectTable from "views/Project/Project";
import StandardTable from "views/FormulaTesting/TestStandard";

const dashboardRoutes = [
  {
    path: "/project",
    name: "Dự Án",
    rtlName: "لوحة القيادة",
    icon: GavelSharp,
    component: ProjectTable,
    layout: "/admin",
  },
  {
    path: "/employee",
    name: "Nhân Viên",
    rtlName: "قائمة الجدول",
    icon: Person,
    component: EmployeeTable,
    layout: "/admin",
  },
  {
    path: "/material",
    name: "Nguyên Liệu",
    rtlName: "طباعة",
    icon: BubbleChart,
    component: MaterialTable,
    layout: "/admin",
  },
  {
    path: "/quality_standard",
    name: "Bộ kiểm tra chất lượng",
    icon: GavelSharp,
    component: StandardTable,
    layout: "/admin",
  },
  {
    path: "/other",
    name: "Khác",
    rtlName: "الرموز",
    icon: SquareFoot,
    component: OtherButton,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "Thông tin cá nhân",
    rtlName: "قائمة الجدول",
    icon: Person,
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/approve",
    name: "Duyệt công thức",
    rtlName: "قائمة الجدول",
    icon: AssistantOutlined,
    component: Approve,
    layout: "/admin",
  },
  {
    path: "/task",
    name: "Công việc",
    rtlName: "قائمة الجدول",
    icon: GavelSharp,
    component: Task,
    layout: "/admin",
  },
];

export default dashboardRoutes;
