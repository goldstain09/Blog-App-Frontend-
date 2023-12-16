import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { verifyUserAuthStart } from "../Redux(Saga)/Actions/UserAction";
import "./SCSS/AddPostPage.scss";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import storage from "../Utils/Firebase.Storage";
import {
  postBlogStart,
  postBlogSuccess,
} from "../Redux(Saga)/Actions/PostAction";

export default function AddPostPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // reponse of post successfully posted or not!!
  const postBlogResponse = useSelector(
    (state) => state.postReducer.postBlogResponse
  );

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
        navigate("/login");
      }
    }
  }, [UserDataFromResponse]);
  // -----------------------------------------------------------------------------

  // blog post form related functions and state-
  const initialFormData = {
    postTitle: "",
    postCategory: "Lifestyle",
    postCaption: "",
    postImage: "",
    postImageAddress: "",
    postTags: "",
    postBlogsPara: [],
  };
  const [formData, setFormData] = useState(initialFormData);
  const { postTitle, postCaption, postImage, postTags, postBlogsPara } =
    formData;

  // specially handled the state for blogs para's
  const [blogParaInputsValues, setBlogParaInputsValues] = useState(["", ""]);

  // here is temporary state for Image Address, if any user select an image then again select an image then for removing or replacing new image with old one from storage!!
  const [imageAddress, setImageAddress] = useState("");
  // remove add para button
  const [removeAddParaBtn, setRemoveAddParaBtn] = useState(true);

  // error for add more paras
  const [addMoreParasError, setAddMoreParasError] = useState(false);

  // errors for all inputs
  const [emptyTitleError, setEmptyTitleError] = useState(false);
  const [emptyCaptionError, setEmptyCaptionError] = useState(false);
  const [didntSelectAnyImageError, setDidntSelectAnyImageError] =
    useState(false);
  const [minimum4BlogParas, setMinimum4BlogParas] = useState(false);
  const [someErrorWhileUploadingImage, setSomeErrorWhileUploadingImage] =
    useState("");

  // it's for hiding post btn while uploading the image!
  const [ShowPostBtn, setShowPostBtn] = useState(true);

  // input change handle
  const inputChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //post
  const post = (e) => {
    e.preventDefault();
    if (postTitle !== "" && postTitle.length < 50) {
      if (postCaption.length > 30) {
        if (postImage !== "") {
          if (
            postBlogsPara.length >= 4 &&
            postBlogsPara.every((item) => item.length >= 1000)
          ) {
            const jwToken = JSON.parse(localStorage.getItem("blogApp"));
            const finalData = {
              postData: formData,
              token: jwToken.token,
            };
            dispatch(postBlogStart(finalData));
          } else {
            setMinimum4BlogParas(true);
            setAddMoreParasError(false);
          }
        } else {
          setDidntSelectAnyImageError(true);
        }
      } else {
        setEmptyCaptionError(true);
      }
    } else {
      setEmptyTitleError(true);
    }
  };

  // handling response
  useEffect(() => {
    if (postBlogResponse.hasOwnProperty("blogPosted")) {
      if (postBlogResponse.blogPosted) {
        dispatch(postBlogSuccess({}));
        navigate("/myProfile");
      }
    }
  }, [postBlogResponse]);

  return (
    <>
      <div className="container-fluid AddPostContainer">
        <form className="container" onSubmit={post}>
          <div className="row d-flex">
            <div className="col-9">
              <h1 className="h1 text-light">Post a Blog</h1>
            </div>
            <div className="col-3 text-end postBtn">
              {ShowPostBtn && <button type="submit">Post</button>}
            </div>
            <div className="col-6">
              <label>Title [0 - 50 letters]</label>
              <input
                type="text"
                placeholder="Blog's Title [0 - 50 letters only]"
                name="postTitle"
                value={postTitle}
                onChange={(e) => {
                  inputChange(e);
                  setEmptyTitleError(false);
                }}
              />
              {emptyTitleError && (
                <p className="text-danger">
                  Please enter the title for your blog!
                </p>
              )}
            </div>
            <div className="col-6">
              <input
                type="text"
                placeholder="Blog's Caption"
                name="postCaption"
                value={postCaption}
                onChange={(e) => {
                  inputChange(e);
                  setEmptyCaptionError(false);
                }}
              />
              {emptyCaptionError && (
                <p className="text-danger">Please enter your blog's Caption!</p>
              )}
            </div>
            <div className="col-6">
              {postImage === "" ? (
                <>
                  <label>Upload an Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      setShowPostBtn(false);
                      setDidntSelectAnyImageError(false);
                      try {
                        if (imageAddress === "") {
                          const folderPath = `/postImages/${UserDataFromResponse._id}`;
                          const uniqueIdForPostImage =
                            Math.floor(Math.random() * 90000000000) +
                            103245984736;
                          const fileName = `/${
                            Math.random() * 80
                          }+${uniqueIdForPostImage}`;
                          setImageAddress(`${folderPath}${fileName}`);
                          const storageRef = ref(
                            storage,
                            `${folderPath}${fileName}`
                          );
                          await uploadBytes(storageRef, e.target.files[0]);
                          const url = await getDownloadURL(storageRef);
                          setFormData({
                            ...formData,
                            postImage: `${url}`,
                            postImageAddress: `${folderPath}${fileName}`,
                          });
                          setShowPostBtn(true);
                        } else {
                          // becozz here image is already uploaded in storage so we have to replace it otherwise it saved with new place and older image is stuff!! in storage
                          const storageRef = ref(storage, imageAddress);
                          await uploadBytes(storageRef, e.target.files[0]);
                          const url = await getDownloadURL(storageRef);
                          setFormData({
                            ...formData,
                            postImage: `${url}`,
                            postImageAddress: imageAddress,
                          });
                          setShowPostBtn(true);
                        }
                      } catch (error) {
                        setSomeErrorWhileUploadingImage(error.message);
                      }
                    }}
                  />
                  {didntSelectAnyImageError && (
                    <p className="text-danger">
                      Please select an image related to your blog!
                    </p>
                  )}
                  {someErrorWhileUploadingImage.length > 0 && (
                    <p className="text-danger">
                      {someErrorWhileUploadingImage}
                    </p>
                  )}
                </>
              ) : (
                <div className=" text-center">
                  <img src={postImage} alt="Preview" className="w-100" />
                  <button
                    className="btn btn-outline-danger mt-2"
                    onClick={async (e) => {
                      e.preventDefault();
                      const desertRef = ref(storage, `${imageAddress}`);
                      await deleteObject(desertRef);
                      setFormData({
                        ...formData,
                        postImage: "",
                        postImageAddress: "",
                      });
                    }}
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
              )}
            </div>
            <div className="col-6">
              <label>Select Category</label>
              <select
                name=""
                id=""
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    postCategory: e.target.value,
                  });
                }}
              >
                <option value="Lifestyle">Lifestyle</option>
                <option value="Fashion">Fashion</option>
                <option value="Music">Music</option>
                <option value="Food">Food</option>
                <option value="Parenting">Parenting</option>
                <option value="Affiliate">Affiliate</option>
                <option value="Personal Finance">Personal Finance</option>
                <option value="Photography">Photography</option>
                <option value="Health">Health</option>
                <option value="Movie">Movie</option>
                <option value="Personal">Personal</option>
                <option value="Travel">Travel</option>
                <option value="Marketing">Marketing</option>
              </select>
            </div>
            <div className="col-12">
              <label>
                Give tags related to your blog! [a space between words means
                it's a tag]
              </label>
              <input
                type="text"
                placeholder="eg; #Lifestyle #Shoot #Team #Chill..."
                value={postTags}
                name="postTags"
                onChange={(e) => {
                  inputChange(e);
                }}
              />
            </div>
            <div className="col-12">
              <label>Type your blog here...</label>
              {blogParaInputsValues.map((item, index) => (
                <div key={index}>
                  <textarea
                    type="text"
                    placeholder={`Paragraph ${index + 1}`}
                    rows={10}
                    value={item}
                    onChange={(e) => {
                      let allInputsValues = [...blogParaInputsValues];
                      allInputsValues[index] = e.target.value;
                      setBlogParaInputsValues(allInputsValues);
                      setFormData({
                        ...formData,
                        postBlogsPara: allInputsValues,
                      });
                      setAddMoreParasError(false);
                      setMinimum4BlogParas(false);
                    }}
                  ></textarea>
                </div>
              ))}
              {addMoreParasError && (
                <p className="text-danger">
                  You have to enter a paragraph of minimum 1000 letters in all
                  to continue to add more paragraphs! [1 Para - Minimum 1000
                  letters]
                </p>
              )}
              {minimum4BlogParas && (
                <p className="text-danger">
                  You have to type minimum 4 complete paragraphs before posting
                  it! [1 Para - Minimum 1000 letters]
                </p>
              )}
              {removeAddParaBtn && (
                <>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      const allInputsValues = [...blogParaInputsValues];
                      let empty = allInputsValues.every(
                        (item) => item !== "" && item.length > 1000
                      );
                      if (empty) {
                        if (blogParaInputsValues.length < 10) {
                          setBlogParaInputsValues([
                            ...blogParaInputsValues,
                            "",
                          ]);
                          if (blogParaInputsValues.length === 9) {
                            setRemoveAddParaBtn(false);
                          }
                        }
                      } else {
                        setAddMoreParasError(true);
                        setMinimum4BlogParas(false);
                      }
                    }}
                  >
                    Add Para...
                  </button>
                </>
              )}
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
