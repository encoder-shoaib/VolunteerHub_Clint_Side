import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
import AuthContext from "../../context/AuthContext";

const Login = () => {
  const { SignInUser, googleSignIn } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle login form submit
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const result = await SignInUser(email, password);
      const lastSignInTime = result?.user?.metadata?.lastSignInTime;
      const loginInfo = { email, lastSignInTime };

      // Update login info in DB
      const response = await fetch('http://localhost:5000/users', {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginInfo),
      });

      const data = await response.json();
      console.log('Login info updated:', data);

      // Show success alert
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        showConfirmButton: false,
        timer: 1500
      });

      // Redirect
      navigate('/');
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  // Handle Google sign in
  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      console.log('Google user:', result.user);
      navigate('/');
    } catch (error) {
      console.error("Google Sign In Error:", error);
      toast.error("Google sign in failed.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 space-y-8">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">Log in to EquiSports</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your account to explore sports equipment
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 text-black rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
            >
              Log in
            </button>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <div className="text-sm">
            <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">
              Don’t have an account? Register
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
        >
          <FaGoogle className="mr-2 text-red-500" />
          Sign in with Google
        </button>
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default Login;