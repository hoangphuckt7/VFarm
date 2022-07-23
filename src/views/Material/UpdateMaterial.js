/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter";
//import Tasks from "components/Tasks/Tasks.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Button from "components/CustomButtons/Button.js";
import Info from "components/Typography/Info";
import Select from "react-dropdown-select";
import DatePicker from "react-datepicker";
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
    errorMessage: {
        color: "red",
    },
};


const useStyles = makeStyles(styles);

export default function DetailMaterial() {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();
    const _id = location.state.material_ID;
    //const urlMaterialRequest = process.env.REACT_APP_WAREHOUSE + "/api/v1/material/";

    //const urlUnit = process.env.REACT_APP_WAREHOUSE + "/api/v1/material/units";
    //const urlGroupCode =
    process.env.REACT_APP_WAREHOUSE + "/api/v1/material/groups";
    //const urlWarehouseRequest = process.env.REACT_APP_WAREHOUSE + "/api/v1/warehouse";
    const rdToken = process.env.REACT_APP_RD_TOKEN;
    const [modifiedTime, setmodifiedTime] = useState(new Date());
    const [createdTime, setcreatedTime] = useState(new Date());
    const [formError, setFormErrors] = useState({});
    //const [material, setMaterialData] = useState([]);
    const [supplier, setsupplier] = useState([]);
    const [supName, setSupName] = useState([]);
    const [kho, setKho] = useState([]);
    const [suppOptions, setSuppOptions] = useState([]);
    //const [unitOption, setUnitOption] = useState([]);
    //const [groupOption, setGroupOption] = useState([]);
    const [gr, setgr] = useState();
    const [unit, setUnit] = useState();
    const [warehouse, setwarehouse] = useState();
    //const [warehouseOptions, setwarehouseOptions] = useState([]);

    const handleMatName = (e) => {
        if (e.target.value === "") {
            setFormErrors({
                ...formError,
                name: "Tên Bao bì không được để trống",
            });
        } else if (e.target.value.length > 1000) {
            setFormErrors({
                ...formError,
                name: "Tên Bao bì phải ít hơn 1000 ký tự",
            });
        } else {
            setFormErrors({
                ...formError,
                name: "",
            });
        }
    };

    const handleUnit = (e) => {
        setUnit(e[0].value);
        console.log(e[0].value);
        if (unit === "") {
            setFormErrors({
                ...formError,
                unit: "Đơn vị không được để trống",
            });
        } else {
            setFormErrors({
                ...formError,
                unit: "",
            });
        }
    };

    const handleInciName = (e) => {
        if (e.target.value === "") {
            setFormErrors({
                ...formError,
                inciName: "InciName không được để trống",
            });
        } else if (e.target.value.length > 1000) {
            setFormErrors({
                ...formError,
                inciName: "InciName phải ít hơn 1000 ký tự",
            });
        } else {
            setFormErrors({
                ...formError,
                inciName: "",
            });
        }
    };

    const handleGroupCode = (e) => {
        console.log(gr);
        setgr(e[0].value);
        console.log(e[0].value);
        console.log(gr);
        if (gr === "") {
            setFormErrors({
                ...formError,
                groupCode: "Chọn nhóm thất bại vui lòng chọn lại",
            });
        } else {
            setFormErrors({
                ...formError,
                groupCode: "",
            });
        }
    };
    const handleUnitPrice = (e) => {
        if (!e.target.value.match(/^[+]?((\.\d+)|(\d+(\.\d+)?)|(\d+\.))$/)) {
            setFormErrors({
                ...formError,
                unitPrice: "Đơn giá sản phẩm dự kiến phải số lớn hơn hoặc bằng 0",
            });
        } else {
            setFormErrors({
                ...formError,
                unitPrice: "",
            });
        }
    };

    const urlSupplier = process.env.REACT_APP_WAREHOUSE + "/api/v1/supplier/all";

    const matData = location.state.material_Info;

    const history = useHistory();
    const [locationKeys, setLocationKeys] = useState([]);

    const fetchData = () => {
        /*axios
            .get(urlWarehouseRequest, {
                headers: {
                    "Content-Type": "application/json",
                    "rd-token": rdToken,
                },
            })
            .then((res) => {
                setwarehouseOptions(
                    res.data.warehouses.map((warehouse) => {
                        var option = {
                            value: {
                                _id: warehouse._id,
                                name: warehouse.name,
                                code: warehouse.code
                            },
                            label: warehouse.name
                        };
                        return option;
                    })
                );
                console.log(warehouseOptions);
            })
            .catch((err) => {
                console.log(err);
            });
        axios
            .get(urlUnit, {
                headers: {
                    "Content-Type": "application/json",
                    "rd-token": rdToken,
                },
            })
            .then((res) => {
                console.log(res.data.materialUnits);
                setUnitOption(
                    res.data.materialUnits.map((item) => {
                        var option = {
                            value: item,
                            label: item,
                        };
                        return option;
                    })
                );
                console.log(unitOption);
            })
            .catch((error) => {
                console.log(error);
            });
        axios
            .get(urlGroupCode, {
                headers: {
                    "Content-Type": "application/json",
                    "rd-token": rdToken,
                },
            })
            .then((res) => {
                console.log(res);
                setGroupOption(
                    res.data.materialGroup.map((gr) => {
                        var option = {
                            value: gr.code,
                            label: "(" + gr.group + ") " + gr.name,
                        };
                        return option;
                    })
                );
                console.log(groupOption);
            })
            .catch((error) => {
                console.log(error);
            });*/
        axios.get(urlSupplier, {
            headers: {
                "Conttent-Type": "application/json",
                "rd-token": `${rdToken}`,
            },
        })
            .then((res) => {
                setSuppOptions(
                    res.data.suppliers.map((supplier) => {
                        var option = {
                            value: supplier._id,
                            label: supplier.name,
                        };
                        return option;
                    })
                );
            })
            .catch((error) => {
                console.log(error);
            })
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }

    var sup = "";
    const [textSup, setTextSup] = useState("");

    useEffect(() => {
        fetchData();
        if (location.state.supplierId == null) {
            sup = "";
            setTextSup("Vẫn chưa có nhà cung cấp");
        } else {
            sup = location.state.supplierId;
        }
        setsupplier(sup);
        setSupName(location.state.supplier);
        const ware = location.state.warehouse;
        setwarehouse(ware);
        setKho(ware.code + " - " + ware.name);
        setUnit(matData.unit);
        setgr(matData.group);
        setcreatedTime(matData.createdTime);
        setmodifiedTime(matData.modifiedTime);
        console.log(matData);
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        const urlUpdateMaterial = process.env.REACT_APP_WAREHOUSE + "/api/v1/material";
        const name = e.target.name.value;
        const code = matData.code;
        const inciName = e.target.inciName.value;
        const tradeName = e.target.tradeName.value;
        const unitPrice = parseFloat(e.target.unitPrice.value);
        const amount = matData.amount;
        const value = matData.value;
        const moq = matData.moq;
        const remainAmount = matData.remainAmount;
        const pending = matData.pending;
        const pendingSum = matData.pendingSum;
        const __v = matData.__v;
        const group = gr;
        const files = [];
        const dataMaterial = {
            _id,
            code,
            name,
            inciName,
            tradeName,
            group,
            amount,
            value,
            pending,
            unitPrice,
            moq,
            unit,
            warehouse,
            files,
            modifiedTime,
            createdTime,
            __v,
            supplier,
            pendingSum,
            remainAmount,
        }
        console.log(dataMaterial);
        var bodyFormData = new FormData();
        bodyFormData.append('data', JSON.stringify(dataMaterial));
        for (const value of bodyFormData.values()) {
            console.log(value);
        }
        /*bodyFormData.append('code', code);
        bodyFormData.append('name', name);
        bodyFormData.append('inciName', inciName);
        bodyFormData.append('tradeName', tradeName);
        bodyFormData.append('group', group);
        bodyFormData.append('amount', amount);
        bodyFormData.append('value', value);
        bodyFormData.append('pending', pending);
        bodyFormData.append('unitPrice', unitPrice);
        bodyFormData.append('moq', moq);
        bodyFormData.append('unit', unit);
        bodyFormData.append('warehouse', warehouse);
        bodyFormData.append('files', files);
        bodyFormData.append('modifiedTime', modifiedTime);
        bodyFormData.append('createdTime', createdTime);
        bodyFormData.append('__v', __v);
        bodyFormData.append('supplier', supplier);
        bodyFormData.append('pendingSum', pendingSum);
        bodyFormData.append('remainAmount', remainAmount);
        */

        console.log(_id);
        console.log(bodyFormData);
        const noti = toast("Đang cập nhật...");
        axios.put(urlUpdateMaterial + "/" + _id, bodyFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
                "rd-token": rdToken,
            },
        })
            /*fetch(urlUpdateMaterial + "/" + _id, {
                method: "PUT",
                headers: {
                    "Content-Type": "multipart/form-data",
                    "rd-token": rdToken,
                },
                body: bodyFormData,
            })*/
            .then((res) => {
                console.log(res);
                if (res.status === 200) {
                    toast.update(noti, {
                        render: "Cập nhật thành công",
                        type: toast.TYPE.SUCCESS,
                    });
                } else {
                    toast.update(noti, {
                        render: "Cập nhật thất bại",
                        type: toast.TYPE.ERROR,
                    });
                }
            }
            ).catch((error) => {
                toast.update(noti, {
                    render: error.toString(),
                    type: toast.TYPE.ERROR,
                });
            }
            );
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
        <form id="update-material-form" onSubmit={onSubmit}>
            <div className="update-material">
                <GridContainer>
                    <ToastContainer />
                    <GridItem xs={12} sm={12} md={10}>
                        <Card>
                            {/* <CardHeader color="primary"> */}
                            <CardHeader color="info" className={classes.cardTitleWhite}>
                                Thông Tin Nguyên Liệu
                            </CardHeader>
                            {/* </CardHeader> */}
                            <CardBody>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <Info>Code</Info>
                                        <CustomInput
                                            id="Code"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                multiline: true,
                                                rows: 1,
                                                value: matData.code,
                                            }}
                                        />
                                        <p className={classes.errorMessage}>{formError.name}</p>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <Info>Ngày tạo</Info>
                                        <DatePicker
                                            selected={createdTime}
                                            onChange={(date) => setcreatedTime(date)}
                                            dateFormat="dd/MM/yyyy hh:mm"
                                            disabled={true}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <Info>Ngày chỉnh sửa</Info>
                                        <DatePicker
                                            selected={modifiedTime}
                                            dateFormat="dd/MM/yyyy hh:mm"
                                            onChange={(date) => setmodifiedTime(date)}
                                            disabled={true}
                                        />
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <Info>Tên nguyên liệu</Info>
                                        <CustomInput
                                            id="name"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                multiline: true,
                                                rows: 3,
                                                defaultValue: matData.name,
                                            }}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <Info>inciName</Info>
                                        <CustomInput
                                            id="inciName"
                                            formControlProps={{
                                                fullWidth: true
                                            }}
                                            inputProps={{
                                                multiline: true,
                                                rows: 3,
                                                defaultValue: matData.inciName,
                                            }}
                                        />
                                        <p className={classes.errorMessage}>{formError.inciName}</p>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <Info>tradeName : {matData.tradeName}</Info>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <Info>Nhóm: {gr}</Info>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <Info>Đơn giá: {matData.unitPrice}</Info>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <Info>Đơn vị hiện tại : {matData.unit}</Info>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <Info>Số lượng</Info>
                                        <b>{matData.amount}</b>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <Info>Giá trị</Info>
                                        <b>{matData.value}</b>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <Info>MOQ</Info>
                                        <b>{matData.moq}</b>
                                    </GridItem>
                                </GridContainer>
                                <GridContainer>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <Info>Tồn kho</Info>
                                        <b>{matData.remainAmount}</b>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <Info>Đã dùng</Info>
                                        <b>{matData.pending}</b>
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <Info>Nhà cung cấp hiện tại: {textSup}{supName}</Info>
                                        <Info>Nhà cung cấp</Info>
                                        <Select
                                            options={suppOptions}
                                            placeholder="Chọn để thay đổi nhà cung cấp"
                                            onChange={(e) => setsupplier(e[0].value)}
                                        />
                                    </GridItem>
                                    <GridItem xs={12} sm={12} md={4}>
                                        <Info>Kho : {kho}</Info>
                                    </GridItem>
                                </GridContainer>
                            </CardBody>
                            <CardFooter>
                                <GridItem xs={12} sm={12} md={4}>
                                    <Button
                                        className="form-control btn btn-primary"
                                        type="submit"
                                        color="info"
                                    /*disabled={
                                        !(formError.name === "") &&
                                        !(formError.unitPrice === "") &&
                                        !(formError.unit === "") &&
                                        !(formError.groupCode === "") &&
                                        !(formError.inciName === "")
                                    }*/
                                    >
                                        Chỉnh sửa
                                    </Button>
                                </GridItem>
                            </CardFooter>
                        </Card>
                    </GridItem>
                    {/* <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Table on Plain Background
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Country", "City", "Salary"]}
              tableData={[
                ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                [
                  "4",
                  "Philip Chaney",
                  "$38,735",
                  "Korea, South",
                  "Overland Park",
                ],
                [
                  "5",
                  "Doris Greene",
                  "$63,542",
                  "Malawi",
                  "Feldkirchen in Kärnten",
                ],
                ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"],
              ]}
            />
          </CardBody>
        </Card>
      </GridItem> */}
                </GridContainer>
            </div>
        </form>
    );
}
