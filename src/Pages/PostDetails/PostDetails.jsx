import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCalendarAlt, FaUsers, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const PostDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isRegistered, setIsRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);

  // Fetch post details
  useEffect(() => {
    const fetchPost = async () => {
      console.log('PostDetails: Fetching post with id:', id);
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response for post details was not ok: ${response.status} ${response.statusText} - ${errorText}`);
        }
        const data = await response.json();
        console.log('PostDetails: Fetched post data:', data);
        setPost(data);
      } catch (error) {
        console.error('PostDetails: Failed to load post details:', error);
        toast.error(error.message || 'Failed to load post details');
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  // Check if user already registered as volunteer
  useEffect(() => {
    if (!user?.email || !id) {
      setIsRegistered(false);
      return;
    }

    const checkRegistration = async () => {
      console.log('PostDetails: Checking registration for user:', user.email, 'post ID:', id);
      try {
        const regResponse = await fetch(
          `http://localhost:5000/api/volunteers?postId=${id}&userEmail=${user.email}`
        );
        if (!regResponse.ok) {
          const errorText = await regResponse.text();
          throw new Error(`Failed to check registration: ${regResponse.status} ${regResponse.statusText} - ${errorText}`);
        }
        const regData = await regResponse.json();
        console.log('PostDetails: Registration check result:', regData);
        setIsRegistered(regData.exists);
      } catch (error) {
        console.error('PostDetails: Error during registration check:', error);
        toast.error(error.message);
      }
    };

    checkRegistration();
  }, [id, user]);

  // Volunteer button handler - THIS IS THE CRITICAL FUNCTION
  const handleVolunteer = async () => {
    // Client-side pre-checks
    if (!user) {
      toast.error('Please login to volunteer');
      return;
    }
    if (post && post.volunteersNeeded <= 0) {
      toast.error('No more volunteers needed for this opportunity.');
      return;
    }
    if (isRegistered) {
      toast.error('You have already volunteered for this post.');
      return;
    }

    setRegistering(true);
    try {
      const response = await fetch('http://localhost:5000/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          postId: id,
          userId: user.uid,
          userName: user.displayName,
          userEmail: user.email,
        }),
      });

      let responseData = {}; // Initialize to empty object
      let errorMessage = 'Failed to register volunteer due to an unknown server response.';

      // Attempt to read response body. Use clone() to allow multiple reads if needed,
      // although we mostly use one now.
      const clonedResponse = response.clone();
      const contentType = clonedResponse.headers.get('content-type');
      const isJson = contentType && contentType.includes('application/json');

      if (isJson) {
        try {
          responseData = await clonedResponse.json(); // Read JSON
          console.log('PostDetails: Parsed JSON response:', responseData);
          if (!response.ok && responseData.error) {
            errorMessage = responseData.error;
          } else if (!response.ok && responseData.message) {
            // Fallback for non-OK JSON with a 'message' field
            errorMessage = responseData.message;
          }
        } catch (jsonParseError) {
          // If JSON parsing fails, it might still have some text content
          console.error('PostDetails: JSON parse error:', jsonParseError);
          const rawText = await clonedResponse.text();
          errorMessage = `Server sent invalid JSON or empty body (status: ${response.status}): ${rawText.substring(0, 100)}...`;
        }
      } else {
        // If not JSON, just read as text to get some context
        const rawText = await clonedResponse.text();
        errorMessage = `Server responded with non-JSON content (status: ${response.status}): ${rawText.substring(0, 100)}...`;
      }


      // Now, evaluate the response.ok property
      if (!response.ok) {
        // This block is only entered if the HTTP status code was 4xx or 5xx
        console.error('PostDetails: Volunteer registration failed (HTTP status error):', response.status, response.statusText, errorMessage);
        // throw new Error(errorMessage); // Throw the specific error for toast
      }

      // If we reach here, response.ok was true (e.g., 200, 201)
      console.log('PostDetails: Volunteer registration successful, final responseData:', responseData);

      toast.success('Thank you for volunteering!');
      setIsRegistered(true);

      // Update the local post state with the new volunteersNeeded count
      setPost(prevPost => {
        if (!prevPost) return null; // Handle if post somehow becomes null
        // Ensure newVolunteersNeeded exists and is a number
        const updatedVolunteersNeeded =
          typeof responseData.newVolunteersNeeded === 'number'
            ? responseData.newVolunteersNeeded
            : prevPost.volunteersNeeded - 1; // Fallback if data is missing/invalid

        return {
          ...prevPost,
          volunteersNeeded: updatedVolunteersNeeded
        };
      });

    } catch (error) {
      // This catch block handles network errors or errors thrown by our code
      console.error('PostDetails: Caught error during volunteering process:', error);
      toast.error(error.message || 'An unexpected error occurred during volunteering.');
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (!post) return <div className="text-center py-12">Post not found. Please check the URL or if the post exists.</div>;

  const deadlineDate = new Date(post.deadline);
  const isDeadlinePassed = deadlineDate < new Date();
  const canVolunteer = user && !isRegistered && post.volunteersNeeded > 0 && !isDeadlinePassed;

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={post.thumbnail || 'https://via.placeholder.com/800x400'}
          alt={post.title}
          className="w-full h-64 md:h-80 object-cover"
        />

        <div className="p-6 md:p-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-2xl md:text-3xl font-bold">{post.title}</h1>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {post.category}
            </span>
          </div>

          <p className="text-gray-700 mb-6">{post.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 text-gray-600">
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <span>{post.location}</span>
            </div>

            <div className="flex items-center">
              <FaUsers className="mr-2" />
              <span>Volunteers Needed: {post.volunteersNeeded}</span>
            </div>

            <div className="flex items-center">
              <FaCalendarAlt className="mr-2" />
              <span>Deadline: {new Date(post.deadline).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center">
              <FaUser className="mr-2" />
              <span>Organizer: {post.organizerName}</span>
            </div>
          </div>

          {user ? (
            <button
              onClick={handleVolunteer}
              disabled={!canVolunteer || registering}
              aria-disabled={!canVolunteer || registering}
              className={`px-6 py-3 rounded-lg text-white transition-colors ${!canVolunteer || registering
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700'
                }`}
            >
              {registering
                ? 'Processing...'
                : isRegistered
                  ? 'Already Volunteered'
                  : post.volunteersNeeded <= 0
                    ? 'No Spots Left'
                    : isDeadlinePassed
                      ? 'Deadline Passed'
                      : 'Be a Volunteer'}
            </button>
          ) : (
            <Link
              to="/login"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Login to Volunteer
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostDetails;