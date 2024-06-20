import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import "../name/name.css";
import "../component/formFrm.css";
import { useState } from "react";
import { Button1, Button2 } from "../component/FormFrm";
import axios from "axios";
import Swal from "sweetalert2";
import { RWebShare } from "react-web-share";

const NameCompatibility = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [compatibilityResult, setCompatibilityResult] = useState({});
  const [img, setImg] = useState("");
  const handleChange1 = (event) => {
    const input = event.target.value;
    const hangulCheck = /[^가-힣ㄱ-ㅎㅏ-ㅣ]/g;
    if (hangulCheck.test(input)) {
      Swal.fire({
        title: "입력 오류",
        text: "한글만 입력 가능합니다.",
        icon: "error",
      });
    } else {
      setName1(input);
      setCompatibilityResult({}); // 결과 초기화
    }
  };

  const handleChange2 = (event) => {
    const input = event.target.value;
    const hangulCheck = /[^가-힣ㄱ-ㅎㅏ-ㅣ]/g;
    if (hangulCheck.test(input)) {
      Swal.fire({
        title: "입력 오류",
        text: "한글만 입력 가능합니다.",
        icon: "error",
      });
    } else {
      setName2(input);
      setCompatibilityResult({}); // 결과 초기화
    }
  };

  const compa = () => {
    if (name1 === "" || name2 === "") {
      Swal.fire({
        title: "이름 입력 필수",
        text: "이름을 모두 입력해주세요.",
        icon: "error",
      });
    }
    axios
      .get(backServer + "/animalname/compatibility/" + name1 + "/" + name2)
      .then((res) => {
        console.log(res.data.data);
        setCompatibilityResult(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  };
  console.log("결과요", compatibilityResult);
  return (
    <div className="name-compatibility-wrap">
      <div className="name-compatibility-title">
        <p>멍냥이와의 궁합을 확인해보세요.</p>
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
            placeholder="이름 🍀"
            inputProps={{ "aria-label": "이름", maxLength: 6 }}
            id="search-name"
            value={name1}
            onChange={handleChange1}
          />
        </Paper>
        <span>🩷</span>
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
            placeholder="이름 🍀"
            inputProps={{ "aria-label": "이름", maxLength: 6 }}
            id="search-name"
            value={name2}
            onChange={handleChange2}
          />
        </Paper>
      </div>
      <div>
        <Button1
          text="궁합 검사"
          id="name-compatibility-btn"
          clickEvent={compa}
        />
      </div>
      <div className="name-compatibility-result">
        {" "}
        {Object.keys(compatibilityResult).length === 0 ? (
          <h3>궁합 검사 결과 🍀</h3>
        ) : (
          <>
            <h3>결과</h3>
            <img src="../image/result.png" />
            <p>
              <span style={{ fontWeight: 900 }}> {name1}</span>님과{" "}
              <span style={{ fontWeight: 900 }}> {name2}</span>님의 궁합점수는{" "}
              <span
                style={{ fontWeight: 900, color: "#ec4381", fontSize: "22px" }}
              >
                {compatibilityResult.compatibilityScore}
              </span>{" "}
              점!
            </p>
          </>
        )}
      </div>

      <p>{compatibilityResult.compatibilityResult}</p>
      <br />
      <br />
      <div>
        <RWebShare
          data={{
            text:
              "궁합점수는 " +
              `${compatibilityResult.compatibilityScore}` +
              "점입니다.",
            url: "https://www.animalname.co.kr",
            title: "한국 동물이름 순위",
          }}
          onClick={() => console.log("shared successfully!")}
        >
          <button className="btn st2">공유하기 🔗</button>
        </RWebShare>
      </div>
    </div>
  );
};

export default NameCompatibility;
