import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaUsers } from 'react-icons/fa';
import { toast } from 'react-hot-toast';

const VolunteerNeedsNow = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        toast.error('Failed to load volunteer needs');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-3xl font-bold mb-4">Volunteer Needs Now</h2>
        <p className="text-gray-500">No volunteer opportunities available at the moment.</p>
      </div>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Volunteer Needs Now</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <img
                src={post.thumbnail || 'https://via.placeholder.com/300x200?text=No+Image'}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{post.title}</h3>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full capitalize">
                    {post.category}
                  </span>
                </div>

                <div className="flex items-center text-gray-600 mb-2">
                  <FaCalendarAlt className="mr-2" />
                  <span>Deadline: {new Date(post.deadline).toLocaleDateString()}</span>
                </div>

                <div className="flex items-center text-gray-600 mb-4">
                  <FaUsers className="mr-2" />
                  <span>Volunteers Needed: {post.volunteersNeeded}</span>
                </div>

                <Link
                  to={`/post-detailed/${post._id}`}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/posts"
            className="inline-block bg-gray-800 hover:bg-gray-900 text-white px-6 py-3 rounded-lg transition-colors"
          >
            See All Volunteer Needs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default VolunteerNeedsNow;