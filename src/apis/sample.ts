// if (!response.ok) {
//     if (response.status === 401) { // 로그인 만료 : 토큰 제거 및 로그인 페이지로 리다이렉트
//       removeToken();
//       window.location.href = "/login";
//       return;
//     }
  
//     // const errorData = await response.json();
//     // throw new Error(errorData.message || "회원정보 조회 실패"); 
  
//     // 서버 연동 실패 시, 하드 코딩된 데이터 리턴
//     return {
//       nickname: "리액트",
//       image_URL: "https://loremflickr.com/320/240?random=1" // 실제 이미지 URL로 수정 가능
//     };
  
//     throw new Error("로그인 api 연동 필요");
//   }