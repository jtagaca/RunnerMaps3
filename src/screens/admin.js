import React, { Component, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const customStyles = {
    content: {
      top: "35%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      width: "60%",
      transform: "translate(-40%, -10%)",
    },
  };

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
  };

  function showLog() {
    console.log(rooms);
    console.log(modalIsOpen);
  }

  // when the update button is pressed we will loop through every room in the rooms state and update the values
  useEffect(() => {
    // getAllUsers();
    getAllRooms();
  }, []);

  return (
    <>
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
                        {room.Category ? (
                          <td>{room.Category}</td>
                        ) : (
                          <td>Not set</td>
                        )}

                        {room.Map_Url ? (
                          <td>
                            <a target="_blank" href={room.Map_URL}>
                              <button>Directions to the Building</button>
                            </a>
                          </td>
                        ) : (
                          <td>No Outdoor Url</td>
                        )}

                        <td>
                          <button
                            onClick={() => {
                              setModalData(room);
                              setModalIsOpen(true);
                            }}
                          >
                            Update
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </TableBody>
            </Table>
          </Box>
        </TableBody>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
        <button onClick={showLog}>Log</button>
      </div>
    </>
  );
}

export default Admin;
