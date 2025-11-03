// src/pages/Auth/Login.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input";
import axiosInstance from "../../utilis/axiosinstance";
import { API_PATHS } from "../../utilis/apipaths";
import { UserContext } from "../../context/usercontext";
import { validateEmail } from "../../utilis/helper";
import { Button } from "@/components/ui/button";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, name, email: userEmail, profileImageUrl, _id } =
        response.data;

      if (token) {
        updateUser({
          token,
          name,
          email: userEmail,
          profileImageUrl,
          id: _id,
        });

        navigate("/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[33vw] p-7 flex flex-col justify-center bg-white/80 backdrop-blur-md rounded-xl shadow-lg">
      <h3 className="text-lg font-semibold text-gray-800">Welcome Back</h3>
      <p className="text-xs text-gray-600 mt-1 mb-6">
        Please enter your details to login
      </p>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@example.com"
          type="text"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <Button
          type="submit"
          className="w-full text-white bg-gradient-to-tr from-blue-400 to-indigo-500 hover:from-blue-300 hover:to-indigo-400 transition-colors"
          disabled={loading}
        >
          {loading ? "Logging in..." : "LOGIN"}
        </Button>

        <p className="text-[13px] text-gray-700 mt-3 text-center">
          Don't have an account?{" "}
          <button
            className="font-medium text-blue-600 underline hover:text-blue-800 transition-colors"
            type="button"
            onClick={() => setCurrentPage("signup")}
          >
            Sign Up
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
