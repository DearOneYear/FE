import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IoIosArrowBack } from "react-icons/io";
import { BsLink45Deg } from "react-icons/bs";
import { useEffect, useState } from "react";
import axios from "axios";

const url = "/img/ocean.png";
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

  color: white;
`;
const Text1 = styled.p`
  width: 13.063rem;
  height: 2rem;

  position: relative;
  top: 2rem;

  font-size: 1.5rem;
  line-height: 2rem;

  color: white;
`;
const Text2 = styled.p`
  width: 90%;
  height: 2rem;

  position: relative;
  top: 4rem;
  margin: 0rem;

  font-size: 1.25rem;

  color: white;
`;
const Text3 = styled.p`
  width: 90%;
  height: 2rem;

  position: relative;
  top: 7rem;

  font-size: 1.25rem;
  line-height: 2rem;
  margin: 0;

  color: white;
`;
const Bottle = styled.img`
  width: 10.438rem;
  height: 13.063rem;

  position: relative;
  top: 10rem;
  filter: drop-shadow(0.25rem 0.25rem 0.625rem rgba(0, 0, 0, 0.15));
`;
const Input = styled.input`
  width: 13rem;
  height: 2.75rem;
  position: relative;
  left: 0;
  top: 13rem;
  background: none;
  border: none;
  color: white;
  border-bottom: 0.1rem solid white;
  margin: 1rem;
`;
const Btn = styled.button`
  padding: 1rem 1rem;
  color: white;

  position: relative;
  width: 8rem;
  height: 3.188rem;
  left: 0rem;
  top: 13rem;

  background: rgba(50, 50, 50, 0.7);
  border: 0.075rem solid #ffffff;
  box-shadow: 0px 0.25rem 1.25rem -0.0625rem rgba(0, 0, 0, 0.2);
  background-filter: blur(0.625rem);

  border-radius: 0.625rem;
`;

const LetterClose = () => {
  const navigate = useNavigate();

  // ?????? ????????? id ????????????
  let currUrl = window.document.location.href;
  let urlArr = currUrl.split("/");
  let letterId = parseInt(urlArr[urlArr.length - 1]);

  // ???????????? ?????? ?????? ?????? ????????????
  let [currLetter, setCurrLetter] = useState({});
  const getLetter = async () => {
    await axios
      // .get("http://localhost:8000/letter/letter/", {
      .get(
        "https://port-0-dearoneyearbe-cf24lcbtczhq.gksl2.cloudtype.app/letter/letter/",
        {
          //for deploy

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

  console.log(currLetter);
  //?????? ????????????
  let url = document.location.href.split("/");
  url = url.splice(0, url.length - 2).join("/") + "/detail/" + letterId;
  const onShareClick = () => {
    let textArea = document.createElement("textarea");
    document.body.appendChild(textArea);
    textArea.value = url;
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("????????? ?????????????????????.");
  };

  useEffect(() => {
    getLetter();
  }, []);

  return (
    <Container>
      <Header>
        <Title>?????? ???????????? ???...</Title>
        <IoIosArrowBack
          onClick={() => navigate(-1)}
          style={{
            position: "relative",
            width: "2.125rem",
            height: "2.125rem",
            left: "1.5rem",
            top: "0rem",
            color: "white",
          }}
        />
      </Header>
      {currLetter.from_name === currLetter.to_name ? (
        <></>
      ) : (
        <BsLink45Deg
          style={{
            color: "white",
            position: "relative",
            width: "2.125rem",
            height: "2.125rem",
            left: "23rem",
            top: "-2.5rem",
          }}
          onClick={onShareClick}
          id={currLetter.id}
        />
      )}
      <center>
        <Text1>????????????, D - {parseInt(currLetter.dday) + 2}</Text1>
        {currLetter.from === currLetter.to ? (
          <>
            <Text2>
              {currLetter.sendYear}??? {currLetter.sendMonth}???{" "}
              {currLetter.sendDate}?????? ????????? ?????? ???????????? ?????? ?????????
              ???????????? ?????????.
            </Text2>
            <Text3>???????????? ???????????? ???????????? ??????????????????!</Text3>
            <Bottle src="/img/closedbottle.png" alt="bottle"></Bottle>
          </>
        ) : (
          <>
            <Text2>
              {currLetter.sendYear}??? {currLetter.sendMonth}???{" "}
              {currLetter.sendDate}???,
            </Text2>
            <Text2>{currLetter.from} ??????</Text2>
            <Text2>{currLetter.to} ?????? ?????? ????????????</Text2>
            <Text2>?????? ????????? ???????????? ?????????.</Text2>
            <Text3>????????? ???????????? ???????????????</Text3>
            <Text3>???????????? ????????? ??? ???????????? ??????????????????!</Text3>
            <Bottle src="/img/closedbottle.png" alt="bottle"></Bottle>

            <form>
              <Input type="email" placeholder="?????????" />
              <Btn type="submit">?????????</Btn>
            </form>
          </>
        )}
      </center>
    </Container>
  );
};

export default LetterClose;
