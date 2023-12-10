import React, { useEffect, useState } from "react";
import founder from "../Media/Founder.jpg";


// this card is used for Showing saved and liked Posts!!! but name is same !!
export default function ProfileLikedAndSavedPostsCard({ Saved, Liked }) {
  const [whatToShow, setWhatToShow] = useState([]);
  useEffect(() => {
    if (Saved.length > 0) {
      setWhatToShow(Saved);
    } else if (Liked.length > 0) {
      setWhatToShow(Liked);
    } 
  }, [Saved, Liked]);
  return (
    <div className="col col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3 ">
      <img src={founder} alt="Post" />
      <div>
        {whatToShow.length > 0 &&
          whatToShow.map((item) => (
            <h5 key={item} className="h5">
              {item+" "}
            </h5>
          ))}
      </div>
    </div>
  );
}
