import api from "@/api.js";
import { getUserFromLocalStorage } from "@/utils/authUtils.js";

export const getCards = async ({ page, per_page }) => {
  try {
    const response = await api.get(
      `/api/v1/cards?page=${page}&per_page=${per_page}`,
    );

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};

export const postCard = async ({ productId, name }) => {
  const currentUser = getUserFromLocalStorage();
  try {
    const response = await api.post(`/api/v1/products/${[productId]}/cards`, {
      card: {
        name,
        client_id: currentUser.id,
      },
    });

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};

export const deleteCard = async ({ productId, id }) => {
  try {
    const response = await api.delete(
      `/api/v1/products/${productId}/cards/${id}`,
    );

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};
