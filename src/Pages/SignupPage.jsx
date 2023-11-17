import React, { useEffect, useState } from "react";
import "./SCSS/SignupPage.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createUserAccountStart,
  verifyUserAuthStart,
} from "../Redux(Saga)/Actions/UserAction";
import { useNavigate } from "react-router-dom";
// import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
// import storage from '../Utils/Firebase.Storage';

export default function SignupPage() {
  const navigate = useNavigate();
  //dispatch and state selector
  const dispatch = useDispatch();
  const UserDataFromResponse = useSelector(
    (state) => state.userReducer.UserDataFromResponse
  );
  const authorised = useSelector(
    (state) => state.userReducer.authorised
  );
  // user authorisation
  useEffect(()=>{
    if(authorised.hasOwnProperty('authorised')){
      if(authorised.authorised === false){
        // alert (your token is expired please login)!
      }else{
        navigate("/myProfile");
      }
    }
  },[authorised])
  useEffect(() => {
    //if user is already signedUp!
    if (UserDataFromResponse.hasOwnProperty("data")) {
      navigate("/myProfile");
    } else {
      const tokenInfo = JSON.parse(localStorage.getItem("blogApp"));
      if (tokenInfo.hasOwnProperty("validity")) {
        dispatch(verifyUserAuthStart(tokenInfo.token));
      } 
    }
  }, [UserDataFromResponse]);

  //initial form data
  const initialFormData = {
    userName: "",
    Name: "",
    Password: "",
  };

  // state for form data
  const [formData, setFormData] = useState(initialFormData);

  //destructuring input variable values
  const { Name, userName, Password } = formData;
  // for confirm password!
  const [password, setPassword] = useState("");

  // empty input field error
  const [emptyNameError, setEmptyNameError] = useState(false);
  const [emptyUserNameError, setEmptyUserNameError] = useState(false);
  const [emptyPassword, setEmptyPassword] = useState(false);
  const [passwordDoesNotMatchingError, setPasswordDoesNotMatchingError] =
    useState(false);

  // handling input change
  const inputChange = (e) => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // dispatching data
  const createAccount = (e) => {
    e.preventDefault();
    if (userName !== "") {
      if (Name !== "") {
        if (Password !== "" && (Password.length > 8 || Password.length === 8)) {
          if (password === Password) {
            // console.log(formData);
            dispatch(createUserAccountStart(formData));
          } else {
            setPasswordDoesNotMatchingError(true);
          }
        } else {
          setEmptyPassword(true);
        }
      } else {
        setEmptyNameError(true);
      }
    } else {
      setEmptyUserNameError(true);
    }
  };

  // handling error of userName is already in use...!!
  const [userNameAlreadyInUse, setUserNameAlreadyInUse] = useState(false);
  useEffect(() => {
    if (UserDataFromResponse.hasOwnProperty("userCreated")) {
      if (UserDataFromResponse.userCreated) {
        // if true here's code execute---(means account is created!)
        localStorage.setItem(
          "blogApp",
          JSON.stringify({
            token: UserDataFromResponse.data.jwToken,
            validity: "1 hour",
          })
        );
        setFormData(initialFormData);
        setPassword("");
        navigate("/myProfile");
      } else {
        if (UserDataFromResponse.hasOwnProperty("userNameIsUnique")) {
          setUserNameAlreadyInUse(true);
        }
      }
    }
  }, [UserDataFromResponse]);

  return (
    <>
      <div className="container-fluid signUp">
        <form className="container" onSubmit={createAccount}>
          <h2 className="h2">Create your Blogger Account!</h2>
          <div className="row d-flex justify-content-center">
            <div className="col-7">
              <input
                type="text"
                className=" form-control"
                placeholder="UserName"
                name="userName"
                value={userName}
                onChange={(e) => {
                  inputChange(e);
                  setEmptyUserNameError(false);
                  setUserNameAlreadyInUse(false);
                }}
              />
              {emptyUserNameError && (
                <p className="text-danger">
                  Please enter any username you want to showcase on your
                  profile!
                </p>
              )}
              {userNameAlreadyInUse && (
                <p className="text-danger">
                  This username is already in use! Try different one.
                </p>
              )}
            </div>
            <div className="col-7">
              <input
                type="text"
                className="form-control"
                name="Name"
                value={Name}
                placeholder="Full Name"
                onChange={(e) => {
                  inputChange(e);
                  setEmptyNameError(false);
                }}
              />
              {emptyNameError && (
                <p className="text-danger">Please enter your full name!</p>
              )}
            </div>
            <div className="col-7">
              <input
                type="password"
                value={password}
                className=" form-control"
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="col-7">
              <input
                type="password"
                className=" form-control"
                name="Password"
                placeholder="Confirm Password"
                value={Password}
                onChange={(e) => {
                  inputChange(e);
                  setEmptyPassword(false);
                  setPasswordDoesNotMatchingError(false);
                }}
              />
              {emptyPassword && (
                <p className="text-danger">
                  Please enter a strong password [minLength:8,include:(Symbol,
                  i.e. @,#,$,%,&)]!
                </p>
              )}
              {passwordDoesNotMatchingError && (
                <p className="text-danger">
                  Password you entered doesn't matching!
                </p>
              )}
            </div>
            <div className="col-12 text-center">
              <button type="submit">Create Account</button>
            </div>
          </div>
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
//   const fileName = `${Date.now()}___${event.target.files[0].name}`;
//   const filePath = `${folderPath}/${fileName}`;
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
