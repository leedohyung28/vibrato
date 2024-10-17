import axios from "axios";

// 리뷰에 대한 전체 코멘트 불러오기
export const getComments = async (reviewID: string) => {
  try {
    const response = await axios.get(
      `https://vibrato1.shop/review/${reviewID}/comments`
    );
    console.log("리뷰에 대한 전체 댓글 가져오기 성공");
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("리뷰에 대한 전체 댓글을 가져오는 데 실패했습니다.");
    throw error;
  }
};
