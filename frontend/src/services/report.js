import api from "@/api.js";

export const getReports = async () => {
  try {
    const response = await api.get("/api/v1/reports");

    return response?.data;
  } catch (error) {
    console.error(error);
    return { error: error.response?.data?.error };
  }
};
