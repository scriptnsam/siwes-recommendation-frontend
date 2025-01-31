import { useEffect, useState } from "react";
import RequestHandler from "../components/RequestHandler";
import { useSelector } from "react-redux";
import ResponseModal from "../components/ResponseModal";

const Applications = ({ setActiveTab }) => {
  const [applications, setApplications] = useState([]);
  // const { token } = useSelector((state) => state.companyAuth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const api = new RequestHandler(import.meta.env.VITE_BACKEND_URL, null, 20000);

  const getApplications = async () => {
    try {
      const res = await api.get("/api/admin/list-applications");
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

      const receivedData = response.data;
      setApplications(receivedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  useEffect(() => {
    console.log(applications);
  }, [applications]);
  return (
    <>
      {isModalOpen && (
        <ResponseModal
          isOpen={isModalOpen}
          message={modalMessage}
          onClose={() => setIsModalOpen(false)}
          type={modalType}
        />
      )}
      <div className="min-h-screen bg-gray-50 p-6">
        <header className="flex justify-between items-center pb-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">Applications</h1>
          <button
            onClick={() => setActiveTab("overview")}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
          >
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
                  <th className="py-3 px-6 text-left">Company</th>
                  <th className="py-3 px-6 text-left">Industry</th>
                  <th className="py-3 px-6 text-left">Date</th>
                  <th className="py-3 px-6 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {applications.length === 0 || applications === undefined ? (
                  <tr className="text-center">
                    <td colSpan="5" className="py-3 px-6 text-gray-600">
                      No applications found
                    </td>
                  </tr>
                ) : (
                  applications.map((app) => (
                    <tr
                      key={app.uuid}
                      className="hover:bg-gray-50 text-gray-700 border-b border-gray-200"
                    >
                      <td className="py-3 px-6">{app.userDetails.name}</td>
                      <td className="py-3 px-6">{app.userDetails.email}</td>
                      <td className="py-3 px-6">{app.company.company_name}</td>
                      <td className="py-3 px-6">{app.company.industry}</td>
                      <td className="py-3 px-6 text-sm">
                        {new Date(app.createdAt).toLocaleString()}
                      </td>
                      <td
                        className={`py-3 px-6 text-sm font-semibold ${
                          app.status === "Under Review"
                            ? "text-yellow-600"
                            : app.status === "Interviewed"
                            ? "text-green-600"
                            : app.status === "Declined"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {app.status}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>

      {/* Profile view */}
      {/* {profileClicked && (
        <UserProfileModal
          user={profileDetails}
          isOpen={true}
          onClose={() => setProfileClicked(false)}
        />
      )} */}
    </>
  );
};

export default Applications;
