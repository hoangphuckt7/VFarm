/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Login from "components/Login/Login";
import Admin from "layouts/Admin";
import Manager from "layouts/Manager";
import Staff from "layouts/Staff";
import useToken from "components/App/useToken";
import useRole from "components/App/useRole";
import "dotenv/config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserId from "components/App/useUserId";
// import ProductDetail from "views/Product/ProductDetail";
import FormulaDetail from "views/Formula/FormulaDetail";
import CreateFormula from "views/Formula/CreateFormula";
import UpdateFormula from "views/Formula/UpdateFormula";
import CompareFormula from "views/Formula/CompareFormula";
import ApproveFormula from "views/Approve/ApproveFormula";
import ApproveDetail from "views/Approve/ApproveDetail";
import FormulaDetailMng from "views/Formula/FormulaDetailMng";
import TestTask from "views/FormulaTesting/CreateTestTask";
import ValidateTest from "views/FormulaTesting/ValidateTest";
import TaskDetail from "views/Task/TaskDetail";
import CreateTask from "views/Task/CreateTask";
import SubmitFormula from "views/Approve/SubmitFormula";
import SubmitDetail from "views/Approve/SubmitDetail";
import DetailMaterial from "views/Material/DetailMaterial";
import ProjectDetail from "views/Project/ProjectDetail";
import FormulaExport from "views/Formula/ExportFormula";
import CreateTestStandard from "views/FormulaTesting/CreateTestStandard";
import TestStandardDetail from "views/FormulaTesting/TestStandardDetail";
import UpdateMaterial from "views/Material/UpdateMaterial";
import ProjectUpdate from "views/Project/ProjectUpdate";
import ConflictMaterial from "views/Material/ConflictMaterial";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ProjectDetailStaff from "views/Project/ProjectDetailStaff";
import UpdateTestTask from "views/FormulaTesting/UpdateTestTask";
import ProductDetail from "views/Product/ProductDetail";
import ToolUpdate from "views/Tool/ToolUpdate";
import CategoryUpdate from "views/Tool/CategoryUpdate";
import SupplierDetail from "views/Supplier/SupplierDetail";
import SupplierUpdate from "views/Supplier/SupplierUpdate";
import { useState } from "react";
import axios from "axios";

function App() {
  require("dotenv").config();
  const { token, setToken } = useToken();
  const { role, setRole } = useRole();
  const { userId, setUserId } = useUserId();
  const [isExpired, setIsExpried] = useState(false);

  const client = useSelector((state) => state.sendNoti);

  const checkValid = () => {
    if (token != undefined) {
      const checkUrl =
        process.env.REACT_APP_SERVER_URL + "/api/users/check-valid-jwt";
      axios
        .get(checkUrl, {
          headers: {
            "Conttent-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status != 200) setIsExpried(true);
        });
    }
  };
  useEffect(() => {
    checkValid();
    client.onopen = () => {
      console.log("Web socket connected");
      client.send(
        JSON.stringify({
          type: "setUserId",
          userId: userId,
        })
      );
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      console.log("got reply!", dataFromServer);
      if (dataFromServer.type == "noti") {
        toast.info(dataFromServer.message);
      }
    };
  }, [checkValid]);

  // if (!token || !role) {
  //   return <Login setToken={setToken} setRole={setRole} />;
  // } else
  if (token && userId && role === "admin" && isExpired == false) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/project/detail" component={ProjectDetail} />
          <Route path="/product/detail" component={ProductDetail} />
          <Route path="/formula/detail" component={FormulaDetailMng} />
          <Route path="/formula/compare" component={CompareFormula} />
          <Route path="/approve/formula" component={ApproveFormula} />
          <Route path="/approve/detail" component={ApproveDetail} />
          <Route path="/testTask/create" component={TestTask} />
          <Route path="/testTask/update" component={UpdateTestTask} />
          <Route path="/task/detail" component={TaskDetail} />
          <Route path="/task/create" component={CreateTask} />
          <Route path="/material/detail" component={DetailMaterial} />
          <Route path="/admin" component={Admin} />
          <Route path="/formula/create" component={CreateFormula} />
          <Route path="/formula/update" component={UpdateFormula} />
          <Route path="/testTask/validate" component={ValidateTest} />
          <Route path="/submit/formula" component={SubmitFormula} />
          <Route path="/submit/detail" component={SubmitDetail} />
          <Route path="/formula/BOM" component={FormulaExport} />
          <Route path="/test/standard/create" component={CreateTestStandard} />
          <Route path="/test/standard/detail" component={TestStandardDetail} />
          <Route path="/material/update" component={UpdateMaterial} />
          <Route path="/project/update" component={ProjectUpdate} />
          <Route path="/material/conflict" component={ConflictMaterial} />
          <Route path="/other/tool/update/" component={ToolUpdate} />
          <Route path="/other/category/update/" component={CategoryUpdate} />
          <Route path="/other/supplier/detail" component={SupplierDetail} />
          <Route path="/other/supplier/update" component={SupplierUpdate} />
          <Redirect from="/" to="/admin/dashboard" />
        </Switch>
      </BrowserRouter>
    );
  } else if (token && userId && role === "manager" && isExpired == false) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/manager" component={Manager} />
          <Route path="/project/detail" component={ProjectDetail} />
          <Route path="/product/detail" component={ProductDetail} />
          <Route path="/formula/detail" component={FormulaDetailMng} />
          <Route path="/formula/compare" component={CompareFormula} />
          <Route path="/approve/formula" component={ApproveFormula} />
          <Route path="/approve/detail" component={ApproveDetail} />
          <Route path="/testTask/create" component={TestTask} />
          <Route path="/testTask/update" component={UpdateTestTask} />
          <Route path="/task/detail" component={TaskDetail} />
          <Route path="/task/create" component={CreateTask} />
          <Route path="/material/detail" component={DetailMaterial} />
          <Route path="/formula/create" component={CreateFormula} />
          <Route path="/formula/update" component={UpdateFormula} />
          <Route path="/testTask/validate" component={ValidateTest} />
          <Route path="/submit/formula" component={SubmitFormula} />
          <Route path="/submit/detail" component={SubmitDetail} />
          <Route path="/formula/BOM" component={FormulaExport} />
          <Route path="/test/standard/create" component={CreateTestStandard} />
          <Route path="/test/standard/detail" component={TestStandardDetail} />
          <Route path="/material/update" component={UpdateMaterial} />
          <Route path="/project/update" component={ProjectUpdate} />
          <Route path="/material/conflict" component={ConflictMaterial} />
          <Route path="/other/tool/update/" component={ToolUpdate} />
          <Redirect from="/" to="/manager/dashboard" />
        </Switch>
      </BrowserRouter>
    );
  } else if (token && userId && role === "staff" && isExpired == false) {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/project/detail" component={ProjectDetailStaff} />
          <Route path="/formula/detail" component={FormulaDetail} />
          <Route path="/formula/create" component={CreateFormula} />
          <Route path="/formula/update" component={UpdateFormula} />
          <Route path="/formula/compare" component={CompareFormula} />
          <Route path="/testTask/validate" component={ValidateTest} />
          <Route path="/submit/formula" component={SubmitFormula} />
          <Route path="/submit/detail" component={SubmitDetail} />
          <Route path="/staff" component={Staff} />
          <Redirect from="/" to="/staff/dashboard" />
        </Switch>
      </BrowserRouter>
    );
  } else {
    return (
      <>
        <ToastContainer />
        <Login setToken={setToken} setRole={setRole} setUserId={setUserId} />
      </>
    );
  }
}

export default App;
