import React from "react";
import "./SCSS/MyProfilePage.scss";
import founder from "../Media/Founder.jpg";
import founderr from "../Media/Logo.jpg";
import ff from './SCSS/Media/HomePageBGImageTop.jpg';
import ProfilePostCard from "../Components/ProfilePostCard";

export default function MyProfilePage() {
  return (
    <>
      <div className="container-fluid MyProfilePage">
        <div className="row d-flex">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
            <img src={founder} alt="Profile Picture" />
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8">
            <div className="row d-flex usernameAndEditBtnContainer">
              <div className="col-7">
                <h3 className="h3 username">itz__sam__09</h3>
              </div>
              <div className="col-5">
                <button>Edit Profile</button>
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
        <div className="row">
          <ul class="nav justify-content-center postetcNavbar">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                <i class="bi bi-postcard-heart"></i> Your Posts
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="bi bi-tags"></i> Tags Used
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="bi bi-bookmark-check"></i> Saved Posts
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                <i class="bi bi-heart"></i> Liked Posts
              </a>
            </li>
          </ul>
        </div>

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
      </div>
    </>
  );
}
