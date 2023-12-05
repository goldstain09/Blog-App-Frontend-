import React, { useEffect } from 'react'
import BlogCard from '../Components/BlogCard'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { notAuthorised, verifyUserAuthStart } from '../Redux(Saga)/Actions/UserAction';

export default function CategoryPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );
  // this useEffect is for authorization!
  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("jwToken")) {
      localStorage.setItem(
        "blogApp",
        JSON.stringify({
          validity: "15min",
          token: UserDataFromResponse.jwToken,
        })
      );
    } else {
      const jwToken = JSON.parse(localStorage.getItem("blogApp"));
      if (jwToken) {
        if (jwToken.hasOwnProperty("validity")) {
          dispatch(verifyUserAuthStart(jwToken.token));
        }
      } else {
        dispatch(notAuthorised(false));
        navigate("/login"); 
      }
    }
  }, [UserDataFromResponse]);
// -----------------------------------------------------------------------------


  return (
   <>
       <div className="container-fluid TagPage">
        <div className="container">
          <h1>
          <i class="bi bi-collection"></i> Lifestyle
          </h1>
          <h6 className="h6">Here's related posts to this Category...</h6>
          <div className="row d-flex">
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </div>

   </>
  )
}
