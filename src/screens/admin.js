import React, { Component, useState, useEffect } from "react";
import "./style/style.css";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import Modal from "react-bootstrap/Modal";
import DropdownButton from "react-bootstrap/DropdownButton";
import { Dropdown } from "react-bootstrap";
import styled, { css } from "styled-components";
import Form from "react-bootstrap/Form";
import { Box, Button } from "@material-ui/core";

import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import Axios from "axios";
import { setGlobalState, useGlobalState } from "../globals/globalVar";

// Creating styles

function MyVerticallyCenteredModal(props) {
  const url = useGlobalState("defaultUrl");

  var initialState = {
    room_number: "",
    department: "",
    lapentor_url: "",
    room_type: "",
    map_url: "",
    AddNewRoom: true,
  };
  var currentUrl = url[0];
  var categoryMap = {
    1: "Tutoring Center",
    2: "Health Services",
    3: "Club",
    4: "None",
  };
  const [obj, setObj] = useState({
    room_number: "",
    department: "",
    lapentor_url: "",
    room_type: "",
    map_url: "",
    AddNewRoom: true,
    session_id: localStorage.getItem("session_id"),
    role: localStorage.getItem("role"),
  });
  useEffect(() => {}, [obj]);

  const HandleUpdate = async (e, objName) => {
    if (objName == "room_number") {
      await setObj((prevState) => ({
        ...prevState,
        room_number: e,
      }));
    } else if (objName == "department") {
      await setObj((prevState) => ({
        ...prevState,
        department: e,
      }));
    } else if (objName == "room_type") {
      await setObj((prevState) => ({
        ...prevState,
        room_type: e,
      }));
    } else if (objName == "lapentor_url") {
      await setObj((prevState) => ({
        ...prevState,
        lapentor_url: e,
      }));
    } else if (objName == "map_url") {
      await setObj((prevState) => ({
        ...prevState,
        map_url: e,
      }));
    }
  };

  const handleAddRoom = async () => {
    console.log(obj);

    await Axios({
      method: "post",
      url: "/AddNewRoom",
      data: qs.stringify(obj),
      dataType: "JSON",
      withcredentials: true,
    }).then((res) => {
      console.log(res);
      if (res.data["error"]) {
        alert(res.data["error"]);
      } else {
        console.log(res.data);
        alert("Room Added");
        setObj(initialState);
      }
    });
  };
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
                  HandleUpdate(e.target.value, "room_number");
                }}
              />
              <Form.Label>Department</Form.Label>
              <Form.Control
                placeholder="Art.."
                onChange={(e) => {
                  HandleUpdate(e.target.value, "department");
                }}
              />
              <Form.Label>Category</Form.Label>
              <DropdownButton
                alignRight
                title={categoryMap[obj.room_type]}
                id="dropdown-menu-align-right"
                onSelect={(e) => {
                  HandleUpdate(e, "room_type");
                }}
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
                <Dropdown.Item eventKey="4" value="None">
                  None
                </Dropdown.Item>
              </DropdownButton>
              <Form.Label>Lapentor URL</Form.Label>
              <Form.Control
                placeholder="https://"
                onChange={(e) => {
                  HandleUpdate(e.target.value, "lapentor_url");
                }}
              />
              <Form.Label>Map URL</Form.Label>
              <Form.Control
                placeholder="https://"
                onChange={(e) => {
                  HandleUpdate(e.target.value, "map_url");
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button variant="primary" onClick={handleAddRoom}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

function Admin() {
  const url = useGlobalState("defaultUrl");
  const navigate = useNavigate();
  const users = useGlobalState("users");
  var currentUrl = url[0];
  // make a map look up for the category with the key being the catgegory_id
  var categoryMap = { 1: "Tutoring Center", 2: "Health Services", 3: "Club" };

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

    Axios.post("/getAllRooms", params, { withCredentials: true }).then(
      (res) => {
        // if res.data[0][]
        // console.log(res.data);
        // if res data is there then ;
        if (res.data["error"]) {
          alert(res.data["error"]);
        } else {
          // alert("Register Successful");
          //
          setRooms(res.data);
          //
          // works
          // temp = res.data;
          // works
        }
      }
    );
    // TODO not very efficient
    //
  };

  useEffect(() => {}, [modalData]);
  useEffect(() => {}, [category]);

  const handleSelect = async (e) => {
    // setModalData(e);
    // var temp = e;
    //
    await setModalData((prevState) => ({
      ...prevState,
      category_id: e,
    }));

    //
  };
  function showLog() {}

  const handleUpdateSubmit = async () => {
    const params = new URLSearchParams();
    params.append("EditRoom", true);
    params.append("room_number", modalData.RoomNumber);
    params.append("department", modalData.Department);
    params.append("room_type", modalData.category_id);
    params.append("lapentor_url", lapentorUrl);
    params.append("map_url", Map_Url);
    params.append("session_id", localStorage.getItem("session_id"));
    params.append("role", localStorage.getItem("role"));
    //
    //

    // make a post request with the paramaters above
    await Axios.post("/updateRoom", params, { withCredentials: true }).then(
      (res) => {
        console.log(res.data);
        if (res.data["error"]) {
          alert(res.data["error"]);
        } else {
          alert("Update Successful");
        }
      }
    );

    getAllRooms();
  };

  // when the update button is pressed we will loop through every room in the rooms state and update the values
  useEffect(() => {
    // getAllUsers();
    getAllRooms();
  }, [rooms]);

  const handleLogOut = () => {
    const params = new URLSearchParams();
    params.append("Logout", true);
    params.append("session_id", localStorage.getItem("session_id"));
    localStorage.clear();
    Axios.post("/logout", params, { withCredentials: true }).then((res) => {
      // if res.data[0][]
      // if res data is there then ;
      console.log(res.data);
      if (res.data["error"]) {
        alert(res.data["error"]);
      } else {
        alert("Logout Successful");
        navigate("/");
      }
    });
  };

  return (
    <>
      <Container>
        <Rect>
          <Button onClick={handleLogOut}>Logout</Button>
          <div>
            <MyVerticallyCenteredModal
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
            <Box margin={1}>
              <Table>
                <Thead>
                  <Tr>
                    <Th style={{ margin: "10px" }}>Room</Th>
                    <Th>Department</Th>
                    <Th>Lapentor URL</Th>
                    <Th> Category</Th>
                    <Th> Map URL</Th>
                    <Th> Update</Th>
                    <Button
                      variant="primary"
                      style={{ background_color: "rgba(74,144,226,1)" }}
                      onClick={() => {
                        setModalShow(!modalShow);
                      }}
                    >
                      <Th> Add New Room</Th>
                    </Button>
                  </Tr>
                </Thead>
                {/* Add a building name as well */}
                {rooms &&
                  rooms.map((room) => {
                    return (
                      <Tr key={room.RoomNumber + room.Department}>
                        <Td>{room.RoomNumber}</Td>
                        <Td>{room.Department}</Td>
                        {room.Lapentor_Url &&
                        room.Lapentor_Url != null &&
                        room.Lapentor_Url != "" &&
                        room.Lapentor_Url != "undefined" ? (
                          <Td>
                            <a target="_blank" href={room.Lapentor_Url}>
                              <Button className="myButton">Indoor URL</Button>
                            </a>
                          </Td>
                        ) : (
                          <Td>No URL set</Td>
                        )}
                        {room.category_id &&
                        (room.category_id != null) |
                          (room.category_id != "") ? (
                          <Td>{room.category_id}</Td>
                        ) : (
                          <Td>Not set</Td>
                        )}

                        {room.Map_URL != "" &&
                        room.Map_URL != null &&
                        room.Map_URL != "undefined" ? (
                          <Td>
                            <a target="_blank" href={room.Map_URL}>
                              <Button>Directions to the Building</Button>
                            </a>
                          </Td>
                        ) : (
                          <Td>Not set</Td>
                        )}

                        <Td>
                          <Button
                            onClick={() => {
                              setModalData(room);
                              handleShow();
                              setCategory(room.Category);
                              setLapentorUrl(room.Lapentor_Url);
                              setMapUrl(room.Map_Url);
                            }}
                          >
                            Update
                          </Button>
                        </Td>
                      </Tr>
                    );
                  })}
              </Table>
            </Box>
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
        </Rect>
      </Container>
    </>
  );
}
const Container = styled.div`
  display: flex;
  background-color: rgba(248, 231, 28, 1);
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const Rect = styled.div`
  background-color: rgba(248, 231, 28, 1);
  align-self: center;
`;

export default Admin;
