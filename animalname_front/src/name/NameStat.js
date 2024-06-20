import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import "../name/name.css";
import Fingerprint from "@mui/icons-material/Fingerprint";
import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../common/Pagination";
import Swal from "sweetalert2";

const NameStat = () => {
  const [nameData, setNameData] = useState([]);
  const [pageInfo, setPageInfo] = useState({});
  const [reqPage, setReqPage] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [clickCount, setClickCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const images = [
    "../image/dog1.webp",
    "../image/dog2.webp",
    "../image/dog3.webp",
    "../image/dog4.webp",
    "../image/dog5.webp",
    "../image/dog6.webp",
    "../image/dog7.webp",
    "../image/dog8.webp",
    "../image/dog9.webp",
    "../image/dog10.webp",
    "../image/dog11.webp",
    "../image/dog12.webp",
    "../image/dog13.webp",
    "../image/dog14.webp",
    "../image/dog15.webp",
    "../image/dog16.webp",
    "../image/dog17.webp",
    "../image/dog18.webp",
    "../image/dog19.webp",
    "../image/dog20.webp",
    "../image/dog21.webp",
    "../image/dog22.webp",
    "../image/dog23.webp",
    "../image/dog24.webp",
    "../image/dog25.png",
    "../image/dog26.png",
    "../image/dog27.png",
    "../image/dog28.png",
    "../image/dog29.png",
  ];

  // 랜덤 이미지를 선택하는 함수
  function getRandomImage() {
    return images[Math.floor(Math.random() * images.length)];
  }

  const fetchData = (searchName, reqPage) => {
    const queryName = searchName.trim() === "" ? "a_l_l" : searchName;
    axios
      .get(backServer + "/animalname/" + reqPage + "/" + queryName)
      .then((res) => {
        const dataWithImages = res.data.data.nameList.map((item) => ({
          ...item,
          image: getRandomImage(),
        }));
        setNameData(dataWithImages);
        setPageInfo(res.data.data.pi);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData(searchName, reqPage);
  }, [reqPage]);

  const handleChange = (event) => {
    setSearchName(event.target.value);
  };

  const handleSearchClick = (event) => {
    event.preventDefault(); // 기본 폼 제출 동작을 막음
    if (clickCount >= 20) {
      Swal.fire({
        title: "서비스 이용 지연 안내",
        text: "서비스 이용 감사드립니다. 현재 많은 이용 요청으로 잠시 지연되고 있습니다. 30초 후 다시 이용해주세요.",
        icon: "info",
        footer:
          '<a href="/name-compatibility">기다리는 동안 이름 궁합 테스트를 진행해보세요!</a>',
      });
      setIsDisabled(true);
      setTimeout(() => {
        setIsDisabled(false);
        setClickCount(0);
      }, 30000);
    } else {
      setClickCount(clickCount + 1);
      setReqPage(1); // 검색 버튼 클릭 시 페이지를 1로 초기화
      fetchData(searchName, 1);
    }
  };

  console.log("카운트:", clickCount);
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick(event);
    }
  };
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [reqPage]);

  return (
    <>
      <div className="name-stat-title">
        <p>멍냥이들의 이름 순위를 확인해보세요.</p>
      </div>
      <div className="name-stat-wrap">
        <Paper
          component="form"
          sx={{
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
          onSubmit={handleSearchClick} // 폼 제출 막기
          id="namestat-form"
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="멍냥이 이름을 검색해보세요. 🍀"
            inputProps={{ "aria-label": "멍냥이 이름을 검색해보세요." }}
            id="search-name-place-holder"
            value={searchName}
            onChange={handleChange}
            onKeyDown={handleKeyDown} // Enter 키 이벤트 핸들러 추가
          />

          <IconButton
            color="primary"
            sx={{ p: "10px" }}
            aria-label="fingerprint"
            onClick={handleSearchClick}
          >
            <Fingerprint />
          </IconButton>
        </Paper>
      </div>
      <div></div>
      <div className="name-tbl-wrap">
        <table>
          <thead>
            <tr>
              <th>순위</th>
              <th>이름</th>
              <th>동물 수</th>
            </tr>
          </thead>
          <tbody>
            {nameData.map((item) => (
              <tr key={"item" + item.nameNo}>
                <td>{item.nameNo.toLocaleString()}</td>
                <td className="name-png">
                  <img src={item.image} alt="dog" />
                  {item.name}
                </td>
                <td>{item.nameCount.toLocaleString()}</td>
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
    </>
  );
};

export default NameStat;
