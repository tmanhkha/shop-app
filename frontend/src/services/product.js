import api from "@/api.js";

export const getProducts = async ({ page, per_page }) => {
  try {
    const response = await api.get(
      `/api/v1/products?page=${page}&per_page=${per_page}`,
    );

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};

export const getProduct = async ({ id }) => {
  try {
    const response = await api.get(`/api/v1/products/${id}`);

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};

export const postProduct = async ({
  name,
  description,
  brand_id,
  status,
  priceList,
}) => {
  try {
    const response = await api.post("/api/v1/products", {
      product: {
        name,
        description,
        brand_id,
        status,
        prices_attributes: priceList,
      },
    });

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};

export const putProduct = async ({
  id,
  name,
  description,
  brand_id,
  status,
  priceList,
}) => {
  try {
    const response = await api.put(`/api/v1/products/${id}`, {
      product: {
        name,
        description,
        brand_id,
        status,
        prices_attributes: priceList,
      },
    });

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};

export const deleteProduct = async ({ id }) => {
  try {
    const response = await api.delete(`/api/v1/products/${id}`);

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};
