import React from "react";
import styled from "styled-components";

const CommentSection: React.FC = () => {
  // 하드 코딩된 데이터
  const comments = [
    {
      id: 1,
      user_nickname: "닉네임1",
      user_pic_url: "https://loremflickr.com/320/240?random=1",
      content: "앨범 좋음!",
      rated: 5,
      created_at: "10시간 전",
      likes: 12,
      replies: 3,
    },
    {
      id: 2,
      user_nickname: "닉네임2",
      user_pic_url: "https://loremflickr.com/320/240?random=2",
      content: "그냥 그럼",
      rated: 3,
      created_at: "2시간 전",
      likes: 5,
      replies: 1,
    },
    {
      id: 3,
      user_nickname: "닉네임3",
      user_pic_url: "https://loremflickr.com/320/240?random=3",
      content: "최고의 명작",
      rated: 5,
      created_at: "30분 전",
      likes: 2,
      replies: 0,
    },
  ];

  return (
    <CommentContainer>
      <h1>코멘트 (코멘트 개수)</h1>
      {comments.map((comment) => (
        <CommentBox key={comment.id}>
          <UserSection>
            <ProfileImage src={comment.user_pic_url} alt={`${comment.user_nickname}의 프로필`} />
            <UserDetails>
              <UserName>{comment.user_nickname}</UserName>
              <CommentText>{comment.content}</CommentText>
            </UserDetails>
          </UserSection>
          <RightSection>
            <Rating>{'★'.repeat(comment.rated)}</Rating>
            <TimeAgo>{comment.created_at}</TimeAgo>
            <Actions>
              <ActionButton>{comment.likes} 좋아요</ActionButton>
              <ActionButton>{comment.replies} 댓글</ActionButton>
            </Actions>
          </RightSection>
        </CommentBox>
      ))}
    </CommentContainer>
  );
};

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px 0;
`;

const CommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: #fff;
`;

const UserSection = styled.div`
  display: flex;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  /* background-color: #b27c7c; */
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

const UserName = styled.span`
  font-weight: bold;
  font-size: 1rem;
`;

const CommentText = styled.p`
  margin: 5px 0;
  font-size: 0.9rem;
  color: #555;
`;

const RightSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

const Rating = styled.div`
  display: flex;
  gap: 5px;
`;

const TimeAgo = styled.span`
  font-size: 0.8rem;
  color: #999;
`;

const Actions = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  font-size: 0.8rem;
  color: #555;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

export default CommentSection;
