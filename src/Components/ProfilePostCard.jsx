import React from "react";
import founder from "../Media/Founder.jpg";


export default function ProfilePostCard() {
  return (
    <>
      <div className="col col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3">
        <img src={founder} alt="Post" />
        <div>
          <h5 className="h5">
            35 <i class="bi bi-heart"></i>
          </h5>
          &emsp;
          <h5 className="h5">
            35 <i class="bi bi-chat"></i>
          </h5>
        </div>
      </div>
    </>
  );
}
