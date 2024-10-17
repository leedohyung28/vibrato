import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// 리뷰에 대한 전체 코멘트 불러오기
export const getComments = async (reviewID: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/review/${reviewID}/comments`
    );
    console.log("리뷰에 대한 전체 댓글 가져오기 성공");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("리뷰에 대한 전체 댓글을 가져오는 데 실패했습니다.");
    throw error;
  }
};
