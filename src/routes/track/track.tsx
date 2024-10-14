import React from "react";
import { useParams } from "react-router-dom";
import TrackContainer from "../../components/container/TrackContainer";
import CommentSection from "../../components/CommentSection";
import { useGetTrack } from "../../apis/getTrack";

const Track: React.FC = () => {
  const { query } = useParams<{ query: string }>();
  const { track, loading, error } = useGetTrack(query || "");

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto grid grid-cols-12 px-5 gap-10">
      {track && <TrackContainer trackData={track} />}
      <CommentSection />
    </div>
  );
};

export default Track;
