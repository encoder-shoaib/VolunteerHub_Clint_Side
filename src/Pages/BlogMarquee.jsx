import React from 'react';
import Marquee from 'react-fast-marquee';
import { FaCalendarAlt, FaUser, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: '10 Ways Volunteering Can Boost Your Career',
    excerpt: 'Discover how volunteering can help you develop new skills and expand your professional network.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
    author: 'Sarah Johnson',
    date: '2023-05-15',
    category: 'Career'
  },
  {
    id: 2,
    title: 'The Science Behind Helping Others',
    excerpt: 'Research shows how volunteering benefits both mental and physical health. Learn the surprising effects.',
    image: 'https://images.unsplash.com/photo-1544396821-4dd40b938ad3?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
    author: 'Michael Chen',
    date: '2023-05-10',
    category: 'Health'
  },
  {
    id: 3,
    title: 'How to Find the Perfect Volunteer Opportunity',
    excerpt: 'A step-by-step guide to matching your skills and interests with meaningful volunteer work.',
    image: 'https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
    author: 'Emily Brown',
    date: '2023-05-05',
    category: 'Tips'
  },
  {
    id: 4,
    title: 'Corporate Volunteering Programs That Work',
    excerpt: 'How leading companies are creating impactful employee volunteering initiatives.',
    image: 'https://images.unsplash.com/photo-1503917988258-f87a78e3c995?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
    author: 'David Wilson',
    date: '2023-04-28',
    category: 'Business'
  },
  {
    id: 5,
    title: 'Virtual Volunteering: Making an Impact from Home',
    excerpt: 'Meaningful ways to contribute to causes you care about without leaving your house.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
    author: 'Jane Doe',
    date: '2023-04-20',
    category: 'Technology'
  },
  {
    id: 6,
    title: 'Volunteer Travel: Combining Adventure with Purpose',
    excerpt: 'How to plan an international volunteer trip that benefits both you and the community.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
    author: 'John Smith',
    date: '2023-04-15',
    category: 'Travel'
  },
  {
    id: 7,
    title: 'The Ripple Effect of Small Acts of Kindness',
    excerpt: 'How even small volunteer contributions can create significant change in communities.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
    author: 'Lisa Wong',
    date: '2023-04-10',
    category: 'Community'
  },
  {
    id: 8,
    title: 'Volunteering with Children: What You Need to Know',
    excerpt: 'Essential tips for working with youth in volunteer settings.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80',
    author: 'Robert Garcia',
    date: '2023-04-05',
    category: 'Education'
  }
];

// Category color mapping
const categoryColors = {
  Career: 'bg-purple-100 text-purple-800',
  Health: 'bg-blue-100 text-blue-800',
  Tips: 'bg-green-100 text-green-800',
  Business: 'bg-yellow-100 text-yellow-800',
  Technology: 'bg-indigo-100 text-indigo-800',
  Travel: 'bg-pink-100 text-pink-800',
  Community: 'bg-red-100 text-red-800',
  Education: 'bg-teal-100 text-teal-800'
};

const BlogCard = ({ post }) => {
  return (
    <div className="mx-4 w-80 flex-shrink-0 group">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100">
        <div className="relative overflow-hidden h-48">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>
          <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${categoryColors[post.category]}`}>
            {post.category}
          </span>
        </div>
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
              {post.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-2">
              {post.excerpt}
            </p>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <FaUser className="mr-2 text-blue-500" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-blue-500" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </div>
            <button className="mt-4 w-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 shadow-sm group-hover:shadow-md">
              Read more <FaArrowRight className="ml-2 text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const BlogMarquee = () => {
  return (
    <section className="py-16 px-4 ">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1 rounded-full mb-4">
            Volunteer Stories
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Inspiring Tales of <span className="text-blue-600">Community Impact</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover how volunteering changes lives - both for those who give and those who receive.
          </p>
        </div>

        {/* First marquee row */}
        <div className="mb-8">
          <Marquee speed={50} gradient={false} pauseOnHover={true}>
            {blogPosts.slice(0, 4).map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </Marquee>
        </div>

        <div className="text-center">
          {/* Changed from <link> to <Link> and `to` attribute */}
          <Link
            to="/blogs"
            className="relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-medium text-blue-600 transition-all duration-300 border-2 border-blue-500 rounded-full group hover:text-white"
          >
            <span className="absolute inset-0 bg-blue-500 rounded-full transition-all duration-300 group-hover:bg-blue-600"></span>
            <span className="relative flex items-center">
              View All Articles <FaArrowRight className="ml-2" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogMarquee;