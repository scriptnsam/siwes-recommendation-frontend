import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import RequestHandler from './RequestHandler';
import UpdateProfile from './UpdateProfile';
import ResponseModal from './ResponseModal';
import LoginPage from '../Login';

const ProfileTab = () => {
  const [userDetails, setUserDetails] = useState({})
  const [userProfile, setUserProfile] = useState({})
  const [initialData, setInitialData] = useState({
    courseOfStudy: '',
    interests: [],
    careerGoals: [],
    skills: []
  })
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const [openLogin, setOpenLogin] = useState(false)

  const token = useSelector((state) => state.auth.token);


  const getUserDetails = async () => {
    const api = new RequestHandler(import.meta.env.VITE_BACKEND_URL, {
      Authorization: `Bearer ${token}`
    }, 10000)
    try {
      const response = await api.get('/api/user/get-details');
      if (response.success === false) {
        if (response.code === 401) {
          // render login page
          setOpenLogin(true)
        }
        console.log(response.message)
        return;
      }

      const receivedData = response.data
      setUserDetails(receivedData.data)
      setUserProfile(receivedData.data.Profile[0])
      setInitialData({
        courseOfStudy: receivedData.data.Profile[0].course_of_study,
        interests: receivedData.data.Profile[0].interests,
        careerGoals: receivedData.data.Profile[0].career_goals,
        skills: receivedData.data.Profile[0].skills
      })
      // console.log(receivedData)
      return;
    } catch (error) {
      console.error(error)
    }
  }

  const handleProfileUpdate = async (updatedData) => {
    console.log('Updated Profile Data:', updatedData);
    // Send updatedData to the backend API
    const api = new RequestHandler(import.meta.env.VITE_BACKEND_URL, {
      Authorization: `Bearer ${token}`
    }, 10000)

    try {
      setIsLoading(true)
      const response = await api.put('/api/user/update-profile', updatedData);
      setIsLoading(false)
      if (response.success === false) {
        if (response.code === 401) {
          // render login page
          setOpenLogin(true)
        }
        console.log(response.message)
        setModalType("error")
        setModalMessage(response.message)
        setIsModalOpen(true);
        return;
      }

      // Successful, run getUserDetails again
      const receivedData = response.data
      // console.log("Received Data from Update", receivedData)
      getUserDetails()
      setModalType("success")
      setModalMessage(receivedData.message)
      setIsModalOpen(true);
      return;
    } catch (error) {
      setIsLoading(false)
      setModalType("error")
      setModalMessage(error.message)
      setIsModalOpen(true);
    }
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setUpdateBtnClicked(false)
  };

  useEffect(() => {
    if (token) {
      getUserDetails()
    }
  }, [token])


  return (
    <>
      {openLogin ? (
        <LoginPage />
      ) : (
        <div className="lg:max-w-4xl mx-auto lg:p-6">
          <div className="bg-white rounded-lg shadow-lg p-6 space-y-6">
            {/* Profile Header */}
            <div className="flex items-center gap-6">
              <div className="lg:w-24 lg:h-24 w-14 h-14 bg-transparent">
                {/* Placeholder for Profile Image */}
                {/* <span className="lg:text-4xl max-md:text-xl font-semibold text-white">SA</span> */}
                <img src="/illustrations/Mavatar.svg" alt="user-avatar" className='w-full h-full' />
              </div>
              <div>
                <h1 className="lg:text-3xl text-[18px] font-semibold text-gray-900">{userDetails.name || 'scriptnsam'}</h1>
                <p className="text-lg text-gray-500">{userDetails.email || 'oluwafemisam40@gmail.com'}</p>
                <p className="text-sm text-gray-400">{userDetails.role || 'User'}</p>
              </div>
            </div>

            {/* User Details */}
            <div className="space-y-4">
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Course of Study</p>
                <p className="text-gray-600 text-right ">{userProfile.course_of_study || 'N/A'}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Skills</p>
                <p className="text-gray-600 text-right ">{userProfile.skills?.length > 0 ? userProfile.skills.join(', ') : 'N/A'}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Career Goals</p>
                <p className="text-gray-600 text-right ">{userProfile.career_goals?.length > 0 ? userProfile.career_goals.join(', ') : 'N/A'}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-gray-700">Interests</p>
                <p className="text-gray-600 text-right ">{userProfile.interests?.length > 0 ? userProfile.interests.join(', ') : 'N/A'}</p>
              </div>
            </div>

            {/* Buttons to Update */}
            <div className="flex gap-4">
              <button onClick={() => setUpdateBtnClicked(!updateBtnClicked)} className="bg-teal-600 text-white py-2 px-6 rounded-lg hover:bg-teal-700 transition-all">
                Update Profile
              </button>
              <button className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all">
                Change Password
              </button>
            </div>
          </div>

          {/* Update Profile Menu */}
          <div className='mt-7'>
            {updateBtnClicked && (
              <UpdateProfile initialData={initialData} onSubmit={handleProfileUpdate} loading={isLoading} />
            )}
          </div>

          {/* Response Modal */}
          <ResponseModal isOpen={isModalOpen} onClose={handleCloseModal} type={modalType} message={modalMessage} />
        </div>
      )}
    </>
  );
};

export default ProfileTab;
