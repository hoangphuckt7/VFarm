/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
//import Tabs from "components/CustomTabs/CustomTabs.js";
//import Tasks from "components/Tasks/Tasks.js";
import Button from "components/CustomButtons/Button.js";
// import CustomInput from "components/CustomInput/CustomInput.js";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { useHistory } from "react-router-dom";
import CardFooter from "components/Card/CardFooter";
import axios from "axios";
import Info from "components/Typography/Info";
import { toast, ToastContainer } from "react-toastify";
import CustomInput from "components/CustomInput/CustomInput";
import Select from "react-dropdown-select";
import ReactDatePicker from "react-datepicker";
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks";


const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
};

const useStyles = makeStyles(styles);
export default function ProjectDetail() {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const rdToken = process.env.REACT_APP_RD_TOKEN;
  const projectData = location.state.project_Info;
  const projectId = location.state.project_id;
  const [assigned_user_id, setAssignedId] = useState();
  const [client_id, setClientId] = useState();
  const [completeDate, setCompleteDate] = useState(new Date());
  var [clientOptions, setClientOptions] = useState([]);
  var [EmpOptions, setEmpOptions] = useState([]);

  const subDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() - days);
    return result;
  }
  const addDays = (date, days) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const [cli, setCli] = useState([]);
  const [assign, setAssign] = useState([]);

  const [formError, setFormErrors] = useState({});

  const handleProName = (e) => {
    if (e.target.value === "") {
      setFormErrors({
        ...formError,
        project_name: "Tên dự án không được để trống",
      });
    } else if (e.target.value.length > 255) {
      setFormErrors({
        ...formError,
        project_name: "Tên dự án phải ít hơn 255 ký tự",
      });
    } else {
      setFormErrors({
        ...formError,
        project_name: "",
      });
    }
  };
  const handleProCode = (e) => {
    if (e.target.value === "") {
      setFormErrors({
        ...formError,
        project_code: "Mã dự án không được để trống",
      });
    } else if (e.target.value.length > 255) {
      setFormErrors({
        ...formError,
        project_code: "Mã dự án phải ít hơn 255 ký tự",
      });
    } else {
      setFormErrors({
        ...formError,
        project_code: "",
      });
    }
  };
  const handleEstiWeight = (e) => {
    if (!e.target.value.match(/^[+]?((\.\d+)|(\d+(\.\d+)?)|(\d+\.))$/)) {
      setFormErrors({
        ...formError,
        esti_weight: "khối lượng sản phẩm dự kiến phải số lớn hơn hoặc bằng 0",
      });
    } else {
      setFormErrors({
        ...formError,
        esti_weight: "",
      });
    }
  };
  const handleAssigned = (e) => {
    console.log(e[0].value);
    setAssignedId(e[0].value);
    if (assigned_user_id === "") {
      setFormErrors({
        ...formError,
        assigned_user_id: "Người phụ trách không được để trống",
      });
    } else {
      setFormErrors({
        ...formError,
        assigned_user_id: "",
      });
    }
  };
  const handleClient = (e) => {
    console.log(e[0]);
    setClientId(e[0].value);
    if (client_id === "") {
      setFormErrors({
        ...formError,
        client_id: "Khách hàng không được để trống",
      });
    } else {
      setFormErrors({
        ...formError,
        client_id: "",
      });
    }
  };
  const handleProInquiry = (e) => {
    if (e.target.value === "") {
      setFormErrors({
        ...formError,
        project_inquiry: "Ghi chú không được để trống",
      });
    } else if (e.target.value.length > 1000) {
      setFormErrors({
        ...formError,
        project_inquiry: "Ghi chú phải ít hơn 1000 ký tự",
      });
    } else {
      setFormErrors({
        ...formError,
        project_inquiry: "",
      });
    }
  };
  const handleCompleteDate = (date) => {
    setCompleteDate(date);
    if (completeDate === "") {
      setFormErrors({
        ...formError,
        complete_date: "Ngày hoàn thành không được để trống",
      });
    } else {
      setFormErrors({
        ...formError,
        complete_date: "",
      });
    }
  }


  const urlUserRequest =
    process.env.REACT_APP_SERVER_URL +
    "/api/users?role_name=staff&user_status=true&page=0&size=1000";
  const urlCustomer = process.env.REACT_APP_WAREHOUSE + "/api/v1/customer";

  const fetchData = () => {
    axios
      .get(urlUserRequest, {
        headers: {
          "Conttent-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setAssignedId(projectData.assigned_user_id)
        setEmpOptions(
          res.data.map((emp) => {
            var option = {
              value: emp.user_id,
              label: emp.fullname + " (" + emp.email + " )",
            };
            return option;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(urlCustomer, {
        headers: {
          "Conttent-Type": "application/json",
          "rd-token": `${rdToken}`,
        },
      })
      .then((res) => {
        setClientId(projectData.client_id)
        setClientOptions(
          res.data.customers.map((client) => {
            var option = {
              value: client._id,
              label: client.name,
            };
            return option;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }
  var complete_date = new Date();
  const [textDate, setTextDate] = useState("");
  useEffect(() => {
    fetchData();
    setCli(location.state.clientName);
    setAssign(location.state.assigned_user_name);
    if (projectData.complete_date == null) {
      complete_date = new Date();
      setTextDate("Vẫn chưa có ngày hoàn thành dự án");
    } else {
      const complete = projectData.complete_date;
      complete_date = new Date(complete.slice(0, -6));
    }
    setCompleteDate(complete_date);
  }, []);

  const onSubmit = (event) => {
    event.preventDefault(event);
    // const product_name = event.target.product_name.value;
    // const product_inquiry = event.target.product_inquiry.value;
    // const brand_name = event.target.brand_name.value;
    // const volume = event.target.volume.value;
    // const capacity = event.target.capacity.value;
    // const d = event.target.d.value;
    // const tolerance = event.target.tolerance.value;
    // const material_norm_loss = event.target.material_norm_loss.value;
    // const expired_date = event.target.expired.value;
    // const retail_price = event.target.retailPrice.value;
    const project_name = event.target.project_name.value;
    const project_code = event.target.project_code.value;
    const requirement = event.target.requirement.value;
    const estimated_weight = event.target.estimated_weight.value;
    const datajson = {
      project_name,
      project_code,
      requirement,
      estimated_weight,
      client_id,
      assigned_user_id,
      complete_date: completeDate.toISOString(),
    };
    const urlProductUpdate = process.env.REACT_APP_SERVER_URL + `/api/projects/${projectId}`
    console.log(token);
    console.log(datajson);
    const noti = toast("Please wait...");
    fetch(urlProductUpdate, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datajson),
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) throw new Error(response);
        else {
          console.log(response);
          toast.update(noti, {
            render: "Chỉnh sửa dự án thành công",
            type: "success",
            isLoading: false,
          });
          return response.json();
        }
      })
      .catch((error) => {
        console.log(error);
        toast.update(noti, {
          render: error.toString(),
          type: "error",
          isLoading: false,
        });
      });
  };

  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();

  return (
    <>
    <div className="navbar">
    <AdminNavbarLinks />
    </div>
    <form id="update-project-form" onSubmit={onSubmit}>
      <div className="projectUpdate">
        <ToastContainer />
        <Card>
          <CardHeader color="info">Tạo Mới Dự Án Mới</CardHeader>
          <CardBody>
            <GridContainer>
              <GridItem xs={12} sm={12} md={12} onChange={handleProName}>
                <CustomInput
                  color="primary"
                  labelText="Tên dự án"
                  id="project_name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    multiline: false,
                    rows: 1,
                    defaultValue: projectData.project_name,
                  }}
                />
                <p className={classes.errorMessage}>{formError.project_name}</p>
              </GridItem>
              <GridItem xs={12} sm={12} md={12} onChange={handleProCode}>
                <CustomInput
                  labelText="Mã dự án"
                  id="project_code"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    multiline: false,
                    rows: 1,
                    defaultValue: projectData.project_code,
                  }}
                />
                <p className={classes.errorMessage}>{formError.project_code}</p>
              </GridItem>
              <GridItem xs={12} sm={12} md={12} onChange={handleEstiWeight}>
                <CustomInput
                  labelText="khối lượng sản phẩm dự kiến (g)"
                  id="estimated_weight"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    multiline: false,
                    rows: 1,
                    defaultValue: projectData.estimated_weight,
                  }}
                />
                <p className={classes.errorMessage}>{formError.esti_weight}</p>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Info>Nhân viên đang phụ trách: {assign}</Info>
                <Info>Nhân viên thay đổi: </Info>
                <Select
                  options={EmpOptions}
                  placeholder="Chọn để đổi nhân viên phụ trách"
                  onChange={handleAssigned}
                />
                <p className={classes.errorMessage}>
                  {formError.assigned_user_id}
                </p>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Info>Khách hàng hiện tại: {cli}</Info>
                <Info>Khách hàng thay đổi: </Info>
                <Select
                  options={clientOptions}
                  placeholder=" Chọn để đổi khách hàng"
                  onChange={handleClient}
                />
                <p className={classes.errorMessage}>{formError.client_id}</p>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                Ngày hoàn thành <Info>{textDate}</Info>
                <ReactDatePicker
                  selected={completeDate}
                  dateFormat="dd/MM/yyyy"
                  excludeDateIntervals={[{ start: subDays(new Date(), 10000), end: addDays(new Date(), 0) }]}
                  onChange={handleCompleteDate}
                />
                <p className={classes.errorMessage}>{formError.complete_date}</p>
              </GridItem>
              <GridItem xs={12} sm={12} md={12} onChange={handleProInquiry}>
                <CustomInput
                  labelText="Yêu cầu"
                  id="requirement"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5,
                    defaultValue: projectData.requirement,
                  }}
                />
                <p className={classes.errorMessage}>
                  {formError.project_inquiry}
                </p>
              </GridItem>
            </GridContainer>
          </CardBody>
          <CardFooter>
            <div className="form-group">
              <Button
                className="form-control btn btn-primary"
                type="submit"
                color="info"
                disabled={
                  !(formError.project_code == "") &&
                  !(formError.project_name == "") &&
                  !(formError.project_inquiry == "") &&
                  !(formError.esti_weight == "") &&
                  !(formError.assigned_user_id == "") &&
                  !(formError.client_id == "") &&
                  !(formError.complete_date == "")
                }
              >
                Lưu thay đổi
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </form>
    </>

  );
}