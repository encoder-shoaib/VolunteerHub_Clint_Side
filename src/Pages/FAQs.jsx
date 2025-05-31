import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQs = () => {
  // Organized FAQs into categories for better user experience
  const faqCategories = [
    {
      title: 'Getting Started',
      icon: '🚀',
      questions: [
        {
          question: 'What is Volunteer Hub and how does it work?',
          answer: 'Volunteer Hub is a community-driven platform that bridges the gap between organizations needing volunteers and individuals looking to make a difference. Organizations can post volunteer opportunities, while volunteers can browse, search, and apply for positions that match their skills and interests.'
        },
        {
          question: 'Is there a cost to use Volunteer Hub?',
          answer: 'Volunteer Hub is completely free for both volunteers and organizations. Our mission is to facilitate community engagement without financial barriers.'
        },
        {
          question: 'How do I create an account?',
          answer: 'Click on "Sign Up" in the top right corner. You can register using your email address or through social media accounts. The process takes less than a minute!'
        }
      ]
    },
    {
      title: 'For Volunteers',
      icon: '🙋‍♂️',
      questions: [
        {
          question: 'How do I find volunteer opportunities?',
          answer: 'Use our search filters to find opportunities by location, cause area, time commitment, or skills required. You can also browse recommended opportunities based on your profile.'
        },
        {
          question: 'Can I volunteer for multiple opportunities?',
          answer: 'Absolutely! You can apply to as many opportunities as you like, as long as you can commit the required time and meet any specified requirements.'
        },
        {
          question: 'How do I track my volunteer hours?',
          answer: 'Your dashboard automatically tracks hours for opportunities you sign up for through our platform. You can also manually add hours for external volunteer work.'
        }
      ]
    },
    {
      title: 'For Organizations',
      icon: '🏢',
      questions: [
        {
          question: 'How do we post volunteer opportunities?',
          answer: 'After creating an organization profile, go to "Post Opportunity" and fill out the form with details like title, description, requirements, and time commitment. Our team reviews each submission to ensure quality.'
        },
        {
          question: 'What types of opportunities can we post?',
          answer: 'You can post one-time events, ongoing positions, remote volunteering, or in-person opportunities. All opportunities must be unpaid and for legitimate charitable or community benefit purposes.'
        },
        {
          question: 'How do we manage volunteer applications?',
          answer: 'The "Manage Volunteers" section of your dashboard shows all applications. You can review profiles, communicate with applicants, and update application statuses.'
        }
      ]
    },
    {
      title: 'Safety & Community',
      icon: '🛡️',
      questions: [
        {
          question: 'How does Volunteer Hub ensure safety?',
          answer: 'We verify all organization profiles, require clear opportunity descriptions, and provide safety guidelines. We also include a rating system for volunteers and organizations to share their experiences.'
        },
        {
          question: 'What community guidelines should I follow?',
          answer: 'We expect all users to respect diversity, communicate professionally, honor commitments, and report any concerns. Discrimination, harassment, or fraudulent activities are strictly prohibited.'
        },
        {
          question: 'How can I report an issue?',
          answer: 'Use the "Report" button on any profile or opportunity, or contact our support team directly. All reports are confidential and investigated promptly.'
        }
      ]
    }
  ];

  const [activeIndices, setActiveIndices] = useState({});

  const toggleFAQ = (categoryIndex, questionIndex) => {
    setActiveIndices(prev => {
      const key = `${categoryIndex}-${questionIndex}`;
      return { ...prev, [key]: !prev[key] };
    });
  };

  const faqVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4 bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">
            Volunteer Hub Help Center
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about volunteering, posting opportunities, and making the most of our platform.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="space-y-8"
        >
          {faqCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-5 flex items-center">
                <span className="text-2xl mr-3">{category.icon}</span>
                <h2 className="text-2xl font-bold text-white">{category.title}</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {category.questions.map((faq, questionIndex) => (
                  <div key={questionIndex} className="transition-all duration-200 hover:bg-gray-50">
                    <button
                      onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                      className="w-full p-5 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50"
                    >
                      <span className="text-lg font-semibold text-gray-800 flex-grow pr-4 text-left">
                        {faq.question}
                      </span>
                      <motion.span
                        animate={{ rotate: activeIndices[`${categoryIndex}-${questionIndex}`] ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-blue-600 text-xl"
                      >
                        {activeIndices[`${categoryIndex}-${questionIndex}`] ? '▲' : '▼'}
                      </motion.span>
                    </button>

                    <AnimatePresence>
                      {activeIndices[`${categoryIndex}-${questionIndex}`] && (
                        <motion.div
                          variants={faqVariants}
                          initial="hidden"
                          animate="visible"
                          exit="exit"
                          className="px-5 pb-5"
                        >
                          <motion.p
                            variants={itemVariants}
                            className="text-gray-700 leading-relaxed"
                          >
                            {faq.answer}
                          </motion.p>
                          {questionIndex === 0 && categoryIndex === 0 && (
                            <motion.div
                              variants={itemVariants}
                              className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100"
                            >
                              <p className="text-blue-800 font-medium">Pro Tip:</p>
                              <p className="text-blue-700">Complete your profile to get personalized opportunity recommendations!</p>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional help section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-white rounded-xl shadow-lg p-6 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-3">Still need help?</h3>
          <p className="text-gray-600 mb-4">Our support team is here to assist you with any questions.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200">
            Contact Support
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default FAQs;