import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import OrgGanteng from "../assets/OrgGanteng.jpg";
import yard from "../assets/yard.jpeg";

const EditProfile = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: 'Aryo',
    lastName: 'Tehillah Nathanael',
    email: 'nathanaelaryo0@gmail.com',
    username: '_madeby.nath'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    navigate('/');
  };

  return (
    <div className="min-h-screen text-white px-4 md:px-12"> {/* Hapus bg-gray-900 */}
      {/* Header Cover - Samakan dengan SelfProfile */}
      <div className="relative">
        <img
          src={yard}
          alt="hero"
          className="w-full h-80 mt-15 object-cover rounded-4xl"
        />

      {/*garis*/}
      <div className="w-full h-px bg-bright-yellow absolute bottom-[-123px] absolute"></div>

        {/* Foto Profil - Samakan dengan SelfProfile */}
        <div className="absolute bottom-[-110px] left-18 flex flex-col items-center">
          <div className="relative">
            <div className="w-40 h-40 rounded-full border-4 border-black overflow-hidden">
              <img
                src={OrgGanteng}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-2 right-5 w-6.5 h-6.5 bg-green-500 rounded-full border-2 border-black"></div>
          </div>

          {/* Nama & Status */}
          <div>
            <div className="flex items-center gap-2 mt-5">
              <h1 className="text-xl font-semibold">Aryo Tehillah Nathanael</h1>
              <span className="px-2 py-1 bg-green-600 text-xs rounded-full">
                Active
              </span>
            </div>
            <p className="text-gray-400 text-sm">@{formData.username}</p>
          </div>
        </div>

        {/* Back Button */}
        <div className="absolute bottom-[-60px] right-0 flex ">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-800 hover:bg-gray-700 px-5 mr-2 py-2 rounded-lg text-sm font-medium transition-colors" 
          >
            Log out
          </button>
          <button 
            onClick={() => navigate('/')}
            className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Back
          </button>
        </div>
      </div>

      {/*Log out*/}
      <div className="absolute bottom-151">
      </div>

      {/* Form Content - Sesuaikan margin top karena header baru */}
      <div className="mt-38">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Photo */}
          <div className="ml-8 mb-6">
            <h2 className="text-lg font-medium text-white mb-4">Profile photo</h2>
            <div className="flex items-center gap-6">
              <img 
                src={OrgGanteng}
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex gap-4">
                <button 
                  type="button"
                  className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  Update
                </button>
                <button 
                  type="button"
                  className="px-4 py-2 text-red-500 hover:text-red-400 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <h2 className="text-lg font-medium text-white mb-4 ml-8">Email address</h2>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
            />
          </div>

          {/* garis */}
          <div className="w-full h-px bg-bright-yellow my-8"></div>

          {/* Full Name */}
          <div>
            <h2 className="text-lg font-medium text-white mb-4">Full Name</h2>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                placeholder="First name"
              />
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                className="bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
                placeholder="Last name"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Discard
            </button>
            <button
              type="submit"
              className="px-6 py-3 text-white bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;