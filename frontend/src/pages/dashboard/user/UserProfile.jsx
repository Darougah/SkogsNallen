import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEditProfileMutation } from '../../../redux/features/auth/authApi';
import { setUser } from '../../../redux/features/auth/authSlice';
import avatarImg from '../../../assets/avatar.png';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [editProfile, { isLoading, isError, error, isSuccess }] = useEditProfileMutation();

  const [formData, setFormData] = useState({
    username: '',
    profileImage: '',
    bio: '',
    profession: '',
    userId: ''
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user?.username || '',
        profileImage: user?.profileImage || '',
        bio: user?.bio || '',
        profession: user?.profession || '',
        userId: user?.id || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedUser = {
      username: formData.username,
      profileImage: formData.profileImage,
      bio: formData.bio,
      profession: formData.profession,
      userId: formData.userId
    };

    try {
      const response = await editProfile(updatedUser).unwrap();
      dispatch(setUser(response.user));
      localStorage.setItem('user', JSON.stringify(response.user));
      alert('Profile updated successfully');
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to update profile', error);
      alert('Failed to update profile. Please try again');
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-6">
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
          <div className="w-24 h-24 shrink-0">
            <img
              src={formData?.profileImage || avatarImg}
              alt="avatar"
              className="w-full h-full rounded-full object-cover border shadow"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl md:text-2xl font-semibold">Användarnamn: {formData.username || 'N/A'}</h3>
            <p className="text-gray-700">Bio: {formData.bio || 'N/A'}</p>
            <p className="text-gray-700">Yrke: {formData.profession || 'N/A'}</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="self-start md:self-center text-blue-500 hover:text-blue-700"
          >
            <i className="ri-edit-2-fill text-xl"></i>
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <i className="ri-close-line text-2xl bg-black rounded-full text-white p-1"></i>
            </button>
            <h2 className="text-2xl font-bold mb-4">Redigera profil</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Användarnamn</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="Användarnamn"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">Profilbild URL</label>
                <input
                  type="text"
                  name="profileImage"
                  value={formData.profileImage}
                  onChange={handleChange}
                  placeholder="Länk till bild"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Om dig</label>
                <textarea
                  name="bio"
                  rows="3"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Berätta om dig själv"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="profession" className="block text-sm font-medium text-gray-700">Yrke</label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleChange}
                  placeholder="Yrke"
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-md ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600 transition'}`}
              >
                {isLoading ? 'Sparar...' : 'Spara ändringar'}
              </button>
              {isError && <p className="mt-2 text-red-500">Misslyckades att uppdatera. Försök igen.</p>}
              {isSuccess && <p className="mt-2 text-green-500">Profilen är uppdaterad!</p>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
