/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from "react";
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
//import AddProduct from "./AddProduct";
import DataTable from "react-data-table-component";
import FilterComponent from "components/Filter/FilterComponent";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import ReactLoading from "react-loading";
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
// const divStyle = {
//   marginTop: "2%"
// };

const useStyles = makeStyles(styles);


export default function SubmitFormula() {

  const [locationKeys, setLocationKeys] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();
  const location = useLocation();
  const projectId = location.state.project_info;
  const urlRequest = process.env.REACT_APP_SERVER_URL + `/api/formulas?project_id=${projectId}&formula_status=on%20process`;
  const classes = useStyles();
  // const [compon, setCompon] = useState("");

  var [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  const fetchData = () => {
    axios.get(urlRequest, {
      headers: {
        'Conttent-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      console.log(urlRequest);
      if (res.status == 200) {
        setData(res.data);
        data = res.data.products;
        console.log(res.data);
      }
    }).catch((error) => {
      console.log(error);
    });
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
          history.push("/approve");

        }
      }
    })
  }, [locationKeys,]);


  const [filterText, setFilterText] = React.useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
  const filteredItems = data.filter(
    item => item.user_name && item.user_name.toLowerCase().includes(filterText.toLowerCase()),
  );

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
      selector: row => row.user_name,
      sortable: true,
      cell: row => (<div>{row.user_name}</div>)
    },
    {
      name: 'Mô tả công thức',
      selector: row => row.description,
      sortable: true,
      cell: row => (<div>{row.description}</div>)
    },
    {
      name: 'Trạng thái',
      selector: row => row.formula_status,
      sortable: true,
      cell: row => (<div>{row.formula_status}</div>)
    },
  ]

  // const buttonAddClick = () => {
  //   setCompon("addproduct");
  // }
  // const buttonBackClick = () => {
  //   setCompon("back");
  // }
  // if (compon === "addproduct") {
  //   return (
  //     <div style={divStyle} className={classes.cardTitleWhite}>
  //       <Button type="button" color="info" onClick={buttonBackClick}>Trở về</Button>
  //       <AddProduct></AddProduct>
  //     </div>
  //   );
  // }

  const onRowClicked = (row) => {

    history.push("/submit/detail", { Formular_ID: row.formula_id, project_name: row.project_name });
  }
  window.onhashchange = function () {
    window.history.back();
  }
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
      <div className="navbar">
        <AdminNavbarLinks />
      </div>
      <GridContainer>
        <ToastContainer />
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info" className={classes.cardTitleWhite} >
              Các công thức đang phát triển trong dự án
            </CardHeader>
            <CardBody className={classes.cardTitleWhite}>
              <DataTable columns={columns}
                data={filteredItems}
                pagination
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                onRowClicked={onRowClicked} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </>
  );

}
