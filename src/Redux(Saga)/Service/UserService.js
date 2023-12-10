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

export const editUserAccount = async (data) => {
  try {
    const response = await axios.put(
      "http://localhost:8080/v1/UserApi/editUser",
      data,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
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

export const addUserEmail = async (data) => {
  try {
    const response = await axios.put(
      "http://localhost:8080/v1/UserApi/addUserEmail",
      data,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
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

export const removeUserEmail = async (token) => {
  try {
    // console.log(token);
    const response = await axios.put(
      "http://localhost:8080/v1/UserApi/removeUserEmail",
      {}, // in put type rqst if u didn't want to send any data then u can't use second arg. for headers ---
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

export const changePassword = async (data) => {
  try {
    const response = await axios.put(
      "http://localhost:8080/v1/UserApi/changeUserPassword",
      data,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw Error("sorry-----------");
  }
};

export const forgetChangePassword = async (data) => {
  try {
    const response = await axios.put(
      "http://localhost:8080/v1/UserApi/forgetChangeUserPassword",
      data,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw Error("sorry-----------");
  }
};

export const checkPasswordForDeleteAccount = async (data) => {
  try {
    const response = await axios.put(
      "http://localhost:8080/v1/UserApi/checkPasswordForDeleteAccount",
      data,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw Error("sorry-----------");
  }
};

export const deleteUserAccount = async (token) => {
  try {
    const response = await axios.delete(
      "http://localhost:8080/v1/UserApi/deleteUserAccount",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw Error("sorry-----------");
  }
};

export const getBloggerData = async (data) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/v1/UserApi/getBloggerData",
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
        params: {
          bloggerId: data.bloggerId,
        },
      }
    );
    return response.data;
  } catch (error) {}
};
