import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface TypeId {
  typeID: string | undefined;
}

const CommentSection: React.FC<TypeId> = ({ typeID }: TypeId) => {
  // 하드 코딩된 데이터
  const comments = [
    {
      id: 1,
      user_nickname: "닉네임1",
      user_pic_url: "https://loremflickr.com/320/240?random=1",
      title: "코멘트 1",
      content: "앨범 좋음!",
      rated: 5,
      created_at: "10시간 전",
      likes: 12,
      replies: 3,
    },
    {
      id: 2,
      user_nickname: "닉네임2",
      user_pic_url: "https://loremflickr.com/320/240?random=2",
      title: "코멘트 2",
      content: "그냥 그럼",
      rated: 3,
      created_at: "2시간 전",
      likes: 5,
      replies: 1,
    },
    {
      id: 3,
      user_nickname: "닉네임3",
      user_pic_url: "https://loremflickr.com/320/240?random=3",
      title: "코멘트 3",
      content: "최고의 명작",
      rated: 5,
      created_at: "30분 전",
      likes: 2,
      replies: 0,
    },
  ];

  const navigate = useNavigate();
  // const handleMoreClick = (typeID: string) => {
  //   navigate(`/Review/${typeID}`);
  // };
  const handleMoreClick = () => {
    navigate(`/Review/${typeID}`);
  };

  // 각 댓글마다 좋아요 토글 상태와 댓글창 토글 상태 관리
  const [likedComments, setLikedComments] = useState<{
    [key: number]: boolean;
  }>({});
  const [expandedComments, setExpandedComments] = useState<{
    [key: number]: boolean;
  }>({});

  // 좋아요 토글
  const toggleLike = (id: number) => {
    setLikedComments((prevLikedComments) => ({
      ...prevLikedComments,
      [id]: !prevLikedComments[id],
    }));
  };

  // 댓글창 토글
  const toggleReplySection = (id: number) => {
    setExpandedComments((prevExpandedComments) => ({
      ...prevExpandedComments,
      [id]: !prevExpandedComments[id],
    }));
  };

  return (
    <section className="col-span-4">
      <div className="flex flex-col justify-between">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">코멘트</h2>
          <button
            className="text-gray_dark hover:text-coral"
            // onClick={() => handleMoreClick(typeID)}
            onClick={() => handleMoreClick()}
          >
            더보기
          </button>
        </div>
        {/* 코멘트 내용 */}
        {comments.map((replies) => {
          const isLiked = likedComments[replies.id] || false;
          const isExpanded = expandedComments[replies.id] || false;
          return (
            <div
              key={replies.id}
              className="border border-gray_border p-4 rounded-lg mt-4 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <span className="w-8 h-8 rounded-full bg-coral"></span>
                  <p className="text-lg font-bold">{replies.user_nickname}</p>
                </div>
                <p className="text-sm text-gray_dark font-bold mr-2">
                  {replies.title}
                </p>
              </div>
              <hr className="my-2 shadow" />
              <p className="mx-2 text-lg font-bold">{replies.title}</p>
              <p className="mx-2 text-gray_dark font-semibold">
                {replies.content}
              </p>
              <span className="m-2 font-bold">★ {replies.rated} / 5.0</span>
              <div className="mt-4 flex">
                {/* 좋아요 버튼 */}
                <div className="flex items-center mr-8 text-gray_dark truncate">
                  <button
                    className={`font-bold ${
                      isLiked ? "text-coral" : "text-gray_dark"
                    }`}
                    onClick={() => toggleLike(replies.id)}
                  >
                    좋아요 👍︎
                    {isLiked ? replies.likes + 1 : replies.likes}
                  </button>
                </div>
                {/* 댓글 버튼 */}
                <div className="flex items-center">
                  <button
                    className="font-bold text-gray_dark"
                    onClick={() => toggleReplySection(replies.id)}
                  >
                    댓글 🗨️ {replies.replies}
                  </button>
                </div>
              </div>
              {/* 댓글창 */}
              {isExpanded && (
                <div className="mt-4 bg-gray-100 p-4 rounded-md">
                  <p className="text-sm text-gray_dark">댓글이 없습니다.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default CommentSection;
