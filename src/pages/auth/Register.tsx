import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../../services/auth";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "brand",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await registerUser(form);

      alert("Registration successful!");

      navigate("/login");
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-lg p-10">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-indigo-600">
            BrandBridge
          </h1>

          <p className="text-gray-500 mt-2">
            Create your account
          </p>

        </div>

        <form
          onSubmit={handleRegister}
          className="space-y-5"
        >

          <div>
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div>
            <label>Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div>
            <label>Password</label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-2 border rounded-xl p-3"
            />
          </div>

          <div>
            <label>Role</label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full mt-2 border rounded-xl p-3"
            >
              <option value="brand">
                Brand
              </option>

              <option value="influencer">
                Influencer
              </option>
            </select>

          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700"
          >
            Create Account
          </button>

        </form>

        <p className="text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600"
          >
            Sign In
          </Link>
        </p>

      </div>

    </div>
  );
}