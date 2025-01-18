import React, { useState } from "react";

const RecommendedCompanies = ({ companies }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [userMessage, setUserMessage] = useState("");

  const handleApply = (company) => {
    setSelectedCompany(company); // Open modal with selected company
  };

  const closeModal = () => {
    setSelectedCompany(null);
    setUserMessage(""); // Reset the user input
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`User Message: ${userMessage}`);
    console.log(`Applied to: ${selectedCompany.company_name}`);
    // You can add logic here to send application details to the backend
    closeModal();
  };

  return (
    <section className="p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Recommended Companies
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company, index) => (
          <div
            key={index}
            className="bg-gray-50 border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center p-4">
              <img
                src='/experts.png'
                alt={`${company.data.company_name} logo`}
                className="h-16 w-16 object-contain rounded-full border border-gray-300"
              />
              <div className="ml-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {company.data.company_name}
                </h3>
                <p className="text-sm text-gray-600">{company.data.industry}</p>
                <p className="text-gray-700 text-sm">Recommendation Score: <span className="text-teal-600 font-bold">{(company.score * 100).toFixed(2)}% - ({company.score.toFixed(2)}/1)</span></p>
                <p className="text-sm text-gray-600">{company.data.email}</p>
              </div>
            </div>
            <div className="p-4 border-t border-gray-200 flex justify-between items-center">
              <a
                href={company.data.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-blue-500 hover:underline text-sm"
              >
                Learn More
              </a>
              <button
                onClick={() => handleApply(company.data)}
                className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg text-sm font-medium"
              >
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Application Modal */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-lg relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Internship Application - {selectedCompany.company_name}
            </h3>
            <p className="text-gray-700 mb-4">
              Fill in the form below to complete your application.
            </p>
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <strong>Registration Number:</strong> {selectedCompany.registrationNumber}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Address:</strong> {selectedCompany.address}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Phone:</strong> {selectedCompany.contactPhone}
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Additional Information
                </label>
                <textarea
                  value={userMessage}
                  onChange={(e) => setUserMessage(e.target.value)}
                  placeholder="Add a message to your application (optional)"
                  className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                ></textarea>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Your information will be shared with {selectedCompany.company_name}.
              </p>
              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg font-medium"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default RecommendedCompanies;
