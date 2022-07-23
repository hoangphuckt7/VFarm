/* eslint-disable react/prop-types */
//import TriggerButton from "components/CustomButtons/TriggerButton";
//import CustomInput from "components/CustomInput/CustomInput";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "components/CustomButtons/Button";
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardFooter from "components/Card/CardFooter";
import CardHeader from "components/Card/CardHeader";
//import DropDown from "react-dropdown";
//import Select from "@material-ui/core/Select/SelectInput";
//import { InputLabel } from "@material-ui/core";
//import { MenuItem } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomInput from "components/CustomInput/CustomInput";
import Select from "react-dropdown-select";
import axios from "axios";
import ReactDatePicker from "react-datepicker";
import { useSelector } from "react-redux";

const styles = {
  errorMessage: {
    color: "red",
  },
};

const useStyles = makeStyles(styles);

export const CreateProjectForm = () => {
  var [clientOptions, setClientOptions] = useState([]);
  const token = localStorage.getItem("token");
  const [assigned_user_id, setAssignedId] = useState();
  const [client_id, setClientId] = useState();
  const [completeDate, setCompleteDate] = useState(new Date());

  const [formError, setFormErrors] = useState({});

  const client = useSelector((state) => state.sendNoti);

  const classes = useStyles();
  const defaultRequirement =
    `Sản phẩm thuộc loại: ,\n` +
    `Đối tượng: ,\n` +
    `Mục đích: ,\n` +
    `Dung tích thành phẩm: ,\n` +
    `Yêu cầu đóng gói: ,\n`;

  // const handleProID = (e) => {
  //   if (e.target.value === "") {
  //     setFormErrors({
  //       ...formError,
  //       product_code: "Product ID không được để trống",
  //     });
  //   } else if (e.target.value.length > 50) {
  //     setFormErrors({
  //       ...formError,
  //       product_code: "Product ID phải ít hơn 30 ký tự",
  //     });
  //   } else if (!/^[a-zA-Z0-9]+$/.test(e.target.value)) {
  //     setFormErrors({
  //       ...formError,
  //       product_code: "Product ID phải là chữ hoặc số",
  //     });
  //   } else {
  //     setFormErrors({
  //       ...formError,
  //       product_code: "",
  //     });
  //   }
  // };
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

  //   const handleVolume = (e) => {
  //     if (!/^[0-9]+$/.test(e.target.value)) {
  //       setFormErrors({
  //         ...formError,
  //         volume: "Khối lượng phải là số tự nhiên lớn hơn hoặc bằng 0",
  //       });
  //     } else {
  //       setFormErrors({
  //         ...formError,
  //         volume: "",
  //       });
  //     }
  //   };
  //   const handleCapacity = (e) => {
  //     if (!/^[0-9]+$/.test(e.target.value)) {
  //       setFormErrors({
  //         ...formError,
  //         capacity: "Dung tích phải là số tự nhiên lớn hơn hoặc bằng 0",
  //       });
  //     } else {
  //       setFormErrors({
  //         ...formError,
  //         capacity: "",
  //       });
  //     }
  //   };
  //   const handleD = (e) => {
  //     if (!e.target.value.match(/^[+]?((\.\d+)|(\d+(\.\d+)?)|(\d+\.))$/)) {
  //       setFormErrors({
  //         ...formError,
  //         d: "d phải là số lớn hơn hoặc bằng 0",
  //       });
  //     } else {
  //       setFormErrors({
  //         ...formError,
  //         d: "",
  //       });
  //     }
  //   };
  //   const handleTolerance = (e) => {
  //     if (!e.target.value.match(/^[+]?((\.\d+)|(\d+(\.\d+)?)|(\d+\.))$/)) {
  //       setFormErrors({
  //         ...formError,
  //         tolerance: "Dung tích phải là số lớn hơn hoặc bằng 0",
  //       });
  //     } else {
  //       setFormErrors({
  //         ...formError,
  //         tolerance: "",
  //       });
  //     }
  //   };
  //   const handleNormLoss = (e) => {
  //     if (!/^[0-9]+$/.test(e.target.value)) {
  //       setFormErrors({
  //         ...formError,
  //         norm_loss:
  //           "Hao hụt nguyên liệu phải là số tự nhiên lớn hơn hoặc bằng 0",
  //       });
  //     } else {
  //       setFormErrors({
  //         ...formError,
  //         norm_loss: "",
  //       });
  //     }
  //   };
  //   const handleRetailPrice = (e) => {
  //     if (!e.target.value.match(/^[+]?((\.\d+)|(\d+(\.\d+)?)|(\d+\.))$/)) {
  //       setFormErrors({
  //         ...formError,
  //         retail_price: "Giá bán phải là số lớn hơn hoặc bằng 0",
  //       });
  //     } else {
  //       setFormErrors({
  //         ...formError,
  //         retail_price: "",
  //       });
  //     }
  //   };
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
  const rdToken = process.env.REACT_APP_RD_TOKEN;
  const urlUserRequest =
    process.env.REACT_APP_SERVER_URL +
    "/api/users?role_name=staff&user_status=true&page=0&size=1000";
  const urlCustomer = process.env.REACT_APP_WAREHOUSE + "/api/v1/customer";
  var [EmpOptions, setEmpOptions] = useState([]);
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
    axios
      .get(urlCustomer, {
        headers: {
          "Conttent-Type": "application/json",
          "rd-token": `${rdToken}`,
        },
      })
      .then((res) => {
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
  };

  useEffect(() => {
    fetchData();
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
    console.log(token);
    console.log(datajson);
    const urlCreateProjectRequest =
      process.env.REACT_APP_SERVER_URL + "/api/projects/";
    const noti = toast("Please wait...");
    fetch(urlCreateProjectRequest, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(datajson),
    })
      .then((response) => {
        if (!response.ok) throw new Error(response);
        else {
          console.log(response);
          toast.update(noti, {
            render: "Tạo dự án thành công",
            type: "success",
            isLoading: false,
          });
          client.send(
            JSON.stringify({
              type: "noti",
              message: `Bạn đã được assigned vào dự án ${project_code}-${project_name}`,
              assignedId: assigned_user_id,
            })
          );
          setTimeout(() => {
            location.reload();
          }, 2000);
          return response.json();
        }
      })
      //   .then((resule) => {
      // const urlWarehousrCreateProduct =
      //   process.env.REACT_APP_WAREHOUSE + "/api/v1/product";
      // toast.update(noti, {
      //   render: "Đang tạo sản phẩm bên hệ thống kho",
      //   type: "default",
      //   isLoading: true,
      // });
      // console.log(resule);
      // console.log(resule.product_code);
      // var dataForm = new FormData();
      // const productGroup = "601be9fbdcfc6210f9e94936";
      // dataForm.append("image", undefined);
      // dataForm.append("name", product_name);
      // dataForm.append("code", resule.product_code);
      // dataForm.append("volumn", volume);
      // dataForm.append("expriedDate", expired_date);
      // dataForm.append("retailPrice", retail_price);
      // dataForm.append("moq", null);
      // dataForm.append("productGroup", productGroup);
      // fetch(urlWarehousrCreateProduct, {
      //   method: "POST",
      //   headers: {
      //     "Conttent-Type": "application/json",
      //     "rd-token": `${rdToken}`,
      //   },
      //   body: dataForm,
      // })
      //   .then((res2) => {
      //     if (res2.ok) {
      //       toast.update(noti, {
      //         render: "Tạo sản phẩm bên kho thành công",
      //         type: "success",
      //         isLoading: false,
      //       });
      //     } else {
      //       throw new Error(res2.data);
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     toast.update(noti, {
      //       render: error.status.toString(),
      //       type: "error",
      //       isLoading: false,
      //     });
      //   });
      //   })
      .catch((error) => {
        console.log(error);
        document.getElementById("create-product-form").reset();
        toast.update(noti, {
          render: error.toString(),
          type: "error",
          isLoading: false,
        });
      });
  };
  return (
    <form id="create-project-form" onSubmit={onSubmit}>
      <div className="form-group">
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
                  }}
                />
                <p className={classes.errorMessage}>{formError.esti_weight}</p>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Select
                  options={EmpOptions}
                  placeholder="Nhân viên"
                  onChange={handleAssigned}
                />
                <p className={classes.errorMessage}>
                  {formError.assigned_user_id}
                </p>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                <Select
                  options={clientOptions}
                  placeholder="Khách hàng"
                  onChange={handleClient}
                />
                <p className={classes.errorMessage}>{formError.client_id}</p>
              </GridItem>
              <GridItem xs={12} sm={12} md={12}>
                Ngày hoàn thành
                <ReactDatePicker
                  selected={completeDate}
                  dateFormat="dd/MM/yyyy"
                  onChange={(date) => {
                    setCompleteDate(date);
                  }}
                />
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
                    defaultValue: defaultRequirement,
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
                  !(formError.client_id == "")
                }
              >
                Tạo
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </form>
  );
};
export default CreateProjectForm;
