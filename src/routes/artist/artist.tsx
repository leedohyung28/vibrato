import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentModal from "../../components/CommentModal";
import StarRating from "../../components/StarRating"; // 별점 컴포넌트

interface Artist {
  id: string;
  name: string;
  image: string;
  rated: number;
  ratingCount: number;
}

// Mock Data
const mockComments = [
  {
    nickname: "닉네임",
    content: "코멘트 내용",
    time: "10시간 전",
    rating: 4.5,
  },
];

const popularSongs = [
  { title: "노래 제목", album: "수록 앨범 제목" },
  { title: "노래 제목", album: "수록 앨범 제목" },
  { title: "노래 제목", album: "수록 앨범 제목" },
];

const discography = [
  { title: "앨범 제목", releaseDate: "2024-01-01" },
  { title: "앨범 제목", releaseDate: "2024-01-01" },
  { title: "앨범 제목", releaseDate: "2024-01-01" },
];

const ArtistPage = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"인기 곡" | "디스코그래피">(
    "인기 곡"
  );
  const [userRating, setUserRating] = useState<number>(0);
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅

  useEffect(() => {
    // Mock artist data
    setArtist({
      id: artistId || "1",
      name: "아티스트 이름",
      image: "https://picsum.photos/300/300",
      rated: 4.5,
      ratingCount: 120, // 예시로 120명이 평점을 남긴 것
    });
  }, [artistId]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
    console.log(`User Rating: ${rating}`);
  };

  if (!artist) return <div>로딩 중...</div>;

  return (
    <div className="p-4 grid grid-cols-2 gap-8">
      {/* 1. 이미지 섹션 */}
      <div className="col-span-1">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full h-auto rounded-lg"
        />
      </div>

      {/* 2. 아티스트 정보 및 기능 섹션 */}
      <div className="col-span-1">
        <h1 className="text-3xl font-bold">{artist.name}</h1>
        <p className="text-gray-600 mt-2">
          별점: {artist.rated} / 5.0 ({artist.ratingCount}명)
        </p>

        <div className="flex space-x-4 mt-4">
          {/* 팔로우 버튼 */}
          <button className="bg-gray-800 text-white py-2 px-4 rounded">
            팔로우
          </button>

          {/* 댓글 작성 버튼 */}
          <button
            onClick={handleOpenModal}
            className="bg-gray-400 text-white py-2 px-4 rounded"
          >
            댓글 작성
          </button>
        </div>

        {/* 별점 매기기 */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold">평점 남기기</h2>
          <StarRating initialRating={userRating} onRate={handleRatingChange} />
        </div>
      </div>

      {/* 3. 코멘트 섹션 */}
      <div className="col-span-1">
        <div className="flex justify-between items-center">
          {/* 코멘트 섹션 제목과 더보기 버튼 */}
          <h2 className="text-2xl font-bold">코멘트</h2>
          <button
            className="text-blue-500"
            onClick={() => navigate(`/comments/${artistId}`)} // 아티스트 ID로 코멘트 페이지로 이동
          >
            더보기
          </button>
        </div>

        {/* 코멘트 내용 */}
        <div className="border p-4 rounded-lg mt-4">
          <p className="text-lg font-bold">{mockComments[0].nickname}</p>
          <p>{mockComments[0].content}</p>
          <p className="text-gray-600">{mockComments[0].time}</p>
          <div className="flex items-center mt-2">
            <span className="text-yellow-500 mr-2">
              ★ {mockComments[0].rating}
            </span>
            <button className="text-blue-500">좋아요</button>
            <button className="text-blue-500 ml-4">댓글 쓰기</button>
          </div>
        </div>
      </div>

      {/* 4. 인기곡 / 디스코그래피 섹션 */}
      <div className="col-span-1">
        <div className="flex space-x-4">
          <button
            className={`px-4 py-2 ${
              activeTab === "인기 곡" ? "bg-gray-300" : ""
            }`}
            onClick={() => setActiveTab("인기 곡")}
          >
            인기 곡
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "디스코그래피" ? "bg-gray-300" : ""
            }`}
            onClick={() => setActiveTab("디스코그래피")}
          >
            디스코그래피
          </button>
        </div>

        {activeTab === "인기 곡" ? (
          <div className="mt-4">
            {popularSongs.map((song, index) => (
              <div
                key={index}
                className="flex justify-between mb-2 p-2 border-b"
              >
                <p className="font-semibold">{song.title}</p>
                <p className="text-gray-600">{song.album}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-4">
            {discography.map((album, index) => (
              <div
                key={index}
                className="flex justify-between mb-2 p-2 border-b"
              >
                <p className="font-semibold">{album.title}</p>
                <p className="text-gray-600">{album.releaseDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 댓글 모달 */}
      <CommentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={(comment: string) => console.log(comment)}
      />
    </div>
  );
};

export default ArtistPage;
