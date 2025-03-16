import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const StoplightsForum = () => {
  const [posts, setPosts] = useState([]);
  const [statsFilter, setStatsFilter] = useState({ category: 'Parish', value: '' });
  const navigate = useNavigate();

  const handlePostSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newPost = {
      parish: formData.get('parish'),
      city: formData.get('city'),
      roadName: formData.get('roadName'),
      severity: formData.get('severity'),
      photo: formData.get('photo'),
      comments: formData.get('comments'),
    };
    setPosts([...posts, newPost]);
    e.target.reset();
  };

  const filteredStats = posts.filter((post) =>
    statsFilter.value ? post[statsFilter.category.toLowerCase()] === statsFilter.value : true
  );

  return (
    <div className="flex">
      {/* Left: Posts Section */}
      <div className="w-2/3 p-4">
        <h1>Stoplights Forum</h1>
        <p>Welcome to the Stoplights discussion forum. Share your thoughts and ideas about stoplights here.</p>
        <button
          onClick={() => navigate('/government')}
          className="bg-gray-500 text-white px-4 py-2 mb-4"
        >
          Back to Government Page
        </button>
        <h2 className="text-xl font-bold">Submit a Post</h2>
        <form onSubmit={handlePostSubmit} className="space-y-4">
          <div>
            <label>Parish:</label>
            <select name="parish" required>
              <option value="">Select Parish</option>
              <option value="Kingston">Kingston</option>
              <option value="St. Andrew">St. Andrew</option>
              <option value="St. Thomas">St. Thomas</option>
              <option value="St. Catherine">St. Catherine</option>
              <option value="St. Ann">St. Ann</option>
              <option value="Trelawny">Trelawny</option>
              <option value="Hanover">Hanover</option>
              <option value="St. James">St. James</option>
              <option value="Westmoreland">Westmoreland</option>
              <option value="Clarendon">Clarendon</option>
              <option value="Manchester">Manchester</option>
              <option value="St. Elizabeth">St. Elizabeth</option>
              <option value="Portland">Portland</option>
              <option value="St. Mary">St. Mary</option>
            </select>
          </div>
          <div>
            <label>City:</label>
            <input type="text" name="city" required />
          </div>
          <div>
            <label>Name of Road:</label>
            <input type="text" name="roadName" required />
          </div>
          <div>
            <label>Severity of Damage:</label>
            <select name="severity" required>
              <option value="">Select Severity</option>
              <option value="Really Bad">Really Bad</option>
              <option value="Bad">Bad</option>
              <option value="Not So Bad">Not So Bad</option>
            </select>
          </div>
          <div>
            <label>Photo:</label>
            <input type="file" name="photo" accept="image/*" />
          </div>
          <div>
            <label>Comments:</label>
            <textarea name="comments" required></textarea>
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit</button>
        </form>

        <h2 className="text-xl font-bold mt-8">Posts</h2>
        <ul>
          {posts.map((post, index) => (
            <li key={index} className="border p-2 mb-2">
              <p><strong>Parish:</strong> {post.parish}</p>
              <p><strong>City:</strong> {post.city}</p>
              <p><strong>Road Name:</strong> {post.roadName}</p>
              <p><strong>Severity:</strong> {post.severity}</p>
              <p><strong>Comments:</strong> {post.comments}</p>
              {post.photo && <img src={URL.createObjectURL(post.photo)} alt="Uploaded" className="mt-2" />}
            </li>
          ))}
        </ul>
      </div>

      {/* Right: Statistics Section */}
      <div className="w-1/3 p-4 bg-gray-100">
        <h2 className="text-xl font-bold">Statistics</h2>
        <div>
          <label>Filter By:</label>
          <select
            value={statsFilter.category}
            onChange={(e) => setStatsFilter({ ...statsFilter, category: e.target.value })}
          >
            <option value="Parish">Parish</option>
            <option value="City">City</option>
            <option value="Severity">Severity</option>
          </select>
          <input
            type="text"
            placeholder={`Filter by ${statsFilter.category}`}
            value={statsFilter.value}
            onChange={(e) => setStatsFilter({ ...statsFilter, value: e.target.value })}
          />
        </div>
        <ul>
          {filteredStats.map((post, index) => (
            <li key={index} className="border p-2 mb-2">
              <p><strong>Parish:</strong> {post.parish}</p>
              <p><strong>City:</strong> {post.city}</p>
              <p><strong>Severity:</strong> {post.severity}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StoplightsForum;
