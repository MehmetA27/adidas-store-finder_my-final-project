import axios from "axios";

const baseUrl = "https://www.adidas.com/api/stores";

export const fetchStores = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `${baseUrl}?latitude=${latitude}&longitude=${longitude}`
    );
    return response.data.content;
  } catch (error) {
    console.error("Error fetching stores:", error);
  }
};