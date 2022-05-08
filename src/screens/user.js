import React, { Component, useEffect, useState } from "react";
import { setGlobalState, useGlobalState } from "../globals/globalVar";
import styled, { css } from "styled-components";
import Axios from "axios";
import Card from "react-bootstrap/Card";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

import {
  Box,
  Button,
  Snackbar,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import sci3 from "/home/cs/runnermap2/src/assets/images/sci3.jpeg";
function User(props) {
  const [rooms, setRooms] = useState([]);
  const url = useGlobalState("defaultUrl");
  var currentUrl = url[0];
  useEffect(() => {
    // getAllUsers();
    getAllRooms();
    console.log(rooms);
  }, [rooms]);
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
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>{" "}
      <Container>
        <Rect4>
          {/* Add a building name as well */}
          {rooms &&
            rooms.map((room) => {
              return (
                <Rect5>
                  <Card
                    className="text-center"
                    key={room.RoomNumber + room.Department}
                  >
                    <Card.Header>{room.category_id}</Card.Header>
                    <Card.Body>
                      <Card.Title>
                        {room.RoomNumber + " " + room.Department}
                      </Card.Title>

                      <Card.Img variant="top" src={sci3} />
                      {room.Lapentor_Url &&
                      room.Lapentor_Url != null &&
                      room.Lapentor_Url != "" &&
                      room.Lapentor_Url != "undefined" ? (
                        <Button variant="primary">
                          <a target="_blank" href={room.Lapentor_Url}>
                            Indoor Navigation
                          </a>
                        </Button>
                      ) : (
                        <p>No URL set</p>
                      )}

                      {room.Map_URL &&
                      room.Map_URL != null &&
                      room.Map_URL != "" &&
                      room.Map_URL != "undefined" ? (
                        <Button variant="primary">
                          <a target="_blank" href={room.Map_URL}>
                            Outdoor Navigation
                          </a>
                        </Button>
                      ) : (
                        <p>No URL set</p>
                      )}
                    </Card.Body>
                    <Card.Footer className="text-muted">2 days ago</Card.Footer>
                  </Card>
                </Rect5>
              );
            })}
        </Rect4>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(74, 144, 226, 1);
  flex-direction: column;
  justify-content: center;
  width: 100vw;
`;

const Rect4 = styled.div`
  width: 790px;
  background-color: rgba(230, 230, 230, 0.86);
  flex-direction: column;
  display: flex;
  align-self: center;
`;

const Rect5 = styled.div`
  width: 529px;
  margin-left: 131px;
  margin-bottom: 20px;
`;

export default User;
