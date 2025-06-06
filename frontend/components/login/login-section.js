/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import {
  CSRF_ENDPOINT,
  REGISTER_ENDPOINT,
} from "../../utils/api";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginSection() {
  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [apiError, setApiError]   = useState("");
  const router = useRouter();
  const { login } = useAuth(); // useAuth's login handles POST /login/ + fetching /me/
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 1) On mount, “prime” the CSRF cookie by calling Django’s /api/csrf/
  useEffect(() => {
    fetch(CSRF_ENDPOINT, {
      method: "GET",
      credentials: "include",
    }).catch((err) => {
      console.error("Failed to fetch CSRF token:", err);
    });
  }, []);

  // Helper: read a named cookie from document.cookie
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError("");

    // Grab the CSRF token that Django set in the cookie
    const csrfToken = getCookie("csrftoken");

    try {
      if (isRegister) {
        // 2a) Registration flow: POST to /api/users/register/, then login
        const registerPayload = {
          username: data.username,
          email: data.email,
          password: data.password,
        };

        const regRes = await fetch(REGISTER_ENDPOINT, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken,
          },
          credentials: "include",
          body: JSON.stringify(registerPayload),
        });

        const regJson = await regRes.json();
        if (!regRes.ok) {
          // Show field errors or non_field_errors
          const msg =
            regJson?.non_field_errors?.[0] ||
            regJson?.detail ||
            Object.entries(regJson || {})
              .map(([k, v]) =>
                `${k}: ${Array.isArray(v) ? v.join(", ") : v}`
              )
              .join(" • ") ||
            "Registration failed";
          setApiError(msg);
          setLoading(false);
          return;
        }

        // Registration succeeded; now immediately log the user in so the session is set
        try {
          await login({
            username: data.username,
            password: data.password,
          });
          alert("Registration successful! Redirecting…");
          router.push("/gallery");
        } catch (loginErr) {
          // If login after register fails, show that error
          setApiError(loginErr.message || "Login after register failed");
        }
      } else {
        // 2b) Login flow: delegate to AuthContext.login()
        try {
          await login({
            username: data.username,
            password: data.password,
          });
          alert("Login successful! Redirecting…");
          router.push("/gallery");
        } catch (loginErr) {
          setApiError(loginErr.message || "Login failed");
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setApiError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fugu--contact-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <div className="col-lg-7">
          <div className="fugu--contact-form wow fadeInUpX" data-wow-delay="0.15s">
            <h3>{isRegister ? "Create an Account" : "Welcome Back!"}</h3>
            <div style={{ marginBottom: 20 }}>
              {isRegister ? (
                <span style={{ color: "white" }}>
                  Already have an account?{" "}
                  <button
                    style={{ color: "white" }}
                    type="button"
                    className="link-button"
                    onClick={() => setIsRegister(false)}
                  >
                    Login
                  </button>
                </span>
              ) : (
                <span style={{ color: "white" }}>
                  Don’t have an account?{" "}
                  <button
                    type="button"
                    className="link-button"
                    style={{ color: "white" }}
                    onClick={() => setIsRegister(true)}
                  >
                    Register
                  </button>
                </span>
              )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              {isRegister && (
                <div className="fugu--comment-field">
                  <input
                    type="text"
                    placeholder="Your username*"
                    {...formRegister("username", { required: true })}
                    aria-invalid={errors.username ? "true" : "false"}
                  />
                  {errors.username?.type === "required" && (
                    <p role="alert" className="error">
                      Username is required
                    </p>
                  )}
                </div>
              )}

              {!isRegister && (
                <div className="fugu--comment-field">
                  <input
                    type="text"
                    placeholder="Your username*"
                    {...formRegister("username", { required: true })}
                    aria-invalid={errors.username ? "true" : "false"}
                  />
                  {errors.username?.type === "required" && (
                    <p role="alert" className="error">
                      Username is required
                    </p>
                  )}
                </div>
              )}

              {isRegister && (
                <div className="fugu--comment-field">
                  <input
                    type="email"
                    placeholder="Your Email*"
                    {...formRegister("email", { required: true })}
                    aria-invalid={errors.email ? "true" : "false"}
                  />
                  {errors.email?.type === "required" && (
                    <p role="alert" className="error">
                      Email is required
                    </p>
                  )}
                </div>
              )}

              <div className="fugu--comment-field">
                <input
                  type="password"
                  placeholder="Password*"
                  {...formRegister("password", { required: true })}
                  aria-invalid={errors.password ? "true" : "false"}
                />
                {errors.password?.type === "required" && (
                  <p role="alert" className="error">
                    Password is required
                  </p>
                )}
              </div>

              {apiError && (
                <p
                  role="alert"
                  className="error"
                  style={{ color: "red", marginBottom: 10 }}
                >
                  {apiError}
                </p>
              )}

              <button
                id="fugu--form-submit-btn"
                type="submit"
                disabled={loading}
              >
                {loading
                  ? isRegister
                    ? "Registering..."
                    : "Logging in..."
                  : isRegister
                  ? "Register"
                  : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
