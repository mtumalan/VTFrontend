/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

import { CSRF_ENDPOINT } from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import { readCookie } from "../../utils/cookies";

export default function LoginSection() {
  const { login } = useAuth();
  const router    = useRouter();

  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm();

  /* prime CSRF cookie */
  useEffect(() => {
    fetch(CSRF_ENDPOINT, { method: "GET", credentials: "include" }).catch(
      (err) => console.error("Failed to fetch CSRF token:", err)
    );
  }, []);

  const onSubmit = async ({ username, password }) => {
    setLoading(true);
    setApiError("");

    try {
      await login({ username, password });
      router.push("/gallery");
    } catch (err) {
      setApiError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Welcome Back!</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          {/* Username */}
          <div className="form-field">
            <input
              placeholder="Username*"
              {...register("username", { required: true })}
              className={errors.username ? "input error-input" : "input"}
            />
            {errors.username && (
              <span className="error-message">Required</span>
            )}
          </div>

          {/* Password */}
          <div className="form-field">
            <input
              type="password"
              placeholder="Password*"
              {...register("password", { required: true })}
              className={errors.password ? "input error-input" : "input"}
            />
            {errors.password && (
              <span className="error-message">Required</span>
            )}
          </div>

          {/* server-side error */}
          {apiError && (
            <div className="form-field">
              <span className="server-error-message">{apiError}</span>
            </div>
          )}

          <div className="form-field">
            <button type="submit" className="btn-register" disabled={loading}>
              {loading ? "Logging in…" : "Login"}
            </button>
          </div>

          {/* Link to Register page */}
          <div className="form-field" style={{ textAlign: "center", marginTop: "12px" }}>
            <span style={{ color: "#ccc", fontSize: "0.9rem" }}>
              Don’t have an account?{" "}
              <Link
                href="/register"
                style={{ color: "#ff00d6", textDecoration: "underline" }}
              >
                Register
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
