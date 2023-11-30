import React, { useEffect, useState } from "react";
import "./SCSS/EditProfilePage.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import storage from "../Utils/Firebase.Storage";
import axios from "axios";
import { editUserAccountStart } from "../Redux(Saga)/Actions/UserAction";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );

  //if authorised then stay otherwise it will render user to login Page
  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("jwToken")) {
      //   setUserData(UserDataFromResponse);
    } else {
      navigate("/myProfile");
    }
  }, [UserDataFromResponse]);

  //initialFormData
  const initialFormData = {
    Name: UserDataFromResponse.Name,
    userName: UserDataFromResponse.userName,
    profilePicture: UserDataFromResponse.profilePicture,
    Biography: UserDataFromResponse.Biography,
  };

  // form state
  const [formData, setFormData] = useState(initialFormData);
  // destructuring
  const { Name, userName, profilePicture, Biography } = formData;
  const [defaultProfilePicture, setDeafaultProfilePicture] = useState(
    "https://firebasestorage.googleapis.com/v0/b/blog-app-2d912.appspot.com/o/icon.webp?alt=media&token=99270953-b1b0-40bd-99a8-e381c255afcb"
  );
  // it's for knowing the user changing the dp or uploading their first dp!?
  const [changingProfilePicture, setChangingProfilePicture] = useState(false); // if false it means user uploading their first dp!
  // username available or nott
  const [userNameAvailable, setUserNameAvailable] = useState(false);
  const [userNameNotAvailable, setUserNameNotAvailable] = useState(false); // asigning double becoz of some UX and looks of showing available or not!!
  const [showCheckBtn, setShowCheckBtn] = useState(false);

  //empty errors
  const [emptyNameError, setEmptyNameError] = useState(false);
  const [emptyUserNameError, setEmptyUserNameError] = useState(false);

  // so here i created a functionality that if a user upload their pp(profilePicture) then update it then it updated but if user already have pp updated
  // and click on the delete icon or btn but didn't click on update then the image do not updated or deleted if user want to delete then first step is to click on delete btn and then update
  // also if s user select any image then click on delete btn then on update the image is deleted from the database!
  // submit
  const update = async (e) => {
    e.preventDefault();
    if (Name !== "") {
      if (userName !== "") {
        if (userNameAvailable || userName === UserDataFromResponse.userName) {
          if (profilePicture === defaultProfilePicture) {
            try {
              const desertRef = ref(
                storage,
                `/profilePictures/${UserDataFromResponse._id}'s_DP`
              );
              await deleteObject(desertRef);
              formData.token = UserDataFromResponse.jwToken;
              dispatch(editUserAccountStart(formData));
            } catch (error) {
              if (
                error.message ===
                `Firebase Storage: Object 'profilePictures/${UserDataFromResponse._id}'s_DP' does not exist. (storage/object-not-found)`
              ) {
                formData.token = UserDataFromResponse.jwToken;
                dispatch(editUserAccountStart(formData));
              } else {
                alert(error);
              }
            }
          } else {
            formData.token = UserDataFromResponse.jwToken;
            dispatch(editUserAccountStart(formData));
          }
        } else {
          setUserNameNotAvailable(true);
        }
      } else {
        setEmptyUserNameError(true);
      }
    } else {
      setEmptyNameError(true);
    }
  };

  // handling update completion
  useEffect(() => {
    console.log(UserDataFromResponse);
    if (UserDataFromResponse.hasOwnProperty("updated")) {
      delete UserDataFromResponse.updated;
      localStorage.setItem(
        "blogApp",
        JSON.stringify({
          token: UserDataFromResponse.jwToken,
          validity: "15 minutes",
        })
      );
      setFormData(UserDataFromResponse);
      navigate("/myProfile");
    }
  }, [UserDataFromResponse]);

  return (
    <>
      <div className="container-fluid editPage">
        <form className="container" onSubmit={update}>
          <h1 className="h1">Edit your profile:</h1>
          <div className="row d-flex">
            <div className="col-6">
              <input
                type="text"
                placeholder="Name"
                value={Name}
                name="Name"
                required
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    Name: e.target.value,
                  });
                }}
              />
            </div>
            <div className="col-6">
              <input
                type="text"
                placeholder="Username"
                value={userName}
                name="userName"
                required
                onChange={async (e) => {
                  setFormData({
                    ...formData,
                    userName: e.target.value,
                  });
                  if (e.target.value === UserDataFromResponse.userName) {
                    setShowCheckBtn(false);
                  } else {
                    setShowCheckBtn(true);
                    setUserNameAvailable(false);
                    setUserNameNotAvailable(false);
                  }
                }}
              />
              {showCheckBtn && (
                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    if (userName === UserDataFromResponse.userName) {
                      setUserNameAvailable(true);
                      setUserNameNotAvailable(false);
                    } else {
                      const response = await axios.get(
                        `http://localhost:8080/v1/UserApi/checkUserNameAvailableOrNOT/${userName}`
                      );
                      console.log(response);
                      if (response.data.hasOwnProperty("someErrorOccured")) {
                        alert("someError");
                      } else if (response.data === true) {
                        setUserNameAvailable(true);
                        setUserNameNotAvailable(false);
                        setShowCheckBtn(false);
                      } else {
                        setUserNameAvailable(false);
                        setUserNameNotAvailable(true);
                        setShowCheckBtn(false);
                      }
                    }
                  }}
                >
                  check
                </button>
              )}
              {userNameAvailable && (
                <>
                  <p className="text-success">Available</p>
                </>
              )}
              {userNameNotAvailable && (
                <>
                  <p className="text-danger">Not Available</p>
                </>
              )}
            </div>
            <div className="col-6">
              <label>Profile Picture</label>
              {profilePicture === defaultProfilePicture ? (
                <input
                  accept="image/*"
                  type="file"
                  onChange={async (e) => {
                    const folderPath = "profilePictures";
                    const fileName = `${UserDataFromResponse._id}'s_DP`;
                    const filePath = `${folderPath}/${fileName}`;
                    const storageRef = ref(storage, filePath);
                    if (changingProfilePicture) {
                      // its for replacing a profile picture
                      try {
                        await uploadBytes(storageRef, e.target.files[0]);
                        const url = await getDownloadURL(storageRef);
                        setFormData({
                          ...formData,
                          profilePicture: url,
                        });
                        console.log(formData);
                      } catch {
                        alert(
                          "Something went wrong, while uploading your profile picture! Please try again!"
                        );
                      }
                    } else {
                      // its for uploading a new profile picture
                      try {
                        await uploadBytes(storageRef, e.target.files[0]);
                        const url = await getDownloadURL(storageRef);
                        setFormData({
                          ...formData,
                          profilePicture: url,
                        });
                        console.log(formData);
                      } catch {
                        alert(
                          "Something went wrong, while uploading your profile picture! Please try again!"
                        );
                      }
                    }
                  }}
                />
              ) : (
                <div className="row ppDiv">
                  <div className="col-6">
                    <img src={profilePicture} alt="Profile Picture" id="dp" />{" "}
                  </div>
                  <div className="col-4">
                    <button
                      id="dpDeleteBTn"
                      onClick={() => {
                        setChangingProfilePicture(true);
                        setFormData({
                          ...formData,
                          profilePicture: defaultProfilePicture,
                        });
                      }}
                    >
                      <i class="bi bi-trash3"></i>
                    </button>
                  </div>
                </div>
              )}
            </div>
            <div className="col-6">
              <label htmlFor="bio">Biography</label>
              <textarea
                id="bio"
                type="text"
                rows={4}
                placeholder="eg' About Your Profession
              About Your Hobbies
              About Your Passion"
                value={Biography}
                name="Biography"
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    Biography: e.target.value,
                  });
                }}
              ></textarea>
            </div>
            <div className="text-center col-12">
              <button type="submit">Update</button>
            </div>
          </div>
        </form>
        <form className="container mt-5 px-5">
          <h1
            className="h5 text-danger"
            style={{ textDecoration: "underline", cursor: "pointer" }}
          >
            Add your email to your profile!
          </h1>
        </form>
      </div>
    </>
  );
}

