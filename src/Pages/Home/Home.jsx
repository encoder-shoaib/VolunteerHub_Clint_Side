import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Still need this for base carousel styles
import { motion } from 'framer-motion';
import hero_1 from "../../assets/img/hero-1.png"
import hero_2 from "../../assets/img/hero-2.jpg"
import hero_3 from "../../assets/img/hero-3.jpg"
import hero_5 from "../../assets/img/hero-5.jpg"
import hero_6 from "../../assets/img/hero-6.jpg"
import hero_7 from "../../assets/img/hero-7.jpg"
import { div } from 'framer-motion/client';

const Home = () => {
  // Animation variants for text and buttons (same as before, framer-motion doesn't change)
  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, delay: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } }
  };

  return (
    <div className='pb-6'>
      <div className="min-h-[60vh]"> {/* Ensure container takes at least full screen height */}
        <Carousel
          showThumbs={false}
          autoPlay={true}
          interval={5000}
          infiniteLoop={true}
          showStatus={false}
          showArrows={true} // DaisyUI's carousel doesn't override these directly, but we'll style them.
          className="relative overflow-hidden" // Use Tailwind for main carousel wrapper
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button type="button" onClick={onClickHandler} title={label}
                className="absolute z-10 top-1/2 left-4 transform -translate-y-1/2
                                           btn btn-circle btn-primary opacity-70 hover:opacity-100 hidden md:flex"> {/* DaisyUI btn classes */}
                ❮
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button type="button" onClick={onClickHandler} title={label}
                className="absolute z-10 top-1/2 right-4 transform -translate-y-1/2
                                           btn btn-circle btn-primary opacity-70 hover:opacity-100 hidden md:flex"> {/* DaisyUI btn classes */}
                ❯
              </button>
            )
          }
        >
          {/* Slide 1 */}
          <div className="relative h-[70vh] md:h-[60vh] flex items-center justify-start text-left text-white">
            <img src={hero_1} alt="Volunteers working together"
              className="absolute inset-0 w-full h-full object-cover z-0 rounded" />
            <div className="absolute inset-0  bg-opacity-40 z-10"></div> {/* Overlay */}
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

          {/* Slide 2 */}
          <div className="relative h-[70vh] md:h-[60vh] flex items-center justify-start text-left text-white">
            <img src={hero_3} alt="Volunteers working together"
              className="absolute inset-0 w-full h-full object-cover z-0 rounded" />
            <div className="absolute inset-0  bg-opacity-40 z-10"></div> {/* Overlay */}
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
          {/* Slide 4 */}
          <div className="relative h-[70vh] md:h-[60vh] flex items-center justify-start text-left text-white">
            <img src={hero_6} alt="Volunteers working together"
              className="absolute inset-0 w-full h-full object-cover z-0 rounded" />
            <div className="absolute inset-0  bg-opacity-40 z-10"></div> {/* Overlay */}
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
          {/* Slide 5 */}
          <div className="relative h-[70vh] md:h-[60vh] flex items-center justify-start text-left text-white">
            <img src={hero_7} alt="Volunteers working together"
              className="absolute inset-0 w-full h-full object-cover z-0 rounded" />
            <div className="absolute inset-0  bg-opacity-40 z-10"></div> {/* Overlay */}
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
          {/* Slide 1 */}
          <div className="relative h-[70vh] md:h-[60vh] flex items-center justify-start text-left text-white">
            <img src={hero_2} alt="Volunteers working together"
              className="absolute inset-0 w-full h-full object-cover z-0 rounded" />
            <div className="absolute inset-0  bg-opacity-40 z-10"></div> {/* Overlay */}
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
          {/* Slide 7 */}
          <div className="relative h-[70vh] md:h-[60vh] flex items-center justify-start text-left text-white">
            <img src={hero_3} alt="Volunteers working together"
              className="absolute inset-0 w-full h-full object-cover z-0 rounded" />
            <div className="absolute inset-0  bg-opacity-40 z-10"></div> {/* Overlay */}
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


        </Carousel>
      </div>
    </div>
  );
};

export default Home;