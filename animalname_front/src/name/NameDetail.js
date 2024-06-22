import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import CountUp from "react-countup";
import Swal from "sweetalert2";
import { Input2 } from "../component/FormFrm";

const NameDetail = () => {
  const params = useParams();
  const location = useLocation();

  const [nameData, setNameData] = useState({
    totalSearchNameCount: 0,
    totalSearchCompatibilityCount: 0,
  });

  const backServer = process.env.REACT_APP_BACK_SERVER;
  const nameNo = parseInt(params.nameNo, 10);

  const navigate = useNavigate();
  const [messageContent, setMessageContent] = useState("");
  const [refreshMessages, setRefreshMessages] = useState(false);
  const [messages, setMessages] = useState([]);
  const [moveCount, setMoveCount] = useState(0);
  const KAKAOTALK_SHART = process.env.KAKAOTALK_SHART;
  useEffect(() => {
    // 로컬스토리지에서 moveCount와 timestamp 가져오기
    const storedMoveCount = parseInt(localStorage.getItem("moveCount")) || 0;
    const storedTimestamp =
      parseInt(localStorage.getItem("timestamp")) || Date.now();

    // 3초 (3000 밀리초) 이후 초기화
    if (Date.now() - storedTimestamp > 30000) {
      setMoveCount(0);
      localStorage.setItem("moveCount", 0);
      localStorage.setItem("timestamp", Date.now());
    } else {
      setMoveCount(storedMoveCount);
    }

    console.log("현재 moveCount:", moveCount);
    console.log("현재 timestamp:", storedTimestamp);

    axios
      .get(backServer + "/animalname/animal-detail/" + nameNo)
      .then((res) => {
        setNameData(res.data.data);
        console.log(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching dog info:", error);
      });
  }, [backServer, nameNo]);

  const handleClick = () => {
    navigate("/name-stat");
  };

  useEffect(() => {
    axios
      .get(backServer + "/animalname/message/" + nameNo)
      .then((res) => {
        setRefreshMessages(false);
        setMessages(res.data.data);
      })
      .catch((res) => {});
  }, [refreshMessages, backServer, nameNo]);

  const randomMove = () => {
    const storedTimestamp =
      parseInt(localStorage.getItem("timestamp")) || Date.now();

    // 3초 (3000 밀리초) 이후 초기화
    if (Date.now() - storedTimestamp > 30000) {
      setMoveCount(0);
      localStorage.setItem("moveCount", 0);
      localStorage.setItem("timestamp", Date.now());
    }

    const maxNameNo = 15047;
    const randomNameNo = Math.floor(Math.random() * maxNameNo) + 1;

    if (moveCount < 10) {
      const newMoveCount = moveCount + 1;
      setMoveCount(newMoveCount);
      localStorage.setItem("moveCount", newMoveCount);
      navigate(`/name-detail/${randomNameNo}`);
    } else {
      Swal.fire({
        title: "순간이동 횟수 초과",
        text: "순간이동은 20번까지 가능합니다. 30초 후 다시 시도해 주세요.",
        icon: "info",
        confirmButtonText: "확인",
        customClass: {
          popup: "swal-popup-custom",
          title: "swal-title-custom",
          content: "swal-content-custom",
        },
        width: "300px", // 원하는 너비로 수정
      });
    }
  };
  console.log("웹이미지 : " + window.location.origin);
  const shareKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init(KAKAOTALK_SHART);
      }

      kakao.Link.sendDefault({
        objectType: "feed",
        content: {
          title: "제목입니다",
          description: "설명란입니다",
          imageUrl: "/image/dog26.png", // 이미지 경로 설정

          link: {
            mobileWebUrl: "https://www.naver.com",
            webUrl: "https://www.google.com",
          },
        },
        buttons: [
          {
            title: "자세히 보러 가기",
            link: {
              mobileWebUrl: "https://www.naver.com",
              webUrl: "https://www.google.com",
            },
          },
        ],
      });
    }
  };
  return (
    <>
      <div className="detail-btn-wrap">
        <div
          className="move-random-animal styled-button random"
          onClick={handleClick}
        >
          돌아가기
        </div>

        <div className="detail-another-animal-btn">
          <div
            className="move-random-animal styled-button random"
            onClick={randomMove}
          >
            순간이동
          </div>
        </div>
      </div>
      <div className="name-detail-wrap">
        <div className="profile-container">
          <div className="profile-image">
            <img
              src={process.env.PUBLIC_URL + "/" + nameData.nameImage}
              alt="dog"
            />
          </div>
          <div className="profile-details">
            <h5 className="animal-detail-title">{nameData.name}</h5>
            <div className="milestone-container" id="milestone-detail">
              <div className="milestone-item">
                <h4>
                  {params.nameNo === "1" ? (
                    <span role="img" aria-label="gold medal">
                      🥇
                    </span>
                  ) : params.nameNo === "2" ? (
                    <span role="img" aria-label="silver medal">
                      🥈
                    </span>
                  ) : params.nameNo === "3" ? (
                    <span role="img" aria-label="bronze medal">
                      🥉
                    </span>
                  ) : (
                    <CountUp end={params.nameNo} duration={2.5} />
                  )}
                </h4>
                <p>이름 순위</p>
              </div>
              <div className="milestone-item">
                <h4>
                  <CountUp end={nameData.nameCount} duration={2.5} />
                </h4>
                <p>동물 수</p>
              </div>
              <div className="milestone-item">
                <h4>
                  <CountUp
                    end={nameData.totalSearchNameCount || 0}
                    duration={2.5}
                  />
                </h4>
                <p>누적 검색량</p>
              </div>
              <div className="milestone-item">
                <h4>
                  <CountUp
                    end={nameData.totalSearchCompatibilityCount || 0}
                    duration={2.5}
                  />
                </h4>
                <p>누적 궁합수</p>
              </div>
            </div>
          </div>
          <div className="profile-details-comment">
            <p>
              총{" "}
              <span style={{ color: "white" }}>{nameData.nameCount} 마리</span>
              의 동물이 사용중인 이름이에요.
              <br />
              이름 순위{" "}
              <span style={{ color: "white" }}>
                {nameNo.toLocaleString()}위
              </span>
              {""}를 기록했어요. <br />
              {nameData.totalSearchNameCount === 0 ? (
                <>아직 검색 이력이 없는 이름이에요.🥹 </>
              ) : (
                <>
                  총{" "}
                  <span style={{ color: "white" }}>
                    {nameData.totalSearchNameCount}명
                  </span>
                  의 사람이 이름을 검색했어요.
                </>
              )}
              <br />
              {nameData.totalSearchCompatibilityCount === 0 ? (
                <>아직 궁합을 본 적이 없는 이름이에요.🥹</>
              ) : (
                <>
                  총{" "}
                  <span style={{ color: "white" }}>
                    {nameData.totalSearchCompatibilityCount.toLocaleString()}명
                  </span>
                  의 사람과 궁합을 보았어요.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
      <ChatComponent
        nameNo={nameNo}
        name={nameData.name}
        image={nameData.nameImage}
        messageContent={messageContent}
        setMessageContent={setMessageContent}
        setRefreshMessages={setRefreshMessages} // 상태 변경 함수를 ChatComponent에 전달
        messages={messages}
      />
    </>
  );
};

const ChatComponent = (props) => {
  const nameNo = props.nameNo;
  const name = props.name;
  const image = props.image;
  const messageContent = props.messageContent;
  const setMessageContent = props.setMessageContent;
  const setRefreshMessages = props.setRefreshMessages;
  const messages = props.messages;
  const backServer = process.env.REACT_APP_BACK_SERVER;
  const messagesEndRef = useRef(null);
  const messagesAreaRef = useRef(null);

  const scrollToBottom = () => {
    messagesAreaRef.current?.scrollTo({
      top: messagesAreaRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    Swal.fire({
      title: "메시지를 작성하시겠습니끼?",
      text: "메시지는 관리자 승인 후 노출됩니다. 더불어, 대화의 매너를 꼭 지켜주세요! 😊 ",
      showDenyButton: true,
      confirmButtonText: "넹",
      denyButtonText: `아니용`,
      customClass: {
        title: "swal2-title",
        popup: "swal2-popup",
      },
      width: "300px", // Adjust the width as needed
    }).then((result) => {
      if (result.isConfirmed) {
        const message = { nameNo, messageContent };
        console.log("메시지값", message); // 메시지가 제대로 설정되었는지 확인
        console.log("타입확인", typeof nameNo);
        axios
          .post(backServer + "/animalname/message", message)
          .then((res) => {
            console.log(res, "성공");
            setRefreshMessages(true); // 메시지 전송 후 데이터 리로드 트리거
            setMessageContent(""); // 메시지 전송 후 입력란 초기화
            scrollToBottom();
          })
          .catch((error) => {
            console.log(error, "실패");
          });
        Swal.fire({
          title: "🐶 ❣️",
          text: "메시지 고마워용",
          icon: "success",
          width: "300px", // Adjust the width of the final message modal
        });
      } else {
        Swal.fire({
          title: "🐶 🔙",
          text: "나중에 만나용",
          icon: "error",
          width: "300px", // Adjust the width of the final message modal
        });
      }
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setMessageContent(value);
  };

  return (
    <div className="container">
      <div>
        <div className="nav-bar" id="chat-nav-bar">
          <div className="chat-title">
            <img
              className="chat-img"
              src={process.env.PUBLIC_URL + "/" + image}
              alt="dog"
            />
            <span style={{ color: "white", fontSize: "15px" }}>
              {name}에게 한 마디❣️
            </span>
          </div>
        </div>
        <div className="messages-area" ref={messagesAreaRef}>
          {messages.length === 0 ? (
            <div>작성된 메시지가 없습니다.🥹</div>
          ) : (
            messages.map((message, index) => (
              <div key={index} className="message">
                <span className="message-content">
                  {message.messageContent}
                </span>
                <span className="message-date">{message.messageDate}</span>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="sender-area">
        <div className="input-place">
          <Input2
            placeholder={`${name}에게 인사를 건네 주세요. 🐶`}
            className="send-input"
            type="text"
            data={messageContent}
            setData={setMessageContent}
            changeEvent={handleChange}
          />
          <div
            className={`send ${!messageContent.trim() ? "disabled" : ""}`}
            onClick={messageContent.trim() ? sendMessage : null}
          >
            {" "}
            <svg
              className="send-icon"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style={{ enableBackground: "new 0 0 512 512" }}
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path
                    fill="#6B6C7B"
                    d="M481.508,210.336L68.414,38.926c-17.403-7.222-37.064-4.045-51.309,8.287C2.86,59.547-3.098,78.551,1.558,96.808 L38.327,241h180.026c8.284,0,15.001,6.716,15.001,15.001c0,8.284-6.716,15.001-15.001,15.001H38.327L1.558,415.193 c-4.656,18.258,1.301,37.262,15.547,49.595c14.274,12.357,33.937,15.495,51.31,8.287l413.094-171.409 C500.317,293.862,512,276.364,512,256.001C512,235.638,500.317,218.139,481.508,210.336z"
                  ></path>
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameDetail;
