import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaSignOutAlt, FaSearch, FaBars, FaTimes, FaPlus, FaList, FaChevronDown, FaChevronUp } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import AuthContext from "../../context/AuthContext";
import Lottie from "lottie-react";
import logo from '../../assets/img/logo.png'
import animationData from "../../assets/lottie/spiner.json";
import { motion } from 'framer-motion';
import { easeOut } from "framer-motion";

const Navbar = ({ loginUser }) => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOutUser();
      toast.success("Logged out successfully!");
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleProfileMenu = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const currentUser = loginUser?.find(u => u.email === user?.email);

  const navLinks = (
    <>
      {[
        { to: "/", label: "Home" },
        { to: "/volunteer-posts", label: "All Volunteer Need Posts" },
        user && {
          to: "#",
          label: "My Profile",
          isDropdown: true,
          items: [
            { to: "/add-volunteer-post", label: "Add Volunteer Need Post", icon: <FaPlus /> },
            { to: "/manage-posts", label: "Manage My Posts", icon: <FaList /> }
          ]
        },
        { to: "/aboutUs", label: "AboutUs" },
        { to: "/blog", label: "Blog" },
        { to: "/FAQs", label: "FAQs" },
        { to: "/ContactUs", label: "ContactUs" },
      ]
        .filter(Boolean)
        .map((item) => (
          item.isDropdown ? (
            <div key={item.label} className="relative group">
              <button
                onClick={toggleProfileMenu}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-base font-semibold text-gray-800 hover:bg-blue-100 hover:text-blue-600 transition-all duration-300"
              >
                {item.label}
                {isProfileMenuOpen ? <FaChevronUp size={12} /> : <FaChevronDown size={12} />}
              </button>
              {isProfileMenuOpen && (
                <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {item.items.map((subItem) => (
                    <NavLink
                      key={subItem.to}
                      to={subItem.to}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {subItem.icon}
                      {subItem.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-base font-semibold transition-all duration-300 ${isActive
                  ? "bg-blue-600 text-white"
                  : "text-gray-800 hover:bg-blue-100 hover:text-blue-600"
                }`
              }
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsProfileMenuOpen(false);
              }}
            >
              {item.label}
            </NavLink>
          )
        ))}
    </>
  );

  return (
    <nav className="bg-gray-200 shadow-xl sticky top-0 z-50">
      <Toaster />
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col">
          <div className="flex justify-between items-center pt-1 pb-3 border-b border-gray-200">
            <div className=" md:block w-1/3">
              <motion.h1
                transition={{ duration: 2, delay: 1, ease: easeOut, repeat: Infinity }}
                className="text-xl lg:text-2xl font-bold text-primary"
              >
                Volunteer<motion.span className="lg:text-3xl text-2xl " animate={{ color: ['#FF0000', '#47e311', '#ef0cd7'] }} transition={{ duration: 1.5, delay: 0.5, repeat: Infinity }}>Hub</motion.span>
              </motion.h1>
            </div>

            <div className="flex-1 md:flex-none flex justify-center md:justify-start items-center">
              <Link to="/" className="flex items-center gap-3 justify-start md:pr-96">
                <div className="flex flex-col">
                  <div className="relative lg:w-32 w-20  flex items-center justify-center">
                    {/* Lottie Animation (Behind) */}
                    <div className="absolute inset-0 z-0 lg:-top-8 -top-4">
                      <Lottie animationData={animationData} loop={true} />
                    </div>

                    {/* Image (Front) */}
                    <img className="relative z-10 lg:w-16 w-12 rounded-full" src={logo} alt="Logo" />
                  </div>

                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-4">


              {!user ? (
                <div className="hidden md:flex items-center space-x-3">
                  <NavLink
                    to="/login"
                    className="px-4 py-1.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 text-sm"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="px-4 py-1.5 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300 text-sm"
                  >
                    Register
                  </NavLink>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-4">
                  <div className="relative group">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={toggleProfileDropdown}
                        className="flex items-center gap-2 hover:bg-blue-50 px-2 py-1 rounded-lg transition-all relative"
                      >
                        <img
                          src={currentUser?.photoURL || user?.photoURL || "/default-avatar.png"}
                          alt="User"
                          className="w-10 h-10 rounded-full border-2 border-blue-600 object-cover"
                        />
                        <span className="absolute -bottom-7 left-1/2 transform -translate-x-1/2 bg-white border rounded-lg shadow-md px-2 py-1 text-sm font-semibold text-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          {currentUser?.name || user?.displayName || "User"}
                        </span>
                      </button>
                    </div>

                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                        <NavLink
                          to="/add-volunteer-post"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <FaPlus className="text-blue-600" />
                          Add Volunteer Need Post
                        </NavLink>
                        <NavLink
                          to="/manage-posts"
                          className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
                          onClick={() => setIsProfileDropdownOpen(false)}
                        >
                          <FaList className="text-blue-600" />
                          Manage My Posts
                        </NavLink>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-all duration-300 text-sm"
                  >
                    <FaSignOutAlt />
                    Log Out
                  </button>
                </div>
              )}

              <button
                onClick={toggleMobileMenu}
                className="lg:hidden text-gray-800 hover:text-blue-600 transition-colors"
              >
                {isMobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
              </button>
            </div>
          </div>

          <div className="hidden lg:flex justify-center items-center py-2 space-x-4">
            {navLinks}

          </div>
        </div>

        <div
          className={`lg:hidden bg-white border-t border-gray-200 py-4 transition-all duration-300 ease-in-out ${isMobileMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0 overflow-hidden"
            }`}
        >
          <div className="px-4 space-y-2 flex flex-col">
            {navLinks}
            {user && (
              <>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  {isProfileMenuOpen && (
                    <div className="pl-4 space-y-2">
                      <NavLink
                        to="/add-volunteer-post"
                        className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaPlus />
                        Add Volunteer Need Post
                      </NavLink>
                      <NavLink
                        to="/manage-posts"
                        className="flex items-center gap-2 px-4 py-2 text-gray-800 hover:bg-blue-100 rounded-lg"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <FaList />
                        Manage My Posts
                      </NavLink>
                    </div>
                  )}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white font-semibold rounded-full hover:bg-red-700 transition-all duration-300 text-sm mt-2"
                >
                  <FaSignOutAlt />
                  Log Out
                </button>
              </>
            )}
            {!user && (
              <div className="flex flex-col gap-2">
                <NavLink
                  to="/login"
                  className="px-4 py-1.5 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-all duration-300 text-sm"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-1.5 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-all duration-300 text-sm"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;