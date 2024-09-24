import { useState } from "react";
import { getUserInfo, signup } from "../apis/login";
import Modal from "./Modal";
import styled from "styled-components";
import { auth } from "../firebase"; // Firebase 초기화 파일
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useAuthStore } from "../store/authStore";

const Profile: React.FC = () => {

  const { isLoggedIn, nickname, profileImageUrl, storeLogin, storeLogout } = useAuthStore();

  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [nickname, setNickname] = useState<string>("");
  // const [profileImageUrl, setProfileImageUrl] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"login" | "signup" | "">("");

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [signupEmail, setSignupEmail] = useState<string>("");
  const [signupPassword, setSignupPassword] = useState<string>("");
  const [signupNickname, setSignupNickname] = useState<string>("");

  const handleError = (error: FirebaseError) => {
    switch (error.code) {
      case "auth/user-not-found":
        return "존재하지 않는 이메일입니다.";
      case "auth/wrong-password":
        return "비밀번호가 일치하지 않습니다.";
      case "auth/email-already-in-use":
        return "이미 사용 중인 이메일입니다.";
      case "auth/weak-password":
        return "비밀번호는 6글자 이상이어야 합니다.";
      case "auth/network-request-failed":
        return "네트워크 연결에 실패 하였습니다.";
      case "auth/invalid-email":
        return "잘못된 이메일 형식입니다.";
      case "auth/internal-error":
        return "잘못된 요청입니다.";
      case "auth/invalid-credential":
        return "이메일 혹은 비밀번호가 틀렸습니다.";
      default:
        return "로그인에 실패 하였습니다.";
    }  
  }; 

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      await signup({ email: signupEmail, password: signupPassword, image_id: 1, nickname: signupNickname });
      alert("회원가입 성공");
      closeModal(); // 모달 닫기
    } catch (error) {
      console.error("회원가입:", error);
      if (error instanceof FirebaseError) {
        alert("회원가입 실패: " + handleError(error));
      } else if (error == "Error: 회원가입 api 연동 필요") {
        alert("회원가입 실패: Firebase에 유저 추가 완료, 하지만 회원가입 api 연동 필요")
        closeModal(); // 모달 닫기
      } else {
        alert("회원가입 실패: 알 수 없는 오류가 발생했습니다." + error);
      }
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password); // 입력된 이메일과 비밀번호 사용
      const user = userCredential.user;
      const uid = user.uid;

      // 헤더에 표시될 닉네임, 이미지 받아오기
      const userInfo = await getUserInfo({ uid });
      // setNickname(userInfo.nickname);
      // setProfileImageUrl(userInfo.image_URL);

      console.log("Nickname:", userInfo.nickname);
      console.log("Image ID:", userInfo.image_URL);

      // 로컬 스토리지에 저장할 토큰 생성
      const token = await user.getIdToken();
      storeLogin(token, userInfo.nickname, userInfo.image_URL);

      alert("로그인 성공");
      // setIsLoggedIn(true);
      closeModal(); // 모달 닫기
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      if (error instanceof FirebaseError) {
        alert("회원 정보 조회 실패: " + handleError(error));
      } else if (error == "Error: 로그인 api 연동 필요") {
        alert("로그인 실패: Firebase를 통한 로그인 완료, 하지만 로그인 api 연동 필요")
      } else {
        alert("로그인 실패: 알 수 없는 오류가 발생했습니다." + error);
      }
    }
  };

  const handleLogout = () => {
    // setIsLoggedIn(false);
    storeLogout();
    // setNickname("");
    // setProfileImageUrl("");
  };

  const openModal = (type: "login" | "signup") => {
    setModalType(type);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setModalType("");
  };

  return (
    <div>
      {isLoggedIn ? (
        <div className="flex items-center space-x-2">
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-8 h-8 rounded-full bg-red-300"
          />
          <span className="text-gray-600">{nickname}님</span>
          <button onClick={handleLogout} className="text-gray-600">
            로그아웃
          </button>
        </div>
      ) : (
        <div className="flex space-x-4">
          <button onClick={() => openModal('login')} className="text-gray-600">
            로그인
          </button>
          <button onClick={() => openModal('signup')} className="text-gray-600">
            회원가입
          </button>
        </div>
      )}
      
      {showModal && (
        <Modal title={modalType === 'login' ? '로그인' : '회원가입'} onClose={closeModal}>
          {modalType === 'login' ? (
            <Form onSubmit={handleLogin}>
              <Input 
                type="email" 
                placeholder="이메일" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
              <Input 
                type="password" 
                placeholder="비밀번호" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
              <SubmitButton type="submit">로그인</SubmitButton>
            </Form>
          ) : (
            <Form onSubmit={handleSignup}>
              <Input 
                type="email" 
                placeholder="이메일" 
                value={signupEmail} 
                onChange={(e) => setSignupEmail(e.target.value)} 
                required 
              />
              <Input 
                type="password" 
                placeholder="비밀번호" 
                value={signupPassword} 
                onChange={(e) => setSignupPassword(e.target.value)} 
                required 
              />
              <Input 
                type="text" 
                placeholder="닉네임" 
                value={signupNickname} 
                onChange={(e) => setSignupNickname(e.target.value)} 
                required 
              />
              <SubmitButton type="submit">회원가입</SubmitButton>
            </Form>
          )}

        </Modal>
      )}
      
    </div>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px; /* 입력 필드와 버튼 간격 */
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #C07777;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #AF6363;
  }
`;

export default Profile;







// import { useState } from "react";
// import { getUserInfo, signup } from "../apis/login";

// const Profile = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [nickname, setNickname] = useState("");
//   const [profileImageUrl, setProfileImageUrl] = useState("");

//   const handleSignup = async () => {
//     try {
//       const email = "test@test.com";
//       const password = "test";
//       const nickname = "test";
//       const imageId = 1;

//       await signup({ email, password, image_id: imageId, nickname });
//       alert("회원가입 성공");
//     } catch (error) {
//       console.error("회원가입:", error);
//       alert("회원가입 실패");
//     }
//   };


//   const handleLogin = async () => {
//     try {
//       setIsLoggedIn(true);

//       const userInfo = await getUserInfo();
//       setNickname(userInfo.nickname);
//       setProfileImageUrl(userInfo.profile_image_URL);
//     } catch (error) {
//       console.error("로그인 중 오류 발생:", error);
//       alert("회원 정보 조회 실패");
//     }
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     setNickname("");
//     setProfileImageUrl("");
//   };

//   return (
//     <div>
//       {isLoggedIn ? (
//         <div className="flex items-center space-x-2">
//           <img
//             src={profileImageUrl}
//             alt="Profile"
//             className="w-8 h-8 rounded-full bg-red-300"
//           />
//           <span className="text-gray-600">{nickname}님</span>
//           <button onClick={handleLogout} className="text-gray-600">
//             로그아웃
//           </button>
//         </div>
//       ) : (
//         <div className="flex space-x-4">
//           <button onClick={handleLogin} className="text-gray-600">
//             로그인
//           </button>
//           <button onClick={handleSignup} className="text-gray-600">
//             회원가입
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Profile;
