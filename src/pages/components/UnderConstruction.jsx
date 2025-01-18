const UnderConstruction = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      {/* Icon or Illustration */}
      <div className="mb-6">
        <img
          src="/illustrations/u-construction.svg"
          alt="Under Construction"
          className="w-32 h-32 object-contain"
        />
      </div>
      {/* Title */}
      <h1 className="text-4xl font-bold mb-2">This Page is Under Construction</h1>
      {/* Subtitle */}
      <p className="text-lg text-gray-600 mb-6">
        We're working hard to bring you something amazing. Check back soon!
      </p>
      {/* Back Button */}
      <button
        onClick={() => window.location.href = ''}
        className="px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg"
      >
        Go Back
      </button>
    </div>
  );
};

export default UnderConstruction;
