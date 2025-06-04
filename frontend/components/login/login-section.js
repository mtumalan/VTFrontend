/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { LOGIN_ENDPOINT, REGISTER_ENDPOINT } from "../../utils/api";

export default function LoginSection() {
	const [isRegister, setIsRegister] = useState(false);
	const [loading, setLoading] = useState(false);
	const [apiError, setApiError] = useState("");
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = async (data) => {
		setLoading(true);
		setApiError("");
		try {
			const endpoint = isRegister ? REGISTER_ENDPOINT : LOGIN_ENDPOINT;
			const payload = isRegister
				? { username: data.username, email: data.email, password: data.password }
				: { username: data.username, password: data.password };
			const response = await fetch(endpoint, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
				credentials: "include", // for session cookies if needed
			});
			const result = await response.json();
			if (!response.ok) {
				setApiError(result?.non_field_errors?.[0] || result?.detail || "Something went wrong");
				return;
			}
			alert(isRegister ? "Registration successful!" : "Login successful!");
			router.push("/");
		} catch (err) {
			setApiError("Network error. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="fugu--contact-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
			<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
				<div className="col-lg-7">
					<div className="fugu--contact-form wow fadeInUpX" data-wow-delay="0.15s">
						<h3>{isRegister ? "Create an Account" : "Welcome Back!"}</h3>
						<div style={{ marginBottom: 20 }}>
							{isRegister ? (
								<span style={{ color: 'white' }}>
									Already have an account?{" "}
									<button style={{ color: 'white' }} type="button" className="link-button" onClick={() => setIsRegister(false)}>
										Login
									</button>
								</span>
							) : (
								<span style={{ color: 'white' }}>
									Don’t have an account?{" "}
									<button type="button" className="link-button" style={{ color: 'white' }} onClick={() => setIsRegister(true)}>
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
										{...register("username", { required: isRegister })}
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
										{...register("username", { required: true })}
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
										{...register("email", { required: true })}
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
									{...register("password", { required: true })}
									aria-invalid={errors.password ? "true" : "false"}
								/>
								{errors.password?.type === "required" && (
									<p role="alert" className="error">
										Password is required
									</p>
								)}
							</div>
							{apiError && (
								<p role="alert" className="error" style={{ color: 'red', marginBottom: 10 }}>{apiError}</p>
							)}
							<button id="fugu--form-submit-btn" type="submit" disabled={loading}>
								{loading ? (isRegister ? "Registering..." : "Logging in...") : (isRegister ? "Register" : "Login")}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
