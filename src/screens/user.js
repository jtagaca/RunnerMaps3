import React, { Component, useEffect, useState } from "react";
import { setGlobalState, useGlobalState } from "../globals/globalVar";
import styled, { css } from "styled-components";
import Axios from "axios";

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
    <Container>
      <Rect4>
        {/* Add a building name as well */}
        {rooms &&
          rooms.map((room) => {
            return (
              <Rect5>
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
                  (room.category_id != null) | (room.category_id != "") ? (
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
                </tr>
              </Rect5>
            );
          })}
      </Rect4>
    </Container>
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
  height: 252px;
  background-color: #e6e6e6;
  border-radius: 27px;
  margin-top: 57px;
  margin-left: 131px;
  margin-bottom: 10px;
  padding: 10%;
`;

export default User;
