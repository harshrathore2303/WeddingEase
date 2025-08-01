import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/UseAuthStore.js";
import { LuLoader } from "react-icons/lu";

const SignupPage = () => {
  const { signup, signUpErr, isSigningUp, success } = useAuthStore();
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    email: "",
    phone: "",
    password: "",
    acceptedTerms: false,
    role: "user",
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (success) {
      navigate("/login");
    }
  }, [success, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      formData.email.trim() === "" ||
      formData.username.trim() === "" ||
      formData.phone.trim() === "" ||
      formData.fullname.trim() === ""
    ) {
      alert("Complete all fields");
      return;
    }
    signup(formData);
  };

  return (
    <div className="flex items-center justify-center w-[60%] h-full m-auto p-4 space-y-4">
      <div className="flex w-full max-w-7xl border-gray-500 border-2">
        <div className="hidden md:flex md:w-1/2 relative">
          <img
            src="https://plus.unsplash.com/premium_photo-1674197235635-3cf3f67a3470?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Wedding couple"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10 flex flex-col justify-center p-8 text-white z-10">
            <h1 className="text-3xl font-bold">EASILY PLAN</h1>
            <div className="text-5xl mt-2">All Your Details</div>
            <p className="text-lg mt-2 font-light">on Wedease</p>
          </div>
        </div>

        <div className="flex items-center justify-center w-full md:w-1/2 p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Create your account</h2>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-base-but sm:text-sm"
                  placeholder="Your username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-base-but sm:text-sm"
                  placeholder="Your name"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-base-but sm:text-sm"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-base-but sm:text-sm"
                  placeholder="Your phone number"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-base-but sm:text-sm"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>

              <div className="space-x-5 flex ">
                <div>
                  <input
                    type="radio"
                    id="user"
                    value={formData.role}
                    checked={formData.role === "user"}
                    onChange={() => setFormData({ ...formData, role: "user" })}
                  />
                  <label htmlFor="user">User</label>
                </div>

                <div>
                  <input
                    type="radio"
                    id="admin"
                    value={formData.role}
                    checked={formData.role === "admin"}
                    onChange={() => setFormData({ ...formData, role: "admin" })}
                  />
                  <label htmlFor="admin">Admin</label>
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  name="acceptedTerms"
                  id="acceptedTerms"
                  checked={formData.acceptedTerms}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      acceptedTerms: !formData.acceptedTerms,
                    })
                  }
                  className="h-4 w-4 text-teal-600 border-gray-300 rounded mt-1"
                />
                <label
                  htmlFor="acceptedTerms"
                  className="ml-2 text-sm text-gray-700"
                >
                  By signing up, I agree to the{" "}
                  <a
                    href="#"
                    className="text-base-but hover:text-base-butHover "
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-base-but hover:text-base-butHover "
                  >
                    Terms of Use
                  </a>
                </label>
              </div>

              {signUpErr && (
                <p className="text-red-500 text-sm mt-2">{signUpErr}</p>
              )}
              <div className="flex items-center justify-between">
                <button
                  type="submit"
                  className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-base-but hover:bg-base-butHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  {isSigningUp ? (
                    <>
                      <LuLoader className="h-5 w-5 animate-spin" />
                    </>
                  ) : (
                    "Sign in"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-base-but font-medium hover:text-base-butHover"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
