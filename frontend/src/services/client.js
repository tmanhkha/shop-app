import api from "@/api.js";

export const getClients = async ({ page, per_page }) => {
  try {
    const response = await api.get(
      `/api/v1/clients?page=${page}&per_page=${per_page}`,
    );

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};

export const getClient = async ({ id }) => {
  try {
    const response = await api.get(`/api/v1/clients/${id}`);

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};

export const postClient = async ({
  email,
  password,
  payoutRate,
  productIds,
}) => {
  try {
    const response = await api.post("/api/v1/clients", {
      client: {
        email,
        password,
        payout_rate: payoutRate,
        product_ids: productIds,
      },
    });

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};

export const putClient = async ({
  id,
  email,
  password,
  payoutRate,
  productIds,
}) => {
  try {
    const response = await api.put(`/api/v1/clients/${id}`, {
      client: {
        email,
        password,
        payout_rate: payoutRate,
        product_ids: productIds,
      },
    });

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};

export const deleteClient = async ({ id }) => {
  try {
    const response = await api.delete(`/api/v1/clients/${id}`);

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};
