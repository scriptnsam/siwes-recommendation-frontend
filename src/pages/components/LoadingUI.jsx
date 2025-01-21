const LoadingUI = ({ message = "Loading, please wait..." }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="text-center">
        {/* Spinning Loader */}
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        {/* Loading Message */}
        <p className="mt-4 text-gray-700 text-lg font-medium">{message}</p>
      </div>
    </div>
  );
};

export default LoadingUI;
