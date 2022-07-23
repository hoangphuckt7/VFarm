/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
//import Tabs from "components/CustomTabs/CustomTabs.js";
//import Tasks from "components/Tasks/Tasks.js";
//import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
//import AddProduct from "./AddProduct";
//import DataTable from "react-data-table-component";
//import FilterComponent from "components/Filter/FilterComponent";
//import { useHistory } from "react-router-dom";
import Select from "react-dropdown-select";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";


const styles = {
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

export default function TaskDetail() {

  const [locationKeys, setLocationKeys] = useState([]);
  const history = useHistory();
  const classes = useStyles();


  // const [compon, setCompon] = useState("");
  const location = useLocation();
  const token = localStorage.getItem("token");
  const taskId = location.state.task_info;
  const urlTask = process.env.REACT_APP_SERVER_URL + "/api/tasks";
  const urlUserRequest = process.env.REACT_APP_SERVER_URL + "/api/users";
  var [dataTask, setTaskData] = useState([]);
  const [endDate, setEndDate] = useState(new Date());
  const [startDate, setStartDate] = useState(new Date());
  const [status, setStatus] = useStateWithCallbackLazy([]);

  var [EmpOptions, setEmpOptions] = useState([]);

  const checkStatus = () => {
    if (dataTask.status == "doing") {
      setStatus("Đang thực hiện");
    } else if (dataTask.status == "deleted") {
      setStatus("Đã hủy");
    } else if (dataTask.status == "done") {
      setStatus("Đã hoàn thành");
    } else if (dataTask.status == "overtime") {
      setStatus("Quá hạn");
    }
  }

  const fetchData = () => {
    axios
      .get(urlUserRequest, {
        headers: {
          "Conttent-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
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
    axios.get(urlTask + "/" + taskId, {
      headers: {
        'Conttent-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      console.log(res.data);
      setTaskData(res.data);
      dataTask = res.data;
      console.log(dataTask);
      const esti = dataTask.estimated_date;
      const cre = dataTask.created_date;
      const end = new Date(esti.slice(0, -6));
      const start = new Date(cre.slice(0, -6));
      setStartDate(start);
      setEndDate(end);
      console.log(endDate);
    })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    fetchData();
    checkStatus();
    return history.listen(location => {
      console.log(location);
      if (history.action === 'PUSH') {
        setLocationKeys([location.key])
      }

      if (history.action === 'POP') {
        if (locationKeys[1] === location.key) {
          // eslint-disable-next-line no-unused-vars
          setLocationKeys(([_, ...keys]) => keys)

          // Handle forward event

        } else {
          setLocationKeys((keys) => [location.key, ...keys])

          window.location.reload();
          history.push("/admin/task");

        }
      }
    })
  }, [locationKeys,]);

  const onSubmit = (e) => {
    e.preventDefault();

    const dataTask = {
      task_name: e.target.task_name.value,
    }
  };
  window.onhashchange = function () {
    window.history.back();
  }
  return (
    <form id="update-task-form" onSubmit={onSubmit}>
      <GridContainer>
        <ToastContainer />
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info" className={classes.cardTitleWhite} >
              Công việc
            </CardHeader>
            <CardBody className={classes.cardTitleWhite}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
                  <label>Tên nhiệm vụ</label>
                  <CustomInput
                    color="primary"
                    id="task_name"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 1,
                      defaultValue: dataTask.task_name,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <label>Mô tả nhiệm vụ</label>
                  <CustomInput
                    color="primary"
                    id="description"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 1,
                      defaultValue: dataTask.description,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <label>Nhân Viên</label>
                  <CustomInput
                    color="primary"
                    id="user_id"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 1,
                      defaultValue: dataTask.user_id,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <label>Sản phẩm</label>
                  <CustomInput
                    color="primary"
                    id="product_id"
                    disabled
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 1,
                      defaultValue: dataTask.product_id,
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <label>Ngày tạo</label>
                  <DatePicker
                    selected={startDate}
                    onChange={date => setStartDate(date)}
                    timeInputLabel="Time:"
                    showTimeInput
                    dateFormat="dd/MM/yyyy h:mm aa"
                    disabled
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <label>Ngày kết thúc</label>
                  <DatePicker
                    selected={endDate}
                    timeInputLabel="Time:"
                    showTimeInput
                    dateFormat="dd/MM/yyyy h:mm aa"
                    onChange={(date) => setEndDate(date)}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <label>Trạng thái</label>
                  <CustomInput
                    color="primary"
                    id="task_status"
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 1,
                      defaultValue: dataTask.task_status,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </form>
  );

}
