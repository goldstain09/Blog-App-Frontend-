import React, { useEffect, useState } from "react";
import "./SCSS/BloggerProfilePage.scss";
import founder from "../Media/Founder.jpg";
import ProfilePostCard from "../Components/ProfilePostCard";
import ProfileTagsUsedCard from "../Components/ProfileTagsUsedCard";

export default function BloggerProfilePage() {
  const [WhatToShow, setWhatToShow] = useState("myPosts");
  useEffect(() => {
    const myPosts = document.getElementById("myPosts");
    const tagsUsed = document.getElementById("tagsUsed");
    switch (WhatToShow) {
      case "myPosts":
        myPosts.style.color = "white";
        tagsUsed.style.color = "grey";
        myPosts.style.transform = "scale(1.1)";
        tagsUsed.style.transform = "none";
        break;
      case "tagsUsed":
        tagsUsed.style.color = "white";
        myPosts.style.color = "grey";
        tagsUsed.style.transform = "scale(1.1)";
        myPosts.style.transform = "none";
        break;
      default:
        myPosts.style.color = "white";
        tagsUsed.style.color = "grey";
        myPosts.style.transform = "scale(1.1)";
        tagsUsed.style.transform = "none";
        break;
    }
  }, [WhatToShow]);
  return (
    <>
      <div className="container-fluid BloggerProfilePage">
        <div className="row d-flex">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <img src={founder} alt="Profile Picture" />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
            <div className="row d-flex usernameAndFollowBtnContainer">
              <div className="col-7">
                <h3 className="h3 username">itz__sam__09</h3>
              </div>
              <div className="col-5">
                <button>Follow</button>
              </div>
            </div>
            <div className="row d-flex postFollowersAndFollowingContainer">
              <div className="col-4">
                <h4 className="h4">
                  <span>24</span>&nbsp;Posts
                </h4>
              </div>
              <div className="col-4">
                <h4 className="h4">
                  <span>24</span>&nbsp;Followers
                </h4>
              </div>
              <div className="col-4">
                <h4 className="h4">
                  <span>24</span>&nbsp;Following
                </h4>
              </div>
            </div>
            <div className="row NameAndBio">
              <div className="col-12">
                <h2 className="h2">Sujal Rajputcvbvcbvcbvcbcvb</h2>
              </div>
              <div className="col-12">
                <pre>
                  LifeStyle <br />
                  Web Developer <br />
                  Sometimes life got'ta fghgfhgfhgfhgfhhard....!
                </pre>
              </div>
            </div>
          </div>
        </div>
        {}
        <div className="row">
          <ul className="nav justify-content-center postetcNavbar">
            <li className="nav-item">
              <a
                id="myPosts"
                className="nav-link"
                aria-current="page"
                onClick={() => {
                  setWhatToShow("myPosts");
                }}
              >
                <i className="bi bi-grid-3x3"></i> Your Posts
              </a>
            </li>
            <li className="nav-item">
              <a
                id="tagsUsed"
                className="nav-link"
                onClick={() => {
                  setWhatToShow("tagsUsed");
                }}
              >
                <i className="bi bi-tags"></i> Tags Used
              </a>
            </li>
          </ul>
        </div>

        {WhatToShow === "myPosts" && (
          <div className="container PostContainer">
            <div className="row">
              <ProfilePostCard />
              <ProfilePostCard />
              <ProfilePostCard />
              <ProfilePostCard />
              <ProfilePostCard />
              <ProfilePostCard />
              <ProfilePostCard />
              <ProfilePostCard />
              <ProfilePostCard />
              <ProfilePostCard />
            </div>
          </div>
        )}
        {WhatToShow === "tagsUsed" && (
          <div className="container TagsUsedContainer">
            <div className="row">
              <ProfileTagsUsedCard
                tagsUsed={["Lifestyle", "PhotoShoot", "DSLR", "Development"]}
                Liked={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                tagsUsed={["Lifestyle", "PhotoShoot", "DSLR", "Development"]}
                Liked={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                tagsUsed={["Lifestyle", "PhotoShoot", "DSLR", "Development"]}
                Liked={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                tagsUsed={["Lifestyle", "PhotoShoot", "DSLR", "Development"]}
                Liked={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                tagsUsed={["Lifestyle", "PhotoShoot", "DSLR", "Development"]}
                Liked={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                tagsUsed={["Lifestyle", "PhotoShoot", "DSLR", "Development"]}
                Liked={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                tagsUsed={["Lifestyle", "PhotoShoot", "DSLR", "Development"]}
                Liked={[]}
                Saved={[]}
              />
              <ProfileTagsUsedCard
                tagsUsed={["Lifestyle", "PhotoShoot", "DSLR", "Development"]}
                Liked={[]}
                Saved={[]}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
