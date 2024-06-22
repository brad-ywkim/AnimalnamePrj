import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import "../name/name.css";
import "../component/formFrm.css";
import { useEffect, useState } from "react";
import { Button1, Button2, Button3 } from "../component/FormFrm";
import axios from "axios";
import Swal from "sweetalert2";
import { RWebShare } from "react-web-share";

const NameLuck = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [luckResult, setLuckResult] = useState({});

  const [currentDateTime, setCurrentDateTime] = useState({
    time: "",
    date: "",
  });

  const [imgIndex, setImgIndex] = useState(0); // 이미지 인덱스 초기화

  const handleChange1 = (event) => {
    const input = event.target.value;
    const hangulCheck = /[^가-힣ㄱ-ㅎㅏ-ㅣ]/g;
    if (hangulCheck.test(input)) {
      Swal.fire({
        title: "입력 오류",
        text: "한글만 입력 가능합니다.",
        icon: "error",
        customClass: {
          title: "swal2-title",
          popup: "swal2-popup",
        },
        width: "200px", // Adjust the width as needed
      });
    } else {
      setName1(input);
      setLuckResult({}); // 결과 초기화
    }
  };
  const images = [
    "luck1.webp",
    "luck2.webp",
    "luck3.webp",
    "luck4.webp",
    "luck5.webp",
    "luck6.webp",
    "luck7.webp",
    "luck8.webp",
    "luck9.webp",
  ];
  useEffect(() => {
    // 컴포넌트가 마운트 될 때 랜덤 이미지 인덱스 설정
    setImgIndex(Math.floor(Math.random() * images.length));
  }, []);
  const handleChange2 = (event) => {
    const input = event.target.value;
    const hangulCheck = /[^가-힣ㄱ-ㅎㅏ-ㅣ]/g;
    if (hangulCheck.test(input)) {
      Swal.fire({
        title: "입력 오류",
        text: "한글만 입력 가능합니다.",
        icon: "error",
        customClass: {
          title: "swal2-title",
          popup: "swal2-popup",
        },
        width: "200px", // Adjust the width as needed
      });
    } else {
      setName2(input);
      setLuckResult({}); // 결과 초기화
    }
  };

  const compa = () => {
    if (name1 === "" || name2 === "") {
      Swal.fire({
        title: "이름 입력 필수",
        text: "이름을 모두 입력해주세요.",
        icon: "error",
        customClass: {
          title: "swal2-title",
          popup: "swal2-popup",
        },
        width: "200px", // Adjust the width as needed
      });
    }
    axios
      .get(backServer + "/animalname/luck/" + name1 + "/" + name2)
      .then((res) => {
        console.log(res.data);
        setLuckResult(res.data.data);
      })
      .catch((res) => {});
  };

  // 시간 및 날짜 표시
  useEffect(() => {
    function showTime() {
      const date = new Date();
      let h = date.getHours(); // 0 - 23
      let m = date.getMinutes(); // 0 - 59
      let s = date.getSeconds(); // 0 - 59
      let session = "AM";

      if (h === 0) {
        h = 12;
      }

      if (h > 12) {
        h -= 12;
        session = "PM";
      }

      h = h < 10 ? "0" + h : h;
      m = m < 10 ? "0" + m : m;
      s = s < 10 ? "0" + s : s;

      const time = h + ":" + m + ":" + s + " " + session;

      const options = { year: "numeric", month: "long", day: "numeric" };
      const dateStr = date.toLocaleDateString("ko-KR", options);

      setCurrentDateTime({ time: time, date: dateStr });
    }

    const intervalId = setInterval(showTime, 1000);

    // 컴포넌트 언마운트 시 인터벌 정리
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="name-compatibility-wrap">
      <div className="name-compatibility-title">
        <h2 className="sub-title">이름 운세</h2>
      </div>
      <div className="time">
        <p>
          {""} {currentDateTime.date} {currentDateTime.time}
        </p>
        <p>멍냥이와 오늘의 운세를 확인해보세요.</p>
      </div>

      <div className="name-compatibility-input-wrap">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="초코 😸"
            inputProps={{ "aria-label": "이름", maxLength: 6 }}
            id="search-name"
            value={name1}
            onChange={handleChange1}
          />
        </Paper>
        <span>🔎</span>
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="이세하 🧑‍🦰"
            inputProps={{ "aria-label": "이름", maxLength: 6 }}
            id="search-name"
            value={name2}
            onChange={handleChange2}
          />
        </Paper>
      </div>
      <div>
        <Button2
          text="오늘의 운세 보기"
          id="name-luck-btn"
          clickEvent={compa}
        />
      </div>
      <div className="name-compatibility-result">
        {" "}
        {Object.keys(luckResult).length === 0 ? (
          ""
        ) : (
          <>
            <h3 className="luck-title">
              {name1} <span style={{ fontWeight: 400 }}>님과</span> {name2}
              {""} <span style={{ fontWeight: 400 }}>님의 운세</span> 🍀
            </h3>

            <img
              className="luck-img"
              src={`../image/${images[imgIndex]}`}
              alt="todayluck"
            />

            <p
              style={{
                fontSize: "16px",
                color: "#0ce466",
                marginTop: "10px",
              }}
            >
              {luckResult.luckTitle}
            </p>
            <p className="test-result">{luckResult.luck} </p>

            <br />
            <br />
            <div>
              <RWebShare
                data={{
                  text:
                    { name1 } +
                    "님과 " +
                    { name2 } +
                    "님의 운세는 " +
                    `${luckResult.luck}` +
                    "점입니다.",
                  url: "https://www.petname.site",
                  title: "한국 동물이름 순위",
                }}
                onClick={() => console.log("shared successfully!")}
              >
                <button className="btn st2">공유하기 🔗</button>
              </RWebShare>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default NameLuck;
