// src/services/authService.ts

class AuthService {
    getAccessToken() {
      return localStorage.getItem("accessToken");
    }
  
    getRefreshToken() {
      return localStorage.getItem("refreshToken");
    }
  
    async refreshAccessToken() {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }
  
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refreshToken }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to refresh access token");
      }
  
      const data = await response.json();
      localStorage.setItem("accessToken", data.accessToken);
      return data.accessToken;
    }
  
    logout() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      window.location.href = "/login"; // Redirect ke login setelah logout
    }
  }
  
  export default new AuthService();
  