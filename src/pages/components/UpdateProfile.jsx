import React, { useState } from 'react';

const UpdateProfile = ({ initialData, onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    courseOfStudy: initialData.courseOfStudy || '',
    interests: initialData.interests || [],
    careerGoals: initialData.careerGoals || [],
    skills: initialData.skills || [],
  });

  const [inputFields, setInputFields] = useState({
    interests: '',
    careerGoals: '',
    skills: '',
  });

  // Handle input changes for single string fields
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Handle adding an item to the array
  const handleAddItem = (field, value) => {
    if (!value.trim()) return; // Prevent adding empty items
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], value.trim()],
    }));
    setInputFields((prev) => ({ ...prev, [field]: '' }));
  };

  // Handle removing an item from the array
  const handleRemoveItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass data to parent component
  };

  return (
    <form className="space-y-6 p-6 bg-white shadow-lg rounded-lg" onSubmit={handleSubmit}>
      <h1 className="text-2xl font-bold">Update Profile</h1>

      {/* Course of Study - Single String */}
      <div className="space-y-2">
        <label className="block text-gray-700 font-medium">Course of Study</label>
        <input
          type="text"
          value={formData.courseOfStudy}
          placeholder="Enter course of study"
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 bg-transparent text-black"
          onChange={(e) => handleInputChange('courseOfStudy', e.target.value)}
        />
      </div>

      {/* Interests, Career Goals, and Skills - Arrays */}
      {['interests', 'careerGoals', 'skills'].map((field) => (
        <div key={field} className="space-y-2">
          <label className="block text-gray-700 font-medium capitalize">
            {field.replace(/([A-Z])/g, ' $1')}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputFields[field]}
              placeholder={`Add ${field}`}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-600 bg-transparent text-black"
              onChange={(e) => setInputFields((prev) => ({ ...prev, [field]: e.target.value }))}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ',') {
                  e.preventDefault();
                  handleAddItem(field, inputFields[field]);
                }
              }}
            />
            <button
              type="button"
              className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
              onClick={() => handleAddItem(field, inputFields[field])}
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData[field].map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1 bg-gray-200 rounded-full text-teal-600"
              >
                <span>{item}</span>
                <button
                  disabled={loading ? true : false}
                  type="button"
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleRemoveItem(field, index)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="w-full py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700"
      >
        {loading ? "Updating..." : " Save Changes"}
      </button>
    </form>
  );
};

export default UpdateProfile;
