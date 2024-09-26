import React from "react";
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
    <div className="container mx-auto grid grid-cols-12 px-5 gap-10">
      <AlbumContainer
        name={album.name}
        artists={album.artists_names.join(", ")}
        release_date={album.release_date}
        avg_rated={album.avg_rated}
        genres={album.genres.join(", ")}
      />
      <CommentSection />
      <TrackList />
    </div>
  );
};

export default Album;
