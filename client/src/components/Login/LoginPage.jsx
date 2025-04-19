import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/UseAuthStore';

const LoginPage = () => {
  const {login, isLoggingIn, authUser, loginErr} = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email.trim() == "" || formData.password.trim() == "") {
      alert("Complete all fields");
      return;
    }
    login(formData);
  };

  return (
    <div className="flex items-center justify-center p-4 shadow-md w-[60%] h-full m-auto">
      <div className="flex w-full max-w-7xl border-gray-500 border-2">
        {/* Left Side - Hero Image */}
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

        {/* Right Side - Login Form */}
        <div className="flex items-center justify-center w-full md:w-1/2 p-8">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Log in to your account</h2>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username" className="sr-only">Username or Email</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-base-but sm:text-sm"
                  placeholder="Username or Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-md block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-teal-500 focus:border-base-but sm:text-sm"
                  placeholder="Your password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              
              {loginErr && (
                <div className="text-red-500 text-sm mt-2">{loginErr}</div>
              )}

              <div className="flex items-center justify-between">
                <a href="#" className="text-sm text-base-but hover:text-base-butHover">
                  Forgot your password?
                </a>
                <button
                  type="submit"
                  className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-base-but hover:bg-base-butHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                  onClick={handleSubmit}
                >
                  Log in
                </button>
              </div>
            </form>

            {/* Add Create Account Link */}
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  className="text-base-but font-medium hover:text-base-butHover"
                >
                  Create one
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                Ready to join out family as a admin?{' '}
                <Link
                  to="/admin/login"
                  className="text-base-but font-medium hover:text-base-butHover"
                >
                  Go for admin
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

