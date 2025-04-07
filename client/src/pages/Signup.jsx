import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupUser } from '../utils/api';
import Auth from '../utils/auth';
import { Eye, EyeOff } from 'lucide-react';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await signupUser(formState);
      const { token } = response.data;
      Auth.login(token);
      navigate('/'); // Redirect to home page
    } catch (e) {
      setError('Error creating account');
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8b0000] focus:ring-[#8b0000]"
            value={formState.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8b0000] focus:ring-[#8b0000]"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#8b0000] focus:ring-[#8b0000] pr-10"
              value={formState.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
        </div>
        {error && (
          <div className="mb-4 text-red-600 text-sm">
            {error}
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-[#8b0000] text-white py-2 px-4 rounded-md hover:bg-[#6b0000] focus:outline-none focus:ring-2 focus:ring-[#8b0000] focus:ring-offset-2"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-[#8b0000] hover:text-[#6b0000]">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Signup;
