import React from "react";
import TrackContainer from "../../components/container/TrackContainer";
import CommentSection from "../../components/CommentSection";
import Lyrics from "../../components/Lyrics";

const Track: React.FC = () => {
  return (
    <div className="container mx-auto grid grid-cols-12 px-5 gap-10">
      <TrackContainer />
      <CommentSection />
      <Lyrics />
    </div>
  );
};

export default Track;
