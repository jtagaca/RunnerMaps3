import React, { Component, useState } from "react";
import styled, { css } from "styled-components";
import MaterialCardBasic from "../components/MaterialCardBasic";
import { setGlobalState, useGlobalState } from "../globals/globalVar";
import Axios from "axios";
import $ from "jquery";
import { useNavigate } from "react-router-dom";

function LoginComponent(props) {
  // const
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  // make an axios query

  const url = useGlobalState("defaultUrl");
  var currentUrl = url[0];
  const handleEmailAndpasswordVerify = () => {
    if (email.length === 0) {
      alert("Email cannot be empty.");
      return -1;
    }
    // email must contain @csub.edu
    if (!email.includes("@csub.edu")) {
      alert("Email must contain @csub.edu");
      return -1;
    }
    // if the len of password is less than 8 then reject
    if (password.length < 8) {
      alert("Password must be at least 8 characters long.");
      return -1;
    }

    return 0;
  };
  const handleSubmit = async (e) => {
    if (handleEmailAndpasswordVerify() !== 0) {
      return;
    }

    const params = new URLSearchParams();
    params.append("Register", true);
    params.append("email", email);
    params.append("password", password);
    // Axios({

    //   method: "post",
    //   url: "http://localhost:8000/index.php",
    //   data: params,
    // });
    // make a fetch post request with the params data

    await Axios.post(currentUrl, params).then((res) => {
      // if res.data[0][]
      // if res data is there then ;
      if (res.data["error"]) {
        alert(res.data["error"]);
      } else {
        alert("Register Successful");
        // $("#registerModal").modal("hide");
      }
    });
  };

  // QUESTION

  const login = async () => {
    const params = new URLSearchParams();
    params.append("Login", true);
    params.append("email", email);
    params.append("password", password);

    await Axios.post(currentUrl, params).then((response) => {
      if (response.data["error"]) {
        alert(response.data["error"]);
      } else {
        // console.log(response.data);
        localStorage.setItem("session_id", response.data["session_id"]);
        localStorage.setItem("role", response.data["role"]);
        if (response.data["role"] == "admin") {
          navigate("/admin");
        } else {
          navigate("/user");
        }
        //     // setLoginStatus(response.data[0].username);
        //     // check the role here
        // then on the admin page have a use effect check if this guy actually has the correct session
      }
    });
  };
  //login validator
  const loginValidate = () => {
    if (email.length === 0) {
      alert("Username cannot be empty.");
      return;
    }
    if (password.length === 0) {
      alert("Password cannot be empty.");
      return;
    }
    login();
  };
  return (
    <>
      <div
        class="modal "
        id="registerModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel2"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title" id="myModalLabel2">
                Register
              </h4>
            </div>
            {/* make an input for email and password */}
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* button for submit */}
            <button onClick={handleSubmit}>Submit</button>
            <div class="modal-body"></div>
          </div>
        </div>
      </div>
      <Container>
        <Group>
          <Group2Stack>
            <Group2>
              <Group3>
                <Rect>
                  <Rect2>
                    <input
                      placeholder="Email"
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    ></input>
                  </Rect2>
                  <Rect3>
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    ></input>
                  </Rect3>
                  <Rect4>
                    <button
                      type="button"
                      class="btn btn-demo"
                      data-toggle="modal"
                      data-target="#registerModal"
                    >
                      Register
                    </button>
                  </Rect4>
                  <Rect5>
                    <button onClick={login}>Login</button>
                  </Rect5>
                </Rect>
              </Group3>
            </Group2>
            <MaterialCardBasic
              style={{
                height: 340,
                width: 446,
                position: "absolute",
                left: 0,
                top: 121,
                opacity: 0.88,
              }}
              bodyText="Runner Maps, the very first indoor and outdoor navigation at CSUB"
            ></MaterialCardBasic>
          </Group2Stack>
        </Group>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  background-color: rgba(74, 144, 226, 1);
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const Group = styled.div`
  width: 931px;
  height: 589px;
  flex-direction: column;
  display: flex;
  margin-top: 239px;
  margin-left: 488px;
`;

const Group2 = styled.div`
  left: 308px;
  width: 623px;
  height: 589px;
  position: absolute;
  top: 0px;
  flex-direction: column;
  display: flex;
  justify-content: center;
`;

const Group3 = styled.div`
  width: 623px;
  height: 589px;
  flex-direction: column;
  display: flex;
  align-self: center;
`;

const Rect = styled.div`
  width: 623px;
  height: 589px;
  background-color: rgba(248, 231, 28, 1);
  border-radius: 87px;
  flex-direction: column;
  display: flex;
`;

const Rect2 = styled.div`
  width: 287px;
  height: 71px;
  background-color: rgba(74, 144, 226, 1);
  border-radius: 27px;
  shadow-radius: 0px;
  flex-direction: column;
  display: flex;
  margin-top: 134px;
  margin-left: 168px;
  box-shadow: 3px 3px 0px 1px rgba(0, 0, 0, 1);
`;

const TextInput = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(247, 240, 240, 1);
  height: 33px;
  width: 245px;
  text-align: center;
  font-size: 20px;
  margin-top: 18px;
  margin-left: 20px;
  border: none;
  background: transparent;
`;

const Rect3 = styled.div`
  width: 287px;
  height: 71px;
  background-color: rgba(74, 144, 226, 1);
  border-radius: 13px;
  shadow-radius: 0px;
  flex-direction: column;
  display: flex;
  margin-top: 34px;
  margin-left: 168px;
  box-shadow: 3px 3px 0px 1px rgba(0, 0, 0, 1);
`;

const TextInput1 = styled.input`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(247, 240, 240, 1);
  height: 33px;
  width: 245px;
  text-align: center;
  font-size: 20px;
  margin-top: 18px;
  margin-left: 20px;
  border: none;
  background: transparent;
`;

const Rect4 = styled.div`
  width: 169px;
  height: 33px;
  background-color: rgba(74, 144, 226, 1);
  border-radius: 32px;
  flex-direction: column;
  display: flex;
  margin-top: 19px;
  margin-left: 235px;
`;

const Register = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  height: 26px;
  width: 152px;
  text-align: center;
  margin-top: 6px;
  margin-left: 8px;
`;

const Rect5 = styled.div`
  width: 169px;
  height: 33px;
  background-color: rgba(74, 144, 226, 1);
  border-radius: 32px;
  flex-direction: column;
  display: flex;
  margin-top: 21px;
  margin-left: 235px;
`;

const Login = styled.span`
  font-family: Roboto;
  font-style: normal;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  height: 26px;
  width: 152px;
  text-align: center;
  margin-top: 6px;
  margin-left: 8px;
`;

const Group2Stack = styled.div`
  width: 931px;
  height: 589px;

  position: relative;
`;

export default LoginComponent;
