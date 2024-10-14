import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CommentModal from "../../components/CommentModal";
import { StarRating } from "../../components/StarRating"; // 별점 컴포넌트
import Favorites from "../../components/Favorites";
import buttonReply from "../../assets/Reply.png";
import spotifyLogo from "../../assets/spotify.png";
import LoadingSpinner from "../../components/LoadingSpinner";

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
    title: "코멘트 제목",
    content: "코멘트 내용",
    time: "10시간 전",
    rating: 4.5,
    liked: 0,
    replies: ["댓글 1", "댓글 2", "댓글 3", "댓글 4"],
  },
];

const popularSongs = [
  {
    cover: "https://picsum.photos/300/300",
    title: "노래 제목",
    album: "수록 앨범 제목",
    rating: 4.5,
    ratingCount: 10,
  },
  {
    cover: "https://picsum.photos/300/300",
    title: "노래 제목",
    album: "수록 앨범 제목",
    rating: 4.5,
    ratingCount: 10,
  },
  {
    cover: "https://picsum.photos/300/300",
    title: "노래 제목",
    album: "수록 앨범 제목",
    rating: 4.5,
    ratingCount: 10,
  },
];

const discography = [
  {
    cover: "https://picsum.photos/300/300",
    title: "앨범 제목",
    releaseDate: "2024-01-01",
    rating: 4.5,
    ratingCount: 10,
  },
  {
    cover: "https://picsum.photos/300/300",
    title: "앨범 제목",
    releaseDate: "2024-01-01",
    rating: 4.5,
    ratingCount: 10,
  },
  {
    cover: "https://picsum.photos/300/300",
    title: "앨범 제목",
    releaseDate: "2024-01-01",
    rating: 4.5,
    ratingCount: 10,
  },
];

