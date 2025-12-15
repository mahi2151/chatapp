import { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { Link } from 'react-router';

function SignUpPage() {
  const[formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });
  const { signup, isSigningUp } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(formData);
  }
  return (
  <div className="min-h-screen w-full grid grid-cols-1 md:grid-cols-2 bg-gray-950">

    {/* LEFT SIDE */}
    <div className="hidden md:flex flex-col justify-center px-20 bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white">
      <h1 className="text-5xl font-bold mb-6 leading-tight">
        Chat.<br />
        Connect.<br />
        Share.
      </h1>
      <p className="text-gray-300 text-lg max-w-md">
        Secure real-time messaging with friends and teams.
      </p>
    </div>

    {/* RIGHT SIDE */}
    <div className="flex items-center justify-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-[380px] bg-gray-900/90 text-white rounded-2xl shadow-xl p-6 space-y-6"
      >
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Sign Up</h2>
          <p className="text-sm text-gray-400">Create a new account</p>
        </div>

        <input
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />

        <button
          type="submit"
          disabled={isSigningUp}
          className="w-full bg-indigo-600 hover:bg-indigo-700 transition rounded-xl py-3 font-semibold disabled:opacity-50"
        >
          {isSigningUp ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-sm text-gray-400">
             Already have an account?{" "}
  <Link
    to="/login"
    className="text-indigo-400 hover:underline"
  >
    Log in
  </Link>
</p>

      </form>
    </div>

  </div>
);

}

export default SignUpPage