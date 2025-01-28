import { useEffect, useState } from 'react';
import RecentActivity from './RecentActivity';
import RecommendedCompanies from './RecommendedCompanies';
import { useSelector } from 'react-redux';
import LoginPage from '../Login';
import RequestHandler from './RequestHandler';
import LoadingUI from './LoadingUI';

const HomeTab = () => {
  const [companyUuids, setCompanyUuids] = useState([]);
  const [genrecommendations, setGenrecommendations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("success");
  const [modalMessage, setModalMessage] = useState("");
  const [openLogin, setOpenLogin] = useState(false);
  const [recommendedCompanies, setRecommendedCompanies] = useState([])
  const [recommendationsIsLoading, setRecommendationIsLoading] = useState(true)
  const [possibleMessage, setPossibleMessage] = useState('No recommendation available.')

  const { token } = useSelector((state) => state.auth);

  const getRecommendations = async () => {
    const api = new RequestHandler(import.meta.env.VITE_BACKEND_URL, {
      Authorization: `Bearer ${token}`
    }, 180000)

    try {
      const response = await api.get('/api/recommendations');
      if (response.success === false) {
        if (response.code === 401) {
          // render login page
          setOpenLogin(true)
        }
        console.log(response.message)
        setModalType("error")
        setModalMessage(response.message)
        setIsModalOpen(true);
        setRecommendationIsLoading(false)
        return;
      }

      const receivedData = response.data
      console.log(receivedData)
      if (receivedData.data.recommendations.length === 0) {
        setRecommendationIsLoading(false)
        setPossibleMessage(receivedData.message)
        return;
      }
      const recommendations = receivedData.data.recommendations[0].ranked_companies;
      const CompanyUUIDs = recommendations.map((company) => company.company_uuid);
      setGenrecommendations(recommendations)
      setCompanyUuids(CompanyUUIDs)
      console.log(CompanyUUIDs)

    } catch (error) {
      // setIsLoading(false)
      setModalType("error")
      setModalMessage(error.message)
      setIsModalOpen(true);
    }
  }

  const fetchCompanyDetails = async (uuids) => {
    try {
      const companyDetails = await Promise.all(
        uuids.map((uuid) =>
          fetch(`${import.meta.env.VITE_BACKEND_URL}/api/company/${uuid}`).then((res) => res.json())
        )
      );
      return companyDetails; // This will contain the company details in order
    } catch (error) {
      console.error("Error fetching company details:", error);
      return [];
    }
  };

  const combineDetailsWithScores = (details, recommendations) => {
    return details.map((detail, index) => ({
      ...detail,
      score: recommendations[index].score,
    }));
  };

  const fetchData = async () => {
    const companyDetails = await fetchCompanyDetails(companyUuids);
    const orderedCompanies = combineDetailsWithScores(companyDetails, genrecommendations);
    setRecommendedCompanies(orderedCompanies) //FINAL STAGE
    setRecommendationIsLoading(false)
  };

  useEffect(() => {
    getRecommendations()
  }, [])

  useEffect(() => {
    if (companyUuids.length !== 0) {
      fetchData()
    }
  }, [companyUuids])



  return (
    <>
      {openLogin ? <LoginPage /> : (
        <div className="bg-gray-50 p-6 h-full rounded-lg shadow-md">
          {/* Welcome Section */}
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold text-blue-600">Welcome Back!</h1>
            <p className="text-gray-600 text-lg mt-2">
              Your dashboard is your gateway to everything you need. Let’s get started!
            </p>
          </div>

          {/* Overview Sections with Illustrative Images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Overview */}
            <div className="w-full p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-blue-50 transition">
              <div className="h-32 bg-blue-100 rounded-md mb-4 flex items-center justify-center">
                <img
                  src="/illustrations/profile.svg"
                  alt="Profile Illustration"
                  className="h-20"
                />
              </div>
              <h2 className="text-xl font-semibold text-blue-600 text-center">Profile</h2>
              <p className="text-gray-600 text-center mt-2">View and update your details.</p>
            </div>

            {/* Tasks Overview */}
            <div className="w-full p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-green-50 transition">
              <div className="h-32 bg-green-100 rounded-md mb-4 flex items-center justify-center">
                <img
                  src="/illustrations/tasks.svg"
                  alt="Tasks Illustration"
                  className="h-20"
                />
              </div>
              <h2 className="text-xl font-semibold text-green-600 text-center">Tasks</h2>
              <p className="text-gray-600 text-center mt-2">Stay on top of your activities.</p>
            </div>

            {/* Settings Overview */}
            <div className="w-full p-6 bg-white rounded-lg shadow-md hover:shadow-lg hover:bg-yellow-50 transition">
              <div className="h-32 bg-yellow-100 rounded-md mb-4 flex items-center justify-center">
                <img
                  src="/illustrations/settings.svg"
                  alt="Settings Illustration"
                  className="h-20"
                />
              </div>
              <h2 className="text-xl font-semibold text-yellow-600 text-center">Settings</h2>
              <p className="text-gray-600 text-center mt-2">
                Personalize your experience.
              </p>
            </div>
          </div>

          {/* Recent Activity */}
          <div className='mt-5'>
            <RecentActivity
              activities={[
                {
                  description: "User logged in",
                  timestamp: new Date().toLocaleString()
                },
                {
                  description: "Profile updated",
                  timestamp: new Date().toLocaleString()
                }
              ]}
            />
          </div>



          <div className="mt-8 ">
            {/* Recommended companies */}
            {recommendationsIsLoading ? <LoadingUI message='Please wait while we match companies that you might be interested in...' /> :
              recommendedCompanies.length === 0 ? <div className='text-gray-600 font-bold'>{possibleMessage}</div> :
                <RecommendedCompanies companies={recommendedCompanies} />
            }

          </div>
        </div>
      )}
    </>
  );
};

export default HomeTab;
