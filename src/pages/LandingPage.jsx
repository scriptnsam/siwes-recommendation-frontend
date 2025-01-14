import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const LandingPage = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative bg-gradient-to-r from-blue-50 to-teal-50 text-gray-900"
      >
        <div className="container mx-auto py-16 px-6 text-center">
          <motion.h2 className="text-4xl sm:text-5xl font-extrabold mb-6">
            Find the Perfect SIWES Placement
          </motion.h2>
          <motion.p
            variants={fadeIn}
            className="text-base sm:text-lg max-w-2xl mx-auto mb-8"
          >
            Unlock opportunities with verified companies, expert recommendations, and
            personalized training options for your industrial experience.
          </motion.p>
          <Link to={'/signup'}>
            <motion.button
              variants={{
                hidden: { scale: 0.9, opacity: 0 },
                visible: { scale: 1, opacity: 1, transition: { duration: 0.8 } },
              }}
              className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-md shadow-md hover:bg-teal-700 transition"
            >
              Get Started
            </motion.button>
          </Link>
        </div>
      </motion.section>

      {/* Features Section */}
      <section id="features" className="py-12 bg-gray-100">
        <div className="container mx-auto px-6 sm:px-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <img
              src="/listing.png"
              alt="Company Listings"
              className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-4">Company Listings</h3>
            <p className="text-gray-600">
              Discover a wide range of top companies offering verified SIWES placements. We ensure each company is trustworthy and reputable.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <img
              src="/personalization.png"
              alt="Personalized Recommendations"
              className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-4">Personalized Recommendations</h3>
            <p className="text-gray-600">
              Based on your field of study, get personalized placement recommendations to match your academic goals and career aspirations.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <img
              src="/experts.png"
              alt="Expert Guidance"
              className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-4">Expert Guidance</h3>
            <p className="text-gray-600">
              Get access to experts who can guide you in preparing for the application process, interview tips, and much more.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <img
              src="/application.png"
              alt="Secure Application Process"
              className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-4">Secure Application Process</h3>
            <p className="text-gray-600">
              Submit your application safely with our secure, easy-to-use platform. Track your application progress and get notified about updates.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <img
              src="/training.png"
              alt="Training Resources"
              className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-4">Training Resources</h3>
            <p className="text-gray-600">
              Access various online resources and training material to help you excel in your SIWES placement and make the most of your internship.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <img
              src="/real-time.png"
              alt="Real-Time Placement Updates"
              className="w-full h-40 object-cover rounded-t-lg mb-4"
            />
            <h3 className="text-xl font-bold mb-4">Real-Time Placement Updates</h3>
            <p className="text-gray-600">
              Receive real-time updates on your placement status, including notifications about new opportunities, deadlines, and more.
            </p>
          </div>
        </div>
      </section>


      {/* About Us Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 sm:px-10 text-center">
          {/* Section Title */}
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-3xl sm:text-4xl font-extrabold text-teal-600 mb-6"
          >
            About Us
          </motion.h2>

          {/* Content Wrapper */}
          <div className="flex flex-col lg:flex-row items-center lg:justify-center gap-8 lg:gap-12">
            {/* Image */}
            <div className="flex-shrink-0">
              <img
                src="/about.png"
                alt="SIWES Connect"
                className="w-44 h-44 sm:w-52 sm:h-52 mx-auto rounded-lg shadow-md"
              />
            </div>

            {/* Text Content */}
            <div className="max-w-3xl text-center lg:text-left">
              <p className="text-lg sm:text-xl text-gray-700 leading-relaxed">
                <span className="font-bold text-teal-600">SIWES Connect</span> is a
                platform dedicated to bridging the gap between students and companies
                offering industrial training placements. Our mission is to provide a
                seamless and efficient placement process while offering guidance,
                resources, and expert recommendations.
              </p>
              <p className="mt-4 text-lg sm:text-xl text-gray-700 leading-relaxed">
                Our team of experts works tirelessly to ensure that students receive
                quality placements that align with their career goals. Together, we
                build a brighter future for students everywhere.
              </p>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default LandingPage;