// api.js

const apiLink = "127.0.0.1:8000";

export async function callAPI(email) {
    try {
      // Make the API call using the provided email
      const response = await fetch(`http://${apiLink}/createacct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "email": email }),
      });
  
      if (!response.ok) {
        throw new Error("API call failed");
      }
  
      // Process the API response
      const data = await response.json();
      console.log("API response:", data);
    } catch (error) {
      console.error("An error occurred during the API call:", error);
    }
  }
  
