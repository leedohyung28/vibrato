import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../../components/CommentSection";
import { useGetArtist } from "../../apis/getArtist";
import ArtistContainer from "../../components/container/ArtistContainer";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorMessage from "../../components/ErrorMessage";

const Artist: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const { artist, loading, error } = useGetArtist(query || "");

  useEffect(() => {
    console.log("Artist:", artist);
  }, [artist]);

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
      {artist && <ArtistContainer artistData={artist} />}
      <CommentSection typeID={query}/>
    </div>
  );
};

export default Artist;
