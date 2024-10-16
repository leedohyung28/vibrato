import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getComments } from "../../apis/comment";

interface CommentList {
    reviews: Comment[];
}
  
interface Comment {
    comment_id: number;
    user_uid: string;
    contents: string;
    created_at: string;
    updated_at: string;
    likes: Like[];
}

interface Like {
    user_uid: string;
    liked_at: string;
}

const Comments = () => {
//   const [review, setReview] = useState<?? | null>(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<CommentList | null>(null);

  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태
  
  const { reviewID } = useParams();
  console.log("review_id: ", reviewID);
  
  useEffect(() => {
      const fetchComments = async () => {
          if (reviewID) {
          try {
              console.log(reviewID);
              const commentsData = await getComments(reviewID);
              setComments(commentsData);
          } catch (error) {
              console.error("Error fetching reviews data info:", error);
          } finally {
              setLoading(false); // 로딩 완료
          }
          }
      };
  
      fetchComments();
      }, []);
  
      if (loading) {
      return <div>Loading...</div>; // 데이터 로딩 중일 때 UI
      }

  const handleLikeReview = () => {
    setReview((prevReview) => ({
      ...prevReview,
      likes: prevReview.likes + 1,
    }));
  };

  const handleLikeComment = (commentId: number) => {
    setComments((prevComments) =>
        prevComments.map((comment) =>
            comment.comment_id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      )
    );
  };

  const handleAddComment = () => {
    if (newComment.trim() === "") return;

    const newCommentData = {
      id: comments.length + 1,
      username: "새로운 유저",
      content: newComment,
      likes: 0,
      timeAgo: "방금 전",
    };

    setComments([newCommentData, ...comments]);
    setNewComment("");
  };

  return (
    <div className="p-4">
      {/* 코멘트 상세 페이지 */}
      {/* <div className="border p-4 rounded-lg mb-4">
        <div className="flex items-start">
          <img
            src={review.profileImage}
            alt={review.artistName}
            className="w-20 h-20 mr-4"
          />

          <div className="flex flex-col w-full">
            <div className="flex justify-between">
              <p className="text-xl font-bold">{review.artistName}</p>
              <p className="text-gray-500">{review.timeAgo}</p>
            </div>

            <div className="flex items-center mb-2">
              <span className="text-yellow-500 mr-2">★ {review.rating}</span>
            </div>

            <p>{review.commentContent}</p>

            <div className="flex items-center mt-4">
              <button
                className="text-blue-500 flex items-center"
                onClick={handleLikeReview}
              >
                👍 좋아요
                <span className="ml-2">{review.likes}</span>
              </button>
              <span className="ml-4 text-blue-500 flex items-center">
                💬 댓글
                <span className="ml-2">{review.repliesCount}</span>
              </span>
            </div>
          </div>
        </div>
      </div> */}

      {/* 댓글 리스트 */}
      {comments ? (
        comments.map((comment) => (
            <div key={comment.comment_id} className="border p-4 rounded-lg mb-4">
              <div className="flex justify-between">
                <p className="font-bold">{comment.user_uid}</p>
                <p className="text-gray-500">{comment.created_at + "  ~~전 으로 바꾸기"}</p>
              </div>
              <p>{comment.contents}</p>
              <div className="flex items-center mt-2">
                <button
                  className="text-blue-500 flex items-center"
                  onClick={() => handleLikeComment(comment.comment_id)}
                >
                  👍 좋아요
                  <span className="ml-2">{comment.likes.length}</span>
                </button>
              </div>
            </div>
          ))
      ) : (
        <div>리뷰가 없습니다</div> // 리뷰가 없을 때 렌더링
      )}

        {/* 댓글 작성 섹션 */}
        <div className="mt-4">
            <textarea
                className="border p-2 w-full rounded mb-2"
                placeholder="댓글을 작성하세요..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
            />
            <button
                className="bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleAddComment}
            >
                댓글 달기
            </button>
        </div>
    </div>
  );
};

export default Comments;
