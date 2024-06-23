import React, { useEffect } from "react";
import Swal from "sweetalert2";

const ShareKakao = ({ title, description, imageUrl, link, buttonText }) => {
  const KAKAOTALK_SHARE = process.env.REACT_APP_KAKAOTALK_SHARE;

  useEffect(() => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAOTALK_SHARE);
    }
  }, [KAKAOTALK_SHARE]);

  const shareToKakao = () => {
    if (window.Kakao) {
      const kakao = window.Kakao;
      try {
        kakao.Link.sendDefault({
          objectType: "feed",
          content: {
            title,
            description,
            imageUrl,
            link: {
              mobileWebUrl: link,
              webUrl: link,
            },
          },
          buttons: [
            {
              title: buttonText,
              link: {
                mobileWebUrl: link,
                webUrl: link,
              },
            },
          ],
        });
      } catch (error) {
        // console.error("Kakao Link sendDefault error:", error);
        Swal.fire({
          title: "공유 오류",
          text: "카카오톡 공유 중 오류가 발생했습니다.",
          icon: "error",
          customClass: {
            title: "swal2-title",
            popup: "swal2-popup",
          },
          width: "200px",
        });
      }
    }
  };

  return (
    <button onClick={shareToKakao} className="btn st2" id="kakao-share-btn">
      카카오톡 공유
    </button>
  );
};

export default ShareKakao;
