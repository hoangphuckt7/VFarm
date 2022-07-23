/* eslint-disable react/prop-types */
import React from "react";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import PropTypes from "prop-types"; // import Table from "react-bootstrap/Table";
import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";
import CustomInput from "components/CustomInput/CustomInput";
import { useEffect } from "react";

const styles = {
  errorMessage: {
    color: "red",
  },
};

const useStyles = makeStyles(styles);

export default function BOMTable({ formula, formulaBOMJSON, project }) {
  const [product_name, setProdcut_name] = useState(project.product_name);
  const [brand, setBrand] = useState(project.brand_name);
  const [tolerance, setTolerance] = useState(project.tolerance);
  // eslint-disable-next-line no-unused-vars
  const [materialNormLoss, setMaterialNormLoss] = useState(
    project.material_norm_loss
  );
  const [bareCode, setBareCode] = useState("");
  const [orderCode, setOrderCode] = useState("");

  const [formError, setFormErrors] = useState({});
  const [listTest, setListTest] = useState([]);
  const classes = useStyles();
  console.log(project);
  const convertJsonTestToOject = () => {
    const list = [];
    for (const i in formulaBOMJSON.qualityTracking) {
      const test = {
        content: i,
        expect: formulaBOMJSON.qualityTracking[i],
      };
      list.push(test);
    }
    setListTest(list);
  };

  useEffect(() => {
    convertJsonTestToOject();
  }, []);
  // eslint-disable-next-line no-unused-vars
  const materialRow = (material, index) => {
    return (
      <tr>
        <td>{index + 1}</td>
        <td>{material.mixed}</td>
        <td>{material.code}</td>
        <td>{material.tradeName}</td>
        <td>{material.rate}</td>
      </tr>
    );
  };
  const materialColum = formulaBOMJSON.materialData.map((mater, index) =>
    materialRow(mater, index)
  );
  const qualityRow = (content, expect) => {
    return (
      <tr>
        <td>{content}</td>
        <td></td>
        <td>{expect}</td>
        <td></td>
        <td></td>
      </tr>
    );
  };

  const qualityColumn = listTest.map((test) =>
    qualityRow(test.content, test.expect)
  );
  const qualityTracking = (
    <>
      <tr>
        <td colSpan="5">
          <b>THEO DÕI CHẤT LƯỢNG</b>
        </td>
      </tr>
      <tr>
        <td>
          <b>Chỉ tiêu</b>
        </td>
        <td></td>
        <td>
          <b>Tiêu chuẩn</b>
        </td>
        <td></td>
        <td></td>
      </tr>
      {qualityColumn}
    </>
  );
  const handleProductNameInput = (e) => {
    setProdcut_name(e.target.value);
    if (e.target.value === "") {
      setFormErrors({
        ...formError,
        product_name: "Tên sản phẩm không được để trống",
      });
    } else if (e.target.value.length > 255) {
      setFormErrors({
        ...formError,
        product_name: "Tên sản phẩm không được quá 255 ký tự",
      });
    } else {
      setFormErrors({
        ...formError,
        product_name: "",
      });
    }
  };
  const handleBarecode = (e) => {
    setBareCode(e.target.value);
    if (!/^[0-9]+$/.test(e.target.value)) {
      setFormErrors({
        ...formError,
        barecode: "Mã vạch chỉ chứa ký tự 0-9",
      });
    } else if (e.target.value.length === 0) {
      setFormErrors({
        ...formError,
        barecode: "Mã vạch không được để trống",
      });
    } else {
      setFormErrors({
        ...formError,
        barecode: "",
      });
    }
  };
  const handleBrand = (e) => {
    setBrand(e.target.value);
    if (e.target.value === "") {
      setFormErrors({
        ...formError,
        brand_name: "Thương hiệu không được để trống",
      });
    } else if (e.target.value.length > 255) {
      setFormErrors({
        ...formError,
        brand_name: "Thương hiệu không được quá 255 ký tự",
      });
    } else {
      setFormErrors({
        ...formError,
        brand_name: "",
      });
    }
  };
  const handleOrderCode = (e) => {
    setOrderCode(e.target.value);
    if (!/^[0-9]+$/.test(e.target.value)) {
      setFormErrors({
        ...formError,
        orderCode: "Mã đơn hàng chỉ chứa ký tự 0-9",
      });
    } else if (e.target.value.length === 0) {
      setFormErrors({
        ...formError,
        orderCode: "Mã đơn hàng không được để trống",
      });
    } else {
      setFormErrors({
        ...formError,
        orderCode: "",
      });
    }
  };
  const handleTolerance = (e) => {
    setTolerance(e.target.value);
    if (!e.target.value.match(/^[+]?((\.\d+)|(\d+(\.\d+)?)|(\d+\.))$/)) {
      setFormErrors({
        ...formError,
        tolerance: "Dung sai phải số lớn hơn hoặc bằng 0",
      });
    } else {
      setFormErrors({
        ...formError,
        tolerance: "",
      });
    }
  };
  const handleMaterialNormLoss = (e) => {
    setMaterialNormLoss(e.target.value);
    if (!/^[0-9]+$/.test(e.target.value)) {
      setFormErrors({
        ...formError,
        norm_loss: "Hao hụt phải là số tự nhiên lớn hơn hoặc bằng 0",
      });
    } else {
      setFormErrors({
        ...formError,
        norm_loss: "",
      });
    }
  };

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12} onChange={handleProductNameInput}>
          <CustomInput
            color="primary"
            labelText="Tên sản phẩm"
            id="product_name"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              multiline: false,
              rows: 1,
              value: product_name,
            }}
          />
          <p className={classes.errorMessage}>{formError.product_name}</p>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} onChange={handleBarecode}>
          <CustomInput
            color="primary"
            labelText="Mã vạch"
            id="bare_code"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              multiline: false,
              rows: 1,
            }}
          />
          <p className={classes.errorMessage}>{formError.barecode}</p>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} onChange={handleBrand}>
          <CustomInput
            color="primary"
            labelText="Thương hiệu"
            id="brand"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              multiline: false,
              rows: 1,
              value: brand,
            }}
          />
          <p className={classes.errorMessage}>{formError.brand_name}</p>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} onChange={handleOrderCode}>
          <CustomInput
            color="primary"
            labelText="Mã đơn hàng"
            id="order_code"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              multiline: false,
              rows: 1,
            }}
          />
          <p className={classes.errorMessage}>{formError.orderCode}</p>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} onChange={handleTolerance}>
          <CustomInput
            color="primary"
            labelText="Dung sai"
            id="unknow"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              multiline: false,
              rows: 1,
            }}
          />
          <p className={classes.errorMessage}>{formError.tolerance}</p>
        </GridItem>
        <GridItem xs={12} sm={12} md={12} onChange={handleMaterialNormLoss}>
          <CustomInput
            color="primary"
            labelText="Hao hụt"
            id="tolerant"
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              multiline: false,
              rows: 1,
              value: tolerance,
            }}
          />
          <p className={classes.errorMessage}>{formError.norm_loss}</p>
        </GridItem>
      </GridContainer>
      <div style={{ marginLeft: "52%" }}>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button"
          table="table-to-xls"
          filename={`BOM-${product_name}`}
          sheet="tablexls"
          buttonText="Download as XLS"
        />
      </div>
      <div>
        <table id="table-to-xls">
          <tbody>
            <tr>
              <td colSpan="5">
                <b>PHIẾU THEO DÕI SẢN XUẤT</b>
              </td>
            </tr>
            <tr>
              <td>Sản phẩm</td>
              <td></td>
              <td>{product_name}</td>
              <td>Mã Vạch </td>
              <td>{bareCode}</td>
            </tr>
            <tr>
              <td>Thương hiệu</td>
              <td></td>
              <td>{brand}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>Mã đơn hàng</td>
              <td></td>
              <td>{orderCode}</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td colSpan="2">Khối lượng đơn vị (g)</td>
              <td>{formula.formula_weight}</td>
              <td>Dung tích đơn vị (ml)</td>
              <td>{formula.volume} </td>
            </tr>
            <tr>
              <td>
                <b>Formula Version</b>
              </td>
              <td></td>
              <td></td>
              <td>{formula.formula_version}</td>
              <td></td>
            </tr>
            <tr>
              <td>d (g/ml)</td>
              <td></td>
              <td></td>
              <td>{formula.density}</td>
              <td></td>
            </tr>
            <tr>
              <td>dung sai</td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td>hao hụt</td>
              <td></td>
              <td>{tolerance}%</td>
              <td></td>
              <td></td>
            </tr>
            <tr>
              <td rowSpan="2">
                <b>STT</b>
              </td>
              <td rowSpan="2">
                <b>Pha</b>
              </td>
              <td colSpan="2">
                <b>Nguyên liệu</b>
              </td>
              <td rowSpan="2">
                <b>Tỉ lệ (%w/w)</b>
              </td>
            </tr>
            <tr>
              <td>
                <b>Code</b>
              </td>
              <td>
                <b>Tên thương mại</b>
              </td>
            </tr>
            {materialColum}
            <tr>
              <td>Tổng</td>
              <td></td>
              <td></td>
              <td></td>
              <td>100</td>
            </tr>
            <tr> </tr>
            <tr></tr>
            {qualityTracking}
          </tbody>
        </table>
      </div>
    </>
  );
}
BOMTable.propTypes = {
  formulaBOMJSON: PropTypes.object.isRequired,
};
BOMTable.propTypes = {
  project: PropTypes.object.isRequired,
};
BOMTable.propTypes = {
  formula: PropTypes.object.isRequired,
};
