import api from "@/api.js";

export const getBrands = async ({ page, per_page }) => {
  try {
    const response = await api.get(
      `/api/v1/brands?page=${page}&per_page=${per_page}`,
    );

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};

export const getBrand = async ({ id }) => {
  try {
    const response = await api.get(`/api/v1/brands/${id}`);

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};

export const postBrand = async ({ name, description, country, status }) => {
  try {
    const response = await api.post("/api/v1/brands", {
      brand: {
        name,
        description,
        country,
        status,
      },
    });

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};

export const putBrand = async ({ id, name, description, country, status }) => {
  try {
    const response = await api.put(`/api/v1/brands/${id}`, {
      brand: {
        name,
        description,
        country,
        status,
      },
    });

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};

export const deleteBrand = async ({ id }) => {
  try {
    const response = await api.delete(`/api/v1/brands/${id}`);

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};
