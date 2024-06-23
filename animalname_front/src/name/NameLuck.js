import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import "../name/name.css";
import "../component/formFrm.css";
import { useEffect, useState } from "react";
import { Button1, Button2, Button3 } from "../component/FormFrm";
import axios from "axios";
import Swal from "sweetalert2";
import { RWebShare } from "react-web-share";
import ShareKakao from "../component/ShareKakao";
import LoadBear from "../component/LoadBear";
import Luck from "../component/Luck";

const NameLuck = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [luckResult, setLuckResult] = useState({});
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가

  const [currentDateTime, setCurrentDateTime] = useState({
    time: "",
    date: "",
  });

  const [imgIndex, setImgIndex] = useState(0); // 이미지 인덱스 초기화

  const handleChange1 = (event) => {
    const input = event.target.value;
    setName1(input);
    setLuckResult({}); // 결과 초기화
  };

  const handleChange2 = (event) => {
    const input = event.target.value;
    setName2(input);
    setLuckResult({}); // 결과 초기화
  };

  const compa = () => {
    const hangulCheck = /[^가-힣]/g;
    if (
      name1 === "" ||
      name2 === "" ||
      hangulCheck.test(name1) ||
      hangulCheck.test(name2)
    ) {
      let errorMessage = "";
      if (name1 === "" || name2 === "") {
        errorMessage = "이름을 모두 입력하세요.";
      } else if (hangulCheck.test(name1) || hangulCheck.test(name2)) {
        errorMessage = "이름을 정확히 입력하세요.";
      }
      Swal.fire({
        title: "입력 오류",
        text: errorMessage,
        icon: "error",
        customClass: {
          title: "swal2-title",
          popup: "swal2-popup",
        },
        allowOutsideClick: false, // 추가된 옵션
        allowEnterKey: false,
        width: "200px", // Adjust the width as needed
      });
    } else {
      setIsLoading(true); // 로딩 상태 시작
      axios
        .get(backServer + "/animalname/luck/" + name1 + "/" + name2)
        .then((res) => {
          setTimeout(() => {
            setLuckResult(res.data.data);
            setIsLoading(false); // 로딩 상태 종료
          }, 3000); // 3초 대기
        })
        .catch((res) => {
          setIsLoading(false); // 에러 발생 시에도 로딩 상태 종료
        });
    }
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

  useEffect(() => {
    // 컴포넌트가 마운트 될 때 랜덤 이미지 인덱스 설정
    setImgIndex(Math.floor(Math.random() * images.length));
  }, []);

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

  const absoluteImagePath = (imageName) => {
    return `${window.location.origin}/image/${imageName}`;
  };

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
        {isLoading ? ( // 로딩 상태 표시
          <>
            <p id="luck-ready">
              운세를 찾고 있어요. <br /> 잠시만 기다려주세요.🐶
            </p>

            <LoadBear />
          </>
        ) : (
          <>
            {Object.keys(luckResult).length === 0 ? (
              <>
                <p id="compatibility-ready">
                  오늘은 또 무슨 일이 기다리고 있을까?
                </p>
                <br />
                <br />
                <Luck />
              </>
            ) : (
              <>
                <h3 className="luck-title">
                  {name1} <span style={{ fontWeight: 400 }}>님과</span> {name2}
                  {""} <span style={{ fontWeight: 400 }}>님의 운세</span> 🍀
                </h3>

                <img
                  className="luck-img"
                  src={absoluteImagePath(images[imgIndex])}
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
                  <ShareKakao
                    title="오늘의 운세"
                    description={luckResult.luck}
                    imageUrl={absoluteImagePath(images[imgIndex])}
                    link="https://www.petname.site"
                    buttonText="멍냥이 보러 가기"
                  />
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default NameLuck;
