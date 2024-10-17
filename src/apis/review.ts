import axios from "axios";
import { getToken } from "../store/authStore";

interface Review {
    rated: number;
    title: string;
    reviewContent: string;
    typeId: string | undefined;
  }

// 리뷰 리스트 가져오기
export const getReviews = async (typeId: string) => {
  try {
    const response = await axios.get(`/reviews/${typeId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("리뷰 목록을 가져오는 데 실패했습니다.");
    throw error;
  }
};

// 리뷰 작성
export const postReview = async ({rated, title, reviewContent, typeId}: Review) => {
    try {
      const token = getToken();
      const response = await axios.post(
        `/reviews`,
        { 
            "rated" : rated,
            "title" : title,
            "contents" : reviewContent,
            "type_id" : typeId
        },
        {
          headers: {
            // Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("리뷰 작성에 실패했습니다.");
      throw error;
    }
  };
  

// 댓글 작성
export const postComment = async (reviewId: string, comment: string) => {
  try {
    const response = await axios.post(
      `/review/${reviewId}/comments`,
      { content: comment },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("댓글 작성에 실패했습니다.");
    throw error;
  }
};
