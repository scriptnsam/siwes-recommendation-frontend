import { useEffect, useState } from "react";
import RequestHandler from "../components/RequestHandler";

const Companies = ({ setActiveTab }) => {
  const [companies, setCompanies] = useState([]);

  const api = new RequestHandler(import.meta.env.VITE_BACKEND_URL, null, 20000);

  const getStudents = async () => {
    try {
      const res = await api.get("/api/admin/get-companies");
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
      setCompanies(receivedData.companies);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  useEffect(() => {
    console.log(companies);
  }, [companies]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center pb-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Companies List</h1>
        <button
          onClick={() => setActiveTab("overview")}
          className="bg-orange-600 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-700"
        >
          Overview
        </button>
      </header>

      <main className="mt-6">
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-lg shadow">
            <thead>
              <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
                <th className="py-3 px-6 text-left">Company</th>
                <th className="py-3 px-6 text-left">Email Address</th>
                <th className="py-3 px-6 text-left">Registration Number</th>
                <th className="py-3 px-6 text-left">Phone Number</th>
                <th className="py-3 px-6 text-left">Address</th>
                <th className="py-3 px-6 text-left">Indusrty</th>
                <th className="py-3 px-6 text-left">Registration Date</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {companies.length === 0 || companies === undefined ? (
                <tr className="text-center">
                  <td colSpan="5" className="py-3 px-6 text-gray-600">
                    No registered company
                  </td>
                </tr>
              ) : (
                companies.map((company) => (
                  <tr
                    key={company.uuid}
                    className="hover:bg-gray-50 text-gray-700 border-b border-gray-200"
                  >
                    <td className="py-3 px-6">{company.company_name}</td>
                    <td className="py-3 px-6">{company.email}</td>
                    <td className="py-3 px-6">{company.registrationNumber}</td>
                    <td className="py-3 px-6">{company.contactPhone}</td>
                    <td className="py-3 px-6">{company.address}</td>
                    <td className="py-3 px-6">{company.industry}</td>
                    <td className="py-3 px-6 text-sm">
                      {new Date(company.createdAt).toLocaleString()}
                    </td>
                    <td
                      className={`py-3 px-6 text-sm font-semibold text-green-600`}
                    >
                      {"Active"}
                    </td>
                    {/* <td
                        className={`py-3 px-6 text-sm font-semibold ${
                          company.status === "Under Review"
                            ? "text-yellow-600"
                            : company.status === "Interviewed"
                            ? "text-green-600"
                            : company.status === "Declined"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {company.status}
                      </td> */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Companies;
