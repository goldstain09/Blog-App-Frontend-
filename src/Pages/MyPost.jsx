import React from 'react';
import './SCSS/MyPost.scss';
import Header from '../Components/Header';
import founder from '../Media/Founder.jpg';
import Footer from '../Components/Footer';
import Comment from '../Components/Comment';


export default function MyPost() {
  const txt = "abcdefghijklmnopqrstuvwxvz";
  return (
    <>
       <Header />
      <div className="container-fluid MyBlogPost">
        <div className="row d-flex">
          <div className="col col-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 col-xxl-8">
            <div className="row d-flex">
              <div className="col col-12 ImageContainer">
                <h6 className="h4 text-start categoryy">Lifestyle</h6>
                <h1 className="h1">{txt.toUpperCase()}</h1>
                <img src={founder} alt="Preview" />
                <p>19, feb, 2022</p>
              </div>
              <div className="col col-12 text-container text-center">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                  repellat quidem magnam eligendi nesciunt iste, nisi recusandae
                  voluptates pariatur minus nam odio? Illum alias corporis
                  doloribus fugit rerum voluptatibus nobis! Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Sequi repellat quidem
                  magnam eligendi nesciunt iste, nisi recusandae voluptates
                  pariatur minus nam odio? Illum alias corporis doloribus fugit
                  rerum voluptatibus nobis! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Sequi repellat quidem magnam
                  eligendi nesciunt iste, nisi recusandae voluptates pariatur
                  minus nam odio? Illum alias corporis doloribus fugit rerum
                  voluptatibus nobis! Lorem ipsum do alias corporis doloribus
                  fugit rerum voluptatibus nobis!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                  repellat quidem magnam eligendi nesciunt iste, nisi recusandae
                  voluptates pariatur minus nam odio? Illum alias corporis
                  doloribus fugit rerum voluptatibus nobis! Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Sequi repellat quidem
                  magnam eligendi nesciunt iste, nisi recusandae voluptates
                  pariatur minus nam odio? Illum alias corporis doloribus fugit
                  rerum voluptatibus nobis! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Sequi repellat quidem magnam
                  eligendi nesciunt iste, nisi recusandae voluptates pariatur
                  minus nam odio? Illum alias corporis doloribus fugit rerum
                  voluptatibus nobis! Lorem ipsum do alias corporis doloribus
                  fugit rerum voluptatibus nobis!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                  repellat quidem magnam eligendi nesciunt iste, nisi recusandae
                  voluptates pariatur minus nam odio? Illum alias corporis
                  doloribus fugit rerum voluptatibus nobis! Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Sequi repellat quidem
                  magnam eligendi nesciunt iste, nisi recusandae voluptates
                  pariatur minus nam odio? Illum alias corporis doloribus fugit
                  rerum voluptatibus nobis! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Sequi repellat quidem magnam
                  eligendi nesciunt iste, nisi recusandae voluptates pariatur
                  minus nam odio? Illum alias corporis doloribus fugit rerum
                  voluptatibus nobis! Lorem ipsum do alias corporis doloribus
                  fugit rerum voluptatibus nobis!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                  repellat quidem magnam eligendi nesciunt iste, nisi recusandae
                  voluptates pariatur minus nam odio? Illum alias corporis
                  doloribus fugit rerum voluptatibus nobis! Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Sequi repellat quidem
                  magnam eligendi nesciunt iste, nisi recusandae voluptates
                  pariatur minus nam odio? Illum alias corporis doloribus fugit
                  rerum voluptatibus nobis! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Sequi repellat quidem magnam
                  eligendi nesciunt iste, nisi recusandae voluptates pariatur
                  minus nam odio? Illum alias corporis doloribus fugit rerum
                  voluptatibus nobis! Lorem ipsum do alias corporis doloribus
                  fugit rerum voluptatibus nobis!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi
                  repellat quidem magnam eligendi nesciunt iste, nisi recusandae
                  voluptates pariatur minus nam odio? Illum alias corporis
                  doloribus fugit rerum voluptatibus nobis! Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Sequi repellat quidem
                  magnam eligendi nesciunt iste, nisi recusandae voluptates
                  pariatur minus nam odio? Illum alias corporis doloribus fugit
                  rerum voluptatibus nobis! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Sequi repellat quidem magnam
                  eligendi nesciunt iste, nisi recusandae voluptates pariatur
                  minus nam odio? Illum alias corporis doloribus fugit rerum
                  voluptatibus nobis! Lorem ipsum do alias corporis doloribus
                  fugit rerum voluptatibus nobis!
                </p>
              </div>
            </div>
          </div>
          <div className="col col-12 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
            <div className="row d-flex">
              <div className="col-1 dp">
                <img src={founder} alt="" />
              </div>
              <div className=" col-8 name">
                <h4 className="h4">Sujal Rajput</h4>
              </div>
              <div className="col-1 btnn">
                <button>
                <i class="bi bi-pencil-square"></i>
                </button>
              </div>
            </div>

            <div className="row">
              <div className="col-11">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ducimus cupiditate atque doloremque nostrum quae delectus,
                </p>
              </div>
              <div className="col-12">
                <div className="tags">
                <i class="bi bi-tags-fill"> </i>Lifestyle
                </div>
                <div className="tags">
                <i class="bi bi-tags-fill"> </i>Styles
                </div>
                <div className="tags">
                <i class="bi bi-tags-fill"> </i>Colors
                </div>
                <div className="tags">
                <i class="bi bi-tags-fill"> </i>Stars
                </div>
                <div className="tags">
                <i class="bi bi-tags-fill"> </i>Shooting
                </div>
                <div className="tags">
                <i class="bi bi-tags-fill"> </i>Regular
                </div>
                <div className="tags">
                <i class="bi bi-tags-fill"> </i>PhotoShoots
                </div>
                <div className="tags">
                <i class="bi bi-tags-fill"> </i>Sky
                </div>
                <div className="tags">
                <i class="bi bi-tags-fill"> </i>Digital
                </div>
                <div className="tags">
                <i class="bi bi-tags-fill"> </i>Cameras
                </div>
              </div>
            </div>

            <div className="row BlogLikeAndSaveBtnContainer">
              <div className="col-6">
                <button>
                  <i className="bi bi-suit-heart"></i>
                </button>
                <button>
                  <i className="bi bi-suit-heart-fill"></i>
                </button>
              </div>
              <div className="col-6 text-center">
                <button>
                  <i className="bi bi-bookmark"></i>
                </button>
                <button>
                  <i className="bi bi-bookmark-fill"></i>
                </button>
              </div>
            </div>

            <div className="row PostACommentSection">
              <div className="col-9">
                <input type="text" placeholder="  Add a Comment!" />
              </div>
              <div className="col-3">
                <button className="btn btn-outline-danger">Post</button>
              </div>
            </div>

            <h4 className="h4">Comments</h4>

            <Comment commentOwner={true}/>
            <Comment commentOwner={true}/>
            <Comment commentOwner={true}/>
            <Comment commentOwner={true}/>
            <Comment commentOwner={true}/>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
