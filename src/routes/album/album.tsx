import React from "react";
import styled from "styled-components";
import AlbumContainer from "../../components/container/AlbumContainer";
import CommentSection from "../../components/CommentSection";
import TrackList from "../../components/TrackList";
import useAlbumDetail from "../../apis/album";

const Album: React.FC = () => {
  const { album, loading, error } = useAlbumDetail("1");

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!album) return <div>No data available</div>;

  return (
    <Container>
      <Item1>
        <AlbumContainer
          name={album.name}
          artists={album.artists_names.join(", ")}
          release_date={album.release_date}
          avg_rated={album.avg_rated}
          genres={album.genres.join(", ")}
        />
      </Item1>
      <Item2>
        <CommentSection />
      </Item2>
      <Item3>
        <TrackList />
      </Item3>
      {/* <Item2><CommentSection comments={album.comments}/></Item2>
        <Item3><TrackList tracks={album.tracks}/></Item3> */}
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

export default Album;
