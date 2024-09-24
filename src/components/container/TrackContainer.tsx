import React from "react";
import styled from "styled-components";

const TrackContainer: React.FC = () => {
    return (
      <Container>
        <AlbumCover src="https://loremflickr.com/320/240?random=1" alt="앨범 커버" />
        <SongDetails>
          <AlbumTitle>노래 제목</AlbumTitle>
          <ArtistName>아티스트 이름</ArtistName>
          <ReleasedDate>앨범 제목</ReleasedDate>
          <Rating>별점</Rating>
          <Genre>장르</Genre>
          <IconsContainer>
            <Icon /> <Icon /> <Icon /> <Icon />
          </IconsContainer>
          <StarsContainer>
            like, 코멘트 추가, 별점
          </StarsContainer>
        </SongDetails>
      </Container>
    );
  };

const Container = styled.div`
  display: grid;
  grid-template-columns: 310px 1fr;
  gap: 20px;
  align-items: center;
  /* padding: 20px; */
  /* border: 1px solid #ddd; */
  border-radius: 10px;
  background-color: #f9f9f9;
`;

const AlbumCover = styled.img`
  width: 300px;
  height: 300px;
  object-fit: cover;
  /* background-color: #b27c7c; */
`;

const SongDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const AlbumTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
`;

const ArtistName = styled.p`
  margin: 0;
  color: #666;
  font-size: 1rem;
`;

const ReleasedDate = styled.p`
  margin: 0;
  color: #999;
  font-size: 0.9rem;
`;

const Rating = styled.p`
  margin: 0;
  color: #999;
  font-size: 0.9rem;
`;

const Genre = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.9rem;
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Icon = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background-color: #7ed56f;
`;

const StarsContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export default TrackContainer;
