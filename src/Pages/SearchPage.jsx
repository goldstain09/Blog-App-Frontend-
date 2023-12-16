import React, { useEffect, useState } from "react";
import "./SCSS/SearchPage.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllBloggersDataStart,
  verifyUserAuthStart,
} from "../Redux(Saga)/Actions/UserAction";
import { getAllPostsDataStart } from "../Redux(Saga)/Actions/PostAction";

export default function SearchPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );
  const getAllBloggersDataResponse = useSelector(
    (state) => state.userReducer.getAllBloggersDataResponse
  );
  const getAllPostsDataResponse = useSelector(
    (state) => state.postReducer.getAllPostsDataResponse
  );

  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("jwToken")) {
      localStorage.setItem(
        "blogApp",
        JSON.stringify({
          token: UserDataFromResponse.jwToken,
          validity: "15 minutes",
        })
      );
    } else {
      const tokenInfo = JSON.parse(localStorage.getItem("blogApp"));
      if (tokenInfo) {
        if (tokenInfo.hasOwnProperty("validity")) {
          dispatch(verifyUserAuthStart(tokenInfo.token));
          dispatch(getAllPostsDataStart(tokenInfo.token));
          dispatch(getAllBloggersDataStart(tokenInfo.token));
        }
      } else {
        navigate("/login");
      }
    }
  }, [UserDataFromResponse]);

  // here I'm setting raw or without searching data which can be visible on visiting search page
  useEffect(() => {
    if (getAllPostsDataResponse) {
      if (getAllPostsDataResponse.length > 0) {
        setBlogs(getAllPostsDataResponse);

        // setting up all tags
        const allPostsTags = [];
        getAllPostsDataResponse.map((item) => {
          item.postTags.map((item) => {
            allPostsTags.push(item);
          });
        });
        let newTags = [...new Set(allPostsTags)];
        setTags(newTags);

        // setting up all categories
        const allPostsCategories = [];
        getAllPostsDataResponse.map((item) => {
          allPostsCategories.push(`${item.postCategory}`);
        });
        let newCategories = [...new Set(allPostsCategories)];
        setCategories(newCategories);
      }
    }
  }, [getAllPostsDataResponse]);
  useEffect(() => {
    if (getAllBloggersDataResponse.length > 0) {
      setBloggers(getAllBloggersDataResponse);
    }
  }, [getAllBloggersDataResponse]);
  //   -----------------------------------------------------
  const [whatToShow, setWhatToShow] = useState("Bloggers");
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [bloggers, setBloggers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  // input change
  const inputChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
    if (e.target.value !== "" || e.target.value.length > 0) {
      // new values for search
      let newBlogs = blogs.filter(
        (item) =>
          item.postCaption
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.postCategory
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          item.postTitle.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setBlogs(newBlogs);

      let newBloggers = bloggers.filter(
        (item) =>
          item.userName.toLowerCase().includes(e.target.value.toLowerCase()) ||
          item.Name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setBloggers(newBloggers);

      let newTags = tags.filter((item) =>
        item.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setTags(newTags);

      let newCategories = categories.filter((item) =>
        item.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setCategories(newCategories);
    } else if (e.target.value === "") {
      setBlogs(getAllPostsDataResponse);
      const allPostsTags = [];
      getAllPostsDataResponse.map((item) => {
        item.postTags.map((item) => {
          allPostsTags.push(item);
        });
      });
      let newTags = [...new Set(allPostsTags)];
      setTags(newTags);
      const allPostsCategories = [];
      getAllPostsDataResponse.map((item) => {
        allPostsCategories.push(`${item.postCategory}`);
      });
      let newCategories = [...new Set(allPostsCategories)];
      setCategories(newCategories);
      setBloggers(getAllBloggersDataResponse);
    }
  };
  return (
    <>
      <div className="container-fluid searchPage">
        <div style={{ position: "absolute", top: "1rem", left: "1rem" }}>
          <Link to={"/"} className="btn btn-outline-dark">
            Back
          </Link>
        </div>
        <form className="container" onSubmit={(e) => e.preventDefault()}>
          <div className="row d-flex">
            <div className="col-12">
              <input
                type="text"
                placeholder="Search for any Blog, Blogger, Tag or any Category . . ."
                onChange={inputChange}
                value={searchInput}
              />
            </div>
          </div>
          <div className="nav row d-flex mt-5 text-center">
            <div
              style={{ color: "red" }}
              id="blogger"
              className="col col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3"
              onClick={(e) => {
                e.preventDefault();
                setWhatToShow("Bloggers");
                document.getElementById("blogger").style.color = "red";
                document.getElementById("blog").style.color = "white";
                document.getElementById("category").style.color = "white";
                document.getElementById("tag").style.color = "white";
              }}
            >
              Bloggers
            </div>
            <div
              id="blog"
              className="col col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3"
              onClick={(e) => {
                e.preventDefault();
                setWhatToShow("Blogs");
                document.getElementById("blogger").style.color = "white";
                document.getElementById("blog").style.color = "red";
                document.getElementById("category").style.color = "white";
                document.getElementById("tag").style.color = "white";
              }}
            >
              Blogs
            </div>
            <div
              id="category"
              className="col col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3"
              onClick={(e) => {
                e.preventDefault();
                setWhatToShow("Categories");
                document.getElementById("blogger").style.color = "white";
                document.getElementById("blog").style.color = "white";
                document.getElementById("category").style.color = "red";
                document.getElementById("tag").style.color = "white";
              }}
            >
              Categories
            </div>
            <div
              id="tag"
              className="col col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3"
              onClick={(e) => {
                e.preventDefault();
                setWhatToShow("Tags");
                document.getElementById("blogger").style.color = "white";
                document.getElementById("blog").style.color = "white";
                document.getElementById("category").style.color = "white";
                document.getElementById("tag").style.color = "red";
              }}
            >
              Tags
            </div>
          </div>
          {whatToShow === "Bloggers" && (
            <div className="row Bloggers mt-5">
              {bloggers.length > 0 ? (
                bloggers.map((item, index) => (
                  <div
                    key={index}
                    className="col col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 mt-5"
                  >
                    <div className="row">
                      <div className="col-12">
                        <img src={item.profilePicture} alt="Preview" />
                      </div>
                      <div className="col-12">
                        <h3>{item.userName}</h3>
                      </div>
                      <div className="col-12">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/bloggerProfile/${item._id.toString()}`);
                          }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <></>
              )}
            </div>
          )}
          {/* --------------------------------- */}
          {whatToShow === "Categories" && (
            <div className="row Categories mt-5">
              {categories.length > 0 ? (
                categories.map((item, index) => (
                  <div
                    key={index}
                    className="col col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3"
                    onClick={()=>{
                      navigate(`/categoryPage/${item}`)
                    }}
                  >
                    <i className="bi bi-collection"></i> {`${item}`}
                  </div>
                ))
              ) : (
                <> no categories</>
              )}
            </div>
          )}

          {/* --------------------------------- */}
          {whatToShow === "Tags" && (
            <div className="row Tags mt-5">
              {tags.length > 0 ? (
                tags.map((item, index) => (
                  <div
                    key={index}
                    className="col col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3"
                  >
                    <i className="bi bi-tags-fill"></i> {item}
                  </div>
                ))
              ) : (
                <>no tags</>
              )}
            </div>
          )}

          {/* --------------------------------- */}
          {whatToShow === "Blogs" && (
            <div className="row Blogs mt-5">
              {blogs.length > 0 ? (
                blogs.map((item, index) => (
                  <div
                    key={index}
                    className="col col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 mt-2"
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(`/blog/${item._id}`);
                    }}
                  >
                    <img src={item.postImage} alt="" />
                  </div>
                ))
              ) : (
                <>No posts</>
              )}
            </div>
          )}
        </form>
      </div>
    </>
  );
}
