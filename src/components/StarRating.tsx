import React, { useState } from "react";

interface StarRatingProps {
  initialRating: number;
  onRate: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ initialRating, onRate }) => {
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleClick = (rating: number) => {
    onRate(rating);
  };

  const handleMouseEnter = (rating: number) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(null);
  };

  return (
    <div className="flex space-x-1">
      {/* 5개의 별을 0.5 단위로 표시 */}
      {[1, 2, 3, 4, 5].map((star) => (
        <div key={star} className="relative">
          <button
            onClick={() => handleClick(star - 0.5)}
            onMouseEnter={() => handleMouseEnter(star - 0.5)}
            onMouseLeave={handleMouseLeave}
            className={`absolute left-0 w-1/2 h-full text-3xl ${
              hoverRating !== null
                ? hoverRating >= star - 0.5
                  ? "text-yellow-500"
                  : "text-gray-400"
                : initialRating >= star - 0.5
                ? "text-yellow-500"
                : "text-gray-400"
            }`}
          >
            ★
          </button>
          <button
            onClick={() => handleClick(star)}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
            className={`relative text-3xl ${
              hoverRating !== null
                ? hoverRating >= star
                  ? "text-yellow-500"
                  : "text-gray-400"
                : initialRating >= star
                ? "text-yellow-500"
                : "text-gray-400"
            }`}
          >
            ★
          </button>
        </div>
      ))}
    </div>
  );
};

export default StarRating;
