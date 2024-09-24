import React from "react";
import styled from "styled-components";

// Sample data for the tracks
const tracks = [
  { id: 1, title: "노래 제목", trackNumber: "트랙 1" },
  { id: 2, title: "노래 제목", trackNumber: "트랙 2" },
  { id: 3, title: "노래 제목", trackNumber: "트랙 3" },
  { id: 4, title: "노래 제목", trackNumber: "트랙 4" },
  { id: 5, title: "노래 제목", trackNumber: "트랙 5" },
];

// Track component
const TrackList: React.FC = () => {
  return (
    <TrackContainer>
      <h1>트랙</h1>
      {tracks.map((track) => (
        <TrackItem key={track.id}>
          <TrackInfo>
            <TrackImage src="https://loremflickr.com/320/240?random=1" alt="album image" />
            <TrackText>
              <TrackTitle>{track.title}</TrackTitle>
              <TrackNumber>{track.trackNumber}</TrackNumber>
            </TrackText>
          </TrackInfo>
          <TrackActions>
            <StarRating>별점 | 별점 남긴 횟수</StarRating>
            <HeartButton>♡</HeartButton>
          </TrackActions>
        </TrackItem>
      ))}
    </TrackContainer>
  );
};

// Styled Components
const TrackContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
`;

const TrackItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f9f9f9;
  border-radius: 5px;
`;

const TrackInfo = styled.div`
  display: flex;
  align-items: center;
`;

const TrackImage = styled.img`
  width: 50px;
  height: 50px;
  background-color: #c08b83;
  margin-right: 10px;
`;

const TrackText = styled.div`
  display: flex;
  flex-direction: column;
`;

const TrackTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const TrackNumber = styled.div`
  font-size: 14px;
  color: #777;
`;

const TrackActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const StarRating = styled.div`
  font-size: 14px;
  color: #f0a500;
`;

const HeartButton = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  color: #f50057;
  cursor: pointer;
`;


export default TrackList;