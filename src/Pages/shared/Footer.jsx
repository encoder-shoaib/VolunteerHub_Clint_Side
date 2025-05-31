import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  // Animation variants for footer sections
  const footerSectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Animation variants for social icons
  const socialIconVariants = {
    hover: { scale: 1.2, rotate: 5, transition: { duration: 0.2 } },
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Placeholder for newsletter signup logic
    alert('Thank you for subscribing to our newsletter!');
    e.target.reset();
  };

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* About Section */}
        <motion.div
          variants={footerSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            About Volunteer Hub
          </h3>
          <p className="text-gray-300 text-sm">
            Volunteer Hub connects passionate individuals with meaningful opportunities to make a difference in communities worldwide. Join us in creating positive change!
          </p>
        </motion.div>

        {/* Quick Links Section */}
        <motion.div
          variants={footerSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/all-posts"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                All Posts
              </Link>
            </li>
            <li>
              <Link
                to="/add-post"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                Add Post
              </Link>
            </li>
            <li>
              <Link
                to="/manage-posts"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
              >
                Manage Posts
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          variants={footerSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Contact Us
          </h3>
          <p className="text-gray-300 text-sm">
            Email:{' '}
            <a href="mailto:support@volunteerhub.org" className="hover:text-blue-400">
              support@volunteerhub.org
            </a>
          </p>
          <p className="text-gray-300 text-sm">Phone: +1 (555) 123-4567</p>
          <p className="text-gray-300 text-sm">Address: 123 Community Lane, Hope City, USA</p>
        </motion.div>

        {/* Newsletter Signup Section */}
        <motion.div
          variants={footerSectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
            Stay Updated
          </h3>
          <p className="text-gray-300 text-sm mb-4">
            Subscribe to our newsletter for the latest volunteer opportunities and updates.
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Subscribe
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Social Media and Copyright */}
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex space-x-4 mb-4 md:mb-0"
        >
          <motion.a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={socialIconVariants}
            whileHover="hover"
            className="text-gray-300 hover:text-blue-400"
          >
            <FaFacebook size={24} />
          </motion.a>
          <motion.a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={socialIconVariants}
            whileHover="hover"
            className="text-gray-300 hover:text-blue-400"
          >
            <FaTwitter size={24} />
          </motion.a>
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={socialIconVariants}
            whileHover="hover"
            className="text-gray-300 hover:text-blue-400"
          >
            <FaInstagram size={24} />
          </motion.a>
          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            variants={socialIconVariants}
            whileHover="hover"
            className="text-gray-300 hover:text-blue-400"
          >
            <FaLinkedin size={24} />
          </motion.a>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-gray-400 text-sm"
        >
          © 2025 Volunteer Hub. All rights reserved.
        </motion.p>
      </div>
    </motion.footer>
  );
};

export default Footer;