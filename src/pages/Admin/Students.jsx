import { useEffect, useState } from "react";
import RequestHandler from "../components/RequestHandler";

const Students = ({ setActiveTab }) => {
  const [students, setStudents] = useState([]);

  const api = new RequestHandler(import.meta.env.VITE_BACKEND_URL, null, 20000);

  const getStudents = async () => {
    try {
      const res = await api.get("/api/admin/get-users");
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
      setStudents(receivedData.users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getStudents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center pb-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Students List</h1>
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
                <th className="py-3 px-6 text-left">Student's Name</th>
                <th className="py-3 px-6 text-left">Email Address</th>
                <th className="py-3 px-6 text-left">Registration Date</th>
                <th className="py-3 px-6 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 || students === undefined ? (
                <tr className="text-center">
                  <td colSpan="5" className="py-3 px-6 text-gray-600">
                    No registered student
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr
                    key={student.uuid}
                    className="hover:bg-gray-50 text-gray-700 border-b border-gray-200"
                  >
                    <td className="py-3 px-6">{student.name}</td>
                    <td className="py-3 px-6">{student.email}</td>
                    <td className="py-3 px-6 text-sm">
                      {new Date(student.createdAt).toLocaleString()}
                    </td>
                    <td
                      className={`py-3 px-6 text-sm font-semibold text-green-600`}
                    >
                      {"Active"}
                    </td>
                    {/* <td
                        className={`py-3 px-6 text-sm font-semibold ${
                          student.status === "Under Review"
                            ? "text-yellow-600"
                            : student.status === "Interviewed"
                            ? "text-green-600"
                            : student.status === "Declined"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {student.status}
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

export default Students;
