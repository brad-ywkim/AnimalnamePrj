import axios from "axios";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import LoadData from "../component/LoadData";

const Main = () => {
  const backServer = process.env.REACT_APP_BACK_SERVER;

  const [milestone, setMilestone] = useState(null);

  useEffect(() => {
    axios
      .get(backServer + "/animalname/milestone")
      .then((res) => {
        setMilestone(res.data.data);
        // console.log(res.data.data);
      })
      .catch((res) => {});
  }, []);

  return (
    <>
      <div className="main-wrap">
        <h3 style={{ fontWeight: 400 }}>대한민국 동물이름 검색 툴, 멍냥이름</h3>

        <p>
          멍냥이름은 대한민국 1,500만 반려인구 시대를 맞이하여 탄생한 쉽고
          강력한 동물이름 검색 툴입니다. 서울특별시 마포구, 송파구, 동대문구,
          양천구에서 2019년, 2021년, 2024년에 작성하여 개방한 데이터를 기반으로
          합니다.
        </p>

        <div className="terminal-loader">
          <div className="terminal-header">
            <div className="terminal-title">동물이름</div>
            <div className="terminal-controls">
              <div className="control close"></div>
              <div className="control minimize"></div>
              <div className="control maximize"></div>
            </div>
          </div>
          <div className="content">
            <div className="text">
              대한민국 동물이름 검색 서비스, 동물이름🐶
            </div>
          </div>
        </div>

        <br />

        <h3 style={{ fontWeight: 400 }}>마일스톤</h3>
        {milestone ? (
          <>
            <div className="milestone-container">
              <div className="milestone-item">
                <h4>
                  <CountUp end={milestone.operatingPeriod} duration={2.5} />
                </h4>
                <p>운영일수</p>
              </div>
              <div className="milestone-item">
                <h4>
                  {" "}
                  <CountUp
                    end={milestone.totalSearchNameCount}
                    duration={2.5}
                  />
                </h4>
                <p>누적 검색 수</p>
              </div>
              <div className="milestone-item">
                <h4>
                  <CountUp
                    end={milestone.totalSearchCompatibilityCount}
                    duration={2.5}
                  />
                </h4>
                <p>누적 궁합 수</p>
              </div>
            </div>
            <p>
              2024년 6월 탄생한 동물이름은 현재까지 {milestone.operatingPeriod}
              일 간의 업력과 {milestone.totalSearchNameCount}건의 누적 검색량,{" "}
              {milestone.totalSearchCompatibilityCount}건의 누적 궁합수를
              기록하고 있습니다. 동물이름의 🐾 을 응원해주세요.{" "}
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}

        <br />
        <br />

        {/* <h3 style={{ fontWeight: 400 }}>데이터 현황</h3>

        <p>
          동물이름은 서울특별시 마포구, 송파구, 동대문구, 양천구에서 2019년,
          2021년, 2024년에 작성하여 개방한 데이터를 기반으로 합니다. 여기에는
          서울특별시 마포구 반려동물 이름 현황, 양천구 동물이름등록현황, 송파구
          동물이름현황, 동대문구 등록동물이름현황이 포함됩니다.
        </p>
        <br />
        <br /> */}

        <h3 style={{ fontWeight: 400 }}>이용문의</h3>

        <p>
          오늘도 {""}
          동물이름과 함께해 주셔서 감사합니다. 서비스 관련 문의는 하단의 메일로
          부탁드립니다. 😊
        </p>
      </div>
      <LoadData />
    </>
  );
};

export default Main;
