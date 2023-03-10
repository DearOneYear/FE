import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";

const url = "/img/sand.png";
const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url(${url});
  background-repeat: no-repeat;
  background-origin: padding-box;
  background-size: cover;
`;
const Header = styled.div`
  width: 100vw;
`;
const Title = styled.p`
  position: relative;
  left: 4.5rem;
  top: 3rem;
  width: 15rem;

  font-style: normal;
  font-weight: 400;
  font-size: 1.25rem;
  line-height: 28px;

  letter-spacing: 0.02em;

  color: black;
`;

const Letter = styled.div`
  position: relative;
  width: 80vw;
  height: 23.875rem;
  overflow: scroll;
  top: 10rem;
  padding: 1rem;

  background: #dab773;
  box-shadow: 0px 0.25rem 1.5rem -0.063rem rgba(0, 0, 0, 0.2);
  background-filter: blur(0.15rem);
  border-radius: 0.625rem;
`;
const To = styled.p`
  position: relative;
  width: 20rem;
  left: 0rem;
  top: 0rem;

  font-size: 1.125rem;
  line-height: 1.375rem;
  padding: 0.3rem;
  text-align: left;

  color: #060606;
`;

const Message = styled.p`
  position: relative;
  width: 75vw;
  top: 0rem;
  text-align: left;
  font-size: 1.125rem;
  line-height: 3rem;
  padding: 0.3rem;
  margin: 0;
  text-decoration: underline;
  text-underline-offset: 0.7rem;
  color: #060606;
`;
const From = styled.p`
  position: relative;
  width: 10rem;
  left: 8rem;
  top: 0rem;

  font-size: 1.125rem;
  line-height: 1.375rem;
  padding: 0.3rem;

  color: #060606;
`;
const NewLetterBtn = styled.button`
  position: relative;
  width: 90vw;
  height: 3.563rem;
  top: 17rem;
  color: white;
  font-size: 1.25rem;

  background: rgba(50, 50, 50, 0.7);
  border: 0.075rem solid #ffffff;
  box-shadow: 0px 0.25rem 1.5rem -0.063rem rgba(0, 0, 0, 0.2);
  background-filter: blur(0.625rem);

  border-radius: 0.625rem;
`;

const OpenBottle = () => {
  // navigate
  const navigate = useNavigate();

  // ?????? ?????? id ????????????
  let currUrl = window.document.location.href;
  let urlArr = currUrl.split("/");
  let letterId = parseInt(urlArr[urlArr.length - 2]);

  // ???????????? ?????? ?????? ?????? ????????????
  let [currLetter, setCurrLetter] = useState({});
  const getLetter = async () => {
    await axios
      // .get("http://localhost:8000/letter/letter/", {
      .get(
        "https://port-0-dearoneyearbe-cf24lcbtczhq.gksl2.cloudtype.app/letter/letter/", //for deploy
        {
          headers: { LetterId: `${letterId}` }, // userEmail ????????? ?????? ??? ????????????
        }
      )
      .then((res) => {
        setDate(res.data);
        setCurrLetter(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  // ?????? ?????? ????????????
  const setDate = (currLetter) => {
    let open = currLetter.openAt.split("T")[0].split("-");
    currLetter.openYear = open[0];
    currLetter.openMonth = open[1];
    currLetter.openDate = open[2];

    let send = currLetter.sendAt.split("T")[0].split("-");
    currLetter.sendYear = send[0];
    currLetter.sendMonth = send[1];
    currLetter.sendDate = send[2];
  };

  useEffect(() => {
    getLetter();
  }, []);

  return (
    <Container>
      <Header>
        <Title>?????? ??????</Title>
        <IoIosArrowBack
          onClick={() => navigate(-1)}
          style={{
            position: "relative",
            width: "2.125rem",
            height: "2.125rem",
            left: "1.5rem",
            top: "0rem",
            color: "black",
          }}
        />
      </Header>
      <center>
        <Letter>
          <To>{currLetter.recipient}??????</To>
          <Message>{currLetter.message}</Message>
          <From>{currLetter.sender}???</From>
        </Letter>
        {currLetter.from_name === currLetter.to_name ? (
          <NewLetterBtn onClick={() => navigate("/write/write1")}>
            ????????? ?????? ?????? ??????
          </NewLetterBtn>
        ) : (
          <NewLetterBtn onClick={() => navigate("/write/write1")}>
            ??? ?????? ?????? ??????
          </NewLetterBtn>
        )}
      </center>
    </Container>
  );
};

export default OpenBottle;
