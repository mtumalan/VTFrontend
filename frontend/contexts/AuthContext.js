// contexts/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

// Make sure we import **all three**:
import {
  LOGIN_ENDPOINT,
  CURRENT_USER_URL,
  LOGOUT_ENDPOINT,
} from "../utils/api";

const AuthContext = createContext({
  user: null,            // { id, username, email } or null
  isLoggedIn: false,     // boolean
  login: async (data) => {},
  logout: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();

  // ① On mount, check /api/users/me/
  useEffect(() => {
    async function fetchCurrentUser() {
      try {
        const res = await fetch(CURRENT_USER_URL, {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error fetching current user:", err);
        setUser(null);
      } finally {
        setLoadingUser(false);
      }
    }
    fetchCurrentUser();
  }, []);

  // ② login()
  const login = async ({ username, password }) => {
    try {
      const res = await fetch(LOGIN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // tells the browser to store sessionid cookie
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.detail || "Login failed");
      }
      // On success, sessionid cookie is now set. Re-fetch /me/
      const meRes = await fetch(CURRENT_USER_URL, {
        method: "GET",
        credentials: "include",
      });
      if (meRes.ok) {
        const userData = await meRes.json();
        setUser(userData);
        return;
      } else {
        throw new Error("Could not fetch user after login");
      }
    } catch (err) {
      console.error("Login error:", err);
      throw err;
    }
  };

  // ③ logout()
  const logout = async () => {
    try {
      await fetch(LOGOUT_ENDPOINT, {
        method: "POST",
        credentials: "include",
      });
    } catch (err) {
      console.warn("Logout request error (ignored):", err);
    } finally {
      setUser(null);
      router.push("/login");
    }
  };

  const value = {
    user,
    isLoggedIn: Boolean(user),
    login,
    logout,
  };

  // **** CHANGE #1: Don’t return null for the entire tree.  
  // Instead, render children but pass along loadingUser if needed.
  // For simplicity, I’ll render children immediately; components can check isLoggedIn:
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
