import React, { useState } from "react";
import StarEmpty from "../assets/StarEmpty.png";
import StarHalf from "../assets/StarHalf.png";
import StarFull from "../assets/StarFull.png";

interface StarRatingProps {
  initialRating: number;
  onRate: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ initialRating, onRate }) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedRating, setSelectedRating] = useState<number>(initialRating); // 선택된 별점 저장

  const handleClick = (rating: number) => {
    setSelectedRating(rating); // 클릭 시 선택된 별점 고정
    onRate(rating);
  };

  const handleMouseEnter = (rating: number) => {
    setHoverRating(rating); // 마우스 오버 시 임시 별점 설정
  };

  const handleMouseLeave = () => {
    setHoverRating(null); // 마우스가 떠났을 때 hover 별점 초기화
  };

  // 별 이미지 결정 함수 (0.5 단위로 결정)
  const getStarImage = (star: number) => {
    const rating = hoverRating !== null ? hoverRating : selectedRating; // 선택된 별점 우선

    if (rating >= star) {
      return StarFull; // 완전 별 이미지
    } else if (rating >= star - 0.5) {
      return StarHalf; // 반 별 이미지
    } else {
      return StarEmpty; // 빈 별 이미지
    }
  };

  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star} className="relative w-16 drop-shadow-md ">
          {/* 반 별 클릭 영역 */}
          <button
            onClick={() => handleClick(star - 0.5)}
            onMouseEnter={() => handleMouseEnter(star - 0.5)}
            onMouseLeave={handleMouseLeave}
            className="absolute left-0 w-1/2 h-full"
          ></button>
          {/* 전체 별 클릭 영역 */}
          <button
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={getStarImage(star)}
              alt={`${star} star`}
              className="object-contain w-16"
            />
          </button>
        </div>
      ))}
    </div>
  );
};

const renderStars = (rating: number) => {
  return (
    <div className="w-full flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => {
        // 별의 소수점 비율을 계산
        const fillPercentage = Math.min(
          Math.max((rating - star + 1) * 100, 0),
          100
        );

        return (
          <div key={star} className="relative w-10 h-10">
            {/* 빈 별 */}
            <img
              src={StarEmpty}
              alt={`${star} star empty`}
              className="absolute top-0 left-0 w-full h-full drop-shadow-md"
            />

            {/* 노란 별 */}
            <div
              className="absolute top-0 left-0 h-full"
              style={{
                clipPath: `inset(0 ${100 - fillPercentage}% 0 0)`, // 노란 별을 비율에 따라 자름
                overflow: "hidden",
              }}
            >
              <img
                src={StarFull}
                alt={`${star} star full`}
                className="w-full h-full"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export { StarRating, renderStars };
