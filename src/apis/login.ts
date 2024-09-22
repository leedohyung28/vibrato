import { getToken } from "../store/authStore";

export interface SignupRequest {
  email: string;
  password: string;
  image_id: number;
  nickname: string;
}

interface UserId {
  uid: string;
}

export const signup = async ({
  email,
  password,
  image_id,
  nickname,
}: SignupRequest) => {
  const token = getToken();

  const response = await fetch("/auth/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? token : "",
    },
    body: JSON.stringify({ email, password, image_id, nickname }),
  });

  if (!response.ok) {
    throw new Error("회원가입 api 연동 필요");
  }

  if (response.ok) {
    console.log("signup - email, pw, image_id, nickname 보내기 성공")
  }

  return await response.json();
};


export const getUserInfo = async ({
  uid
}: UserId) => {
  const token = getToken();

  const response = await fetch("/auth/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? token : "",
    },
    body: JSON.stringify({ uid }),
  });

if (!response.ok) {
  // const errorData = await response.json();
  // throw new Error(errorData.message || "회원정보 조회 실패"); 

  // 서버 연동 실패 시, 하드 코딩된 데이터 리턴
  return {
    nickname: "리액트",
    image_URL: "https://loremflickr.com/320/240?random=1" // 실제 이미지 URL로 수정 가능
  };

  throw new Error("로그인 api 연동 필요");
}

if (response.ok) {
  console.log("getUserInfo - 닉네임, 이미지 불러오기 성공")
}

return await response.json();
};





// export const getUserInfo = async () => {
//     const response = await fetch("/auth/edit", {
//     // const response = await fetch("/auth/user", {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   if (!response.ok) {
//     const errorData = await response.json(); // 서버에서 반환된 오류 데이터
//     throw new Error(errorData.message || "회원정보 조회 실패"); 
//   }
  
//   if (response.ok) {
//     console.log("로그인 성공 - login.ts")
//   }

//   return await response.json();
// };