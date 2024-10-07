import React, { useState } from "react";
import favorites from "../assets/Favorites.png";
import unfavorites from "../assets/Unfavorites.png";
import { useAuthStore } from "../store/authStore";

interface FavoritesProps {
  isOpen: boolean;
  onClose: () => void;
}

const Favorites: React.FC<FavoritesProps> = ({ isOpen, onClose }) => {
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [showLoginAlert, setShowLoginAlert] = useState<boolean>(false); // 경고창 표시 상태
  const { isLoggedIn } = useAuthStore();

  const handleLikeClick = () => {
    if (isLoggedIn) {
      setIsLiked(!isLiked); // 좋아요 상태를 토글
    } else {
      setShowLoginAlert(true); // 로그인 경고창 표시
    }
  };

  return (
    <div>
      <button onClick={handleLikeClick}>
        <img
          src={isLiked ? favorites : unfavorites}
          alt={isLiked ? "좋아요 취소" : "좋아요"}
          className="object-cover w-16 h-16 drop-shadow-md"
        />
      </button>

      {!isLoggedIn && showLoginAlert && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p>로그인이 필요합니다.</p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowLoginAlert(false); // 경고창 닫기
                  onClose();
                }}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
              >
                돌아가기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Favorites;