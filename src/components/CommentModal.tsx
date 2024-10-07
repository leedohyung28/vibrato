import React, { useState } from "react";
import { useAuthStore } from "../store/authStore";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => void;
}

const CommentModal: React.FC<CommentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [comment, setComment] = useState("");
  const { isLoggedIn } = useAuthStore();

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      {isLoggedIn ? (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">댓글 작성</h2>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 border rounded-lg mb-4"
            rows={4}
            placeholder="댓글을 입력하세요"
          />
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              className="bg-gray-800 text-white py-2 px-4 rounded"
            >
              작성
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-lg">
          로그인이 필요합니다.
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
            >
              돌아가기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentModal;
