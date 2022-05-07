import React, { useState, useEffect } from "react";
import CreateIcon from "@material-ui/icons/Create";
import {
  Box,
  Button,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Axios from "axios";
import { setGlobalState, useGlobalState } from "../globals/globalVar";
import DoneIcon from "@material-ui/icons/Done";
import ClearIcon from "@material-ui/icons/Clear";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

// Creating styles
const useStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
  table: {
    minWidth: 650,
  },
  snackbar: {
    bottom: "104px",
  },
});

function Admin() {
  const url = useGlobalState("defaultUrl");
  var currentUrl = url[0];

  const [allstudentlist, setAllStudentlist] = useState([]);
  // Creating style object

  // Defining a state named rows
  // which we can update by calling on setRows function

  // Handle the case of delete confirmation where
  // user click yes delete a specific row of id:i

  const getAllRooms = async () => {
    const params = new URLSearchParams();
    params.append("GetAllRooms", true);
    params.append("session_id", localStorage.getItem("session_id"));
    params.append("role", localStorage.getItem("role"));
    // QUESTION TODO get does not work?
    // await Axios.post(currentUrl, params).then((res) => {
    //   // if res.data[0][]
    //   // if res data is there then ;
    //   if (res.data["error"]) {
    //     alert(res.data["error"]);
    //   } else {
    //     // alert("Register Successful");
    //     console.log(res.data);
    //     setAllStudentlist(res.data);
    //     console.log(allstudentlist);
    //   }
    // });

    Axios.post(currentUrl, {
      params,
    })
      .then((response) => {
        console.log(response.data);
        setAllStudentlist(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // getAllUsers();
    getAllRooms();
  }, []);

  return (
    <TableBody>
      <Box margin={1}>
        <TableRow align="center"> </TableRow>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Room</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Lapentor URL</TableCell>
              <TableCell> Map URL</TableCell>
              <TableCell> Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody></TableBody>
        </Table>
      </Box>
    </TableBody>
  );
}

export default Admin;
