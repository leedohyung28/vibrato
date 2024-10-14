import { useState } from "react";
import spotifyLogo from "../../assets/spotify.png";
import CommentModal from "../../components/CommentModal";
import Favorites from "../../components/Favorites";
import buttonReply from "../../assets/Reply.png";
import { StarRating } from "../../components/StarRating";

interface TrackContainerProps {
  name: string;
  image_url: string;
  artists: string;
  // release_date: string;
  spotify_url: string;
  album: string;
  duration: string;
  avg_rated: number;
  // genres: string;
}

const mockTrack = [
  {
    name: "노래 1",
    artist: "가수 1",
    album: "앨범 1",
    runningTime: "3:30",
    release_date: "2024.09.26",
    avg_rated: 5.0,
  },
];

const TrackContainer: React.FC<TrackContainerProps> = ({
  name,
  image_url,
  artists,
  album,
  // release_date,
  spotify_url,
  duration,
  avg_rated,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const [userRating, setUserRating] = useState<number>(0);
  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
    console.log(`User Rating: ${rating}`);
  };
  return (
    <>
      <section className="col-span-4">
        {/* 코멘트 모달 */}
        {isModalOpen && (
          <CommentModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onSubmit={(comment: string) => console.log(comment)}
          />
        )}
        {/* 1. 트랙 이미지 섹션 */}
        <img
          src={image_url}
          alt={mockTrack[0].album}
          className="w-full h-auto rounded-md border drop-shadow-md"
        />
      </section>
      <section className="col-span-8">
        {/* 2. 트랙 정보 및 상호작용 섹션 */}
        <div className="flex flex-col justify-between h-full w-full">
          <h1 className="ml-2 text-3xl font-bold">{name}</h1>
          <h1 className="ml-2 text-2xl font-bold text-gray_dark">
            {artists}
          </h1>
          <h1 className="ml-2 text-xl font-bold text-gray_dark">
            {album}
          </h1>
          <p className="ml-2 text-gray_dark text-xl">
            {duration}
          </p>
          <p className="ml-2 text-gray_dark text-xl">
            ★ {avg_rated} / 5.0 | 🗎 ratingCount
          </p>
          <a href={spotify_url} target="_blank">
            <img
              src={spotifyLogo}
              alt="스포티파이 로고"
              className="ml-2 w-12 h-12 rounded-full drop-shadow-md"
            />
          </a>
          <div className="flex space-x-4 items-center h-14">
            <span className="w-16 h-16">
              <Favorites />
            </span>
            <button onClick={handleOpenModal}>
              <img
                src={buttonReply}
                alt="코멘트 작성"
                className="w-16 h-16 object-contain drop-shadow-md"
              />
            </button>
            <StarRating
              initialRating={userRating}
              onRate={handleRatingChange}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default TrackContainer;
