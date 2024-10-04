import React, { useState } from "react";
import favorites from "../assets/Favorites.png";
import unfavorites from "../assets/Unfavorites.png";

const Favorites: React.FC = () => {
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked); // 좋아요 상태를 토글
  };

  return (
    <button onClick={handleLikeClick}>
      <img
        src={isLiked ? favorites : unfavorites}
        alt={isLiked ? "좋아요 취소" : "좋아요"}
        className="object-cover w-16 h-16 drop-shadow-md"
      />
    </button>
  );
};

export default Favorites;
