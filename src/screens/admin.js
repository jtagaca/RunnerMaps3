import React, { Component, useState, useEffect } from "react";
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
const Rooms = [];

function Admin() {
  const url = useGlobalState("defaultUrl");
  const users = useGlobalState("users");
  var currentUrl = url[0];
  var currentUsers = users[0];
  var array = [];

  // Creating style object

  const [rooms, setRooms] = useState([]);
  // Defining a state named rows
  // which we can update by calling on setRows function

  // Handle the case of delete confirmation where
  // user click yes delete a specific row of id:i

  const getAllRooms = () => {
    const params = new URLSearchParams();
    params.append("GetAllRooms", true);
    params.append("session_id", localStorage.getItem("session_id"));
    params.append("role", localStorage.getItem("role"));
    // QUESTION TODO get does not work?
    // await Axios.post(currentUrl, params).then((res) => {
    //   // if res.data[0][]
    //   // if res data is there then ;

    // email

    // jtagaca0012@csub.edu
    // tagaca12

    let temp = [];
    Axios.post(currentUrl, params).then((res) => {
      // if res.data[0][]
      // if res data is there then ;
      if (res.data["error"]) {
        alert(res.data["error"]);
      } else {
        // alert("Register Successful");
        // console.log(res.data[0]);
        setRooms(res.data);
        // console.log(res.data);
        // works
        // temp = res.data;
        // works
      }
    });

    // console.log(temp);
    // Axios.post(currentUrl, {
    //   params,
    // })
    //   .then((response) => {
    //     console.log(response.data);
    //     setAllStudentlist(response.data);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // const headers = { "Content-Type": "application/json" };

    // await fetch(currentUrl, { headers, body: params })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
  };

  function showLog() {
    console.log(rooms);
  }

  // when the update button is pressed we will loop through every room in the rooms state and update the values
  useEffect(() => {
    // getAllUsers();
    getAllRooms();
  }, []);

  return (
    <div>
      <TableBody>
        <Box margin={1}>
          <TableRow align="center"> </TableRow>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Lapentor URL</TableCell>
                <TableCell> Category</TableCell>
                <TableCell> Map URL</TableCell>
                <TableCell> Update</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Add a building name as well */}
              {rooms &&
                rooms.map((room) => {
                  return (
                    <tr key={room.RoomNumber + room.Department}>
                      <td>{room.RoomNumber}</td>
                      <td>{room.Department}</td>

                      {room.Lapentor_Url ? (
                        <td>
                          <a target="_blank" href={room.Lapentor_Url}>
                            <button>Indoor URL</button>
                          </a>
                        </td>
                      ) : (
                        <td>No URL set</td>
                      )}
                      <td>{room.Category}</td>
                      <td>
                        <td>
                          <a target="_blank" href={room.Map_URL}>
                            <button>Directions to the Building</button>
                          </a>
                        </td>
                      </td>
                      <td>
                        <button>Update</button>
                      </td>
                    </tr>
                  );
                })}
            </TableBody>
          </Table>
        </Box>
      </TableBody>
      <button onClick={showLog}>Log</button>
    </div>
  );
}

export default Admin;
