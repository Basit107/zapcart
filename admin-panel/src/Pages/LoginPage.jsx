import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Loader } from "lucide-react";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const LoginPage = () => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);

	const { email, password } = formData;
	const setEmail = (value) => setFormData({ ...formData, email: value });
	const setPassword = (value) => setFormData({ ...formData, password: value });

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		login().finally(() => setLoading(false));
	};

	const login = async () => {
		console.log("login Function Executed: ", formData);

		let responseData;
		await fetch(`${API_BASE_URL}/api/v1/auth/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/form-data',
			},
			body: JSON.stringify(formData),
		})
			.then((response) => response.json())
			.then((data) => responseData = data);

		if (responseData.success) {
			localStorage.setItem('auth-token', responseData.data.token);
			localStorage.setItem('user-id', responseData.data.user._id);
			window.location.replace("/");
		} else {
			alert(responseData.message);
		}
	};

	return (
		<div className="container-lg d-flex align-middle justify-content-center" style={{ minHeight: "100vh" }}>
			<motion.div
				initial={{ opacity: 0, y: -20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				className="text-center mb-3"
			>
				<h2 className="text-success">Login to your account</h2>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				className="d-flex justify-content-center align-items-center vh-100"
			>
				<div className="col-xl-12 container-lg justify-content-center mx-lg-3">
					<div className="card bg-dark text-light">
						<div className="card-body p--4">
							<form onSubmit={handleSubmit}>
								<div className="mb-3">
									<label htmlFor="email" className="form-label">Email address</label>
									<div className="input-group">
										<span className="input-group-text bg-secondary border-secondary text-light">
											<Mail size={16} />
										</span>
										<input
											id="email"
											type="email"
											required
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="form-control bg-light text-dark border-secondary"
											placeholder="you@example.com"
										/>
									</div>
								</div>

								<div className="mb-3">
									<label htmlFor="password" className="form-label">Password</label>
									<div className="input-group">
										<span className="input-group-text bg-secondary border-secondary text-light">
											<Lock size={16} />
										</span>
										<input
											id="password"
											type="password"
											required
											value={password}
											onChange={(e) => setPassword(e.target.value)}
											className="form-control bg-light text-dark border-secondary"
											placeholder="••••••••"
										/>
									</div>
								</div>

								<button
									type="submit"
									className="btn btn-success w-100 d-flex align-items-center justify-content-center"
									disabled={loading}
								>
									{loading ? (
										<>
											<Loader className="me-2 spinner-border spinner-border-sm" />
											Loading...
										</>
									) : (
										<>
											<LogIn className="me-2" />
											Login
										</>
									)}
								</button>
							</form>

							<p className="text-center text-light mt-3">
								Don't have an account?{" "}
								<span className="text-info" style={{ cursor: "pointer" }}>
									{/* Link component can be added back when signup is ready */}
									Sign up
								</span>
							</p>
						</div>
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default LoginPage;
