import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePostCard({ data }) {
  const navigate = useNavigate();

  const [postInfo, setPostInfo] = useState({
    postImage: data.postImage,
    postId: data.postId,
    postLikes: [],
    postComments: [],
  });

  const Response = async (postId) => {
    try {
      const response = await axios.get(
        `/v1/PostApi/getPostDataForCardOnly/${postId}`
      );
      if (response.data.hasOwnProperty("postId")) {
        setPostInfo({
          ...postInfo,
          postComments: response.data.postComments,
          postLikes: response.data.postLikes,
        });
      }
    } catch (error) {
      // nothing to do with error becoz the initial data will shown if any error occured!
    }
  };

  useEffect(() => {
    Response(data.postId);
  }, [data, Response, setPostInfo]);
  return (
    <>
      <div
        className="col col-12 col-sm-12 col-md-4 col-lg-3 col-xl-3"
        onClick={() => {
          navigate(`/myBlog/${postInfo.postId}`);
        }}
      >
        <img src={postInfo.postImage} alt="Post" />
        <div>
          <h5 className="h5">
            {postInfo.postLikes.length} <i className="bi bi-heart"></i>
          </h5>
          &emsp;
          <h5 className="h5">
            {postInfo.postComments.length} <i className="bi bi-chat"></i>
          </h5>
        </div>
      </div>
    </>
  );
}
