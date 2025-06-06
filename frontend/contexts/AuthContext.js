import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { useRouter } from "next/router";
import {
  CSRF_ENDPOINT,
  LOGIN_ENDPOINT,
  CURRENT_USER_URL,
  LOGOUT_ENDPOINT,
} from "../utils/api";
import { readCookie } from "../utils/cookies"; // Assuming you have a utility to read cookies


export const AuthContext = createContext({
  user: null,           // { id, username, email } or null
  isLoggedIn: false,    // boolean flag (user !== null)
  loading: true,        // true while we’re still checking “/current-user/”
  login: async () => {},  // login({username,password})
  logout: async () => {}, // logout()
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const router = useRouter();

  const getCsrfTokenFromCookie = () => {
    if (typeof document === "undefined") return "";
    const match = document.cookie.match(/(?:^|;\s*)csrftoken=([^;]+)/);
    return match ? match[1] : "";
  };

  useEffect(() => {
    let isMounted = true;

    async function initializeSession() {
      try {
        await fetch(CSRF_ENDPOINT, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json", "X-CSRFToken": readCookie("csrftoken") }
        });

        const res = await fetch(CURRENT_USER_URL, {
          method: "GET",
          credentials: "include", // ensures the browser sends any `sessionid` cookie
          headers: { "Content-Type": "application/json", "X-CSRFToken": readCookie("csrftoken") }
        });

        if (!isMounted) return;

        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error("Error during session initialization:", err);
        if (isMounted) setUser(null);
      } finally {
        if (isMounted) setLoadingUser(false);
      }
    }

    initializeSession();
    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async ({ username, password }) => {
    const csrftoken = getCsrfTokenFromCookie();

    const res = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      credentials: "include", // ← browser will store `sessionid` if login succeeds
      headers: { "Content-Type": "application/json", "X-CSRFToken": readCookie("csrftoken") },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      let message = "Login failed";
      try {
        const errObj = await res.json();
        message = errObj.detail || message;
      } catch {}
      throw new Error(message);
    }

    const meRes = await fetch(CURRENT_USER_URL, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json", "X-CSRFToken": readCookie("csrftoken") }
    });
    if (!meRes.ok) {
      throw new Error("Failed to fetch user after login");
    }
    const userData = await meRes.json();
    setUser(userData);
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch(LOGOUT_ENDPOINT, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json", "X-CSRFToken": readCookie("csrftoken") }
      });
    } catch (err) {
      console.error("Logout failed:", err);         // let yourself see the error
      return; 
    }
    setUser(null);
    router.push("/login");
  }, [router]);

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: Boolean(user),
      loading: loadingUser,
      login,
      logout,
    }),
    [user, loadingUser, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
