import axios from 'axios';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Define the maximum number of retries
const MAX_RETRIES = 3;

export const fetchEmployees = async (retryCount = 0) => {
  try {
    const response = await axios.get("https://api.allorigins.win/raw?url=https://dummy.restapiexample.com/api/v1/employees");
    return response.data.data;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      if (retryCount < MAX_RETRIES) {
        console.log(`Received a 429 error. Retrying after a delay (Retry ${retryCount + 1})...`);
        // Implement rate limiting here by waiting before retrying
        await delay(5000); // Wait for 5 seconds before retrying
        return fetchEmployees(retryCount + 1); // Retry the request
      } else {
        console.error(`Exceeded maximum number of retries (${retryCount})`);
        throw new Error("Service temporarily unavailable.");
      }
    } else {
      console.error("Network response was not ok");
      throw error;
    }
  }
};
