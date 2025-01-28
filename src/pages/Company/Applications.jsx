import { useEffect, useState } from "react";
import RequestHandler from "../components/RequestHandler";
import { useSelector } from "react-redux";
import ResponseModal from "../components/ResponseModal";
import UserProfileModal from './UserProfileModal';

const Applications = ({ setActiveTab }) => {
  const [applications, setApplications] = useState([]);
  const { token } = useSelector((state) => state.companyAuth);
  const [modalType, setModalType] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileClicked, setProfileClicked] = useState(false);
  const [profileDetails, setProfileDetails] = useState('');

  const { applications: app, applicationsSaved } = useSelector((state) => state.companyApplications);


  const deleteApplication = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        const response = await api.delete(`/api/user/delete-application/${id}`);
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

        const receivedData = response.data
        // console.log(receivedData)
        if (receivedData === undefined) {
          setModalType("error")
          setModalMessage('An error occured')
          setIsModalOpen(true);
          return;
        }


        // success modal
        setModalType("success")
        setModalMessage(receivedData.message + ',\n Updating applications...')
        setIsModalOpen(true);

        // run the get applications function
        setTimeout(() => {
          getApplications()
        }, 2000)
      } catch (error) {
        console.error(error.message)
        setModalType("error")
        setModalMessage('error.message')
        setIsModalOpen(true);
      }

    }
  }

  const viewProfile = (id) => {
    // fiter the applications and get only details with this Id passed
    const application = applications.filter((app) => app.uuid === id)
    setProfileDetails(application[0])
    setProfileClicked(true)
  }

  useEffect(() => {
    if (applicationsSaved) {
      console.log(app[0])
      setApplications([app[0]])
    } else {
      setApplications([])
    }
  }, [])

  return (
    <>
      {isModalOpen && (<ResponseModal isOpen={isModalOpen} message={modalMessage} onClose={() => setIsModalOpen(false)} type={modalType} />)}
      <div className="min-h-screen bg-gray-50 p-6">
        <header className="flex justify-between items-center pb-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Applications</h1>
          <button onClick={() => setActiveTab('overview')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700">
            Overview
          </button>
        </header>

        <main className="mt-6">
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow">
              <thead>
                <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                  <th className="py-3 px-6 text-left">Student's Name</th>
                  <th className="py-3 px-6 text-left">Email Address</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Status</th>
                  <th className="py-3 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr
                    key={app.uuid}
                    className="hover:bg-gray-50 text-gray-700 border-b border-gray-200"
                  >
                    <td className="py-3 px-6">{app.userDetails.name}</td>
                    <td className="py-3 px-6">{app.userDetails.email}</td>
                    <td className="py-3 px-6 text-sm">{(new Date(app.createdAt)).toLocaleString()}</td>
                    <td className={`py-3 px-6 text-sm font-semibold ${app.status === "Under Review"
                      ? "text-yellow-600"
                      : app.status === "Interviewed"
                        ? "text-green-600"
                        : app.status === "Declined"
                          ? "text-red-600" : "text-gray-600"
                      }`}
                    >
                      {app.status}
                    </td>
                    <td className="py-3 px-6 text-right">
                      <button onClick={() => viewProfile(app.uuid)} className="text-indigo-500 font-bold hover:underline">
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Profile view */}
      {profileClicked && (<UserProfileModal user={profileDetails} isOpen={true} onClose={() => setProfileClicked(false)} />)}
    </>
  );
};

export default Applications;
