
// src/pages/Auth/SignUp.js
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/input";
import { UserContext } from "../../context/usercontext";
import { API_PATHS } from "../../utilis/apipaths";
import axiosInstance from "../../utilis/axiosinstance";
import uploadImage from "../../utilis/uploadimage";
import { validateEmail } from "../../utilis/helper";
import { Button } from "@/components/ui/button";

const SignUp = ({ setCurrentPage }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    if (!fullName) {
      setError("Please enter full name.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter a password.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes.imageURL || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, name, _id, profileImageUrl: uploadedPic } = response.data;

      if (token) {
        updateUser({
          token,
          name,
          id: _id,
          profileImageUrl: uploadedPic || "",
          email,
        });
        navigate("/dashboard");
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
      <h3 className="text-lg font-semibold text-gray-800">Create an Account</h3>
      <p className="text-xs text-gray-600 mt-1 mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignUp} className="flex flex-col gap-4">
        <Input
          value={fullName}
          onChange={({ target }) => setFullName(target.value)}
          label="Full Name"
          placeholder="Sandeep"
          type="text"
        />

        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="sandeep@example.com"
          type="text"
        />

        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        <Input
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          label="Confirm Password"
          placeholder="Confirm password"
          type="password"
        />

        {error && <p className="text-red-500 text-xs">{error}</p>}

        <Button
          type="submit"
          className="w-full text-white bg-gradient-to-tr from-blue-400 to-indigo-500 hover:from-blue-300 hover:to-indigo-400 transition-colors"
          disabled={loading}
        >
          {loading ? "Signing up..." : "SIGN UP"}
        </Button>

        <p className="text-[13px] text-gray-700 mt-3 text-center">
          Already have an account?{" "}
          <button
            type="button"
            className="font-medium text-blue-600 underline hover:text-blue-800 transition-colors"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
