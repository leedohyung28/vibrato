// <reference types="vite/client" />

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

fetch(`${apiBaseUrl}/auth/join`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    username: "test",
    password: "password123",
  }),
})
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