{
  /* <div className="col-6">
<textarea
  type="text"
  rows={4}
  className=" form-control"
  placeholder="Type your Biography"
/>
</div> */
}
{
  /* <div className="col-6">
              <label className="form-control-label">Profile Picture</label>
              <input
                type="file"
                accept="image/*"
                className=" form-control"
                placeholder="Profile Picture"
                // onChange={(event) => {
                //   // setFile(event.target.files[0]);
                // }}
              />
            </div> */
}

//   <div className="col-6">
//   <input
//     type="email"
//     className=" form-control"
//     placeholder="Email"
//   />
// </div>

// const image_Change = async (event) => {
//   // setImage(event.target.files[0]);

//   // its for replacing a profile picture and used for change the dp
//   const folderPath = 'profilePictures/1699953721315___Screenshot 2023-06-23 123139.png';
//   const storageRef = ref(storage, folderPath);

//   // its for uploading a new profile picture
//   // const folderPath = 'profilePictures';
//   // const fileName = `${Date.now()}___${event.target.files[0].name}`;
//   // const filePath = `${folderPath}/${fileName}`;
//   // const storageRef = ref(storage, filePath);

//   try {
//     // Upload the file to the specified folder path
//     await uploadBytes(storageRef, event.target.files[0]);

//     // Get the download URL of the uploaded file
//     const url = await getDownloadURL(storageRef);

//     // Set the image URL state or save it to your database
//     // setImageUrl(url);
//     console.log(url);
//   } catch (error) {
//     console.error('Error uploading image:', error);
//     // Handle errors as needed
//   }
// };

//to delete file

// const storage = getStorage();

// // Create a reference to the file to delete
//

// // Delete the file
// deleteObject(desertRef).then(() => {
//   // File deleted successfully
// }).catch((error) => {
//   // Uh-oh, an error occurred!
// });
