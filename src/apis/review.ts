import axios from "axios";

// 아티스트 상세 정보 가져오기
export const fetchArtistById = async (artistId: string) => {
  try {
    const response = await axios.get(`/artists/${artistId}`);
    return response.data;
  } catch (error) {
    console.error("아티스트 정보를 가져오는 데 실패했습니다.");
    throw error;
  }
};

// 리뷰 리스트 가져오기
export const fetchReviews = async (typeId: string) => {
  try {
    const response = await axios.get(`/reviews/${typeId}`);
    return response.data;
  } catch (error) {
    console.error("리뷰 목록을 가져오는 데 실패했습니다.");
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
