// import { getToken } from "../store/authStore";

export interface SignupRequest {
  // email: string;
  // password: string;
  profileImageId: number;
  nickname: string;
  idToken: string;
}

interface UserId {
  // uid: string;
  token: string;
}

export const signup = async ({
  // email,
  // password,
  profileImageId,
  nickname,
  idToken
}: SignupRequest) => {
  // const token = getToken();

  const response = await fetch("/auth/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Authorization: idToken ? idToken : "",
      Authorization: `Bearer ${idToken}`,
    },
    // body: JSON.stringify({ email, password, profileImageId, nickname }),
    body: JSON.stringify({ profileImageId, nickname }),
  });

  if (!response.ok) {
    console.log(`Error: ${response.status} - ${await response.text()}`);
    throw new Error("회원가입 api 연동 필요");
  }

  if (response.ok) {
    console.log("signup - email, pw, profileImageId, nickname 보내기 성공")
  }

  return await response.json();
};


export const getUserInfo = async ({
  token
}: UserId) => {
  // const token = getToken();
  console.log(token);

  const response = await fetch("/auth/login", {
    method: "GET",
    // headers: {
    //   "Content-Type": "application/json",
    //   Authorization: token ? token : "",
    // },
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // body: JSON.stringify({ uid }),
  });

if (!response.ok) {
  const errorData = await response.json();
  throw new Error(errorData.message || "회원정보 조회 실패"); 

  // 서버 연동 실패 시, 하드 코딩된 데이터 리턴
  return {
    nickname: "리액트",
    image_URL: "https://loremflickr.com/320/240?random=1"
  };

  throw new Error("로그인 api 연동 필요");
}

if (response.ok) {
  console.log("getUserInfo - 닉네임, 이미지 불러오기 성공")
  console.log(response)
}

return await response.json();
};