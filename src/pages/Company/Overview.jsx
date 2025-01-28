import { useEffect, useState } from "react";
import RequestHandler from "../components/RequestHandler";
import { useDispatch, useSelector } from "react-redux";
import { setApplications } from "../../features/details/applicationsDetails";

const Overview = () => {
  const { token } = useSelector((state) => state.companyAuth);
  const [overviewDetails, setOverviewDetails] = useState({
    applicationsReceived: NaN,
    interviewed: NaN,
    declined: NaN,
    pending: NaN
  })
  const dispatch = useDispatch();
  const { applications, applicationsSaved } = useSelector((state) => state.companyApplications);

  const api = new RequestHandler(import.meta.env.VITE_BACKEND_URL, {
    Authorization: `Bearer ${token}`
  }, 20000);

  const getApplications = async () => {
    try {
      const response = await api.get('/api/company/applications');
      if (response.success === false) {
        if (response.code === 401) {
          // render login page
          // setOpenLogin(true)
          console.log('Needs to login')
        }
        console.log(response.message)
        // setModalType("error")
        // setModalMessage(response.message)
        // setIsModalOpen(true);
        // setRecommendationIsLoading(false)
        return;
      }

      const receivedData = response.data
      console.log(receivedData)
      setOverviewDetails({
        applicationsReceived: receivedData.data.applicationsReceived,
        declined: receivedData.data.declined,
        interviewed: receivedData.data.interviewed,
        pending: receivedData.data.pending_review
      })

      const mainData = receivedData.data
      // save data to redux store
      dispatch(setApplications({ applications: mainData }))

      console.log('Saved to redux store')


    } catch (error) {
      console.error(error)

    }
  }


  useEffect(() => {
    if (applicationsSaved) {
      console.log('Applications already in redux store:', applications)
      setOverviewDetails({
        applicationsReceived: applications.applicationsReceived,
        declined: applications.declined,
        interviewed: applications.interviewed,
        pending: applications.pending_review
      })
    } else {
      getApplications()
    }
  }, [])


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-600">Applications Received</h2>
          <p className="text-4xl font-semibold text-indigo-600">{(overviewDetails.applicationsReceived).toString()}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-600">Interviewed</h2>
          <p className="text-4xl font-semibold text-green-600">{(overviewDetails.interviewed).toString()}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-600">Declined</h2>
          <p className="text-4xl font-semibold text-red-600">{(overviewDetails.declined).toString()}</p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-600">Pending</h2>
          <p className="text-4xl font-semibold text-yellow-600">{(overviewDetails.pending).toString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Overview Summary</h2>
          <p className="text-gray-600">This section provides a summary of the current status of intern applications. Stay updated with the latest metrics and track application statuses in real-time.</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">No Additional Data</h2>
            <p className="text-gray-600">Detailed insights will be available once further applications are processed.</p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg">
          View Detailed Analytics
        </button>
      </div>
    </div>
  );
};

export default Overview;