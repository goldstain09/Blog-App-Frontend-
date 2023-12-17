import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// this card is used for Showing saved and liked Posts!!! but name is same !!
export default function ProfileLikedAndSavedPostsCard({ Saved, Liked }) {
  const navigate = useNavigate();
  const [whatToShow, setWhatToShow] = useState({});
  useEffect(() => {
    if (Saved.hasOwnProperty("postId")) {
      setWhatToShow(Saved);
    } else if (Liked.hasOwnProperty("postId")) {
      setWhatToShow(Liked);
    }
  }, [Saved, Liked, setWhatToShow]);
  return (
    <div
      className="col col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 "
      onClick={() => navigate(`/blog/${whatToShow.postId}`)}
    >
      <img src={whatToShow.postImage} alt="Post" />
    </div>
  );
}
