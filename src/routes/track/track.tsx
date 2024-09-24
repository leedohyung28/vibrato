import React from "react";
import styled from "styled-components";
import CommentSection from "../../components/CommentSection";
import TrackContainer from "../../components/container/TrackContainer";
import Lyrics from "../../components/Lyrics";

const Track: React.FC = () => {
    return (
      <Container>
        <Item1><TrackContainer /></Item1>
        <Item2><CommentSection /></Item2>
        <Item3><Lyrics /></Item3>
      </Container>
    );
  };

const Container = styled.div`
  margin: 0 130px;
  display: grid;
  grid-template-columns: 1fr; /* 기본적으로 1 열로 시작 */
  grid-template-rows: auto auto; /* 두 행으로 구성 */
  gap: 20px;
  
  @media (min-width: 768px) {
    grid-template-columns: 1fr 2fr; /* 화면이 넓어지면 두 열로 변환 */
    grid-template-rows: auto; /* 행 자동 설정 */
  }
`;

const Item1 = styled.div`
  grid-column: 1 / -1;
  /* background-color: #f2f2f2; */
  padding: 20px;
`;

const Item2 = styled.div`
  grid-column: 1 / 2;
  /* background-color: #f2f2f2; */
  padding: 20px;
`;

const Item3 = styled.div`
  grid-column: 2 / 3;
  /* background-color: #f2f2f2; */
  padding: 20px;
`;

export default Track;
