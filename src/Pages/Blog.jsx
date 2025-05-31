import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaArrowRight, FaCalendarAlt, FaUser } from 'react-icons/fa';

// Mock blog post data with more realistic content
const mockPosts = [
  {
    id: 1,
    title: 'How Volunteering Can Transform Your Community',
    excerpt: 'Discover the profound impact volunteering can have on local communities and practical ways to get involved in meaningful projects.',
    thumbnail: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80',
    author: 'Jane Doe',
    date: '2025-05-15',
    category: 'Community',
    readTime: '4 min read'
  },
  {
    id: 2,
    title: 'Top 10 Tips for Organizing Successful Volunteer Events',
    excerpt: 'Expert advice on planning, promoting, and executing volunteer events that engage participants and create real impact.',
    thumbnail: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80',
    author: 'John Smith',
    date: '2025-05-10',
    category: 'Tips',
    readTime: '6 min read'
  },
  {
    id: 3,
    title: 'The Life-Changing Benefits of Youth Volunteering',
    excerpt: 'How volunteering helps young people develop essential life skills, build confidence, and shape their futures.',
    thumbnail: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80',
    author: 'Emily Brown',
    date: '2025-05-05',
    category: 'Youth',
    readTime: '5 min read'
  },
  {
    id: 4,
    title: 'Volunteering Abroad: A Comprehensive Guide',
    excerpt: 'Everything you need to know about international volunteering opportunities, cultural considerations, and making the most of your experience.',
    thumbnail: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80',
    author: 'Jane Doe',
    date: '2025-04-28',
    category: 'International',
    readTime: '8 min read'
  },
  {
    id: 5,
    title: 'Effective Volunteer Engagement Strategies',
    excerpt: 'Proven methods to recruit, train, and retain volunteers who are passionate about your cause.',
    thumbnail: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80',
    author: 'John Smith',
    date: '2025-04-20',
    category: 'Tips',
    readTime: '7 min read'
  },
  {
    id: 6,
    title: 'Corporate Volunteering: Benefits for Businesses and Communities',
    excerpt: 'How companies can create impactful volunteering programs that benefit employees, communities, and the bottom line.',
    thumbnail: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80',
    author: 'Emily Brown',
    date: '2025-04-15',
    category: 'Corporate',
    readTime: '5 min read'
  },
  {
    id: 7,
    title: 'Virtual Volunteering: Making an Impact from Home',
    excerpt: 'Discover meaningful ways to volunteer remotely and contribute to causes you care about from anywhere in the world.',
    thumbnail: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80',
    author: 'Michael Chen',
    date: '2025-04-10',
    category: 'Tips',
    readTime: '4 min read'
  },
  {
    id: 8,
    title: 'Building Sustainable Volunteer Programs',
    excerpt: 'How to create volunteer initiatives that deliver lasting value for organizations and participants alike.',
    thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=200&q=80',
    author: 'Sarah Johnson',
    date: '2025-04-05',
    category: 'Community',
    readTime: '6 min read'
  }
];

const Blog = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Categories for filter
  const categories = ['All', 'Community', 'Tips', 'Youth', 'International', 'Corporate'];

  // Filter posts based on search and category
  useEffect(() => {
    let filteredPosts = mockPosts;

    if (searchQuery) {
      filteredPosts = filteredPosts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'All') {
      filteredPosts = filteredPosts.filter((post) => post.category === selectedCategory);
    }

    setPosts(filteredPosts);
    setCurrentPage(1); // Reset to first page on filter change
  }, [searchQuery, selectedCategory]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -5,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 }
    }
  };

  const categoryColors = {
    Community: 'bg-green-100 text-green-800',
    Tips: 'bg-blue-100 text-blue-800',
    Youth: 'bg-purple-100 text-purple-800',
    International: 'bg-red-100 text-red-800',
    Corporate: 'bg-yellow-100 text-yellow-800'
  };

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Volunteer Hub <span className="text-blue-600">Blog</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Insights, stories, and practical advice for volunteers and organizations
          </p>
        </motion.header>

        {/* Search and Filter Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow ">
              <input
                type="text"
                placeholder="Search articles, authors, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-4 pl-12 border-red-50 bg-gray-100  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm"
              />
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-4 text-black border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm appearance-none bg-gray-100 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category === 'All' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>

          {/* Active filters display */}
          {(searchQuery || selectedCategory !== 'All') && (
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Showing results for:</span>
              {searchQuery && (
                <span className="bg-gray-100 px-3 py-1 rounded-full flex items-center gap-1">
                  "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ×
                  </button>
                </span>
              )}
              {selectedCategory !== 'All' && (
                <span className={`${categoryColors[selectedCategory]} px-3 py-1 rounded-full flex items-center gap-1`}>
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="text-inherit opacity-70 hover:opacity-100"
                  >
                    ×
                  </button>
                </span>
              )}
            </div>
          )}
        </motion.section>

        {/* Blog Posts Grid */}
        {currentPosts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <h3 className="text-xl font-medium text-gray-700 mb-2">No posts found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
          >
            {currentPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                whileHover="hover"
                className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.thumbnail}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className={`absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full ${categoryColors[post.category]}`}>
                    {post.category}
                  </span>
                </div>
                <div className="p-6 flex-grow">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>
                <div className="px-6 pb-6 pt-2 border-t border-gray-100">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <FaUser className="text-gray-400" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FaCalendarAlt className="text-gray-400" />
                      <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-xs text-gray-400">{post.readTime}</span>
                    <button className="text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 text-sm">
                      Read more <FaArrowRight className="text-xs" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, posts.length)} of {posts.length} articles
            </div>
            <div className="flex gap-1">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // Show pages around current page
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 rounded-lg ${currentPage === pageNum
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 hover:bg-gray-50'
                      }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <span className="px-2 py-2">...</span>
              )}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className="px-4 py-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-50"
                >
                  {totalPages}
                </button>
              )}

              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Blog;