import axios from "axios";

export const postABlog = async (data) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/v1/PostApi/PostaBlog",
      data,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw Error("An error occurred while uploading your post!");
  }
};

export const getPostData = async (data) => {
  try {
    const response = await axios.get(
      `http://localhost:8080/v1/PostApi/getPostData/${data.postId}`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw Error("An error occurred while fetching your post!");
  }
};

export const updateBlog = async (data) => {
  try {
    const response = await axios.put(
      `http://localhost:8080/v1/PostApi/updateBlog`,
      data,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw Error("An error occurred while updating your post!");
  }
};

export const deleteBlog = async (data) => {
  try {
    const response = await axios.delete(
      `http://localhost:8080/v1/PostApi/deleteBlog/${data.postId}`,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw Error("An error occurred while deleting your post!");
  }
};

export const getAllPostsData = async (token) => {
  try {
    const response = await axios.get(
      "http://localhost:8080/v1/PostApi/getAllPosts",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw Error("An error occurred while fetching data!");
  }
};

export const likePost = async (data) => {
  try {
    const response = await axios.put(
      "http://localhost:8080/v1/PostApi/likePost",
      data,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw Error("An error occurred while liking this post!");
  }
};

export const unlikePost = async (data) => {
  try {
    const response = await axios.put(
      "http://localhost:8080/v1/PostApi/unlikePost",
      data,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw Error("An error occurred while unliking this post!");
  }
};

export const savePost = async (data) => {
  try {
    const response = await axios.put(
      "http://localhost:8080/v1/PostApi/savePost",
      data,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw Error("An error occurred while saving this post!");
  }
};

export const unsavePost = async (data) => {
  try {
    const response = await axios.put(
      "http://localhost:8080/v1/PostApi/unsavePost",
      data,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw Error("An error occurred while unsaving this post!");
  }
};

export const postComment = async (data) => {
  try {
    const response = await axios.put(
      "http://localhost:8080/v1/PostApi/postComment",
      data,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw Error("An error occurred while posting your comment!");
  }
};

export const deleteComment = async (data) => {
  try {
    const response = await axios.put(
      "http://localhost:8080/v1/PostApi/deleteComment",
      data,
      {
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw Error("An error occurred while deleting your comment!");
  }
};
