import { useEffect, useState } from "react";
import RequestHandler from "../components/RequestHandler";
import { useSelector } from "react-redux";

const Overview = () => {
  const { token } = useSelector((state) => state.adminAuth);
  const [overview, setOverview] = useState({
    totalApplications: 0,
    totalCompanies: 0,
    totalUsers: 0,
  });

  const api = new RequestHandler(import.meta.env.VITE_BACKEND_URL, null, 20000);

  const getOverview = async () => {
    try {
      const res = await api.get("/api/admin/overview");
      const response = res.data;

      if (response.success === false) {
        if (response.code === 401) {
          // render login page
          // setOpenLogin(true)
          console.log("Needs to login");
        }
        console.log(response.message);
        return;
      }
      setOverview(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOverview();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-600">Total Students</h2>
          <p className="text-4xl font-semibold text-indigo-600">
            {overview.totalUsers}
          </p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-600">Total Companies</h2>
          <p className="text-4xl font-semibold text-green-400">
            {overview.totalCompanies}
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-medium text-gray-600">
            Application Submitted
          </h2>
          <p className="text-4xl font-semibold text-green-600">
            {overview.totalApplications}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Overview Summary
          </h2>
          <p className="text-gray-600">
            This section provides a summary of the current status of intern
            applications. Stay updated with the latest metrics and track
            application statuses in real-time.
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              No Additional Data
            </h2>
            <p className="text-gray-600">
              Detailed insights will be available once further applications are
              processed.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-2 rounded-lg">
          View Detailed Analytics
        </button>
      </div>
    </div>
  );
};

export default Overview;
