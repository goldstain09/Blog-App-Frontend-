import axios from "axios";

// for creating a user (USER Functions for sending requests):
export const createUserAccount = async (user_Info) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/v1/UserApi/createNewUser",
      user_Info
    );
    return response.data;
  } catch (error) {
    throw Error(
      `Sorry! Your account is not created at the moment, due to some reasons [${error}]`
    );
  }
};
export const verifyUserAuth = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/v1/UserApi/verifyUserAuth",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw Error(
      `Sorry! Your account is not created at the moment, due to some reasons [${error}]`
    );
  }
};

export const loginUserAccount = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/v1/UserApi/loginUser",
      data
    );
    return response.data;
  } catch (error) {
    throw Error(
      `Sorry! Your account is not created at the moment, due to some reasons [${error}]`
    );
  }
};
