import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-hot-toast';
import useAuth from '../../hooks/useAuth';

const AddPostForm = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'social service',
    location: '',
    volunteersNeeded: 1,
    deadline: new Date(),
    thumbnail: '',
    organizerName: user?.displayName || '',
    organizerEmail: user?.email || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          deadline: formData.deadline.toISOString(),
          createdAt: new Date().toISOString()
        }),
      });

      if (response.ok) {
        toast.success('Post created successfully!');
        setFormData({
          title: '',
          description: '',
          category: 'social service',
          location: '',
          volunteersNeeded: 1,
          deadline: new Date(),
          thumbnail: '',
          organizerName: user?.displayName || '',
          organizerEmail: user?.email || ''
        });
      } else {
        throw new Error('Failed to create post');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Add Volunteer Need Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Post Title*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter post title"
              className="w-full px-4 py-2 border rounded-lg text-black"
            />
          </div>
          <div>
            <label className="block mb-2">Category*</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg text-black"
            >
              <option value="healthcare">Healthcare</option>
              <option value="education">Education</option>
              <option value="social service">Social Service</option>
              <option value="animal welfare">Animal Welfare</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-2">Description*</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Enter detailed description"
            className="w-full px-4 py-2 border rounded-lg text-black"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block mb-2">Location*</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              placeholder="Enter location"
              className="w-full px-4 py-2 border rounded-lg text-black"
            />
          </div>
          <div>
            <label className="block mb-2">Volunteers Needed*</label>
            <input
              type="number"
              name="volunteersNeeded"
              min="1"
              value={formData.volunteersNeeded}
              onChange={handleChange}
              required
              placeholder="Number of volunteers"
              className="w-full px-4 py-2 border rounded-lg text-black"
            />
          </div>
          <div>
            <label className="block mb-2">Deadline*</label>
            <DatePicker
              selected={formData.deadline}
              onChange={(date) => setFormData({ ...formData, deadline: date })}
              minDate={new Date()}
              className="w-full px-4 py-2 border rounded-lg text-black"
              required
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">Thumbnail URL</label>
          <input
            type="url"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className="w-full px-4 py-2 border rounded-lg text-black"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2">Organizer Name</label>
            <input
              type="text"
              name="organizerName"
              value={formData.organizerName}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-black"
            />
          </div>
          <div>
            <label className="block mb-2">Organizer Email</label>
            <input
              type="email"
              name="organizerEmail"
              value={formData.organizerEmail}
              readOnly
              className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-black"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPostForm;
