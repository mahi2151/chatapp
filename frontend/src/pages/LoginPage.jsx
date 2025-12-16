import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore.js";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({email: "", password: ""});
  const {login, isLoggingIn} = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  }
  
  return (
    <div className="w-screen h-screen grid grid-cols-2 overflow-hidden bg-black">
      
      {/* LEFT SIDE */}
      <div className="hidden md:flex h-full w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-black items-center px-16">
        <div>
          <h1 className="text-5xl font-bold text-white leading-tight">
            Welcome<br />Back.
          </h1>
          <p className="mt-6 text-gray-300 max-w-md">
            Log in to continue chatting with your friends and teams.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="h-full w-full bg-slate-900 flex items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md px-6"
        >
          <h2 className="text-3xl font-bold text-white text-center">
            Log In
          </h2>
          <p className="text-gray-400 text-center mt-2">
            Enter your credentials
          </p>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="w-full mt-8 p-3 rounded-lg bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="w-full mt-4 p-3 rounded-lg bg-slate-800 text-white outline-none focus:ring-2 focus:ring-indigo-500"
          />

          {/* Button */}
          <button
            type="submit"
            disabled={isLoggingIn}
            className="w-full mt-6 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg py-3 text-white font-semibold disabled:opacity-50"
          >
            {isLoggingIn ? "Logging in..." : "Log In"}
          </button>

          {/* Link */}
          <p className="text-gray-400 text-center mt-6">
            Don’t have an account?{" "}
            <Link to="/signup" className="text-indigo-400 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}


export default LoginPage