import { ReviewResponse, reviewDummyData } from "../../apis/mockData";
import { useEffect, useState } from "react";
import spotifyLogo from "../../assets/spotify.png";

const PopularCommentSection = () => {
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [likedReviews, setLikedReviews] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [commentInputs, setCommentInputs] = useState<{ [key: number]: string }>(
    {}
  );
  useEffect(() => {
    const fetchReviews = () => {
      setReviews(reviewDummyData);
      const initialLikedState = reviewDummyData.reduce((acc, review) => {
        acc[review.review_id] = false;
        return acc;
      }, {} as { [key: number]: boolean });
      setLikedReviews(initialLikedState);
    };

    fetchReviews();
  }, []);

  const toggleLike = (reviewId: number) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.review_id === reviewId
          ? {
              ...review,
              liked: likedReviews[reviewId]
                ? review.liked - 1
                : review.liked + 1, // 좋아요 개수 증감
            }
          : review
      )
    );
    setLikedReviews((prevState) => ({
      ...prevState,
      [reviewId]: !prevState[reviewId], // 좋아요 상태 토글
    }));
  };

  const toggleComments = (reviewId: number) => {
    setExpandedComments((prevState) =>
      prevState.includes(reviewId)
        ? prevState.filter((id) => id !== reviewId)
        : [...prevState, reviewId]
    );
  }; // 댓글창 토글

  const handleCommentChange = (reviewId: number, comment: string) => {
    setCommentInputs((prevState) => ({
      ...prevState,
      [reviewId]: comment,
    }));
  };

  const addComment = (reviewId: number) => {
    const newComment = commentInputs[reviewId];
    if (!newComment.trim()) return; // 빈 댓글은 추가하지 않음

    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.review_id === reviewId
          ? {
              ...review,
              comments: [...review.comments, newComment],
            }
          : review
      )
    );
    setCommentInputs((prevState) => ({
      ...prevState,
      [reviewId]: "", // 입력창 비우기
    }));
  };

  return (
    <section className="col-span-8 p-4 bg-white">
      <a href="comment" className="text-xl font-bold">
        최근 인기 코멘트 ＞
      </a>

      <div className="space-y-4 my-4">
        {" "}
        {/* 리뷰 박스 사이에 여백 추가 */}
        {/* 리뷰 데이터를 기반으로 UI 렌더링 */}
        {reviews.map((review) => (
          <div
            key={review.review_id}
            className="bg-white shadow-xl p-4 rounded-md border border-gray-200"
          >
            {" "}
            {/* 개별 박스 */}
            <div className="flex mb-4">
              <img
                src="https://picsum.photos/200"
                className="w-40 h-40 object-contain rounded flex-shrink-0"
                alt="앨범 커버"
              />
              {/* 앨범 커버 */}
              <div className="ml-4 flex-grow flex flex-col justify-between py-4">
                <span className="text-yellow text-5xl">
                  {"★".repeat(Math.floor(review.rated))} {/* 별점 */}
                </span>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="w-10 h-10 rounded-full bg-coral"></span>
                    {/* 작성자 프로필 이미지 */}
                    <h3 className="font-bold text-lg ml-2">
                      {review.user_uid}
                    </h3>
                    {/* 작성자 닉네임 (임시로 user_uid 사용) */}
                  </div>
                  <span className="text-sm text-gray_dark mr-2">
                    {new Date(review.created_at).toLocaleString()}{" "}
                    {/* 작성 시간 */}
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-4 flex">
              <div className="flex flex-col w-40">
                <h4 className="font-bold text-lg truncate">앨범 제목</h4>
                <p className="text-sm text-gray_dark truncate">아티스트 이름</p>
                <p className="text-sm text-gray_dark">앨범 발매일</p>
                <p className="text-sm text-gray-500">★ {review.rated} / 5.0</p>
                <div className="mt-4 flex space-x-4">
                  <a href="https://www.spotify.com" target="_blank">
                    <img
                      src={spotifyLogo}
                      alt="스포티파이 로고"
                      className="w-8 h-8 rounded-full"
                    ></img>
                  </a>
                </div>
              </div>
              {/*앨범 정보*/}
              <div className="ml-4 flex-grow">
                <h2 className="font-bold text-lg mb-2 ml-2">{review.title}</h2>
                <p className="text-sm text-gray_dark ml-2">{review.contents}</p>
              </div>
            </div>
            {/*코멘트*/}
            <div className="mt-4 flex">
              <div className="flex items-center mr-8">
                <button
                  className={`text-lg font-bold ${
                    likedReviews[review.review_id]
                      ? "text-coral"
                      : "text-gray_dark"
                  }`}
                  onClick={() => toggleLike(review.review_id)}
                >
                  좋아요 👍 {review.liked}
                </button>
              </div>
              <div className="flex items-center">
                <button
                  className="text-lg font-bold text-gray_dark"
                  onClick={() => toggleComments(review.review_id)}
                >
                  코멘트 💬 {review.comments.length}
                </button>
              </div>
            </div>
            {expandedComments.includes(review.review_id) && (
              <div className="mt-4 p-4 bg-gray_light rounded-md">
                {review.comments.length > 0 ? (
                  review.comments.map((comment, index) => (
                    <div className="flex">
                      <h2 className="text-sm px-2 w-40 truncate">
                        작성자 닉네임
                      </h2>
                      <p
                        key={index}
                        className="text-sm px-2 text-gray_dark flex-grow"
                      >
                        {comment}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm px-4 text-gray_dark">
                    코멘트가 없습니다.
                  </p>
                )}

                {/* 코멘트 입력창 */}
                <div className="flex mt-4">
                  <input
                    type="text"
                    value={commentInputs[review.review_id] || ""}
                    onChange={(e) =>
                      handleCommentChange(review.review_id, e.target.value)
                    }
                    className="mt-2 px-4 py-2 mr-2 flex-grow text-sm rounded-md"
                    placeholder="코멘트를 입력하세요"
                  />
                  <button
                    onClick={() => addComment(review.review_id)}
                    className="mt-2 px-4 py-2 bg-coral text-white rounded-md text-sm"
                  >
                    코멘트 추가
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
export default PopularCommentSection;
