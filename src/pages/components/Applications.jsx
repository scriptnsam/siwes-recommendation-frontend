import React from "react";
import UnderConstruction from "./UnderConstruction";

const Applications = () => {
  const applications = [
    {
      id: 1,
      company: "Innovate Ekiti",
      date: "2025-01-20",
      status: "Pending",
    },
    {
      id: 2,
      company: "Maternal Child Specialist Clinic",
      date: "2024-11-06",
      status: "Interviewed",
    },
    {
      id: 3,
      company: "Miller Constructions",
      date: "2014-11-06",
      status: "Interviewed",
    },
  ];

  return (
    // <div className="min-h-screen bg-gray-50 p-6">
    //   <header className="flex justify-between items-center pb-6 border-b border-gray-200">
    //     <h1 className="text-2xl font-bold text-gray-800">My Applications</h1>
    //     <button className="bg-teal-600 text-white px-4 py-2 rounded-lg shadow hover:bg-teal-700">
    //       + Add Application
    //     </button>
    //   </header>

    //   <main className="mt-6">
    //     <div className="overflow-x-auto">
    //       <table className="w-full bg-white rounded-lg shadow">
    //         <thead>
    //           <tr className="bg-gray-100 text-gray-600 uppercase text-sm">
    //             <th className="py-3 px-6 text-left">Company</th>
    //             <th className="py-3 px-6 text-left">Date</th>
    //             <th className="py-3 px-6 text-left">Status</th>
    //             <th className="py-3 px-6 text-right">Actions</th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {applications.map((app) => (
    //             <tr
    //               key={app.id}
    //               className="hover:bg-gray-50 text-gray-700 border-b border-gray-200"
    //             >
    //               <td className="py-3 px-6">{app.company}</td>
    //               <td className="py-3 px-6">{app.date}</td>
    //               <td
    //                 className={`py-3 px-6 font-semibold ${app.status === "Pending"
    //                   ? "text-yellow-600"
    //                   : app.status === "Interviewed"
    //                     ? "text-green-600"
    //                     : "text-gray-600"
    //                   }`}
    //               >
    //                 {app.status}
    //               </td>
    //               <td className="py-3 px-6 text-right">
    //                 <button className="text-teal-500 hover:underline">
    //                   Edit
    //                 </button>{" "}
    //                 |{" "}
    //                 <button className="text-red-500 hover:underline">
    //                   Delete
    //                 </button>
    //               </td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </main>
    // </div>
    <UnderConstruction />
  );
};

export default Applications;
