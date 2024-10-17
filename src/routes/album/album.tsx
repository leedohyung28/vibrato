import React from "react";
import { useParams } from "react-router-dom";
import AlbumContainer from "../../components/container/AlbumContainer";
import CommentSection from "../../components/CommentSection";
import TrackList from "../../components/TrackList";
import { useGetAlbum } from "../../apis/getAlbum";
import ErrorMessage from "../../components/ErrorMessage";
import LoadingSpinner from "../../components/LoadingSpinner";

const Album: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const { album, loading, error } = useGetAlbum(query || "");

  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="container mx-auto grid grid-cols-12 px-5 gap-10">
      {album && <AlbumContainer albumData={album} />}
      <CommentSection typeID={query} />
      <TrackList albumData={album} />
    </div>
  );
};

export default Album;
