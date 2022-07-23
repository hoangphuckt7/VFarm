/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
//import Tabs from "components/CustomTabs/CustomTabs.js";
//import Tasks from "components/Tasks/Tasks.js";
import FilterComponent from "components/Filter/FilterComponent";
import { useHistory } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DataTable from "react-data-table-component";
import { useLocation } from "react-router-dom";
import axios from "axios";

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
export default function ApproveFormula() {
  const classes = useStyles();

  const location = useLocation();
  const productId = location.state.product_info;
  const urlGetFormula = process.env.REACT_APP_SERVER_URL + `/api/formulas?product_id=${productId}&formula_status=on20%process`;

  const [locationKeys, setLocationKeys] = useState([]);
  const history = useHistory();
  const token = localStorage.getItem("token");
  // eslint-disable-next-line no-unused-vars
  var [data, setData] = useState([])

  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  //const filteredItems = data.filter(
  // item => item.product_name && item.product_name.toLowerCase().includes(filterText.toLowerCase()),
  //);

  const fetchData = () => {
    console.log(urlGetFormula);
    axios.get(urlGetFormula, {
      headers: {
        "Conttent-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    fetchData();
    return history.listen(location => {
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
          history.push("/formula");

        }
      }
    })
  }, [setData]);

  const onRowClicked = (row) => {

    // setUrl("/formula/detail/" + row.formula_version);
    // console.log("direct đi " + url);
    // var productInfo = {
    //   product_id: row.product_id,
    //   product_name: row.product_name,
    //   product_inquiry: row.product_inquiry
    // }
    //  navigate("/admin/product/detail", { replace: true, state: {product : productInfo}});

    history.push("/submit/detail",
      {
        formula_id: row.formula_id, product_id: productId, formula_version: row.formula_version
      });
  }
  window.onhashchange = function () {
    window.history.back();
  }

  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText('');
      }
    };

    return (
      <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
    );
  }, [filterText, resetPaginationToggle]);

  const columns = [
    {
      name: 'Phiên bản',
      selector: row => row.formula_version,
      sortable: true,
      cell: row => (<div>{row.formula_version}</div>)
    },
    {
      name: 'Người tạo',
      selector: row => row.created_user_id,
      sortable: true,
      cell: row => (<div>{row.created_user_id}</div>)
    },
    {
      name: 'Ngày cập nhật',
      selector: row => row.created_time,
      sortable: true,
      cell: row => (<div>{row.created_time}</div>)
    },
    {
      name: 'Trạng thái',
      selector: row => row.formula_status,
      sortable: true,
      cell: row => (<div>{row.formula_status}</div>)
    },
  ]

  return (
    <GridContainer>
      <ToastContainer />
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="info" className={classes.cardTitleWhite}>
            Công thức đang chờ
          </CardHeader>

          <CardBody>
            <DataTable columns={columns}
              data={data}
              pagination
              paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
              subHeader
              subHeaderComponent={subHeaderComponentMemo}
              persistTableHead
              onRowClicked={onRowClicked}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
