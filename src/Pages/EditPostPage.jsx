import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { verifyUserAuthStart } from "../Redux(Saga)/Actions/UserAction";
import {
  deleteBlogStart,
  deleteBlogSuccess,
  getPostDataStart,
  updateBlogStart,
  updateBlogSuccess,
} from "../Redux(Saga)/Actions/PostAction";
import storage from "../Utils/Firebase.Storage";
import { deleteObject, ref } from "firebase/storage";

export default function EditPostPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );
  const getPostDataResponse = useSelector(
    (state) => state.postReducer.getPostDataResponse
  );
  const updateBlogResponse = useSelector(
    (state) => state.postReducer.updateBlogResponse
  );
  const deleteBlogResponse = useSelector(
    (state) => state.postReducer.deleteBlogResponse
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
      if (
        UserDataFromResponse.myPosts.every(
          (item) => item.postId !== params.postId
        )
      ) {
        navigate(`/blog/${params.postId}`);
      }
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

  // to get post data!
  useEffect(() => {
    const jwToken = JSON.parse(localStorage.getItem("blogApp"));
    dispatch(getPostDataStart({ postId: params.postId, token: jwToken.token }));
  }, [params.postId]);

  // handling response
  useEffect(() => {
    if (getPostDataResponse.hasOwnProperty("userName")) {
      // setPostData(getPostDataResponse);
      const tags = getPostDataResponse.postTags.join(" ");
      const initialFormData = {
        postTitle: getPostDataResponse.postTitle,
        postCaption: getPostDataResponse.postCaption,
        postCategory: getPostDataResponse.postCategory,
        postImage: getPostDataResponse.postImage,
        postImageAddress: getPostDataResponse.postImageAddress,
        postTags: tags,
        postBlogsPara: getPostDataResponse.postBlogsPara,
        postId: params.postId,
      };
      setFormData(initialFormData);
      setBlogParaInputsValues(getPostDataResponse.postBlogsPara);
    }
  }, [getPostDataResponse]);

  // blog post form related functions and state-
  const initialFormData = {
    postTitle: "",
    postCaption: "",
    postImage: "",
    postCategory: "",
    postImageAddress: "",
    postTags: ["", ""],
    postBlogsPara: [""],
  };

  const [formData, setFormData] = useState(initialFormData);
  const {
    postTitle,
    postCaption,
    postImage,
    postImageAddress,
    postCategory,
    postTags,
    postBlogsPara,
  } = formData;

  // specially handled the state for blogs para's
  const [blogParaInputsValues, setBlogParaInputsValues] = useState(["", ""]);

  // remove add para button
  const [removeAddParaBtn, setRemoveAddParaBtn] = useState(true);

  // error for add more paras
  const [addMoreParasError, setAddMoreParasError] = useState(false);

  // errors for all inputs
  const [emptyTitleError, setEmptyTitleError] = useState(false);
  const [emptyCaptionError, setEmptyCaptionError] = useState(false);
  const [minimum4BlogParas, setMinimum4BlogParas] = useState(false);

  // input change handle
  const inputChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  //update
  const update = (e) => {
    e.preventDefault();
    if (postTitle !== "" && postTitle.length < 50) {
      if (postCaption.length > 30) {
        if (
          postBlogsPara.length >= 4 &&
          postBlogsPara.every((item) => item.length >= 1000)
        ) {
          const jwToken = JSON.parse(localStorage.getItem("blogApp"));
          const updatedData = {
            postData: formData,
            token: jwToken.token,
          };
          dispatch(updateBlogStart(updatedData));
        } else {
          setMinimum4BlogParas(true);
          setAddMoreParasError(false);
        }
      } else {
        setEmptyCaptionError(true);
      }
    } else {
      setEmptyTitleError(true);
    }
  };

  // to delete this post
  const [showConfirmBtn, setShowConfirmBtn] = useState(false);
  const confirmDelete = (e) => {
    e.preventDefault();
    const jwToken = JSON.parse(localStorage.getItem("blogApp"));
    const data = {
      postId: params.postId,
      token: jwToken.token,
    };
    dispatch(deleteBlogStart(data));
  };

  // handling response of update post
  useEffect(() => {
    if (updateBlogResponse.hasOwnProperty("postUpdated")) {
      if (updateBlogResponse.postUpdated) {
        dispatch(updateBlogSuccess({}));
        navigate(`/myBlog/${params.postId}`);
      }
    }
  }, [updateBlogResponse]);

  //handling response of delete post
  useEffect(() => {
    if (deleteBlogResponse.hasOwnProperty("postDeleted")) {
      if (deleteBlogResponse.postDeleted) {
        deletePostImage();
        dispatch(deleteBlogSuccess({}));
        navigate("/myProfile");
      }
    }
  }, [deleteBlogResponse]);
  // to delete post image from storage
  const deletePostImage = async () => {
    const desertRef = ref(storage, postImageAddress);
    await deleteObject(desertRef);
  };

  return (
    <>
      <div className="container-fluid AddPostContainer">
        <form className="container" onSubmit={update}>
          {postCategory.length > 0 ? (
            <>
              <div className="row d-flex">
                <div className="col-9 w-50">
                  <h1 className="h1 text-light">Update your Blog</h1>
                </div>
                <div className="col-3 w-50 text-end postBtn">
                  <button type="submit">Update</button>
                </div>
                <div className="col-6">
                  <label>Title [0 - 50 letters]</label>
                  <input
                    type="text"
                    placeholder="Blog's Title"
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
                  <label>Caption</label>

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
                    <p className="text-danger">
                      Please enter your blog's Caption!
                    </p>
                  )}
                </div>

                <div className="col-6">
                  <label>Image is not change-able!</label>
                  <img src={postImage} alt="" className="w-100" />
                </div>
                <div className="col-6">
                  <label>Category is not change-able!</label>
                  <input type="text" readOnly value={postCategory} />
                </div>
                <div className="col-12">
                  <label>
                    Give tags related to your blog! [a #hash before a word means
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
                  {postCategory.length > 0 &&
                    blogParaInputsValues.map((item, index) => (
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
                      You have to enter a paragraph of minimum 1000 letters in
                      all to continue to add more paragraphs! [1 Para - Minimum
                      1000 letters]
                    </p>
                  )}
                  {minimum4BlogParas && (
                    <p className="text-danger">
                      You have to type minimum 4 complete paragraphs although if
                      added one more paragraph then you have to complete it! [1
                      Para - Minimum 1000 letters]
                    </p>
                  )}
                  {removeAddParaBtn && (
                    <>
                      <p>
                        Note* If you add one more para then you have to reach
                        minimum length of 1000 letters
                      </p>
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
            </>
          ) : (
            <>no post</>
          )}
        </form>
        <div
          className="row justify-content-center"
          style={{ marginTop: "7rem" }}
        >
          <div className="col-5 text-center">
            <p>Delete this post!</p>
            {showConfirmBtn ? (
              <>
                <button
                  className="btn btn-outline-dark mx-2"
                  onClick={() => setShowConfirmBtn(false)}
                >
                  No back!
                </button>
                <button
                  className="btn btn-danger"
                  onClick={(e) => confirmDelete(e)}
                >
                  I confirm!
                </button>
              </>
            ) : (
              <button
                className="btn btn-outline-danger"
                onClick={() => setShowConfirmBtn(true)}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
