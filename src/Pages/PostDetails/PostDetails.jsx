import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import { motion, AnimatePresence } from 'framer-motion';
import AuthContext from '../../context/AuthContext';

const PostDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://volunteer-hub-server-side.vercel.app/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to load post details. Please try again later.',
          confirmButtonColor: '#4F46E5',
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleVolunteerRequest = async (e) => {
    e.preventDefault();

    if (post.volunteersNeeded <= 0) {
      Swal.fire({
        icon: 'warning',
        title: 'Not Available',
        text: 'No more volunteers are needed for this post.',
        confirmButtonColor: '#4F46E5',
      });
      return;
    }

    try {
      await axios.post('https://volunteer-hub-server-side.vercel.app/volunteer-requests', {
        postId: post._id,
        thumbnail: post.thumbnail,
        title: post.title,
        description: post.description,
        category: post.category,
        location: post.location,
        volunteersNeeded: post.volunteersNeeded,
        deadline: post.deadline,
        organizerName: post.organizerName,
        organizerEmail: post.organizerEmail,
        volunteerName: user.name,
        volunteerEmail: user.email,
        suggestion,
        status: 'requested',
      });
      await axios.patch(`https://volunteer-hub-server-side.vercel.app/posts/${post._id}/volunteer`, {
        volunteersNeeded: post.volunteersNeeded - 1,
      });

      Swal.fire({
        icon: 'success',
        title: 'Request Submitted!',
        text: 'Your volunteer request has been submitted successfully.',
        confirmButtonColor: '#4F46E5',
        background: '#F9FAFB',
      });

      setShowModal(false);
      setPost({ ...post, volunteersNeeded: post.volunteersNeeded - 1 });
      setSuggestion('');
    } catch (error) {
      console.error('Error submitting volunteer request:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to submit request. Please try again.',
        confirmButtonColor: '#4F46E5',
      });
    }
  };

  const isOrganizer = user && user.email === post?.organizerEmail;
  const isDeadlinePassed = post && new Date(post.deadline) < new Date();
  const canVolunteer = post && post.volunteersNeeded > 0 && !isOrganizer && !isDeadlinePassed;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25
      }
    },
    exit: { opacity: 0, scale: 0.9 }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Post not found</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Hero Section */}
          <div className="relative h-96 overflow-hidden">
            <motion.img
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              src={post.thumbnail}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8">
              <motion.div variants={itemVariants}>
                <span className="inline-block px-3 py-1 bg-indigo-600 text-white text-sm font-semibold rounded-full mb-2">
                  {post.category}
                </span>
              </motion.div>
              <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-white mb-2">
                {post.title}
              </motion.h1>
              <motion.div variants={itemVariants} className="flex items-center text-white">
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {post.location}
              </motion.div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            <motion.div variants={itemVariants} className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">About This Opportunity</h3>
              <p className="text-gray-700 leading-relaxed">{post.description}</p>
            </motion.div>

            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <motion.div variants={itemVariants} className="bg-indigo-50 p-6 rounded-xl">
                <h4 className="text-lg font-semibold text-indigo-800 mb-3">Details</h4>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span>
                      <strong className="text-gray-800">Category:</strong> {post.category}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>
                      <strong className="text-gray-800">Deadline:</strong> {new Date(post.deadline).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-indigo-600 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>
                      <strong className="text-gray-800">Volunteers Needed:</strong>
                      <span className={`ml-1 font-semibold ${post.volunteersNeeded <= 0 ? 'text-red-600' : 'text-green-600'}`}>
                        {post.volunteersNeeded}
                      </span>
                    </span>
                  </li>
                </ul>
              </motion.div>

              <motion.div variants={itemVariants} className="bg-indigo-50 p-6 rounded-xl">
                <h4 className="text-lg font-semibold text-indigo-800 mb-3">Organizer Information</h4>
                <div className="flex items-start mb-4">
                  <div className="bg-indigo-100 p-2 rounded-full mr-4">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{post.organizerName}</p>
                    <a
                      href={`mailto:${post.organizerEmail}`}
                      className="text-indigo-600 hover:underline text-sm"
                    >
                      {post.organizerEmail}
                    </a>
                  </div>
                </div>
                {isOrganizer && (
                  <div className="bg-indigo-100 text-indigo-800 p-3 rounded-lg text-center">
                    You are the organizer of this post
                  </div>
                )}
              </motion.div>
            </motion.div>

            {/* Action Button */}
            {!isOrganizer && (
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8"
              >
                <button
                  onClick={() => setShowModal(true)}
                  disabled={!canVolunteer}
                  className={`w-full py-4 px-6 rounded-xl text-white font-bold transition-all duration-300 shadow-lg
                    ${canVolunteer
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700'
                      : 'bg-gray-400 cursor-not-allowed'
                    }`}
                >
                  {isDeadlinePassed ? (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Deadline Passed
                    </span>
                  ) : post.volunteersNeeded <= 0 ? (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      No Volunteers Needed
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      Be a Volunteer
                    </span>
                  )}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Volunteer Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Volunteer for <span className="text-indigo-600">"{post.title}"</span>
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleVolunteerRequest} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "Post Title", value: post.title, id: "postTitle" },
                    { label: "Category", value: post.category, id: "category" },
                    { label: "Location", value: post.location, id: "location" },
                    { label: "Deadline", value: new Date(post.deadline).toLocaleDateString(), id: "deadline" },
                    { label: "Your Name", value: user.name, id: "volunteerName" },
                    { label: "Your Email", value: user.email, id: "volunteerEmail" },
                  ].map((field, index) => (
                    <div key={index}>
                      <label htmlFor={field.id} className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      <input
                        type="text"
                        id={field.id}
                        value={field.value}
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                        readOnly
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700 mb-1">
                    Suggestions or Comments
                    <span className="text-gray-500 ml-1">(Optional)</span>
                  </label>
                  <textarea
                    id="suggestion"
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none transition duration-200"
                    rows="4"
                    placeholder="Any special skills, availability, or notes for the organizer..."
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <motion.button
                    type="button"
                    onClick={() => setShowModal(false)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition duration-300 ease-in-out font-semibold"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition duration-300 ease-in-out font-semibold focus:outline-none focus:ring-4 focus:ring-indigo-300 shadow-md"
                  >
                    Submit Volunteer Request
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default PostDetails;