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
//import CustomInput from "components/CustomInput/CustomInput.js";
import DataTable from "react-data-table-component";
//import FilterComponent from "components/Filter/FilterComponent";
//import { useHistory } from "react-router-dom";
//import axios from "axios";
import { ToastContainer } from "react-toastify";

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
//const urlRequest = process.env.REACT_APP_SERVER_URL + "/api/products";

export default function TaskDetailStaff() {



  const classes = useStyles();
  // const [compon, setCompon] = useState("");

  /*const token = localStorage.getItem("token");
  const fetchData = () => {
    axios.get(urlRequest, {
      headers: {
        'Conttent-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      if (res.status == 200) {
        setData(res.data);
        data = res.data.products;
        console.log(res.data);
        console.log(data);
      }
    }).catch((error) => {
      console.log(error);
    });
  }*/



  const columns = [
    {
      name: 'Tên nhiệm vụ',
      selector: row => row.taskName,
      sortable: true,
      cell: row => (<div>{row.taskName}</div>)
    },
    {
      name: 'Mô tả nhiệm vụ',
      selector: row => row.taskDescription,
      sortable: true,
      cell: row => (<div>{row.taskDescription}</div>)
    },
    {
      name: 'Ngày tạo',
      selector: row => row.taskCreateDate,
      sortable: true,
      cell: row => (<div>{row.taskCreateDate}</div>)
    },
    {
      name: 'Ngày hoàn thành',
      selector: row => row.taskEndDate,
      sortable: true,
      cell: row => (<div>{row.taskEndDate}</div>)
    },
    {
      name: 'Trạng thái',
      selector: row => row.taskStatus,
      sortable: true,
      cell: row => (<div>{row.taskStatus}</div>)
    },
  ]

  var [dataTask, setDataTask] = useState([
    {
      taskName: "Task 1",
      taskDescription: "tạo sản phẩm kem chống nắng sử dụng dừa làm nguyên liệu chính",
      taskCreateDate: "20/06/2022",
      taskEndDate: "25/06/2022",
      taskStatus: "đang thực hiện",
    },
    {
      taskName: "Task 2",
      taskDescription: "Cập nhật lại công thức cho sản phẩm Test",
      taskCreateDate: "14/06/2022",
      taskEndDate: "19/06/2022",
      taskStatus: "đã hoàn thành",
    },
  ]);

  /*const onRowClicked = (row) => {
    setProductId(row.product_id);

    console.log(productId);
    setIsClicked(true);
    console.log(isClicked);

    history.push("/approve/formula", { product_info: row.product_id });
  }*/
  window.onhashchange = function () {
    window.history.back();
  }
  return (
    <GridContainer>
      <ToastContainer />
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info" className={classes.cardTitleWhite} >
            Công việc
          </CardHeader>
          <CardBody className={classes.cardTitleWhite}>
            <DataTable columns={columns}
              data={dataTask}
              pagination
              subHeader
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );

}
