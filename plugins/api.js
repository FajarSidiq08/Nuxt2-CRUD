// plugins/api.js
export default function ({ $axios }, inject) {
  const api = $axios.create({
    headers: {
      common: {
      },
    },
  });

  api.setBaseURL(process.env.API_URL || "http://localhost:8000");

  api.onRequest((config) => {
    const token = localStorage.getItem("auth-key");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  inject("api", api);
}
