import { useState } from "react";
import ResponseMessage from "../components/ResponseMessage";
import RequestHandler from "../components/RequestHandler";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../../features/auth/adminAuthSlice";
import { useDispatch } from "react-redux";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success or error
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        email,
        password,
      };

      const api = new RequestHandler(
        import.meta.env.VITE_BACKEND_URL,
        null,
        10000
      );
      setIsLoading(true);
      const response = await api.post("/api/admin/login", formData);
      setIsLoading(false);

      if (response.success === false) {
        setResponseMessage(response.message);
        setMessageType("error");
        console.log(response);
        return;
      }
      const receivedData = response.data;
      console.log(receivedData);
      const token = receivedData.data.token;

      dispatch(setToken({ token }));

      // User created
      setResponseMessage(receivedData.message);
      setMessageType("success");

      // Clear form fields
      setEmail("");
      setPassword("");

      navigate("/admin/dashboard", { replace: true });
    } catch (error) {
      // Handle errors (e.g., invalid credentials, server issues)
      setResponseMessage(error.response?.data?.message || "An error occurred.");
      console.error(error);
      setMessageType("error");
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Admin Login
        </h2>

        {/* Response Message Section */}
        {responseMessage && (
          <ResponseMessage
            messageType={messageType}
            responseMessage={responseMessage}
          />
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-200 text-black bg-white"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 text-sm border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-orange-200 text-black bg-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400"
            style={{ opacity: isLoading ? "0.7" : "1" }}
            disabled={isLoading ? true : false}
          >
            {isLoading ? "Processing..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/company/signup"
            className="text-orange-500 hover:underline focus:outline-none"
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
