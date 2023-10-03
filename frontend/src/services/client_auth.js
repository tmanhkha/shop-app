import api from "@/api.js";
import {
  setUserToLocalStorage,
  removeUserFromLocalStorage,
} from "@/utils/authUtils";

export const postSignUp = async ({ email, password }) => {
  try {
    const response = await api.post("/clients", {
      client: {
        email,
        password,
      },
    });

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};

export const postSignIn = async ({ email, password }) => {
  try {
    const response = await api.post("/clients/sign_in", {
      client: {
        email,
        password,
      },
    });

    const user = response?.data?.user;
    user.token = response.headers.authorization.replace("Bearer ", "");
    setUserToLocalStorage(user);

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};

export const clientLogout = async () => {
  try {
    const response = await api.delete("/clients/sign_out");
    removeUserFromLocalStorage();
    return response;
  } catch (error) {
    console.error(error);
    return { error: error.response.data.error };
  }
};
