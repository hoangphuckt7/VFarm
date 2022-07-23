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
//import EmployeeTable from "views/Employee/Employee";
//import Icons from "views/Icons/Icons.js";
import OtherButton from "views/Other/Other";
import {
  AssistantOutlined,
  GavelSharp,
  Person,
  SquareFoot,
} from "@material-ui/icons";
import MaterialTable from "views/Material/Material";
import FormulaTable from "views/Formula/Formula";
import UserProfile from "views/UserProfile/UserProfile";
import Task from "views/Task/TaskDetailStaff";
import Submit from "views/Approve/Submit";
import StaffProjectTable from "views/Project/StaffProject";

const staffRoutes = [
  {
    path: "/product",
    name: "Dự Án",
    rtlName: "لوحة القيادة",
    icon: GavelSharp,
    component: StaffProjectTable,
    layout: "/staff",
  },
  {
    path: "/formula",
    name: "Công Thức",
    rtlName: "ملف تعريفي للمستخدم",
    icon: AssistantOutlined,
    component: FormulaTable,
    layout: "/staff",
  },
  {
    path: "/employee",
    name: "Thông tin cá nhân",
    rtlName: "قائمة الجدول",
    icon: Person,
    component: UserProfile,
    layout: "/staff",
  },
  {
    path: "/material",
    name: "Nguyên Liệu",
    rtlName: "طباعة",
    icon: BubbleChart,
    component: MaterialTable,
    layout: "/staff",
  },
  {
    path: "/other",
    name: "Khác",
    rtlName: "الرموز",
    icon: SquareFoot,
    component: OtherButton,
    layout: "/staff",
  },
  {
    path: "/task",
    name: "Công việc",
    rtlName: "قائمة الجدول",
    icon: GavelSharp,
    component: Task,
    layout: "/staff",
  },
  {
    path: "/submit",
    name: "Nộp công Thức",
    rtlName: "ملف تعريفي للمستخدم",
    icon: AssistantOutlined,
    component: Submit,
    layout: "/staff",
  },
];

export default staffRoutes;
