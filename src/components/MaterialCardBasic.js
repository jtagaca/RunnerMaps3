import React, { Component } from "react";
import styled, { css } from "styled-components";

function MaterialCardBasic(props) {
  return (
    <Container {...props}>
      <CardItemImagePlace
        src={require("../assets/images/cardImage.png")}
      ></CardItemImagePlace>
      <Body>
        <BodyText>
          {props.bodyText ||
            "BuilderX is a screen design tool which codes React Native for you."}
        </BodyText>
      </Body>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  border-width: 1px;
  border-radius: 2px;
  border-color: #CCC;
  flex-wrap: nowrap;
  background-color: #FFF;
  overflow: hidden;
  flex-direction: column;
  border-style: solid;
  box-shadow: -2px 2px 1.5px  0.1px #000 ;
`;

const CardItemImagePlace = styled.img`
  background-color: #ccc;
  min-height: 210px;
  flex: 1 1 0%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Body = styled.div`
  padding: 16px;
  flex-direction: column;
  display: flex;
`;

const BodyText = styled.span`
  font-family: Arial;
  line-height: 20px;
  font-size: 14px;
  color: #424242;
`;

export default MaterialCardBasic;
