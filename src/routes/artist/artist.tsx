import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CommentSection from "../../components/CommentSection";
import { useGetArtist } from "../../apis/getArtist";
import ArtistContainer from "../../components/container/ArtistContainer";

const Artist: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const { artist, loading, error } = useGetArtist(query || "");

  useEffect(() => {
    console.log("Artist:", artist);
  }, [artist]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto grid grid-cols-12 px-5 gap-10">
      {artist && <ArtistContainer artistData={artist} />}
      <CommentSection />
    </div>
  );
};

export default Artist;
