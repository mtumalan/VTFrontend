import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";

import {
  CSRF_ENDPOINT,
  REGISTER_ENDPOINT,
} from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";
import { readCookie } from "../../utils/cookies";

export default function RegisterSection() {
  const { login } = useAuth();
  const router    = useRouter();

  const [loading, setLoading]   = useState(false);
  const [apiError, setApiError] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // 1) Prime CSRF cookie once on mount
  useEffect(() => {
    fetch(CSRF_ENDPOINT, { method: "GET", credentials: "include" });
  }, []);

  // 2) Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");

    try {
      const res = await fetch(REGISTER_ENDPOINT, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken" : readCookie("csrftoken"),
        },
        body: JSON.stringify({
          username         : data.username,
          email            : data.email,
          first_name       : data.firstName,
          last_name        : data.lastName,
          password         : data.password,
          confirm_password : data.confirm, // match your serializer’s confirm_password
        }),
      });

      if (!res.ok) {
        const obj = await res.json();
        throw new Error(
          obj.detail ||
          Object.entries(obj)
              .map(([k, v]) => `${k}: ${v}`)
              .join(" • ")
        );
      }

      // 3) Auto-login after successful registration, then redirect
      await login({ username: data.username, password: data.password });
      router.push("/gallery");
    } catch (err) {
      setApiError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const password = watch("password");

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create an Account</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          {/* First Name */}
          <div className="form-field">
            <input
              type="text"
              placeholder="First name*"
              {...register("firstName", { required: true })}
              className={errors.firstName ? "input error-input" : "input"}
            />
            {errors.firstName && <span className="error-message">Required</span>}
          </div>

          {/* Last Name */}
          <div className="form-field">
            <input
              type="text"
              placeholder="Last name*"
              {...register("lastName", { required: true })}
              className={errors.lastName ? "input error-input" : "input"}
            />
            {errors.lastName && <span className="error-message">Required</span>}
          </div>

          {/* Email */}
          <div className="form-field">
            <input
              type="email"
              placeholder="Email*"
              {...register("email", { required: true })}
              className={errors.email ? "input error-input" : "input"}
            />
            {errors.email && <span className="error-message">Required</span>}
          </div>

          {/* Username */}
          <div className="form-field">
            <input
              type="text"
              placeholder="Username*"
              {...register("username", { required: true })}
              className={errors.username ? "input error-input" : "input"}
            />
            {errors.username && <span className="error-message">Required</span>}
          </div>

          {/* Password */}
          <div className="form-field">
            <input
              type="password"
              placeholder="Password*"
              {...register("password", { required: true })}
              className={errors.password ? "input error-input" : "input"}
            />
            {errors.password && <span className="error-message">Required</span>}
          </div>

          {/* Confirm Password */}
          <div className="form-field">
            <input
              type="password"
              placeholder="Confirm password*"
              {...register("confirm", {
                required: true,
                validate: (v) =>
                  v === password || "Passwords do not match",
              })}
              className={errors.confirm ? "input error-input" : "input"}
            />
            {errors.confirm && (
              <span className="error-message">{errors.confirm.message}</span>
            )}
          </div>

          {apiError && (
            <div className="form-field">
              <span className="server-error-message">{apiError}</span>
            </div>
          )}

          <div className="form-field">
            <button type="submit" className="btn-register" disabled={loading}>
              {loading ? "Registering…" : "Register"}
            </button>
          </div>

          {/* Link to Login page */}
          <div className="form-field" style={{ textAlign: "center", marginTop: "12px" }}>
            <span style={{ color: "#ccc", fontSize: "0.9rem" }}>
              Already have an account?{" "}
              <Link
                href="/login"
                style={{ color: "#ff00d6", textDecoration: "underline" }}
              >
                Login
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}