const ArtistPage = () => {
  const { artistId } = useParams<{ artistId: string }>();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"인기곡" | "디스코그래피">(
    "인기곡"
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

  if (!artist) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <>
      {/* 3. 코멘트 모달 */}
      {isModalOpen && (
        <CommentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onSubmit={(comment: string) => console.log(comment)}
        />
      )}
      <div className="container mx-auto grid grid-cols-12 px-5 gap-10">
        <section className="col-span-4">
          {/* 1. 아티스트 이미지 섹션 */}
          <img
            src={artist.image}
            alt={artist.name}
            className="w-full h-auto rounded-md border drop-shadow-md"
          />
        </section>
        <section className="col-span-8">
          {/* 2. 아티스트 정보 및 상호작용 섹션 */}
          <div className="flex flex-col justify-between h-full w-full">
            <h1 className="ml-2 text-3xl font-bold">{artist.name}</h1>
            <p className="ml-2 text-gray_dark text-xl">
              ★ {artist.rated} / 5.0 | 🗎 {artist.ratingCount}
            </p>
            <a
              href="https://www.spotify.com"
              target="_blank"
              className="pointer-events-none"
            >
              <img
                src={spotifyLogo}
                alt="스포티파이 로고"
                className="ml-2 w-12 h-12 rounded-full drop-shadow-md pointer-events-auto"
              />
            </a>
            <div className="flex space-x-4 items-center">
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
        <section className="col-span-4">
          {/* 3. 코멘트 섹션 */}
          <div className="flex flex-col justify-between">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">코멘트</h2>
              <button
                className="text-gray_dark hover:text-coral"
                onClick={() => navigate(`/comments/${artistId}`)} // 아티스트 ID로 코멘트 페이지로 이동
              >
                더보기
              </button>
            </div>
            {/* 코멘트 내용 */}
            <div className="border border-gray_border p-4 rounded-lg mt-4 shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <span className="w-8 h-8 rounded-full bg-coral"></span>
                  <p className="text-lg font-bold">
                    {mockComments[0].nickname}
                  </p>
                </div>
                <p className="text-sm text-gray_dark font-bold mr-2">
                  {mockComments[0].time}
                </p>
              </div>
              <hr className="my-2 shadow" />
              <p className="mx-2 text-lg font-bold">{mockComments[0].title}</p>
              <p className="mx-2 text-gray_dark font-semibold">
                {mockComments[0].content}
              </p>
              <span className="m-2 font-bold">
                ★ {mockComments[0].rating} / 5.0
              </span>
              <div className="mt-4 flex">
                <div className="flex items-center mr-8 text-gray_dark">
                  <button className="font-bold">
                    좋아요 👍︎ {mockComments[0].liked}
                  </button>
                </div>
                <div className="flex items-center">
                  <button className="font-bold text-gray_dark">
                    댓글 🗨️ {mockComments[0].replies.length}
                  </button>
                  {/* 댓글 버튼 누르면 댓글창 토글되게 코드 추가 필요 */}
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="col-span-8">
          <div className="col-span-1">
            <div className="flex space-x-4">
              <button
                className={`text-xl font-bold ${
                  activeTab === "인기곡"
                    ? "underline decoration-coral decoration-4 underline-offset-8"
                    : ""
                }`}
                onClick={() => setActiveTab("인기곡")}
              >
                인기곡
              </button>
              <button
                className={`text-xl font-bold ${
                  activeTab === "디스코그래피"
                    ? "underline decoration-coral decoration-4 underline-offset-8"
                    : ""
                }`}
                onClick={() => setActiveTab("디스코그래피")}
              >
                디스코그래피
              </button>
            </div>

            {activeTab === "인기곡" ? (
              <div className="mt-4 rounded-md border border-gray_border shadow-md">
                {popularSongs.map((song, index) => (
                  <div
                    key={index}
                    className="flex justify-between border-b items-center"
                  >
                    <div className="flex flex-row items-center space-x-2">
                      <img
                        src={song.cover}
                        alt="Song Cover"
                        className="p-2 w-20 h-20 rounded"
                      />
                      <p className="text-lg font-bold">{song.title}</p>
                      <p className="text-sm font-semibold text-gray_dark">
                        {song.album}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-bold text-gray_dark">
                        ★ {mockComments[0].rating} / 5.0 | 🗎{" "}
                        {artist.ratingCount}
                      </span>
                      <span className="m-2 w-8 h-8">
                        <Favorites />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <div className="p-4 mt-4 text-xl font-bold">
                  앨범
                  <div className="mt-2 rounded-md border border-gray_border shadow-md">
                    {discography.map((album, index) => (
                      <div
                        key={index}
                        className="flex justify-between border-b items-center"
                      >
                        <div className="flex items-center space-x-2">
                          <img
                            src={album.cover}
                            alt="Song Cover"
                            className="p-2 w-20 h-20 rounded"
                          />
                          <p className="text-lg font-bold">{album.title}</p>
                          <p className="text-sm font-semibold text-gray_dark">
                            {album.releaseDate}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-bold text-gray_dark">
                            ★ {mockComments[0].rating} / 5.0 | 🗎{" "}
                            {artist.ratingCount}
                          </span>
                          <div className="mt-1 transform scale-50">
                            <Favorites />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-4 mt-4 text-xl font-bold">
                  싱글
                  <div className="mt-2 rounded-md border border-gray_border shadow-md">
                    {discography.map((album, index) => (
                      <div
                        key={index}
                        className="flex justify-between border-b items-center"
                      >
                        <div className="flex flex-row items-center space-x-2">
                          <img
                            src={album.cover}
                            alt="Song Cover"
                            className="p-2 w-20 h-20 rounded"
                          />
                          <p className="text-lg font-bold">{album.title}</p>
                          <p className="text-sm font-semibold text-gray_dark">
                            {album.releaseDate}
                          </p>
                        </div>
                        <div className="flex items-center">
                          <span className="text-sm font-bold text-gray_dark">
                            ★ {mockComments[0].rating} / 5.0 | 🗎{" "}
                            {artist.ratingCount}
                          </span>
                          <div className="mt-1 transform scale-50">
                            <Favorites />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
};

export default ArtistPage;