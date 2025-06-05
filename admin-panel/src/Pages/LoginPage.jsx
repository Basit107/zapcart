import { useState } from "react";
import { motion } from "framer-motion";
import { LogIn, Mail, Lock, Loader } from "lucide-react";
import { div } from "framer-motion/client";
import api from "../config/axios.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { set } from "mongoose";

const LoginPage = () => {
	const [formData, setFormData] = useState({ email: "", password: "" });
	const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth(); // from AuthContext

	const setEmail = (value) => setFormData({ ...formData, email: value });
	const setPassword = (value) => setFormData({ ...formData, password: value });

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		login().finally(() => setLoading(false));
	};

	const login = async () => {
		console.log("login Function Executed: ", formData);

		const response = await api.post("/v1/auth/admin/signin", formData);

		if (response.data.success) {
      console.log("Login Successful: ", response.data);
			setIsAuthenticated(true); // from AuthContext
      setUser(response.data.data.admin); // from AuthContext
      navigate("/admin");
		} else {
			alert(response.data.message);
		}
	};

	return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <section className="py-3 py-md-5 py-xl-8">
        <div className="container">
          <div className="row gy-4 align-items-center">
            <div className="col-12 col-md-6 col-xl-6">
            </div>
              <div className="col-12 col-md-6 col-xl-6">
                <div className="card border-0 rounded-4 shadow-lg">
                  <div className="card-body p-3 p-md-4 p-xl-5">
                    <div className="row">
                      <div className="col-12">
                        <div className="mb-4">
                          <h3>Sign in</h3>
                          <p className="text-secondary">Enter your credentials to access your account.</p>
                        </div>
                      </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                      <div className="row gy-3 overflow-hidden">
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input type="email" className="form-control" 
                              name="email" id="email" 
                              placeholder="name@example.com" value={formData.email}
                              onChange={(e) => setEmail(e.target.value)} required />
                              <label htmlFor="email" className="form-label"> 
                                <Mail className="" size={20}/>
                                Email</label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-floating mb-3">
                            <input type="password" className="form-control" 
                              name="password" id="password" 
                              placeholder="Password" value={formData.password}
                              onChange={(e) => setPassword(e.target.value)} required />
                              <label htmlFor="password" className="form-label"> 
                                <Lock className="" size={20}/>
                                Password</label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" name="remember_me" id="remember_me" />
                              <label className="form-check-label text-secondary" htmlFor="remember_me">
                                Keep me logged in
                              </label>
                          </div>
                        </div>
                        <div className="col-12">
                          <div className="d-grid">
                            <button className="btn btn-primary btn-lg" type="submit" disabled={loading}>
                              <LogIn className="me-2" size={20} />
                              Sign In
                            </button>
                          </div>
                        </div>
                      </div>
                    </form>
                    <div className="row">
                      <div className="col-12">
                        <div className="d-flex gap-2 gap-md-4 flex-column flex-md-row justify-content-md-end mt-4">
                          <a href="#!">Forgot password</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </section>
    </div>
	);
};

export default LoginPage;
