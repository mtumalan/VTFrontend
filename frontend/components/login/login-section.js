/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginSection() {
	const [isRegister, setIsRegister] = useState(false);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const onSubmit = (data) => {
		if (isRegister) {
			console.log("Registering", data);
			// Registration logic here
		} else {
			console.log("Logging in", data);
			// Login logic here
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
										placeholder="Your Name*"
										{...register("name", { required: isRegister })}
										aria-invalid={errors.name ? "true" : "false"}
									/>
									{errors.name?.type === "required" && (
										<p role="alert" className="error">
											Name is required
										</p>
									)}
								</div>
							)}
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
							<button id="fugu--form-submit-btn" type="submit">
								{isRegister ? "Register" : "Login"}
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
