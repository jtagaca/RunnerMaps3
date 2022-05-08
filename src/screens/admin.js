import React, { Component, useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import CreateIcon from "@material-ui/icons/Create";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Dropdown, Row, Col, Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import {
  Box,
  Button,
  Snackbar,
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

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size=""
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add a new room!!
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Modal.Body>
          {/* TODO add more options */}

          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Room Number</Form.Label>
              <Form.Control
                placeholder="201.."
                onChange={(e) => {
                  setLapentorUrl(e.target.value);
                  console.log(lapentorUrl);
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Map URL</Form.Label>
              <Form.Control
                placeholder="http://"
                onChange={(e) => {
                  setMapUrl(e.target.value);
                  console.log(Map_Url);
                }}
                defaultValue={modalData.Map_URL}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function Admin() {
  const url = useGlobalState("defaultUrl");
  const users = useGlobalState("users");
  var currentUrl = url[0];
  // make a map look up for the category with the key being the catgegory_id
  var categoryMap = { 1: "Tutoring Center", 2: "Health Services", 3: "Club" };
  var currentUsers = users[0];
  var array = [];

  // Creating style object

  const [rooms, setRooms] = useState([]);
  const [modalData, setModalData] = useState(null);
  const [category, setCategory] = useState(null);
  const [lapentorUrl, setLapentorUrl] = useState(null);
  const [Map_Url, setMapUrl] = useState(null);

  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    // TODO not very efficient
    // console.log(rooms);
  };

  useEffect(() => {
    console.log(modalData);
  }, [modalData]);
  useEffect(() => {
    console.log(category);
  }, [category]);

  const handleSelect = async (e) => {
    console.log(e);
    // setModalData(e);
    // var temp = e;
    // console.log(category);
    await setModalData((prevState) => ({
      ...prevState,
      category_id: e,
    }));

    // console.log(modalData);
  };
  function showLog() {
    console.log(rooms);
  }

  const handleUpdateSubmit = async () => {
    const params = new URLSearchParams();
    params.append("EditRoom", true);
    params.append("room_number", modalData.RoomNumber);
    params.append("department", modalData.Department);
    params.append("room_type", modalData.category_id);
    params.append("lapentor_url", lapentorUrl);
    params.append("map_url", Map_Url);
    // console.log(modalData.Map_URL);
    // console.log(params);
    console.log("this is the modal data before sending" + modalData);

    // make a post request with the paramaters above
    await Axios.post(currentUrl, params).then((res) => {
      if (res.data["error"]) {
        console.log("====================================");
        console.log(res.data);
        console.log("====================================");
        alert(res.data["error"]);
      } else {
        console.log(res.data);
        alert("Update Successful");
      }
    });

    getAllRooms();
  };

  // when the update button is pressed we will loop through every room in the rooms state and update the values
  useEffect(() => {
    // getAllUsers();
    getAllRooms();
  }, [rooms]);

  return (
    <>
      <div>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
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
                  <Button
                    onClick={() => {
                      setModalShow(!modalShow);
                    }}
                  >
                    <TableCell> Add New Room</TableCell>
                  </Button>
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
                        {room.Lapentor_Url &&
                        room.Lapentor_Url != null &&
                        room.Lapentor_Url != "" &&
                        room.Lapentor_Url != "undefined" ? (
                          <td>
                            <a target="_blank" href={room.Lapentor_Url}>
                              <button>Indoor URL</button>
                            </a>
                          </td>
                        ) : (
                          <td>No URL set</td>
                        )}
                        {room.category_id &&
                        (room.category_id != null) |
                          (room.category_id != "") ? (
                          <td>{room.category_id}</td>
                        ) : (
                          <td>Not set</td>
                        )}

                        {room.Map_URL != "" &&
                        room.Map_URL != null &&
                        room.Map_URL != "undefined" ? (
                          <td>
                            <a target="_blank" href={room.Map_URL}>
                              <button>Directions to the Building</button>
                            </a>
                          </td>
                        ) : (
                          <td>Not set</td>
                        )}

                        <td>
                          <button
                            onClick={() => {
                              setModalData(room);
                              handleShow();
                              setCategory(room.Category);
                              setLapentorUrl(room.Lapentor_Url);
                              setMapUrl(room.Map_Url);
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
        {/* Todo modal imperfections like undefined */}
        {modalData ? (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                {modalData.RoomNumber + " " + modalData.Department}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* TODO add more options */}
              <DropdownButton
                alignRight
                title={categoryMap[modalData.category_id]}
                id="dropdown-menu-align-right"
                onSelect={handleSelect}
              >
                <Dropdown.Item eventKey="1" value="Tutoring Center">
                  Tutoring Center
                </Dropdown.Item>
                <Dropdown.Item eventKey="2" value="Health Services">
                  Health Services
                </Dropdown.Item>
                <Dropdown.Item eventKey="3" value="Club">
                  Club
                </Dropdown.Item>
              </DropdownButton>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Lapentor URL</Form.Label>
                  <Form.Control
                    placeholder="http://"
                    onChange={(e) => {
                      setLapentorUrl(e.target.value);
                      console.log(lapentorUrl);
                    }}
                    defaultValue={modalData.Lapentor_Url}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Map URL</Form.Label>
                  <Form.Control
                    placeholder="http://"
                    onChange={(e) => {
                      setMapUrl(e.target.value);
                      console.log(Map_Url);
                    }}
                    defaultValue={modalData.Map_URL}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdateSubmit}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
        ) : null}

        {/* <button onClick={showLog}>Log</button> */}
      </div>
    </>
  );
}

export default Admin;
