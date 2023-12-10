import React from "react";
import { useNavigate } from "react-router-dom";


export default function ProfilePostCard({data}) {
  const navigate = useNavigate();
  return (
    <>
      <div className="col col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3" onClick={()=>{
        navigate(`/myBlog/${data._id}`);
      }}>
        <img src={data.postImage} alt="Post" />
        <div>
          <h5 className="h5">
            {data.postLikes.length} <i className="bi bi-heart"></i>
          </h5>
          &emsp;
          <h5 className="h5">
            {data.postComments.length} <i className="bi bi-chat"></i>
          </h5>
        </div>
      </div>
    </>
  );
}
