//@ts-nocheck
import Axios from "axios";
import { getAccessToken, removeLocalKey } from "./sessionKey";

const API_ROOT = "http://localhost:5000/api/v1/";

//create axios instance
export const instance = Axios.create({
  baseURL: `${API_ROOT}`,
  headers: {
    "Content-Type": "application/json",
    Authorization: `JWT ${getAccessToken()}`,
  },
});

// create axios instance for form data to upload file
export const formDataInstance = Axios.create({
  baseURL: `${API_ROOT}`,
  headers: {
    "Content-Type": `multipart/form-data`,
    Authorization: `JWT ${getAccessToken()}`,
  },
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Show error notification
    console.log(error);
    if (error) {
      window.location.href = "/login";
      removeLocalKey("token");
      removeLocalKey("userInfo")
    }
    return Promise.reject(error);
  }
);

//get data from api
export const getApiData = async (url, param = null) => {
  let response;
  try {
    response = await instance({
      method: "GET",
      url: `${url}`,
      params: param,
      headers: {
        Authorization: `JWT ${getAccessToken()}`,
      },
      transformResponse: [
        function (responseData) {
          // Do whatever you want to transform the data
          return JSON.parse(responseData);
        },
      ],
    });
  } catch (e) {
    return e.response;
  }
  return response;
};

// create form data to upload files
export const postApiFormData = async (fileData) => {
  const { url, formData } = fileData;
  let response;
  try {
    response = await formDataInstance({
      method: "POST",
      url: `${url}`,
      data: formData,
      transformResponse: [
        function (responseData) {
          return JSON.parse(responseData);
        },
      ],
    });
  } catch (e) {
    const error = e.response || {};
    throw error;
  }
  return response;
};

//post data to api
export const postApiData = async (data) => {
  const { url, formData } = data;
  let response;
  try {
    response = await instance({
      method: "POST",
      url: `${url}`,
      data: formData,
      headers: {
        Authorization: `JWT ${getAccessToken()}`,
      },
      transformResponse: [
        function (responseData) {
          //Do whatever you want to transform the data
          return JSON.parse(responseData);
        },
      ],
    });
  } catch (e) {
    const error = e.response || "Something went wrong!!";
    throw error;
  }
  return response;
};

//update data
export const putApiData = async (data) => {
  const { url, formData } = data;
  let response;
  try {
    response = await instance({
      method: "PUT",
      url: `${url}`,
      data: formData,
      headers: {
        Authorization: `JWT ${getAccessToken()}`,
      },
      transformResponse: [
        function (responseData) {
          return JSON.parse(responseData);
        },
      ],
    });
  } catch (e) {
    const error = e.response || {};
    return error;
  }
  return response;
};

//update form data
export const putApiFormData = async (data) => {
  const { url, formData, formikProps } = data;
  let response;
  try {
    response = await formDataInstance({
      method: "PUT",
      url: `${url}`,
      data: formData,
      headers: {
        Authorization: `JWT ${getAccessToken()}`,
      },
      transformResponse: [
        function (responseData) {
          return JSON.parse(responseData);
        },
      ],
    });
  } catch (e) {
    const error = e.response || {};
    return error;
  }
  return response;
};

//delete data
export const deleteApiData = async ({ url }) => {
  let response;
  response = await instance({
    method: "DELETE",
    url: url,
    // params: param,
    headers: {
      Authorization: `JWT ${getAccessToken()}`,
    },
  });
  return response;
};

export { API_ROOT };
