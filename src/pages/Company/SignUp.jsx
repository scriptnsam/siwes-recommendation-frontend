import React, { useState } from 'react';
import RequestHandler from '../components/RequestHandler'
import ResponseMessage from '../components/ResponseMessage';
import { Link } from 'react-router-dom';

const CompanySignUp = () => {
  const [regNo, setRegNo] = useState('');
  const [industry, setIndustry] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // success or error
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (password !== confirmPassword) {
      setResponseMessage('Passwords do not match.');
      setMessageType('error');
      return;
    }

    // continue to process data
    const formData = {
      email,
      password,
      companyName,
      registrationNumber: regNo,
      address,
      contactPhone: phone,
      industry
    };

    const api = new RequestHandler(import.meta.env.VITE_BACKEND_URL, null, 10000)
    try {
      setIsLoading(true)
      const response = await api.post('/api/company/register', formData)
      setIsLoading(false)

      if (response.success === false) {
        setResponseMessage(response.message)
        setMessageType('error')
        return;
      }
      const receivedData = response.data
      console.log(receivedData)

      // User created
      setResponseMessage(receivedData.message)
      setMessageType('success')

      // Clear form fields
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setCompanyName('');
      setAddress('');
      setPhone('');
      setIndustry('');
      setRegNo('');
    } catch (error) {
      setResponseMessage(error.response?.data?.message || "An error occurred.")
      console.error(error)
      setMessageType('error')
      setIsLoading(false)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full my-4 max-sm:my-0 max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Register Your Company</h2>
        <p className='text-gray-500 text-center font-semibold'>Want to start recruiting intern? Register your company here.</p>


        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name<span className='text-red-500 font-bold'>*</span></label>
            <input
              type="companyName"
              id="companyName"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address<span className='text-red-500 font-bold'>*</span></label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="regNo" className="block text-sm font-medium text-gray-700">Registration Number<span className='text-red-500 font-bold'>*</span></label>
            <input
              type="text"
              id="regNo"
              value={regNo}
              onChange={(e) => setRegNo(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Indusry<span className='text-red-500 font-bold'>*</span></label>
            <input
              type="text"
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address<span className='text-red-500 font-bold'>*</span></label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone<span className='text-red-500 font-bold'>*</span></label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password<span className='text-red-500 font-bold'>*</span></label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password<span className='text-red-500 font-bold'>*</span></label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mt-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 text-black bg-white"
              required
            />
          </div>

          {/* Response Message Section */}
          {responseMessage && (
            <ResponseMessage messageType={messageType} responseMessage={responseMessage} />
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={isLoading ? true : false}
              style={{ opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </div>
        </form>

        <div className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/company-login" className="text-indigo-600 hover:underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default CompanySignUp;
