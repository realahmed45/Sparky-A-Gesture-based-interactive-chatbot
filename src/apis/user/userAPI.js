import axios from "axios";

//=======Registration=====
export const registerAPI = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:8090/api/v1/users/register",
      {
        email: userData?.email,
        password: userData?.password,
        username: userData?.username,
      },
      {
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Please log in again.");
      // Handle 401 error, such as redirecting to login page or displaying an error message
    } else {
      console.error("Registration failed:", error.message);
      // Handle other errors
    }
    throw error; // Rethrow the error to propagate it to the caller
  }
};

//=======Login=====
export const loginAPI = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:8090/api/v1/users/login",
      {
        email: userData?.email,
        password: userData?.password,
      },
      {
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Incorrect email or password.");
      // Handle 401 error, such as displaying an error message
    } else {
      console.error("Login failed:", error.message);
      // Handle other errors
    }
    throw error; // Rethrow the error to propagate it to the caller
  }
};

//=======Check auth=====
export const checkUserAuthStatusAPI = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8090/api/v1/users/auth/check",
      {
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: User is not authenticated.");
      // Handle 401 error, such as redirecting to login page or displaying an error message
    } else {
      console.error("Failed to check authentication status:", error.message);
      // Handle other errors
    }
    throw error; // Rethrow the error to propagate it to the caller
  }
};

//=======Logout=====
export const logoutAPI = async () => {
  try {
    const response = await axios.post(
      "http://localhost:8090/api/v1/users/logout",
      {},
      {
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: User is not authenticated.");
      // Handle 401 error, such as redirecting to login page or displaying an error message
    } else {
      console.error("Logout failed:", error.message);
      // Handle other errors
    }
    throw error; // Rethrow the error to propagate it to the caller
  }
};

//=======Get User Profile=====
export const getUserProfileAPI = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8090/api/v1/users/profile",
      {
        withCredentials: true,
      }
    );
    return response?.data;
  } catch (error) {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: User is not authenticated.");
      // Handle 401 error, such as redirecting to login page or displaying an error message
    } else {
      console.error("Failed to get user profile:", error.message);
      // Handle other errors
    }
    throw error; // Rethrow the error to propagate it to the caller
  }
};
