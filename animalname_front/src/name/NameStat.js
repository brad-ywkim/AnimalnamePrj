import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
import Swal from "sweetalert2";
import Pagination from "../common/Pagination";
import "../name/name.css";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "../component/ScrollToTop.js";
import Tooltip from "@mui/material/Tooltip";

const NameStat = () => {
  const [nameData, setNameData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const socketServer = backServer
    .replace("http://", "wss://")
    .replace("https://", "wss://");

  const [ws, setWs] = useState(null);
  const [rankingData, setRankingData] = useState([]); // 빈 배열로 초기화

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const res = await axios.get(backServer + "/animalname/realtimeRank");
        setRankingData(res.data.data.rankingList);
      } catch (err) {
        // alert("현재 서비 점검 중 입니다. 잠시 후 다시 이용해 주세요.");
      }
    };

    fetchInitialData();

    const socket = new WebSocket(socketServer + "/realtime");
    socket.onopen = () => {
      socket.send("i'm client");
    };
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setRankingData(data.rankingList);
    };

    //소켓 종료
    socket.onclose = () => {};

    //소켓 에러
    socket.onerror = (error) => {};

    setWs(socket);
    return () => {
      //페이지 아웃
      socket.close();
    };
  }, [socketServer, backServer]);

  // ---------------------------------
  useEffect(() => {
    fetchData(searchName, reqPage);
  }, [reqPage]);

  const handleChange = (event) => {
    if (event.target.value.length <= 6) {
      setSearchName(event.target.value);
    }
  };

  // 한글 유효성 검사 함수
  const isCompleteHangul = (str) => {
    const hangulPattern = /^[가-힣\s]*$/;
    return hangulPattern.test(str);
  };

  // 키워드 검색
  const handleSearchClick = (event) => {
    event.preventDefault();
    if (!isCompleteHangul(searchName)) {
      Swal.fire({
        title: "입력 오류",
        text: "완성된 한글만 입력해주세요.",
        icon: "warning",
        confirmButtonText: "확인",
      });
      return;
    }

    if (clickCount >= 20) {
      Swal.fire({
        title: "서비스 이용 지연 안내",
        text: "서비스 이용 감사드립니다. 현재 많은 이용 요청으로 잠시 지연되고 있습니다. 30초 후 다시 이용해주세요.",
        icon: "info",
        footer:
          '<a href="/name-compatibility">기다리는 동안 이름 궁합 테스트를 진행해보세요!</a>',
        allowOutsideClick: false,
        allowEnterKey: false,
        customClass: {
          popup: "custom-swal-width-height",
        },
      });
      setIsDisabled(true);
      setTimeout(() => {
        setIsDisabled(false);
        setClickCount(0);
      }, 30000);
    } else {
      setClickCount(clickCount + 1);
      setReqPage(1);
      fetchData(searchName, 1);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick(event);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [reqPage]);

  const fetchData = (searchName, reqPage) => {
    const queryName = searchName.trim() === "" ? "a_l_l" : searchName;
    axios
      .get(backServer + "/animalname/" + reqPage + "/" + queryName)
      .then((res) => {
        setNameData(res.data.data.nameList);
        setPageInfo(res.data.data.pi);
      })
      .catch((err) => {});
  };

  // 동물상세
  const animalDetail = (nameNo) => {
    navigate("/name-detail/" + nameNo);
  };

  return (
    <>
      <div className="name-stat-title">
        <h2 className="sub-title">이름 순위</h2>
        <p>한국의 동물이름 순위를 확인해보세요.</p>
      </div>
      <div className="name-stat-wrap">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
          onSubmit={handleSearchClick}
          id="namestat-form"
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="이름을 검색해보세요."
            inputProps={{ "aria-label": "이름을 검색해보세요." }}
            id="search-name-place-holder"
            value={searchName}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />

          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="fingerprint"
            onClick={handleSearchClick}
            disabled={isDisabled}
          >
            <Fingerprint />
          </IconButton>
        </Paper>
      </div>
      <div className="realtime-rank">
        <div className="realtime-title">
          <Tooltip title="Add" arrow>
            <span className="realtime-keyword">실시간 인기 검색어🔥</span>
          </Tooltip>
        </div>
        <div className="realtime-keyword-wrap">
          <div className="realtime-keyword-container">
            {rankingData.map((item, index) => (
              <span className="realtime-keyword" key={index}>
                {index === 0
                  ? "🥇"
                  : index === 1
                  ? "🥈"
                  : index === 2
                  ? "🥉"
                  : index === 3
                  ? "4️⃣"
                  : "5️⃣"}
                {item.keyword}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="name-tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th className="tbl-name">이름</th>
              <th>합계</th>
            </tr>
          </thead>
          <tbody>
            {nameData.map((item) => (
              <tr key={"item" + item.nameNo}>
                <td className="nameRank">
                  {item.nameNo === 1
                    ? "🥇"
                    : item.nameNo === 2
                    ? "🥈"
                    : item.nameNo === 3
                    ? "🥉"
                    : item.nameNo}
                </td>
                <td
                  className={`name-png ${
                    item.name.length == 6
                      ? "name-six"
                      : item.name.length == 7
                      ? "name-seven"
                      : item.name.length >= 8
                      ? "name-eight"
                      : ""
                  }`}
                  onClick={() => animalDetail(item.nameNo)}
                >
                  <img
                    src={process.env.PUBLIC_URL + "/" + item.nameImage}
                    alt="dog"
                  />
                  {item.name}
                </td>
                <td className="nameCount">{item.nameCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="paging">
        <Pagination
          pageInfo={pageInfo}
          reqPage={reqPage}
          setReqPage={setReqPage}
        />
      </div>
      <ScrollToTop /> {/* ScrollToTop 컴포넌트 추가 */}
    </>
  );
};

export default NameStat;
