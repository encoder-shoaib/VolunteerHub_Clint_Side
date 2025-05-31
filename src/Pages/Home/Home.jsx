import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { motion } from 'framer-motion';
import hero_1 from "../../assets/img/hero-1.png";
import hero_2 from "../../assets/img/hero-2.jpg";
import hero_3 from "../../assets/img/hero-3.jpg";
import hero_6 from "../../assets/img/hero-6.jpg";
import hero_7 from "../../assets/img/hero-7.jpg";
import { FaHandsHelping, FaHeart, FaUsers, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import VolunteerNeedsNow from '../VolunteerNeedsNow/VolunteerNeedsNow';
import BlogMarquee from '../BlogMarquee';

const Home = () => {
  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } }
  };

  const cardVariants = {
    offscreen: { y: 100, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", bounce: 0.4, duration: 0.8 }
    }
  };

  const stats = [
    { value: "500+", label: "Volunteers", icon: <FaUsers className="text-3xl" /> },
    { value: "100+", label: "Projects", icon: <FaHandsHelping className="text-3xl" /> },
    { value: "10K+", label: "Hours Served", icon: <FaCalendarAlt className="text-3xl" /> },
    { value: "95%", label: "Satisfaction", icon: <FaHeart className="text-3xl" /> }
  ];

  const features = [
    {
      title: "Find Opportunities",
      description: "Discover volunteer work that matches your skills and interests",
      icon: <FaHandsHelping className="text-4xl text-primary" />
    },
    {
      title: "Make an Impact",
      description: "Contribute to meaningful causes in your community",
      icon: <FaHeart className="text-4xl text-primary" />
    },
    {
      title: "Build Connections",
      description: "Meet like-minded people and grow your network",
      icon: <FaUsers className="text-4xl text-primary" />
    }
  ];

  return (
    <div className='pb-6'>
      {/* Hero Carousel */}
      <div className="min-h-[66vh]">
        <Carousel
          showThumbs={false}
          autoPlay={true}
          interval={5000}
          infiniteLoop={true}
          showStatus={false}
          showArrows={true}
          className="relative overflow-hidden"
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button type="button" onClick={onClickHandler} title={label}
                className="absolute z-10 top-1/2 left-4 transform -translate-y-1/2
                                           btn btn-circle btn-primary opacity-70 hover:opacity-100 hidden md:flex">
                ❮
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button type="button" onClick={onClickHandler} title={label}
                className="absolute z-10 top-1/2 right-4 transform -translate-y-1/2
                                           btn btn-circle btn-primary opacity-70 hover:opacity-100 hidden md:flex">
                ❯
              </button>
            )
          }
        >
          {[hero_1, hero_2, hero_3, hero_6, hero_7].map((hero, index) => (
            <div key={index} className="relative h-[70vh] md:h-[60vh] flex items-center justify-start text-left text-white">
              <img src={hero} alt="Volunteers working together"
                className="absolute inset-0 w-full h-full object-cover z-0 rounded" />
              <div className="absolute inset-0 bg-opacity-40 z-10"></div>
              <div className="relative z-20 max-w-4xl p-2 md:p-4 ml-4 md:ml-16">
                <motion.h1
                  initial="hidden"
                  animate="visible"
                  variants={textVariants}
                  className="text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight drop-shadow-lg"
                >
                  Make a <br />
                  Difference<br />
                  Through<br />
                  Volunteering<br />
                </motion.h1>
                <motion.button
                  initial="hidden"
                  animate="visible"
                  variants={buttonVariants}
                  whileHover="hover"
                  className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out"
                  onClick={() => console.log('Explore Opportunities')}
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* Alternative Subtle Version */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        viewport={{ once: true, amount: 0.2 }}
        className="py-16 my-16 rounded-xl bg-[#f3f6f8] shadow-md border border-gray-100"
      >
        <div className="container mx-auto px-4">
          <motion.h2
            variants={textVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800"
          >
            Our Impact in Numbers
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="flex flex-col items-center p-8 bg-[#d7e4f1]/50 rounded-lg hover:bg-[#d7e4f1]/70 transition-all duration-300 hover:scale-105"
              >
                <div className="mb-4 text-blue-600">{stat.icon}</div>
                <h3 className="text-4xl md:text-5xl font-bold mb-3 text-gray-800">{stat.value}</h3>
                <p className="text-lg text-center text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
      {/* VolunteerNeedsNow SECTION  */}
      <div>
        <VolunteerNeedsNow></VolunteerNeedsNow>
      </div>


      <div>
        <BlogMarquee></BlogMarquee>
      </div>
      {/* Features Section */}
      <section className="py-16 bg-base-100">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center mb-4"
          >
            Why Volunteer With Us?
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            variants={textVariants}
            viewport={{ once: true }}
            className="text-xl text-center mb-12 max-w-3xl mx-auto"
          >
            Join our community and make a real difference in people's lives
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial="offscreen"
                whileInView="onscreen"
                variants={cardVariants}
                viewport={{ once: true, amount: 0.2 }}
                className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="card-body items-center text-center">
                  <div className="mb-4">{feature.icon}</div>
                  <h3 className="card-title text-2xl mb-2">{feature.title}</h3>
                  <p>{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <motion.section
        initial="offscreen"
        whileInView="onscreen"
        variants={cardVariants}
        viewport={{ once: true }}
        className="py-16 bg-base-200"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of volunteers who are transforming communities every day
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary btn-lg px-8"
          >
            Become a Volunteer Today
          </motion.button>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;