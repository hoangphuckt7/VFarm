/* eslint-disable prettier/prettier */
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
import DataTable from "react-data-table-component";
import { useState } from "react";
import { useStateWithCallbackLazy } from "use-state-with-callback";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Info from "components/Typography/Info";
import { toast, ToastContainer } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import AdminNavbarLinks from "components/Navbars/AdminNavbarLinks";
import ReactLoading from "react-loading";


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
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("token");
  const role = JSON.parse(localStorage.getItem("role"));
  const projectId = location.state.project_info;
  const [projectData, setProjectData] = useStateWithCallbackLazy("");
  const [clientName, setClientName] = useState("");
  const [data, setData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [buttonCreateFormulaStatus, setButtonCreateFormulaStatus] = useStateWithCallbackLazy(true);
  console.log(projectId);
  const urlProduct = process.env.REACT_APP_SERVER_URL + `/api/projects/${projectId}`
  const urlGetFormula = process.env.REACT_APP_SERVER_URL + `/api/formulas?project_id=${projectId}`
  const fetchData = () => {
    axios.get(urlProduct, {
      headers: {
        "Conttent-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setProjectData(res.data, (currentResponse) => {
          console.log(currentResponse);
          const rdToken = process.env.REACT_APP_RD_TOKEN;
          const urlSupplier = process.env.REACT_APP_WAREHOUSE + `/api/v1/customer/${currentResponse.client_id}`;
          axios.get(urlSupplier, {
            headers: {
              "Conttent-Type": "application/json",
              "rd-token": `${rdToken}`,
            },
          })
            .then((res) => {
              if (res.status == 200)
                setClientName(res.data.customer.name);
            }).catch((error) => {
              console.log(error);
            })
          setProjectData(currentResponse);
        });
        console.log(projectData);
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get(urlGetFormula, {
      headers: {
        "Conttent-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }
  useEffect(() => {
    fetchData();
    checkRole();
  }, [setData]);

  function deacticeProject() {
    const urlDeactive = process.env.REACT_APP_SERVER_URL + `/api/projects/${projectId}`;
    const noti = toast("Please wait...");
    fetch(urlDeactive, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    })
      .then((response) => {
        if (!response.ok) throw new Error(response.status);
        else {
          toast.update(noti, {
            render: "Hủy kích hoạt dự án thành công",
            type: "success",
            isLoading: false,
          });
          return response.status;
        }
      })
  }

  function activateProject() {
  }


  var buttonText = "Hủy Kích Hoạt";
  var buttonColor = "danger";
  var buttonFunc = deacticeProject;
  var dis = false;
  if (projectData.project_status == "canceled") {
    buttonColor = "white";
    buttonText = "Kích Hoạt";
    dis = true;
    buttonFunc = activateProject;
  }
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();
  // eslint-disable-next-line no-unused-vars
  const columns = [
    {
      name: 'Phiên bản',
      selector: row => row.formula_version,
      sortable: true,
      cell: row => (<div>{row.formula_version}</div>)
    },
    {
      name: 'Chi phí',
      selector: row => row.formula_cost,
      sortable: true,
      cell: row => (<div>{parseFloat(row.formula_cost).toLocaleString("it-IT", {
        style: "currency",
        currency: "VND",
      })}{" "}</div>)
    },
    {
      name: 'Người cập nhật',
      selector: row => row.user_name,
      sortable: true,
      cell: row => (<div>{row.user_name}</div>)
    },
    {
      name: 'Ngày cập nhật',
      selector: row => row.created_time,
      sortable: true,
      cell: row => (<div>{new Date(row.created_time).toLocaleDateString("en-US")}</div>)
    },
    {
      name: 'Trạng thái',
      selector: row => row.formula_status,
      sortable: true,
      cell: row => (<div>{row.formula_status}</div>)
    },
  ]
  const classes = useStyles();

  console.log(location.state.product_info);
  const onFormulaClick = (row) => {
    history.push("/formula/detail", { formula_id: row.formula_id, formula_version: row.formula_version, formula_status: row.formula_status, project: projectData, clientName: clientName });
  }
  const checkRole = () => {
    if (role == "staff") {
      setButtonCreateFormulaStatus(false);
    }
  }
  const formatReq = (require) => {
    var result = [];
    if (require != undefined) {
      const requireArr = require.toString().split(",");
      console.log(requireArr);
      result = requireArr;
    }
    return result;
  };
  return isLoading ? (
    <div
      style={{
        position: "absolute",
        top: "40%",
        left: "50%",
        right: "50%",
        bottom: "40%",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <ReactLoading
        type="spinningBubbles"
        color="#8B0000"
        height={300}
        width={150}
      />
    </div>
  ) : (
    <>
      <div className="navbar1">
        <AdminNavbarLinks />
      </div>
      <div className="productDetailInfor">
        <GridContainer>
          <ToastContainer />
          <GridItem xs={12} sm={12} md={12}>
            <div className="deactiveButton">
              <Button className="form-control btn btn-primary"
                type="submit"
                color={buttonColor}
                onClick={buttonFunc}>
                {buttonText}
              </Button>
            </div>
          </GridItem>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info" className={classes.cardTitleWhite}>
                Thông Tin Dự Án
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <>
                      <Info>Tên dự án</Info>
                      <b>{projectData.project_name}</b>
                    </>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <>
                      <Info>Mã dự án</Info>
                      <b>{projectData.project_code}</b>
                    </>
                  </GridItem>
                  {/* <GridItem xs={12} sm={12} md={2}>
      <>
      <Info>Thương hiệu</Info>
      <b>{projectData.brand_name}</b>
      </>
  </GridItem> */}
                  <GridItem xs={12} sm={12} md={2}>
                    <>
                      <Info>Khối lượng dự tính</Info>
                      <b>{projectData.estimated_weight} g</b>
                    </>
                  </GridItem>
                  {/* <GridItem xs={12} sm={12} md={2}>
      <>
      <Info>Thể tích</Info>
      <b>{productData.capacity}</b>
      </>
  </GridItem> */}
                  {/* <GridItem xs={12} sm={12} md={2}>
      <>
      <Info>d</Info>
      <b>{productData.d}</b>
      </>
  </GridItem> */}
                  {/* <GridItem xs={12} sm={12} md={2}>
      <>
      <Info>Độ hao hụt</Info>
      <b>{productData.tolerance}</b>
      </>
  </GridItem> */}
                  {/* <GridItem xs={12} sm={12} md={2}>
      <>
      <Info>Hao hụt nguyên liệu</Info>
      <b>{productData.material_norm_loss}</b>
      </>
  </GridItem> */}

                  <GridItem xs={12} sm={12} md={4}>
                    <>
                      <Info>Yêu cầu sản phẩm</Info>
                      {formatReq(projectData.requirement).map((word) => {
                        console.log(word);
                        return (
                          <>
                            <b>{word}</b> <br />
                          </>
                        );
                      })}
                    </>
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <>
                      <Info>Ngày tạo</Info>
                      <b>{new Date(projectData.created_time).toLocaleDateString("en-US")}</b>
                    </>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <>
                      <Info>Ngày phải hoàn thành</Info>
                      <b>{new Date(projectData.complete_date).toLocaleDateString("en-US")}</b>
                    </>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={2}>
                    <>
                      <Info>Khách hàng</Info>
                      <b>{clientName}</b>
                    </>
                  </GridItem>

                  <GridItem xs={12} sm={12} md={2}>

                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={3}>
                    <>
                      <Info>Người tạo</Info>
                      <b>{projectData.created_user_name}</b>
                    </>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <>
                      <Info>Nhân viên phụ trách</Info>
                      <b>{projectData.assigned_user_name}</b>
                    </>
                  </GridItem>
                  <Button type="button" disabled={dis} color="info" onClick={() => { history.push("/project/update", { project_Info: projectData, project_id: projectId, clientName: clientName, assigned_user_name: projectData.assigned_user_name }); }}>Chỉnh sửa dự án</Button>
                </GridContainer>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Button type="button" color="info" onClick={() => { history.push("/formula/create", { project_id: projectId, weight: projectData.estimated_weight }); }}>Thêm công thức</Button>
          </GridItem>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="info" className={classes.cardTitleWhite}>
                Công thức
              </CardHeader>
              <CardBody>
                <DataTable columns={columns}
                  data={data}
                  pagination
                  // optionally, a hook to reset pagination to page 1
                  subHeader
                  persistTableHead
                  onRowClicked={onFormulaClick} 
                  defaultSortFieldId={1}
                  />
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div></>

  );
}